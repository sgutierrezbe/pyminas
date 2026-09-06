# pyMinas | Fundamentos de Programación · Facultad de Minas (UNAL)

Plataforma educativa interactiva de microaprendizaje y pensamiento computacional en Python para estudiantes de ingeniería de la **Universidad Nacional de Colombia - Sede Medellín (Facultad de Minas)**.

Inspirada en la pedagogía activa y táctil de **Brilliant.org**, con **nodos circulares 3D, una ruta sinuosa conectada por curvas animadas**, ejecución en vivo con **CPython 3 / Pyodide** y el enfoque de **1 solo ejercicio por pantalla**.

---

## 🗺️ Mapa de Aventura con Nodos Circulares

1. **Nodos Circulares 3D (en lugar de óvalos)**:
   - **Completado**: Círculo 3D verde esmeralda con relieve biselado y marca de verificación blanca (`✓`).
   - **Activo**: Círculo 3D blanco y verde con halo pulsante e **insignia flotante animada** en la parte superior (idéntica a la captura de pantalla de Brilliant).
   - **Bloqueado**: Círculo 3D de piedra gris con relieve tenue.

2. **Ruta Sinuosa en Zigzag (no en línea recta)**:
   - Los nodos se distribuyen de forma dinámica alternando izquierda, centro y derecha.
   - Una **línea punteada curva animada** (`SVG bezier curve con stroke-dasharray`) conecta los centros de cada circulito a lo largo del mapa como en un videojuego de aventura.

3. **1 Solo Ejercicio/Concepto por Pantalla**:
   - Totalmente centrado, sin barras de desplazamiento vertical.
   - Opciones en pastillas horizontales compactas.
   - Explicación previa con ejemplos y mensajes de corrección inteligente en ámbar.

4. **Feedback y Pantalla de Carga Artificial**:
   - **Anuncio de Lección**: Modal animado con halo verde y detalles de los retos.
   - **Pantalla de Carga Artificial**: Spinner de doble anillo concéntrico con núcleo Python, barra de progreso animada (0% a 100%), fases en tiempo real y consejos didácticos aleatorios.
   - **Celebración de Victoria**: Confeti a pantalla completa, fanfarria auditiva, métricas y contador dinámico de XP (+50 XP).

5. **Reproductor de Código Paso a Paso (Estilo Brilliant.org)**:
   - **Terminal con borde verde esmeralda**: Muestra la salida impresa en tiempo real conforme se ejecutan las líneas.
   - **Flecha indicadora blanca (`▶`)**: Avanza línea por línea señalando la instrucción activa con iluminación de fondo (`bg-[#1e2d3d]`).
   - **Sintaxis estilizada**: Resaltado con colores idénticos a Brilliant (rosa para palabras clave, verde lima para strings, morado para números, cian para tipos).
   - **Barra de controles interactiva**: Botón `[ ▶ Ejecutar ]` (reproducción continua a 700ms/línea con pausa), `[ > ]` (paso siguiente manual), `[ < ]` (paso anterior) y `[ ↺ ]` (reiniciar).

---

## 📚 Documentación de Arquitectura y Creación de Módulos

Consulta la guía completa de desarrollo, diseño pedagógico y pipeline de horneado en:
👉 **[`GUIDELINES.md`](GUIDELINES.md)**

Contenido de la guía:
- Reglas sagradas de UX (diseño single-screen, retroalimentación diferida, terminal limpia, etc.).
- Motor híbrido (CPython 3 pre-horneado + Pyodide WebAssembly).
- Esquemas JSON de cada tipo de paso (`explanation`, `predict`, `visualizer_*`, `code_sandbox`).
- Paleta visual oficial VS Code Dark+.
- Plantilla *copy-paste* para redactar nuevas semanas y lecciones.

---

## 🤖 Despliegue en Servidor / Homeserver

Para el aprovisionamiento y despliegue automatizado en servidores locales o en la nube:
👉 **[`HANDOFF.md`](HANDOFF.md)** (Guía completa para agentes con configuraciones de Docker Compose, Caddy, Nginx, Systemd y headers WASM).

---

## 🚀 Cómo ejecutar localmente

```bash
python3 server.py
```
Abre en tu navegador:
```
http://localhost:8080
```
