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
   - **Panel de memoria**: Muestra las variables, sus tipos y sus valores actuales; resalta visualmente cada cambio durante ciclos, contadores y acumuladores.
   - **Flecha indicadora blanca (`▶`)**: Avanza línea por línea señalando la instrucción activa con iluminación de fondo (`bg-[#1e2d3d]`).
   - **Sintaxis estilizada**: Resaltado con colores idénticos a Brilliant (rosa para palabras clave, verde lima para strings, morado para números, cian para tipos).
   - **Barra de controles interactiva**: Botón `[ ▶ Ejecutar ]` (reproducción continua a 700ms/línea con pausa), `[ > ]` (paso siguiente manual), `[ < ]` (paso anterior) y `[ ↺ ]` (reiniciar).

---

## 📚 Documentación de Arquitectura y Creación de Módulos

Consulta la guía completa de desarrollo, diseño pedagógico y pipeline de horneado en:
👉 **[`docs/desarrollo/GUIDELINES.md`](docs/desarrollo/GUIDELINES.md)**

Contenido de la guía:
- Reglas sagradas de UX (diseño single-screen, retroalimentación diferida, terminal limpia, etc.).
- Motor híbrido (CPython 3 pre-horneado + Pyodide WebAssembly).
- Esquemas JSON de cada tipo de paso (`explanation`, `predict`, `visualizer_*`, `code_sandbox`).
- Paleta visual oficial VS Code Dark+.
- Plantilla *copy-paste* para redactar nuevas semanas y lecciones.

---

La guía práctica para crear semanas nuevas está en
[`docs/desarrollo/CREATING_EXERCISES.md`](docs/desarrollo/CREATING_EXERCISES.md),
y las referencias docentes se encuentran en [`docs/referencias/`](docs/referencias/).

## 🗂️ Organización del repositorio

```text
Programacion/
├── index.html, app.js, styles.css       # Aplicación web
├── curriculum.js, baked_traces.js       # Contenido y trazas ejecutables
├── server.py                            # Servidor local y API
├── assets/                              # Imágenes e identidad visual
├── data/                                # Base SQLite local (ignorada por Git)
├── materiales/semana-XX/                # Notebooks y storyboards por semana
├── scripts/                             # Ingesta, verificación y horneado
├── tests/                               # Pruebas en navegador
├── docs/                                # Guías y referencias vigentes
└── archivo/                             # Material histórico; no usar en producción
```

## 🗄️ Despliegue histórico

La antigua guía de homeserver se conserva en
[`archivo/HANDOFF.md`](archivo/HANDOFF.md). Es una referencia histórica y puede no
reflejar la arquitectura actual.

---

## 🚀 Cómo ejecutar localmente

La raíz de pyMinas es esta carpeta del repositorio. Reúne el código de la plataforma para estudiantes y los materiales pedagógicos; el proyecto personal de Introducción a la IA permanece separado.

Desde esta carpeta:

```bash
python3 server.py
```

Abre en tu navegador:

```
http://localhost:8080
```

Verifica el currículo desde la raíz con:

```bash
python3 -B scripts/verify_curriculum.py
```

La suite web está disponible, con el servidor activo, en:

```text
http://localhost:8080/tests/test_runner.html
```
