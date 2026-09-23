---
name: disenar-semana-storyboard
description: >-
  Diseña y formula el storyboard pedagógico en Markdown (Fase 1) para una nueva semana de Fundamentos de Programación en pyMinas. Atomiza los temas en 5-6 lecciones con 4-6 micropasos táctiles estilo Brilliant y balancea las opciones de respuesta al 25%.
---

# Habilidad: Diseñar Semana Storyboard (Fase 1)

Usa esta habilidad cada vez que el usuario te proporcione las temáticas generales de una semana, un cuaderno de notas `.ipynb`, o una lista de objetivos de aprendizaje para la plataforma **pyMinas**.

> [!IMPORTANT]
> **REGLA DE ORO DE LA FASE 1:**
> En esta habilidad **ESTÁ TERMINANTEMENTE PROHIBIDO modificar `curriculum.js` o escribir código en la plataforma**.
> Tu único entregable es el archivo de guion pedagógico en Markdown: `borrador_semana_<NUMERO>.md`.

---

## Flujo de Ejecución Paso a Paso

### 1. Descomposición Conceptual (1 Concepto = 1 Nivel)
Divide los temas de la semana en **5 a 6 lecciones atómicas**. Cada lección debe enfocarse en un solo aspecto del concepto general:

*Ejemplo para Condicionales (Semana 2):*
- Lección 1: Operadores relacionales (`>`, `<`, `==`, `!=`)
- Lección 2: Operadores lógicos (`and`, `or`, `not`)
- Lección 3: La regla de indentación y estructura del `if` simple
- Lección 4: Bifurcaciones mutuamente excluyentes (`if` - `else`)
- Lección 5: Condiciones encadenadas (`if` - `elif` - `else`)
- Lección 6: Reto integrador / Casos borde con condicionales anidados

### 2. Estructura Canónica de Cada Lección (4 a 6 Micropasos)
Cada lección dentro del archivo `borrador_semana_<NUMERO>.md` debe seguir la progresión de los 4 arquetipos:

1. **Paso 1: Demostración Activa con Metáfora (`explanation`)**
   - **Metáfora visual:** Una analogía intuitiva cotidiana (máx. 2 oraciones).
   - **Snippet de código:** 3 a 6 líneas, columna 0, siempre con `print()`.
   - **Terminal:** Salida exacta que produce Python (limpia, sin comillas artificiales).
   - **Takeaway:** Frase concisa para fijar el concepto.

2. **Paso 2: Trazado Mental (`predict`)**
   - Pregunta de inferencia: "¿Qué imprimirá este programa?" o "¿Cuál es el valor final de la variable?".
   - Código de 3 a 5 líneas con reasignaciones o ramas.
   - 3 o 4 opciones de respuesta con retroalimentación diagnóstica individual.

3. **Paso 3: Detección de Errores / Spot the Bug (`predict`)**
   - Pregunta: "¿Por qué este código no produce el resultado esperado?" o "¿Dónde está el error de sintaxis?".
   - Presenta un error clásico cometido por estudiantes de la UNAL (ej. `=` en lugar de `==`, concatenar int con str, omisión de `:`).
   - Opciones con diagnósticos claros de la causa del fallo.

4. **Paso 4: Práctica Guiada Interactiva (`code_sandbox`)**
   - Instrucción concreta (máximo 1 línea).
   - Código con **una única ranura** `___`.
   - 3 a 4 opciones de código para rellenar la ranura.

5. **Paso 5: Reto Analítico de Caso Borde (`predict`)**
   - Pregunta sobre un comportamiento contra-intuitivo o límite (ej. precedencia de operadores, cortocircuito booleano, indentación mixta).

---

## 3. Requisitos Críticos de Calidad (No Negociables)

### A. Balance Estricto de Respuestas Correctas (~25% cada una)
* Para evitar que el estudiante deduzca patrones (como que siempre la primera opción es la correcta), debes distribuir la opción correcta de forma balanceada a lo largo de los ejercicios de la semana:
  - **Opción A:** ~25% de los pasos interactivos.
  - **Opción B:** ~25% de los pasos interactivos.
  - **Opción C:** ~25% de los pasos interactivos.
  - **Opción D:** ~25% de los pasos interactivos.
* **Nunca coloques la respuesta correcta en la misma posición dos veces seguidas.**

### B. Retroalimentación Diagnóstica (`whyIncorrect`)
* Toda opción incorrecta DEBE tener un mensaje explicativo de mínimo 20 caracteres.
* **Prohibido:** mensajes genéricos como `"Incorrecto"`, `"Opción equivocada"` o `"Revisa de nuevo"`.
* **Obligatorio:** explicar *por qué* ese distractor es falso según el modelo mental erróneo del alumno:
  - *Ejemplo bueno:* `"Python no convierte números automáticamente a texto al usar '+'. Necesitas usar str(edad) o una f-string."`

### C. Regla de los 15 Segundos y 0 Scroll
* Enunciados de máximo 2 oraciones.
* Fragmentos de código de 3 a 7 líneas como máximo.
* Todo el contenido debe caber en una pantalla sin scroll vertical.

---

## 4. Formato del Entregable: `borrador_semana_<NUMERO>.md`

El archivo debe crearse en la raíz del proyecto con la siguiente estructura clara:

```markdown
# 📋 Storyboard Pedagógico: Semana <NUMERO> - <TITULO>

## Resumen de la Semana
- **Número:** <N>
- **Título:** <Título Completo>
- **Distribución de Respuestas Correctas:** A: <count>, B: <count>, C: <count>, D: <count>

---

## Lección <N>.1: <Título de la Lección>
- **Tag:** <Categoría corta>
- **Duración estimada:** 8 min
- **Objetivo clave:** <1 oración>

### Paso 1 (explanation): <Título del paso>
- **Metáfora / Explicación:** ...
- **Código:**
```python
...
```
- **Salida esperada:** ...
- **Takeaway:** ...

### Paso 2 (predict): <Título del paso>
- **Pregunta:** ...
- **Código:**
```python
...
```
- **Opciones:**
  - [ ] A) `<texto>` -> (Incorrecto: <whyIncorrect>)
  - [x] B) `<texto>` -> (CORRECTO: <explicación>)
  - [ ] C) `<texto>` -> (Incorrecto: <whyIncorrect>)
  - [ ] D) `<texto>` -> (Incorrecto: <whyIncorrect>)

### Paso 3 (predict - Spot the Bug): ...
...

### Paso 4 (code_sandbox): ...
- **Instrucción:** ...
- **Código con ranura:**
```python
x = 10
if ___:
    print("Válido")
```
- **Opciones de ranura:**
  - [ ] A) `x = 10` -> (Incorrecto: <whyIncorrect>)
  - [x] B) `x == 10` -> (CORRECTO)
  - [ ] C) `x < 5` -> (Incorrecto: <whyIncorrect>)
  - [ ] D) `x === 10` -> (Incorrecto: <whyIncorrect>)

---
```

---

## 5. Cierre y Espera de Aprobación
Al terminar de redactar el archivo Markdown:
1. Notifica al docente que el storyboard está completo con el conteo de balance de opciones (A/B/C/D).
2. Pídele su retroalimentación o aprobación explícita.
3. **Detén la ejecución. NO procedas a programar hasta que el usuario diga "Aprobado" o "Procede a programar".**
