#!/usr/bin/env python3
"""
pyMinas Web Server & API
Plataforma interactiva de microaprendizaje en Python · Facultad de Minas (UNAL)
Incluye servidor estático y API de autenticación estilo Soulseek con base de datos SQLite.
"""

import http.server
import socketserver
import os
import sys
import json
import sqlite3
import hashlib
import hmac
import secrets
import re
import mimetypes

PORT = 8080
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pyminas.db")

# ==================== BASE DE DATOS Y AUTENTICACIÓN ====================

def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=10.0)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    with conn:
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL COLLATE NOCASE,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS progress (
                user_id INTEGER PRIMARY KEY,
                progress_json TEXT NOT NULL DEFAULT '{}',
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);")
    conn.close()

def is_valid_unal_email(email: str) -> bool:
    """Verifica que el correo tenga formato válido y termine en @unal.edu.co"""
    if not isinstance(email, str):
        return False
    email = email.strip().lower()
    if not email.endswith("@unal.edu.co"):
        return False
    parts = email.split("@")
    if len(parts) != 2 or not parts[0]:
        return False
    return bool(re.match(r"^[a-zA-Z0-9._%+-]+$", parts[0]))

def hash_password(password: str, salt_hex: str = None) -> tuple:
    if salt_hex is None:
        salt_bytes = secrets.token_bytes(16)
        salt_hex = salt_bytes.hex()
    else:
        salt_bytes = bytes.fromhex(salt_hex)
    pwd_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt_bytes, 100_000)
    return pwd_hash.hex(), salt_hex

def verify_password(password: str, stored_hash: str, stored_salt: str) -> bool:
    pwd_hash, _ = hash_password(password, stored_salt)
    return hmac.compare_digest(pwd_hash, stored_hash)

def get_user_from_token(token: str):
    if not token:
        return None
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT u.id, u.email, p.progress_json 
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        LEFT JOIN progress p ON u.id = p.user_id
        WHERE s.token = ?
    """, (token,))
    row = cursor.fetchone()
    conn.close()
    return row

# ==================== MANEJADOR HTTP Y ENDPOINTS ====================

class PyMinasHandler(http.server.SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        # Asegurar tipos MIME correctos para WASM y SVG
        mimetypes.add_type('application/wasm', '.wasm')
        mimetypes.add_type('image/svg+xml', '.svg')
        mimetypes.add_type('application/javascript', '.js')
        super().__init__(*args, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def send_json(self, status_code: int, data: dict):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def extract_token(self) -> str:
        auth = self.headers.get('Authorization', '')
        if auth.startswith('Bearer '):
            return auth[7:].strip()
        return ''

    def do_GET(self):
        parsed_path = self.path.split('?')[0]

        # Endpoint: Comprobar sesión actual y cargar progreso
        if parsed_path == '/api/me':
            token = self.extract_token()
            user_row = get_user_from_token(token)
            if not user_row:
                return self.send_json(401, {"error": "Sesión inválida o no autenticada"})
            
            progress_data = {}
            if user_row["progress_json"]:
                try:
                    progress_data = json.loads(user_row["progress_json"])
                except Exception:
                    progress_data = {}
            
            return self.send_json(200, {
                "status": "ok",
                "email": user_row["email"],
                "progress": progress_data
            })

        # Servir archivos estáticos normales
        super().do_GET()

    def do_POST(self):
        parsed_path = self.path.split('?')[0]

        # Leer body JSON
        content_length = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_length) if content_length > 0 else b'{}'
        try:
            payload = json.loads(post_body.decode('utf-8'))
        except Exception:
            payload = {}

        # ==================== ENDPOINT: LOGIN SOULSEEK ====================
        if parsed_path == '/api/login':
            email = str(payload.get('email', '')).strip().lower()
            password = str(payload.get('password', '')).strip()

            # Si el usuario solo escribió su nombre de usuario, agregar @unal.edu.co automáticamente
            if email and '@' not in email:
                email = f"{email}@unal.edu.co"

            # 1. Validación estricta de correo UNAL
            if not is_valid_unal_email(email):
                return self.send_json(400, {
                    "error": "El usuario debe ser un correo institucional que termine en @unal.edu.co"
                })

            # 2. Validación de contraseña
            if len(password) < 4:
                return self.send_json(400, {
                    "error": "La contraseña debe tener al menos 4 caracteres."
                })

            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("SELECT id, email, password_hash, salt FROM users WHERE email = ?", (email,))
            user = cursor.fetchone()

            initial_progress = {
                "completedLessons": ["w1-l1"],
                "savedLessonSteps": {},
                "xp": 0
            }

            token = secrets.token_hex(32)

            if user is None:
                # ── MODELO SOULSEEK: No existe -> Crear automáticamente ──
                pwd_hash, salt = hash_password(password)
                with conn:
                    cursor.execute(
                        "INSERT INTO users (email, password_hash, salt) VALUES (?, ?, ?)",
                        (email, pwd_hash, salt)
                    )
                    user_id = cursor.lastrowid
                    cursor.execute(
                        "INSERT INTO sessions (token, user_id) VALUES (?, ?)",
                        (token, user_id)
                    )
                    cursor.execute(
                        "INSERT INTO progress (user_id, progress_json) VALUES (?, ?)",
                        (user_id, json.dumps(initial_progress))
                    )
                conn.close()

                return self.send_json(200, {
                    "status": "ok",
                    "is_new": True,
                    "token": token,
                    "email": email,
                    "progress": initial_progress,
                    "message": "¡Cuenta creada automáticamente! Bienvenido a pyMinas."
                })

            else:
                # ── MODELO SOULSEEK: Ya existe -> Verificar contraseña ──
                if not verify_password(password, user["password_hash"], user["salt"]):
                    conn.close()
                    return self.send_json(401, {
                        "error": "Contraseña incorrecta para este correo institucional."
                    })

                user_id = user["id"]
                with conn:
                    cursor.execute(
                        "INSERT INTO sessions (token, user_id) VALUES (?, ?)",
                        (token, user_id)
                    )
                    cursor.execute(
                        "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
                        (user_id,)
                    )
                    cursor.execute("SELECT progress_json FROM progress WHERE user_id = ?", (user_id,))
                    p_row = cursor.fetchone()

                saved_prog = initial_progress
                if p_row and p_row["progress_json"]:
                    try:
                        saved_prog = json.loads(p_row["progress_json"])
                    except Exception:
                        saved_prog = initial_progress

                conn.close()
                return self.send_json(200, {
                    "status": "ok",
                    "is_new": False,
                    "token": token,
                    "email": email,
                    "progress": saved_prog,
                    "message": "Sesión iniciada correctamente."
                })

        # ==================== ENDPOINT: GUARDAR PROGRESO ====================
        elif parsed_path == '/api/progress':
            token = self.extract_token()
            user_row = get_user_from_token(token)
            if not user_row:
                return self.send_json(401, {"error": "Sesión no autorizada o expirada"})

            new_progress = payload.get('progress')
            if not isinstance(new_progress, dict):
                return self.send_json(400, {"error": "Formato de progreso inválido"})

            conn = get_db()
            with conn:
                conn.execute("""
                    INSERT INTO progress (user_id, progress_json, updated_at)
                    VALUES (?, ?, CURRENT_TIMESTAMP)
                    ON CONFLICT(user_id) DO UPDATE SET
                        progress_json = excluded.progress_json,
                        updated_at = CURRENT_TIMESTAMP
                """, (user_row["id"], json.dumps(new_progress)))
            conn.close()

            return self.send_json(200, {"status": "ok", "message": "Progreso guardado en el servidor"})

        # ==================== ENDPOINT: CERRAR SESIÓN ====================
        elif parsed_path == '/api/logout':
            token = self.extract_token()
            if token:
                conn = get_db()
                with conn:
                    conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
                conn.close()
            return self.send_json(200, {"status": "ok", "message": "Sesión cerrada"})

        else:
            return self.send_json(404, {"error": "Endpoint no encontrado"})

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    init_db()

    port = PORT
    for p in range(PORT, PORT + 20):
        try:
            with socketserver.TCPServer(("", p), PyMinasHandler) as httpd:
                url = f"http://localhost:{p}"
                print("\n" + "=" * 60)
                print(f"🏛️  pyMinas — Facultad de Minas (UNAL) running with Auth API!")
                print(f"👉 Local URL: {url}")
                print(f"📁 Serving:   {os.getcwd()}")
                print(f"💾 Database:  {DB_PATH}")
                print("=" * 60 + "\n")
                print("Press Ctrl+C to stop the server.\n")

                try:
                    httpd.serve_forever()
                except KeyboardInterrupt:
                    print("\nShutting down server. Goodbye!")
                    sys.exit(0)
        except OSError as e:
            if "Address already in use" in str(e):
                continue
            raise

if __name__ == "__main__":
    run_server()

