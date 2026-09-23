---
name: auditar-pedagogia-brilliant
description: >-
  Audita un módulo o lección (en borrador Markdown o en curriculum.js) para verificar el cumplimiento estricto del estándar pedagógico Brilliant de pyMinas: balance de opciones (~25%), calidad de distractores, regla de los 15s y pureza de consola.
---

# Habilidad: Auditar Pedagogía Brilliant en pyMinas

Usa esta habilidad para revisar con lupa crítica cualquier lección, storyboard o código existente en **pyMinas** antes de darlo por definitivo.

---

## 🔍 Matriz de Auditoría (Los 5 Puntos de Control)

| # | Criterio de Control | Umbral de Aceptación | Estado Crítico |
|---|---------------------|----------------------|----------------|
| 1 | **Balance de Opciones** | Cada letra (A, B, C, D) entre **20% y 30%** del total. | ❌ Si alguna opción supera el 35% o la misma letra se repite 3 veces seguidas. |
| 2 | **Feedback Diagnóstico** | 100% de distractores con `whyIncorrect` $\ge$ 20 caracteres. | ❌ Si contiene "Incorrecto", "Falso" o explicaciones vacías. |
| 3 | **Regla de los 15 Segundos** | Enunciados $\le$ 3 líneas. Snippets $\le$ 7 líneas de código. | ❌ Párrafos de teoría extensos o scroll vertical necesario. |
| 4 | **Indentación Cero** | Columna 0 estricta en línea 1 de todo bloque. 4 espacios en bloques hijos. | ❌ Espacios iniciales parásitos o `IndentationError`. |
| 5 | **Salida de Terminal Pura** | Salida idéntica a `sys.stdout` de CPython. Sin comillas artificiales. | ❌ Terminal vacía tras ejecución o comillas en strings impresos. |

---

## Procedimiento de Auditoría Paso a Paso

### 1. Auditoría del Balance de Opciones (Anti-Bias Check)
Cuenta el total de preguntas interactivas (`predict` y `code_sandbox`) y calcula el porcentaje de aciertos por posición:

```text
Total de pasos con opciones: N
- Opción A: X (X/N %)
- Opción B: Y (Y/N %)
- Opción C: Z (Z/N %)
- Opción D: W (W/N %)
```

> [!WARNING]
> Si la Opción A supera el 35%, **el agente debe reordenar determinísticamente las opciones** intercambiando las letras para devolver el balance a ~25%.

### 2. Auditoría de Retroalimentación de Distractores
Revisa cada una de las opciones donde `isCorrect: false`:
- ¿El mensaje explica el *porqué* del error conceptual del alumno?
- ¿Permite al alumno aprender de su error en lugar de solo frustrarse?

### 3. Auditoría de Indentación y Ejecución de Código
Si se está auditando código JavaScript o Markdown:
1. Extrae cada snippet.
2. Comprueba que no comience con espacios en la línea 1.
3. Para pasos `code_sandbox`, sustituye la ranura `___` con la opción correcta y ejecuta el código en Python:
   - ¿Ejecuta sin errores?
   - ¿La salida impresa coincide exactamente con `expectedOutput`?

### 4. Auditoría de UX / 0-Scroll
- ¿El contenido del paso cabe holgadamente en una pantalla de laptop (1280x800)?
- ¿Los botones de opción son pastillas compactas?
- ¿Hay un solo concepto evaluado a la vez?

---

## Formato del Reporte de Auditoría

Cuando ejecutes esta auditoría, entrega al docente un reporte estructurado:

```markdown
### 🛡️ Reporte de Auditoría Pedagógica: Semana <N>

1. **Balance de Opciones:**
   - A: 24% | B: 26% | C: 25% | D: 25% -> ✅ APROBADO
2. **Diagnóstico de Distractores:**
   - 24/24 distractores con explicación conceptual profunda -> ✅ APROBADO
3. **Regla de los 15s y Concisión:**
   - Promedio de líneas de código: 4.2 líneas -> ✅ APROBADO
4. **Indentación y Salida CPython:**
   - 0 errores de indentación. Salidas de consola sincronizadas con stdout -> ✅ APROBADO

**Dictamen Final:** [APROBADO PARA DESPLIEGUE / REQUIERE AJUSTES ANTES DE PROCEDER]
```
