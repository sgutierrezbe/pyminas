# 📋 Plantilla / Ejemplo de Referencia: Storyboard Pedagógico

Este archivo sirve como referencia modelo para que el agente redacte los storyboards de la **Fase 1** (`borrador_semana_<NUMERO>.md`).

---

## Metadatos de la Semana
- **Número:** Semana X
- **Título Oficial:** <Título de la Semana>
- **Descripción:** <Descripción concisa de 1 oración>
- **Total de Lecciones:** 6 lecciones atómicas
- **Balance Global de Opciones:** A: 25% | B: 25% | C: 25% | D: 25%

---

## Lección X.1: <Título de la Lección>
- **Tag:** <Etiqueta corta, ej. Condicionales>
- **ShortTitle:** <Título para el nodo circular, ej. El if Simple>
- **Duración:** 8 min
- **Objetivo Conceptual:** El estudiante comprende que el bloque indentado bajo un `if` solo se ejecuta si la condición lógica es `True`.

### Paso 1 (`explanation`) · El Semáforo de Ejecución
- **Metáfora:** Imagina un peaje en la autopista: si tu tarjeta tiene saldo suficiente (`True`), la barrera se levanta y pasas; si no (`False`), el auto debe esperar o tomar otro desvío. En Python, la palabra reservada `if` actúa exactamente como ese peaje.
- **Snippet de Código:**
```python
velocidad = 95
if velocidad > 80:
    print("Infracción detectada")
print("Control de tráfico finalizado")
```
- **Salida en Terminal (`sys.stdout`):**
```text
Infracción detectada
Control de tráfico finalizado
```
- **Takeaway:** La línea con indentación de 4 espacios solo se ejecuta si la condición se cumple; la línea sin indentación se ejecuta siempre al continuar el flujo del programa.

---

### Paso 2 (`predict`) · Rastreo Mental de Ramas
- **Pregunta:** ¿Qué imprimirá exactamente este código en la terminal?
- **Snippet de Código:**
```python
temperatura = 18
if temperatura < 15:
    print("Encender calefacción")
if temperatura >= 18:
    print("Temperatura confortable")
```
- **Opciones:**
  - [ ] A) `Encender calefacción`
    - *(whyIncorrect: 18 < 15 es False, por lo que el primer bloque condicional nunca se ejecuta.)*
  - [ ] B) `Encender calefacción\nTemperatura confortable`
    - *(whyIncorrect: La primera condición es falsa; Python omite por completo su bloque indentado.)*
  - [x] C) `Temperatura confortable`
    - *(CORRECTO: 18 < 15 es False y se omite; 18 >= 18 es True y su bloque imprime el mensaje.)*
  - [ ] D) *(No imprime nada)*
    - *(whyIncorrect: La segunda condición (18 >= 18) es verdadera, por lo que el print correspondiente sí se ejecuta.)*

---

### Paso 3 (`predict` / Spot the Bug) · La Trampa de Asignación
- **Pregunta:** Un estudiante escribió este código para verificar si un sensor marcó nivel de alerta, pero Python arrojó un `SyntaxError`. ¿Cuál es la causa del error?
- **Snippet de Código:**
```python
nivel_agua = 100
if nivel_agua = 100:
    print("Tanque lleno")
```
- **Opciones:**
  - [ ] A) Falta convertir `nivel_agua` a texto con `str()` antes de la comparación.
    - *(whyIncorrect: Las comparaciones numéricas son válidas en Python; el problema es el operador utilizado.)*
  - [ ] B) El número 100 no puede compararse sin antes definir una variable flotante.
    - *(whyIncorrect: Los enteros son perfectamente comparables en condiciones lógicas.)*
  - [ ] C) El nombre de variable `nivel_agua` no está permitido en Python.
    - *(whyIncorrect: nivel_agua es un identificador válido bajo la convención snake_case.)*
  - [x] D) Se utilizó el operador de asignación `=` en lugar del operador relacional de igualdad `==`.
    - *(CORRECTO: Un solo `=` asigna un valor a una variable. Para comparar igualdad dentro de un if debe usarse estrictamente `==`.)*

---

### Paso 4 (`code_sandbox`) · Práctica Guiada
- **Instrucción:** Completa la condición para que el sistema apruebe al estudiante solo si su nota definitiva es mayor o igual a 3.0:
- **Código con Ranura:**
```python
nota = 3.8
if ___:
    print("Materia aprobada")
```
- **Salida Esperada:**
```text
Materia aprobada
```
- **Opciones de Ranura:**
  - [x] A) `nota >= 3.0`
    - *(CORRECTO: Evalúa como True porque 3.8 >= 3.0, ejecutando el print de aprobación.)*
  - [ ] B) `nota = 3.0`
    - *(whyIncorrect: Un solo signo '=' es una asignación, lo cual genera un error de sintaxis dentro de un if.)*
  - [ ] C) `nota < 3.0`
    - *(whyIncorrect: 3.8 < 3.0 es False, por lo que no se imprimiría ningún mensaje y la prueba fallaría.)*
  - [ ] D) `nota == 3.0`
    - *(whyIncorrect: La nota es 3.8, por lo que la igualdad estricta a 3.0 daría False y no imprimiría.)*

---

### Paso 5 (`predict`) · Caso Borde / Evaluación
- **Pregunta:** ¿Cuál será la salida de este código donde la indentación está ausente en la segunda acción?
- **Snippet de Código:**
```python
saldo = 50
if saldo < 0:
    print("Cuenta en sobregiro")
print("Proceso bancario exitoso")
```
- **Opciones:**
  - [ ] A) `Cuenta en sobregiro\nProceso bancario exitoso`
    - *(whyIncorrect: La condición 50 < 0 es False, por lo que la línea indentada no se ejecuta.)*
  - [x] B) `Proceso bancario exitoso`
    - *(CORRECTO: Solo la primera línea pertenece al if. La segunda está en la columna 0 y se ejecuta incondicionalmente.)*
  - [ ] C) *(Error de indentación: IndentationError)*
    - *(whyIncorrect: La indentación es sintácticamente correcta; el segundo print está fuera del bloque.)*
  - [ ] D) *(No imprime nada)*
    - *(whyIncorrect: La línea 'Proceso bancario exitoso' no depende del if y siempre se procesa.)*
