# 🤖 GUÍA DE HANDOFF Y DESPLIEGUE EN HOMESERVER — pyMinas v1.0

> **⚠️ INSTRUCCIÓN DE CICLO DE VIDA PARA EL AGENTE DEL HOMESERVER:**
> Este archivo `HANDOFF.md` ha sido generado exclusivamente como instrucción para guiarte en el aprovisionamiento y despliegue del proyecto en este servidor. Una vez hayas completado y verificado el despliegue de manera exitosa, o en la siguiente actualización de versión de la aplicación, **elimina este archivo del repositorio** ejecutando:
> ```bash
> git rm HANDOFF.md
> git commit -m "chore: remove deployment handoff after successful server rollout"
> git push origin main
> ```

---

## 1. Visión General del Proyecto
- **Nombre:** pyMinas (Fundamentos de Programación · Facultad de Minas, Universidad Nacional de Colombia - Sede Medellín).
- **Repositorio:** `https://github.com/sgutierrezbe/pyminas.git`
- **Rama activa:** `main`
- **Naturaleza técnica:** Single-Page Application (SPA) estática de alto rendimiento con motor de ejecución Python en el cliente (CPython 3 pre-horneado + Pyodide WebAssembly).
- **Dependencias externas:** No requiere Node.js, bases de datos SQL/NoSQL ni compilaciones complejas. Es código HTML5, CSS3 (Tailwind) y JavaScript vanilla puro.

---

## 2. Concurrencia y Comportamiento Multi-Usuario
- **Aislamiento por cliente:** Todo el progreso de las lecciones, puntos de experiencia (XP), lecciones completadas y métricas de precisión se guardan en el `localStorage` del navegador de cada estudiante.
- **Carga en el homeserver:** El cómputo pesado de Python ocurre directamente en los navegadores de los estudiantes mediante WebAssembly. El homeserver únicamente sirve los archivos estáticos con latencia ultrabaja.
- **Capacidad:** Puede soportar cientos de estudiantes concurrentes con menos de **50 MB de RAM** de consumo en el homeserver.

---

## 3. Guía Paso a Paso para el Agente

### Paso 1: Clonar o actualizar el repositorio
Si estás configurando el servicio desde cero en el homeserver:
```bash
git clone https://github.com/sgutierrezbe/pyminas.git /opt/pyminas
cd /opt/pyminas
```
Si ya existe:
```bash
cd /opt/pyminas
git pull origin main
```

---

### Paso 2: Seleccionar Método de Despliegue

Elige una de las siguientes tres opciones según el entorno del homeserver:

#### Opción A: Despliegue con Docker Compose (Recomendada con persistencia SQLite)
Si el homeserver cuenta con Docker y Docker Compose:

1. Crea el archivo `Dockerfile` en el directorio raíz del proyecto:
```dockerfile
FROM python:3.11-alpine
WORKDIR /app
COPY . /app
EXPOSE 8080
CMD ["python3", "server.py"]
```

2. Crea o ejecuta con `docker-compose.yml` (con volumen para persistir las cuentas y progreso de los estudiantes):
```yaml
version: '3.8'

services:
  pyminas:
    build: .
    container_name: pyminas-app
    restart: unless-stopped
    ports:
      - "8080:8080" # Puerto expuesto en el host
    volumes:
      - ./pyminas.db:/app/pyminas.db # Persistencia de base de datos SQLite
```

3. Levanta el contenedor:
```bash
docker compose up -d --build
```

---

#### Opción B: Proxy Inverso con Caddy (Con HTTPS automático hacia server.py)
Si utilizas Caddy en el homeserver como proxy inverso hacia el servicio pyMinas:
```caddy
pyminas.tudominio.com {
    reverse_proxy localhost:8080

    encode gzip zstd

    # Headers recomendados para Pyodide / WebAssembly
    header {
        Cross-Origin-Opener-Policy "same-origin"
        Cross-Origin-Embedder-Policy "require-corp"
    }
}
```

---

#### Opción C: Servicio Nativo Systemd con Python
Si prefieres correrlo directamente sobre Linux sin contenedores:

1. Crea el archivo de servicio en `/etc/systemd/system/pyminas.service`:
```ini
[Unit]
Description=pyMinas Interactive Platform
After=network.target

[Service]
Type=simple
User=samu
WorkingDirectory=/opt/pyminas
ExecStart=/usr/bin/python3 /opt/pyminas/server.py
Restart=always
RestartSec=5
Environment=PORT=8080

[Install]
WantedBy=multi-user.target
```

2. Activa y arranca el servicio:
```bash
sudo systemctl daemon-reload
sudo systemctl enable pyminas
sudo systemctl start pyminas
```

---

## 4. Requisitos Clave de Red y Headers (WASM & CORS)
1. **Tipos MIME:** Es indispensable que el servidor entregue los siguientes tipos MIME:
   - `.wasm` -> `application/wasm`
   - `.svg` -> `image/svg+xml`
   - `.js` -> `application/javascript`
2. **Acceso Externo / Homeserver:**
   - Si se expone vía **Cloudflare Tunnel**, **Tailscale Funnel**, **Nginx Proxy Manager** o **DuckDNS**, asegúrate de que el proxy no reescriba las rutas de assets relativos (`./assets/...`).
   - El puerto por defecto recomendado es `8080` (configurable según disponibilidad en el homeserver).

---

## 5. Verificación de Despliegue y Pruebas Automáticas
Una vez levantado el servidor, el agente DEBE verificar la integridad del despliegue:

1. **Test Suite Automatizado:**
   - Abre con un navegador headless o curl:
     `http://<IP_O_DOMINIO>:<PUERTO>/test_runner.html`
   - Verifica que el resultado reporte **100% de pruebas pasadas** (Zero failures).
2. **Endpoint Principal:**
   - Consulta `http://<IP_O_DOMINIO>:<PUERTO>/` y valida que responda HTTP 200 con el título `pyMinas | Fundamentos de Programación`.

---

## 6. Eliminación de este Handoff
Cuando el despliegue esté operativo y verificado:
```bash
git rm HANDOFF.md
git commit -m "chore: remove deployment handoff after successful server rollout"
git push origin main
```
