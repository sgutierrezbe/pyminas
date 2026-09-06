# 🚀 Guía de Instalación y Migración de Antigravity (AGY) en un Nuevo PC

Esta guía contiene todas las instrucciones necesarias para que un usuario o un nuevo agente de IA instale y configure **Google Antigravity (CLI / IDE)** en un nuevo computador, y opcionalmente continúe con esta misma conversación o inicie una nueva.

---

## 📋 1. Requisitos Previos

- Sistema Operativo: Linux (Ubuntu/Debian, Fedora, Arch, etc.), macOS o Windows 10/11.
- Conexión a internet.
- Una cuenta de Google para iniciar sesión en Antigravity.
- Git y Python 3 instalados en el sistema.

---

## ⚡ 2. Instalación de Antigravity CLI (`agy`)

### En Linux y macOS (Terminal):
Ejecuta el script oficial de instalación:
```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

> **Nota sobre el PATH:**
> El instalador coloca el binario ejecutable en `~/.local/bin/agy`.
> Si al escribir `agy` el sistema dice "command not found", agrega la ruta a tu terminal ejecutando:
> ```bash
> echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
> source ~/.bashrc
> ```
> *(O en `~/.zshrc` si usas Zsh en macOS).*

### En Windows:
- **Con PowerShell (como Administrador o usuario estándar):**
  ```powershell
  irm https://antigravity.google/cli/install.ps1 | iex
  ```
- **Con Símbolo del Sistema (CMD):**
  ```cmd
  curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```

---

## 🔑 3. Primer Inicio y Autenticación

Una vez instalado, abre tu terminal y ejecuta:
```bash
agy
```

1. **Configuración inicial:** La primera vez te pedirá seleccionar tus preferencias de tema visual y confirmación de espacio de trabajo.
2. **Autenticación:**
   - En entornos gráficos: Se abrirá automáticamente tu navegador web predeterminado para iniciar sesión con tu cuenta de Google.
   - En servidores remotos o SSH: Te mostrará un enlace URL seguro para que lo abras en cualquier navegador y autorices la sesión.
3. Para salir de la terminal interactiva de Antigravity: presiona `Ctrl + D` dos veces o escribe `/exit`.

---

## 🔄 4. Cómo Migrar y Reanudar ESTA Conversación

Si deseas que el nuevo agente en el otro PC continúe con la memoria exacta, historial de decisiones y contexto de esta sesión:

- **ID de la conversación:** `a432e1da-a067-4f16-904a-ba941e814b4e`

### Paso A (En el PC Origen - Generar paquete):
Puedes ejecutar el script incluido:
```bash
bash empaquetar_sesion.sh
```
O manualmente:
```bash
cd ~/.gemini/antigravity-cli && tar -czvf ~/sesion_pyminas.tar.gz \
  conversations/a432e1da-a067-4f16-904a-ba941e814b4e* \
  brain/a432e1da-a067-4f16-904a-ba941e814b4e
```
Esto creará el archivo `sesion_pyminas.tar.gz`. Transfiérelo al nuevo PC (vía USB, Google Drive, scp, etc.).

### Paso B (En el PC Destino - Restaurar):
En el nuevo PC:
```bash
# 1. Asegurar directorios de Antigravity
mkdir -p ~/.gemini/antigravity-cli/conversations ~/.gemini/antigravity-cli/brain

# 2. Descomprimir los datos de la sesión
tar -xzvf sesion_pyminas.tar.gz -C ~/.gemini/antigravity-cli/

# 3. Clonar el repositorio del proyecto
git clone https://github.com/sgutierrezbe/pyminas.git
cd pyminas

# 4. Reanudar la conversación con Antigravity
agy --conversation a432e1da-a067-4f16-904a-ba941e814b4e
```
¡Listo! Antigravity despertará con todo el contexto, historial y archivos intactos.

---

## 🆕 5. Alternativa: Iniciar una Nueva Sesión con Handoff

Si prefieres no transferir archivos comprimidos y simplemente quieres empezar una nueva sesión con un nuevo agente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sgutierrezbe/pyminas.git
   cd pyminas
   ```
2. Inicia Antigravity:
   ```bash
   agy
   ```
3. Pégale este mensaje de inicio:
   ```text
   Hola, este es el repositorio de pyMinas (plataforma interactiva estilo Brilliant / Duolingo para Fundamentos de Programación con Python en la Facultad de Minas - UNAL Medellín).
   El proyecto utiliza HTML5, Tailwind CSS vía CDN, Pyodide (WASM) para ejecución en cliente y server.py (servidor nativo en Python con SQLite y modelo de autenticación Soulseek para correos @unal.edu.co).
   Todos los tests en test_runner.html pasan al 100%.
   Por favor revisa el estado del repositorio y dime cómo podemos continuar hoy.
   ```

---

## 🖥️ 6. Antigravity IDE (Versión de Escritorio)

Si prefieres la aplicación con interfaz gráfica (IDE completo estilo VS Code con asistente de IA integrado):
- Descarga el instalador oficial desde: **`https://antigravity.google/download`**
- Disponible para Linux (`.deb`, `.rpm`), macOS (`.dmg`) y Windows (`.exe`).
