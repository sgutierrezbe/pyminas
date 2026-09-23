# 📋 Storyboard Pedagógico: Semana 3 — Ciclos y Repetición (FOR, WHILE, Range, Break y Continue)
Facultad de Minas · Universidad Nacional de Colombia - Sede Medellín  
*Materia: Fundamentos de Programación (Python 3) — pyMinas*  
*Cuaderno de referencia: `Clase03_E.ipynb`*

---

## 🧭 Resumen y Arquitectura Curricular

- **Semana:** 3
- **Título:** Semana 3: Ciclos y Repetición
- **Enfoque Pedagógico:** Comprensión intuitiva y progresiva de las estructuras repetitivas en Python: variables acumuladoras vs contadoras, iteración con `for` sobre colecciones y cadenas, generación dinámica de números con `range()`, bucles condicionales `while` con prevención de bucles infinitos, alteración de flujo con `break`/`continue` y patrones de centinela.
- **Formato por Lección:** 7 micropasos atómicos, interactivos y graduales (dentro del estándar de 6 a 10 pantallas), respetando la regla de los 15 segundos y snippets de 3 a 7 líneas.
- **Prácticas Guiadas (`code_sandbox`):** Ejercicios con **múltiples ranuras a completar (`___`)** para consolidar la integración de conceptos.
- **Total de Retos Interactivos:** 30 preguntas
- **Distribución de Opciones Correctas:**
  - **Opción A:** 7 (23.3%)
  - **Opción B:** 8 (26.7%)
  - **Opción C:** 7 (23.3%)
  - **Opción D:** 8 (26.7%)
  *(Distribución estrictamente balanceada ~25% cada una, sin ninguna respuesta repetida de forma consecutiva).*

---

## 🗺️ Malla de las 6 Lecciones de la Semana 3

| Lección | ID | Título Didáctico | Conceptos Clave |
| :--- | :--- | :--- | :--- |
| **3.1** | `w3-l1` | **¿Por qué iterar? Recorrido de secuencias con FOR** | Concepto de ciclo, repetición automática y recorrido de elementos en secuencias iterables (listas y cadenas). |
| **3.2** | `w3-l2` | **Memoria en Ciclos: Contadores y Acumuladores** | Variables externas al ciclo para llevar la cuenta (`+= 1`) y acumular sumatorias (`+= valor`), y cálculo de promedios. |
| **3.3** | `w3-l3` | **Generación de Secuencias con range()** | Rango `range(stop)`, `range(start, stop)` y `range(start, stop, step)` con saltos y cuenta regresiva. Límite superior abierto. |
| **3.4** | `w3-l4` | **El Ciclo WHILE y Bucles Infinitos** | Repetición condicional: inicialización, condición de guardia y actualización. Prevención de ciclos infinitos. |
| **3.5** | `w3-l5` | **Control de Flujo: break y continue** | Interrupción abrupta con `break` vs salto de iteración con `continue`. Trampa del bucle infinito en `while`. |
| **3.6** | `w3-l6` | **Reto Integrador: Centinelas y Validación** | Bucle con centinela (`valor != -1`), validación interactiva, cálculo de máximos y prevención de `ZeroDivisionError`. |

---

## 📝 Lección 3.1: ¿Por qué iterar? Recorrido de secuencias con FOR (`w3-l1`)
*Objetivo:* Comprender el concepto de ciclo repetitivo y el funcionamiento del ciclo `for` como explorador automático de secuencias iterables (listas y cadenas de texto), variable iteradora y filtros con `if`.

### Paso 1 (`explanation`) · La cinta transportadora de elementos
- **Metáfora:** En una planta de fundición, una cinta transportadora acerca lingotes de diferentes metales uno detrás de otro. En vez de escribir una orden para cada lingote a mano, el ciclo `for` toma automáticamente cada elemento de principio a fin.
- **Código:**
```python
minerales = ["oro", "plata", "cobre"]
for mineral in minerales:
    print(f"Muestra: {mineral}")
```
- **Terminal:**
```text
Muestra: oro
Muestra: plata
Muestra: cobre
```
- **Takeaway:** La sintaxis `for variable in coleccion:` extrae secuencialmente cada elemento de la colección de principio a fin, ejecutando su bloque indentado una vez por cada elemento.

---

### Paso 2 (`predict`) · Recorrido de una cadena de texto
- **Pregunta:** Las cadenas de texto (`str`) también son secuencias de caracteres iterables. ¿Qué imprimirá este programa en la terminal?
- **Código:**
```python
palabra = "MINAS"
salida = ""
for letra in palabra:
    salida += letra + "-"
print(salida)
```
- **Opciones:**
  - [ ] A) `MINAS-`
    - *whyIncorrect:* "El ciclo no toma la palabra completa de golpe; itera letra por letra añadiendo un guión a cada una."
  - [ ] B) `-M-I-N-A-S`
    - *whyIncorrect:* "El guión se concatena después de cada letra (`letra + '-'`), no antes."
  - [ ] C) `M I N A S`
    - *whyIncorrect:* "El programa concatena guiones medios '-', no espacios en blanco."
  - [x] D) `M-I-N-A-S-` *(Correcta)*
- **Feedback Explicativo:** "¡Correcto! En cada vuelta, `letra` toma un caracter de 'MINAS' y le anexa un guión al final de la variable `salida`."

---

### Paso 3 (`predict`) · Spot the Bug: El intento de iterar sobre un entero
- **Pregunta:** Un estudiante intenta recorrer la cantidad de alumnos matriculados con el siguiente código, pero Python arroja: `TypeError: 'int' object is not iterable`. ¿A qué se debe este error?
- **Código:**
```python
alumnos = 35
for i in alumnos:
    print(f"Alumno {i}")
```
- **Opciones:**
  - [x] A) Los números enteros son escalares atómicos individuales, no secuencias iterables de elementos. *(Correcta)*
  - [ ] B) La variable `i` solo puede utilizarse para recorrer palabras y no variables numéricas.
    - *whyIncorrect:* "'i' es solo un nombre de variable arbitrario; puede recibir cualquier tipo de dato si la colección es iterable."
  - [ ] C) Falta envolver el número 35 entre comillas dobles para que Python pueda iterarlo.
    - *whyIncorrect:* "Poner '35' iteraría sobre los caracteres '3' y '5' (2 vueltas), lo cual no es la lista de 35 alumnos buscada."
  - [ ] D) La palabra clave `for` está obsoleta en Python 3 para números enteros.
    - *whyIncorrect:* "'for' es una palabra clave vigente y central; para generar una secuencia numérica se debe usar 'range()'."
- **Feedback Explicativo:** "¡Exacto! Los tipos primitivos `int` y `float` no son iterables. Para iterar 35 veces numéricamente se debe usar la función `range(alumnos)`."

---

### Paso 4 (`explanation`) · Filtrando elementos con condicionales
- **Metáfora:** En una subestación eléctrica, un sensor monitorea voltajes. Podemos colocar un condicional `if` dentro del `for` para alertar únicamente sobre las lecturas que superen el límite seguro.
- **Código:**
```python
voltajes = [110, 240, 115, 440]
for v in voltajes:
    if v > 200:
        print(f"Alerta: {v}V")
```
- **Terminal:**
```text
Alerta: 240V
Alerta: 440V
```
- **Takeaway:** Puedes anidar estructuras `if` dentro de un ciclo `for` para filtrar, clasificar o procesar selectivamente elementos específicos.

---

### Paso 5 (`predict`) · Trazado con condicional
- **Pregunta:** Sigue mentalmente el recorrido de la lista. ¿Qué números imprimirá en consola este ciclo?
- **Código:**
```python
numeros = [4, 15, 8, 23]
for n in numeros:
    if n > 10:
        print(n)
```
- **Opciones:**
  - [ ] A) `4`\n`8`
    - *whyIncorrect:* "4 y 8 no cumplen n > 10; la condición resulta False y el print se omite."
  - [ ] B) `4`\n`15`\n`8`\n`23`
    - *whyIncorrect:* "Imprimiste toda la lista; el condicional 'if n > 10' descarta los números menores o iguales a 10."
  - [x] C) `15`\n`23` *(Correcta)*
  - [ ] D) `23`
    - *whyIncorrect:* "15 también es estrictamente mayor a 10 (15 > 10 es True), por lo que también se imprime."
- **Feedback Explicativo:** "¡Muy bien analizado! El condicional `n > 10` solo deja pasar a 15 y 23; los demás se descartan."

---

### Paso 6 (`code_sandbox`) · Práctica guiada con ranuras múltiples: Control de calidad de mineral
- **Instrucción:** Completa las dos ranuras para estructurar el ciclo `for` que inspecciona la lista de `muestras`:
- **Código inicial:**
```python
muestras = ["hierro", "cuarzo", "oro"]
___ mineral ___ muestras:
    print("Muestra:", mineral)
```
- **Salida esperada:**
```text
Muestra: hierro
Muestra: cuarzo
Muestra: oro
```
- **Opciones de slots:**
  - [ ] A) `["while", "=="]`
    - *whyIncorrect:* "'while' evalúa una condición booleana, no una relación de pertenencia sobre una lista."
  - [x] B) `["for", "in"]` *(Correcta)*
  - [ ] C) `["for", "=="]`
    - *whyIncorrect:* "El operador '==' compara igualdad de valores; para iterar sobre una colección se utiliza la palabra 'in'."
  - [ ] D) `["if", "in"]`
    - *whyIncorrect:* "'if mineral in muestras' evaluaría una sola vez la condición sin generar ninguna repetición cíclica."
- **Feedback Explicativo:** "¡Excelente! La construcción canónica en Python para iterar colecciones es `for <elemento> in <coleccion>:`."

---

### Paso 7 (`predict`) · Caso Borde: Estado de la variable tras terminar el ciclo
- **Pregunta:** ¿Qué ocurre con la variable `item` cuando el ciclo `for` termina de iterar sobre todos los elementos?
- **Código:**
```python
for item in ["arcilla", "grava", "cuarzo"]:
    pass
print("Último item:", item)
```
- **Opciones:**
  - [ ] A) Causa un error `NameError` porque las variables de ciclo se eliminan al salir.
    - *whyIncorrect:* "En Python, a diferencia de lenguajes como C++ o Java, la variable del ciclo no tiene un ámbito local aislado."
  - [ ] B) Se reinicia al valor inicial de la lista (`"arcilla"`).
    - *whyIncorrect:* "La variable no se rebobina al finalizar; conserva la última asignación que recibió."
  - [ ] C) Su valor pasa a ser `None`.
    - *whyIncorrect:* "Python no limpia la variable asignándole None; mantiene en memoria su último contenido asignado."
  - [x] D) Conserva en memoria el último valor que procesó (`"cuarzo"`). *(Correcta)*
- **Feedback Explicativo:** "¡Gran observación! En Python, la variable del ciclo permanece viva en el ámbito actual con el último elemento que tomó de la secuencia."

---

## 📝 Lección 3.2: Memoria en Ciclos: Contadores y Acumuladores (`w3-l2`)
*Objetivo:* Dominar las dos variables de memoria cíclica esenciales de la programación dentro de un ciclo: el contador (incremento constante `+= 1`) y el acumulador (suma de montos variables `+= valor`), y el cálculo de promedios.

### Paso 1 (`explanation`) · El torniquete y la alcancía en acción
- **Metáfora:** Un ciclo `for` repite código, pero sus variables internas cambian en cada vuelta. Para retener información a lo largo de las iteraciones, creamos variables **ANTES** del ciclo: un torniquete de metro (contador) suma de 1 en 1, y una alcancía (acumulador) va agregando montos variables al total.
- **Código:**
```python
pasajeros = 0
recaudo = 0
tarifas = [3200, 3200, 3200]
for tarifa in tarifas:
    pasajeros += 1
    recaudo += tarifa
print(f"Total personas: {pasajeros}")
print(f"Total dinero: ${recaudo}")
```
- **Terminal:**
```text
Total personas: 3
Total dinero: $9600
```
- **Takeaway:** Las variables acumuladoras y contadoras deben crearse **ANTES** del ciclo. Un contador suma un incremento constante (`+= 1`); un acumulador suma valores variables (`+= valor`).

---

### Paso 2 (`predict`) · Conteo en la línea de ensamble
- **Pregunta:** ¿Qué número imprimirá Python en la consola al finalizar este ciclo?
- **Código:**
```python
piezas = 0
lotes = [1, 1, 2]
for n in lotes:
    piezas += n
print(piezas)
```
- **Opciones:**
  - [ ] A) `3`
    - *whyIncorrect:* "Sumaste la cantidad de vueltas del ciclo en vez de los valores reales acumulados de cada lote (1 + 1 + 2)."
  - [x] B) `4` *(Correcta)*
  - [ ] C) `2`
    - *whyIncorrect:* "Solo tomaste el último lote de 2, olvidando que los anteriores ya habían acumulado 2 piezas."
  - [ ] D) `5`
    - *whyIncorrect:* "Calculaste un incremento de más; las sumas son 0 + 1 + 1 + 2 = 4."
- **Feedback Explicativo:** "¡Correcto! La variable `piezas` arranca en 0 fuera del ciclo y acumula cada lote: 0 -> 1 -> 2 -> 4."

---

### Paso 3 (`predict`) · Spot the Bug: El acumulador que no retiene
- **Pregunta:** Queríamos calcular el total de tres gastos ($15.000, $22.000 y $8.000), pero el programa imprime `Total: 8000` en vez de `45000`. ¿Cuál es la causa exacta del error?
- **Código:**
```python
total = 0
for gasto in [15000, 22000, 8000]:
    total = 0
    total += gasto
print("Total:", total)
```
- **Opciones:**
  - [ ] A) El operador `+=` no funciona con números enteros dentro de un ciclo.
    - *whyIncorrect:* "El operador '+=' funciona perfectamente con números enteros en cualquier parte del código."
  - [ ] B) Falta convertir `total` con la función `int()` antes de imprimirlo en terminal.
    - *whyIncorrect:* "La variable ya es un número entero; no requiere ninguna conversión de tipo de dato."
  - [ ] C) La variable `gasto` no puede recibir valores de una lista de corchetes.
    - *whyIncorrect:* "El ciclo for recorre la lista correctamente asignando cada elemento a la variable 'gasto'."
  - [x] D) La línea `total = 0` está dentro del ciclo, reinicializando la suma en cada vuelta y borrando lo acumulado. *(Correcta)*
- **Feedback Explicativo:** "¡Exacto! Los acumuladores y contadores SIEMPRE deben inicializarse en 0 ANTES de que comience el ciclo; de lo contrario, se resetean en cada iteración."

---

### Paso 4 (`explanation`) · El cálculo del promedio
- **Metáfora:** Para calcular el promedio de una serie de datos recolectados, combinamos los dos conceptos: la suma acumulada dividida entre el número de elementos contados al terminar el ciclo.
- **Código:**
```python
suma_notas = 0
cantidad = 0
notas = [4.2, 3.8, 4.6]
for nota in notas:
    suma_notas += nota
    cantidad += 1
promedio = suma_notas / cantidad
print(f"Promedio: {promedio:.1f}")
```
- **Terminal:**
```text
Promedio: 4.2
```
- **Takeaway:** La fórmula estadística fundamental en programación es: `promedio = acumulador / contador`. Ambos deben completarse antes de realizar la división.

---

### Paso 5 (`predict`) · Trazado de promedio con condicional
- **Pregunta:** Sigue mentalmente los valores de `total` y `aprobados`. ¿Qué valores imprime exactamente Python al final?
- **Código:**
```python
notas = [4.0, 2.5, 3.5]
total = 0
aprobados = 0
for n in notas:
    if n >= 3.0:
        total += n
        aprobados += 1
print(aprobados, total)
```
- **Opciones:**
  - [x] A) `2 7.5` *(Correcta)*
  - [ ] B) `3 10.0`
    - *whyIncorrect:* "Sumaste todas las notas incluyendo la reprobada (2.5); el condicional 'if n >= 3.0' solo acumula 4.0 y 3.5."
  - [ ] C) `2 10.0`
    - *whyIncorrect:* "Contaste bien los aprobados (2), pero sumaste también la nota de 2.5 que no debió acumularse."
  - [ ] D) `1 4.0`
    - *whyIncorrect:* "Olvidaste que 3.5 también cumple n >= 3.0 (3.5 >= 3.0 es True), por lo que son 2 aprobados."
- **Feedback Explicativo:** "¡Impecable! Solo 4.0 y 3.5 cumplen la condición: se cuentan 2 materias y se acumulan 7.5 puntos."

---

### Paso 6 (`code_sandbox`) · Práctica guiada con ranuras múltiples: Caja de peaje
- **Instrucción:** Completa las dos ranuras con el operador adecuado para que `vehiculos` cuente de 1 en 1 y `recaudo` acumule las tarifas cobradas en cada iteración del ciclo:
- **Código inicial:**
```python
vehiculos = 0
recaudo = 0
tarifas = [12000, 18000]
for tarifa in tarifas:
    vehiculos ___ 1
    recaudo ___ tarifa
print(vehiculos, recaudo)
```
- **Salida esperada:**
```text
2 30000
```
- **Opciones de slots:**
  - [ ] A) `["=", "="]`
    - *whyIncorrect:* "El operador '=' sobreescribe las variables en vez de acumular; dejaría vehiculos=1 y recaudo=18000."
  - [ ] B) `["+=", "="]`
    - *whyIncorrect:* "Al usar '=' en recaudo, se borran los 12000 anteriores y solo sobrevive la última tarifa de 18000."
  - [x] C) `["+=", "+="]` *(Correcta)*
  - [ ] D) `["=", "+="]`
    - *whyIncorrect:* "Al usar '=' en vehiculos, el contador se reinicia a 1 en lugar de avanzar al segundo auto (2)."
- **Feedback Explicativo:** "¡Excelente trabajo! Ambos requieren `+=` para que el nuevo valor se agregue a la memoria acumulada previa."

---

### Paso 7 (`predict`) · Caso Borde: El peaje vacío y la división por cero
- **Pregunta:** Si una estación de peaje no registró ningún vehículo (`contador = 0`), ¿por qué es indispensable proteger el cálculo del promedio con un condicional?
- **Código:**
```python
contador = 0
acumulador = 0
for v in []:
    contador += 1
    acumulador += v
if contador > 0:
    promedio = acumulador / contador
    print("Promedio:", promedio)
else:
    print("Sin registros")
```
- **Opciones:**
  - [ ] A) Porque Python no permite que una variable valga 0 al terminar el programa.
    - *whyIncorrect:* "Las variables numéricas pueden valer 0 sin ningún inconveniente en Python."
  - [x] B) Porque dividir entre cero causaría un colapso fatal con `ZeroDivisionError`. *(Correcta)*
  - [ ] C) Porque la función `print()` falla si se le pasa una variable que almacena 0.
    - *whyIncorrect:* "print() puede imprimir el número 0 perfectamente; el problema es la operación matemática de división."
  - [ ] D) Porque las variables no inicializadas se borran automáticamente de la memoria.
    - *whyIncorrect:* "Las variables sí fueron inicializadas en 0 y permanecen vivas en el ámbito del script."
- **Feedback Explicativo:** "¡Exacto! Siempre que calcules un promedio a partir de un contador, debes verificar que `contador > 0` para evitar el temido `ZeroDivisionError`."

---

## 📝 Lección 3.3: Generación de Secuencias con range() (`w3-l3`)
*Objetivo:* Dominar el generador `range()` en sus 3 formas: `range(stop)`, `range(start, stop)` y `range(start, stop, step)` con saltos positivos y cuentas regresivas.

### Paso 1 (`explanation`) · El odómetro numérico y el límite superior abierto
- **Metáfora:** Un cortador láser corta varillas de acero marcadas del centímetro 1 al 4. Al indicarle `range(1, 4)`, el láser se detiene en seco justo antes del 4. En Python, **el valor final nunca se incluye**.
- **Código:**
```python
for i in range(1, 4):
    print(f"Piso {i}")
```
- **Terminal:**
```text
Piso 1
Piso 2
Piso 3
```
- **Takeaway:** ¡Regla sagrada! `range(inicio, fin)` arranca en `inicio` y llega exactamente hasta `fin - 1`. Si quieres incluir el 4, debes especificar `range(1, 5)`.

---

### Paso 2 (`predict`) · Trazado del límite con range(n)
- **Pregunta:** Cuando pasas un solo argumento a `range(4)`, Python asume que empieza en 0. ¿Qué número imprimirá este script?
- **Código:**
```python
conteo = 0
for k in range(4):
    conteo += k
print(conteo)
```
- **Opciones:**
  - [x] A) `6` *(Correcta)*
  - [ ] B) `10`
    - *whyIncorrect:* "Sumaste 0 + 1 + 2 + 3 + 4 = 10, pero range(4) se detiene en 3 y nunca llega al 4."
  - [ ] C) `4`
    - *whyIncorrect:* "4 es el valor del parámetro stop, no la suma de los valores producidos (0 + 1 + 2 + 3)."
  - [ ] D) `3`
    - *whyIncorrect:* "3 es el último valor individual que toma 'k', pero la variable 'conteo' los va sumando todos acumulativamente."
- **Feedback Explicativo:** "¡Correcto! `range(4)` genera los valores `0, 1, 2, 3`. La suma es `0 + 1 + 2 + 3 = 6`."

---

### Paso 3 (`predict`) · Spot the Bug: El rango vacío inesperado
- **Pregunta:** Queremos imprimir una cuenta regresiva para el lanzamiento de un cohete: 5, 4, 3, 2, 1. Pero al ejecutar el programa, solo imprime `"¡Despegue!"` sin mostrar ningún número. ¿Por qué?
- **Código:**
```python
for s in range(5, 1):
    print(s)
print("¡Despegue!")
```
- **Opciones:**
  - [ ] A) La función `range()` solo admite un único argumento numérico y falla con dos.
    - *whyIncorrect:* "range() acepta perfectamente 1, 2 o 3 argumentos enteros."
  - [ ] B) Las variables de una sola letra como `s` no son válidas en ciclos numéricos.
    - *whyIncorrect:* "Cualquier identificador válido en Python puede ser usado como variable de ciclo."
  - [x] C) Con el paso por defecto (+1), un inicio mayor que el final genera un rango vacío (0 vueltas). *(Correcta)*
  - [ ] D) Python requiere que los rangos hacia atrás se escriban dentro de una lista con corchetes.
    - *whyIncorrect:* "No requiere listas; simplemente necesita el tercer parámetro de paso negativo: `range(5, 0, -1)`."
- **Feedback Explicativo:** "¡Exacto! El paso por defecto de `range` es `+1`. Si el inicio (5) es mayor que el fin (1), Python concluye que ya se rebasó el límite y produce una secuencia vacía."

---

### Paso 4 (`explanation`) · El tercer parámetro: el paso (step)
- **Metáfora:** Subir una escalera de dos en dos escalones nos ahorra tiempo. El tercer parámetro `range(inicio, fin, paso)` define el tamaño y la dirección del brinco en cada iteración.
- **Código:**
```python
for num in range(2, 9, 2):
    print(f"Par: {num}")
```
- **Terminal:**
```text
Par: 2
Par: 4
Par: 6
Par: 8
```
- **Takeaway:** El parámetro `paso` determina el incremento entre valores sucesivos. Si se especifica un paso negativo (ej. `-1`), la secuencia desciende hacia atrás.

---

### Paso 5 (`predict`) · Trazado de cuenta regresiva
- **Pregunta:** ¿Cuál es la salida exacta producida por este ciclo con paso negativo?
- **Código:**
```python
salida = ""
for x in range(6, 1, -2):
    salida += str(x) + " "
print(salida.strip())
```
- **Opciones:**
  - [ ] A) `6 5 4 3 2 1`
    - *whyIncorrect:* "El paso es -2, por lo que desciende dando saltos de 2 en 2, no de 1 en 1."
  - [x] B) `6 4 2` *(Correcta)*
  - [ ] C) `6 4`
    - *whyIncorrect:* "El 2 sigue siendo estrictamente mayor que el límite 1, por lo que el 2 sí entra en el ciclo."
  - [ ] D) `4 2 0`
    - *whyIncorrect:* "El rango comienza obligatoriamente en 6 (el inicio especificado) y no en 4."
- **Feedback Explicativo:** "¡Brillante! Arranca en 6, resta 2 (`4`), resta 2 (`2`), y el siguiente sería 0, que no cumple ser mayor que 1. Imprime `6 4 2`."

---

### Paso 6 (`code_sandbox`) · Práctica guiada con ranuras múltiples: Múltiplos de 5
- **Instrucción:** Completa las dos ranuras para imprimir los múltiplos de 5 desde el 10 hasta el 30 inclusive:
- **Código inicial:**
```python
for m in range(10, ___, ___):
    print(m)
```
- **Salida esperada:**
```text
10
15
20
25
30
```
- **Opciones de slots:**
  - [ ] A) `["30", "5"]`
    - *whyIncorrect:* "Como el límite superior es abierto, poner 30 se detendría en 25 excluyendo el 30."
  - [ ] B) `["30", "1"]`
    - *whyIncorrect:* "Con paso 1 imprimiría todos los enteros consecutivos (10, 11, 12...), no los múltiplos de 5."
  - [ ] C) `["35", "10"]`
    - *whyIncorrect:* "Con paso 10 daría saltos de 10 en 10 (10, 20, 30), omitiendo 15 y 25."
  - [x] D) `["35", "5"]` *(Correcta)*
- **Feedback Explicativo:** "¡Perfecto! Para incluir el 30 con paso 5, el límite superior debe ser un número estrictamente mayor que 30 (como 31 o 35)."

---

### Paso 7 (`predict`) · Caso Borde: Límites idénticos range(n, n)
- **Pregunta:** ¿Cuántas veces se ejecuta el cuerpo del ciclo si el inicio y el fin son exactamente el mismo número?
- **Código:**
```python
vueltas = 0
for i in range(10, 10):
    vueltas += 1
print("Iteraciones:", vueltas)
```
- **Opciones:**
  - [x] A) `0 veces, porque no existe ningún entero que cumpla 10 <= i < 10.` *(Correcta)*
  - [ ] B) `1 vez, ejecutando la iteración con i = 10.`
    - *whyIncorrect:* "El límite superior siempre se excluye; al no haber espacio entre inicio y fin, el rango es vacío."
  - [ ] C) `10 veces, tomando el número especificado como cantidad de repeticiones.`
    - *whyIncorrect:* "range(10, 10) no significa '10 veces'; especifica inicio=10 y fin=10."
  - [ ] D) Produce un error de tipo `ValueError` por parámetros redundantes.
    - *whyIncorrect:* "Es una instrucción válida en Python que simplemente produce un generador sin elementos."
- **Feedback Explicativo:** "¡Exacto! La condición matemática de pertenencia es `inicio <= x < fin`. Si ambos son 10, el conjunto es vacío y no da ninguna vuelta."

---

## 📝 Lección 3.4: El Ciclo Condicional WHILE y Bucles Infinitos (`w3-l4`)
*Objetivo:* Comprender la lógica del ciclo condicional `while`, sus tres pilares (inicialización, guardia y actualización) y cómo prevenir bucles infinitos.

### Paso 1 (`explanation`) · La bomba de achique y la condición de parada
- **Metáfora:** Una bomba de drenaje en un túnel subterráneo debe operar **mientras** el nivel del agua sea mayor a cero. No sabemos cuántos minutos tomará: mientras la condición sea verdadera, el motor sigue encendido.
- **Código:**
```python
bateria = 3
while bateria > 0:
    print(f"Batería restante: {bateria}")
    bateria -= 1
print("Dispositivo apagado.")
```
- **Terminal:**
```text
Batería restante: 3
Batería restante: 2
Batería restante: 1
Dispositivo apagado.
```
- **Takeaway:** El ciclo `while` repite su bloque **mientras** su condición lógica sea `True`. En cuanto la condición se evalúa como `False`, el ciclo termina inmediatamente.

---

### Paso 2 (`predict`) · Trazado mental de reducción
- **Pregunta:** Sigue mentalmente los valores de `n` y `pasos`. ¿Qué números imprimirá Python al finalizar?
- **Código:**
```python
n = 8
pasos = 0
while n > 1:
    n //= 2
    pasos += 1
print(pasos, n)
```
- **Opciones:**
  - [ ] A) `4 0`
    - *whyIncorrect:* "La división entera se detiene cuando n llega a 1 (1 > 1 es False), nunca llega a 0."
  - [ ] B) `2 2`
    - *whyIncorrect:* "Cuando n vale 2, la condición 2 > 1 sigue siendo True, por lo que da una vuelta más dividiendo a 1."
  - [x] C) `3 1` *(Correcta)*
  - [ ] D) `3 2`
    - *whyIncorrect:* "En el tercer paso, n se divide de 2 entre 2 quedando en 1, no en 2."
- **Feedback Explicativo:** "¡Excelente trazado! Iteración 1: `n=4, pasos=1`; Iteración 2: `n=2, pasos=2`; Iteración 3: `n=1, pasos=3`. Como `1 > 1` es False, sale e imprime `3 1`."

---

### Paso 3 (`predict`) · Spot the Bug: La pesadilla del bucle infinito
- **Pregunta:** Este temporizador se queda congelado consumiendo memoria y CPU sin llegar nunca a imprimir `"¡Tiempo!"`. ¿Cuál es el error crítico en el código?
- **Código:**
```python
segundos = 3
while segundos > 0:
    print("Contando:", segundos)
print("¡Tiempo!")
```
- **Opciones:**
  - [ ] A) La condición `segundos > 0` evalúa como False desde la primera línea.
    - *whyIncorrect:* "Al inicio segundos vale 3, por lo que 3 > 0 es True y el ciclo sí inicia."
  - [x] B) Falta actualizar la variable adentro (`segundos -= 1`), haciendo que la condición sea eternamente True. *(Correcta)*
  - [ ] C) Falta un bloque `else` al final de la instrucción `while` para cerrar el flujo.
    - *whyIncorrect:* "El bloque 'else' en ciclos es completamente opcional y no tiene relación con el bucle infinito."
  - [ ] D) La función `print()` no está permitida dentro del cuerpo de un ciclo condicional.
    - *whyIncorrect:* "print() puede usarse con total libertad dentro de cualquier ciclo."
- **Feedback Explicativo:** "¡Exacto! Todo ciclo `while` requiere obligatoriamente una instrucción que modifique la variable de control hacia la condición de parada; si no se decrementa `segundos`, el ciclo nunca terminará."

---

### Paso 4 (`explanation`) · Evaluación previa: ¿Qué pasa si la condición es False de entrada?
- **Metáfora:** Si intentas encender la calefacción cuando la temperatura ya es agradable, el termostato ni siquiera activa los quemadores.
- **Código:**
```python
nivel_alerta = 0
while nivel_alerta > 5:
    print("¡Alarma sonando!")
    nivel_alerta -= 1
print("Sistema en reposo.")
```
- **Terminal:**
```text
Sistema en reposo.
```
- **Takeaway:** En Python, la condición del `while` se evalúa **antes** de ejecutar cada vuelta (pre-condición). Si es falsa desde el principio, el cuerpo del ciclo no se ejecuta ni una sola vez.

---

### Paso 5 (`predict`) · Trazado con operador <=
- **Pregunta:** ¿Cuál será el valor final de `p` al salir del ciclo?
- **Código:**
```python
p = 1
while p <= 4:
    p *= 2
print("Final:", p)
```
- **Opciones:**
  - [ ] A) `Final: 4`
    - *whyIncorrect:* "Cuando p vale 4, la condición 4 <= 4 es True, por lo que vuelve a entrar y se multiplica por 2 a 8."
  - [ ] B) `Final: 2`
    - *whyIncorrect:* "El ciclo no se detiene en 2 porque 2 <= 4 sigue siendo verdadero."
  - [ ] C) `Final: 16`
    - *whyIncorrect:* "Para llegar a 16 necesitaría entrar cuando p vale 8, pero 8 <= 4 es False."
  - [x] D) `Final: 8` *(Correcta)*
- **Feedback Explicativo:** "¡Correcto! Rastro de `p`: 1 -> 2 -> 4 -> 8. Cuando vale 8, `8 <= 4` es False y el ciclo finaliza."

---

### Paso 6 (`code_sandbox`) · Práctica guiada con ranuras múltiples: Llenado de tolva
- **Instrucción:** Completa el operador de comparación y el de asignación compuesta para llenar la tolva de mineral hasta alcanzar 100 toneladas:
- **Código inicial:**
```python
toneladas = 0
while toneladas ___ 100:
    toneladas ___ 25
print("Tolva llena:", toneladas)
```
- **Salida esperada:**
```text
Tolva llena: 100
```
- **Opciones de slots:**
  - [x] A) `["<", "+="]` *(Correcta)*
  - [ ] B) `[">", "+="]`
    - *whyIncorrect:* "Al inicio toneladas=0; como 0 > 100 es False, nunca entraría al ciclo y terminaría en 0."
  - [ ] C) `["<=", "="]`
    - *whyIncorrect:* "Usar '=' asignaría siempre el valor fijo 25 en cada ciclo, provocando un bucle infinito."
  - [ ] D) `["==", "+="]`
    - *whyIncorrect:* "0 == 100 es False desde el primer momento, impidiendo que el ciclo se ejecute."
- **Feedback Explicativo:** "¡Excelente! Mientras `toneladas < 100`, se van sumando `+= 25` toneladas en cada viaje hasta alcanzar exactamente 100."

---

### Paso 7 (`predict`) · Caso Borde: El valor exacto al salir del bucle
- **Pregunta:** ¿Qué valor exacto tiene la variable `x` justo después de terminar el ciclo?
- **Código:**
```python
x = 10
while x > 3:
    x -= 2
print("Salida:", x)
```
- **Opciones:**
  - [ ] A) `Salida: 3`
    - *whyIncorrect:* "x disminuye de 2 en 2: 10 -> 8 -> 6 -> 4 -> 2. Nunca toma el valor 3."
  - [ ] B) `Salida: 4`
    - *whyIncorrect:* "Cuando x vale 4, 4 > 3 sigue siendo True, por lo que entra una última vez y resta a 2."
  - [x] C) `Salida: 2` *(Correcta)*
  - [ ] D) `Salida: 0`
    - *whyIncorrect:* "Cuando x llega a 2, 2 > 3 es False y el ciclo se detiene de inmediato sin llegar a 0."
- **Feedback Explicativo:** "¡Exacto! El ciclo se detiene cuando la condición se rompe: al restar 2 a 4, `x` queda en 2, haciendo que `2 > 3` sea False."

---

## 📝 Lección 3.5: Control de Flujo: break y continue (`w3-l5`)
*Objetivo:* Aprender a manipular el flujo natural de repetición usando `break` para abortar ciclos prematuramente y `continue` para saltar a la siguiente iteración.

### Paso 1 (`explanation`) · El freno de mano de emergencia (break)
- **Metáfora:** En una cinta de clasificación de equipaje, si el sensor detecta un paquete peligroso, se activa la parada de emergencia (`break`): el sistema se detiene por completo y no revisa ninguna maleta más.
- **Código:**
```python
for item in ["tornillo", "piedra", "arandela"]:
    if item == "piedra":
        print("¡Parada de emergencia!")
        break
    print("Procesando:", item)
```
- **Terminal:**
```text
Procesando: tornillo
¡Parada de emergencia!
```
- **Takeaway:** `break` rompe y finaliza el ciclo en el acto. La ejecución salta de inmediato a la primera línea fuera del bucle, ignorando las iteraciones restantes.

---

### Paso 2 (`predict`) · Trazado con break y acumulación
- **Pregunta:** ¿Cuál será el valor impreso de `total` al ejecutarse este programa?
- **Código:**
```python
suma = 0
for n in [5, 10, -1, 20]:
    if n < 0:
        break
    suma += n
print("Total:", suma)
```
- **Opciones:**
  - [ ] A) `Total: 35`
    - *whyIncorrect:* "Sumaste todos los números ignorando la instrucción break que cancela el ciclo en el -1."
  - [x] B) `Total: 15` *(Correcta)*
  - [ ] C) `Total: 14`
    - *whyIncorrect:* "El -1 activa el break antes de sumarse, por lo que la suma es 5 + 10 = 15, no 14."
  - [ ] D) `Total: 0`
    - *whyIncorrect:* "Las dos primeras iteraciones (5 y 10) se ejecutan y acumulan normalmente antes del break."
- **Feedback Explicativo:** "¡Correcto! Suma 5, luego 10 (`suma = 15`). Al llegar a -1, `n < 0` es True y `break` interrumpe el ciclo antes de sumar 20."

---

### Paso 3 (`predict`) · Spot the Bug: El continue atrapado en while
- **Pregunta:** Un estudiante escribió este código para saltarse el número 2. Al ejecutarlo imprime `0` y `1`, pero luego se queda congelado en un bucle infinito. ¿Por qué ocurre?
- **Código:**
```python
i = 0
while i < 4:
    if i == 2:
        continue
    print(i)
    i += 1
```
- **Opciones:**
  - [ ] A) La palabra clave `continue` solo está permitida en ciclos `for`.
    - *whyIncorrect:* "continue es completamente legal tanto en for como en while."
  - [ ] B) El operador `==` debe sustituirse por `=` para asignar el nuevo valor.
    - *whyIncorrect:* "'=' asignaría un valor dentro del if en lugar de comparar; la condición requiere '=='."
  - [ ] C) La condición `i < 4` se vuelve falsa antes de tiempo.
    - *whyIncorrect:* "Al contrario: i se queda congelado en 2 y 2 < 4 sigue siendo siempre True."
  - [x] D) `continue` salta a la siguiente vuelta sin ejecutar `i += 1`, dejando a `i` estancado para siempre en 2. *(Correcta)*
- **Feedback Explicativo:** "¡Fallo clásico de novato! Al ejecutar `continue`, Python salta al inicio del `while` sin ejecutar las líneas posteriores, por lo que `i += 1` nunca se ejecuta cuando `i == 2`."

---

### Paso 4 (`explanation`) · Saltar el turno con continue
- **Metáfora:** En un control de calidad de botellas, si una botella viene vacía, no queremos apagar la fábrica: simplemente la descartamos (`continue`) y pasamos de inmediato a inspeccionar la siguiente.
- **Código:**
```python
for n in [1, 2, 3, 4]:
    if n % 2 != 0:
        continue
    print(f"Par detectado: {n}")
```
- **Terminal:**
```text
Par detectado: 2
Par detectado: 4
```
- **Takeaway:** `continue` termina únicamente la iteración en curso y avanza directamente al siguiente elemento de la secuencia, sin detener el ciclo por completo.

---

### Paso 5 (`predict`) · Trazado combinando continue
- **Pregunta:** ¿Qué número imprimirá este contador de consonantes al saltarse las vocales 'I' y 'A'?
- **Código:**
```python
conteo = 0
for letra in "MINAS":
    if letra in "IA":
        continue
    conteo += 1
print("Consonantes:", conteo)
```
- **Opciones:**
  - [x] A) `Consonantes: 3` *(Correcta)*
  - [ ] B) `Consonantes: 2`
    - *whyIncorrect:* "2 es la cantidad de vocales que fueron omitidas ('I' y 'A'), pero contamos las consonantes."
  - [ ] C) `Consonantes: 5`
    - *whyIncorrect:* "5 es la longitud total de 'MINAS', pero las vocales fueron omitidas por el continue."
  - [ ] D) `Consonantes: 4`
    - *whyIncorrect:* "'MINAS' tiene exactamente 3 consonantes (M, N, S) y 2 vocales (I, A)."
- **Feedback Explicativo:** "¡Exacto! Para 'M', 'N' y 'S', `conteo` se incrementa; para 'I' y 'A', `continue` salta el incremento. Total: 3."

---

### Paso 6 (`code_sandbox`) · Práctica guiada con ranuras múltiples: Filtro y parada
- **Instrucción:** Completa las dos ranuras para omitir lecturas en cero usando `continue` y detener inmediatamente el monitoreo ante valores negativos usando `break`:
- **Código inicial:**
```python
sensores = [14, 0, 18, -99, 25]
lecturas_validas = 0
for s in sensores:
    if s == 0:
        ___
    if s < 0:
        ___
    lecturas_validas += 1
print("Válidas:", lecturas_validas)
```
- **Salida esperada:**
```text
Válidas: 2
```
- **Opciones de slots:**
  - [ ] A) `["break", "continue"]`
    - *whyIncorrect:* "Si pones break en s == 0, detendrías todo el programa en la segunda lectura contabilizando solo 1."
  - [ ] B) `["continue", "pass"]`
    - *whyIncorrect:* "Usar 'pass' en s < 0 procesaría la lectura -99 como válida, arrojando 3 lecturas en vez de 2."
  - [x] C) `["continue", "break"]` *(Correcta)*
  - [ ] D) `["break", "break"]`
    - *whyIncorrect:* "Poner break en ambas condiciones abortaría en la lectura 0, registrando solo 1 válida."
- **Feedback Explicativo:** "¡Gran trabajo! `continue` ignora el 0 sin detener el programa, y `break` detiene todo al recibir la alarma crítica negativa `-99`."

---

### Paso 7 (`predict`) · Caso Borde: Código inalcanzable tras un break
- **Pregunta:** ¿Cuál es la salida exacta producida en la terminal por este script?
- **Código:**
```python
for k in [1, 2, 3]:
    print("A")
    break
    print("B")
print("C")
```
- **Opciones:**
  - [ ] A) `A\nB\nC`
    - *whyIncorrect:* "La línea `print('B')` nunca se ejecuta porque el break anterior interrumpe el ciclo de inmediato."
  - [x] B) `A\nC` *(Correcta)*
  - [ ] C) `A\nA\nA\nC`
    - *whyIncorrect:* "El break finaliza el ciclo en la primera vuelta; no llega a ejecutarse para el 2 ni para el 3."
  - [ ] D) Produce un error de sintaxis `SyntaxError: unreachable code`.
    - *whyIncorrect:* "Python permite escribir código después de un break sin lanzar error de sintaxis; simplemente no lo ejecuta jamás."
- **Feedback Explicativo:** "¡Perfecto! Imprime 'A', el `break` cancela el resto del ciclo (haciendo que `print('B')` sea código inalcanzable) y continúa en `print('C')`."

---

## 📝 Lección 3.6: Reto Integrador: Centinelas y Validación de Entrada (`w3-l6`)
*Objetivo:* Integrar bucles condicionales, valores centinela de finalización, cálculo de extremos (máximos y mínimos) y prevención de errores en situaciones reales.

### Paso 1 (`explanation`) · El valor centinela
- **Metáfora:** En una báscula para camiones mineros, no sabemos cuántos vehículos llegarán en el turno. El operario pesa camión tras camión hasta que ingresa una clave especial (por ejemplo `-1` o `'fin'`). Ese dato especial de parada se denomina **centinela**.
- **Código:**
```python
total = 0
entradas = [150, 200, -1, 80]
for peso in entradas:
    if peso == -1:
        break
    total += peso
print("Carga total:", total)
```
- **Terminal:**
```text
Carga total: 350
```
- **Takeaway:** Un centinela es un valor especial de control que no forma parte de los datos reales del problema y sirve exclusivamente para señalar el fin de la captura.

---

### Paso 2 (`predict`) · Trazado con centinela y contador
- **Pregunta:** El número 0 actúa como centinela en esta serie de datos. ¿Qué imprimirá el script al finalizar?
- **Código:**
```python
cantidad = 0
suma = 0
datos = [40, 60, 20, 0, 99]
for x in datos:
    if x == 0:
        break
    cantidad += 1
    suma += x
print(cantidad, suma)
```
- **Opciones:**
  - [ ] A) `4 120`
    - *whyIncorrect:* "El 0 activa el break antes de incrementar la cantidad, por lo que se contaron 3 valores, no 4."
  - [ ] B) `5 219`
    - *whyIncorrect:* "El break interrumpe el ciclo al llegar al 0; el número 99 nunca llega a procesarse."
  - [ ] C) `3 219`
    - *whyIncorrect:* "La suma solo incluye 40 + 60 + 20 = 120; el 99 está después del centinela de salida."
  - [x] D) `3 120` *(Correcta)*
- **Feedback Explicativo:** "¡Correcto! Procesa 40, 60 y 20 (`cantidad = 3, suma = 120`). Al encontrar el centinela 0, sale inmediatamente."

---

### Paso 3 (`predict`) · Spot the Bug: El centinela colado en la suma
- **Pregunta:** El programa debería sumar los ingresos hasta que se digite `-1`. Sin embargo, para entradas `[10, 20, -1]` imprime `Total neto: 29` en vez de `30`. ¿Cuál es el error de diseño algorítmico?
- **Código:**
```python
total = 0
for v in [10, 20, -1]:
    total += v
    if v == -1:
        break
print("Total neto:", total)
```
- **Opciones:**
  - [x] A) El valor del centinela `-1` se acumuló en `total` antes de verificar si debía detener el ciclo. *(Correcta)*
  - [ ] B) La variable `total` debió inicializarse en `-1` para compensar la resta.
    - *whyIncorrect:* "Los acumuladores de sumas siempre deben iniciar en 0; parchear con -1 solo funcionaría por azar en este caso."
  - [ ] C) El ciclo for no permite números negativos en sus colecciones.
    - *whyIncorrect:* "Las listas de Python aceptan cualquier número positivo, negativo o decimal."
  - [ ] D) La instrucción if requiere obligatoriamente un bloque else para ejecutar un break.
    - *whyIncorrect:* "El condicional if simple es perfectamente válido y autosuficiente sin bloque else."
- **Feedback Explicativo:** "¡Exacto! El orden de las instrucciones es crucial: la verificación del centinela debe hacerse **antes** de procesar o acumular el dato."

---

### Paso 4 (`explanation`) · Búsqueda del valor máximo
- **Metáfora:** Para recordar la temperatura récord de un reactor químico, guardamos la primera lectura como nuestro "campeón actual". Cada vez que un nuevo valor supera al campeón, lo coronamos como el nuevo récord.
- **Código:**
```python
temperaturas = [24, 38, 19, 41, 30]
maxima = temperaturas[0]
for t in temperaturas:
    if t > maxima:
        maxima = t
print(f"Temperatura máxima: {maxima}°C")
```
- **Terminal:**
```text
Temperatura máxima: 41°C
```
- **Takeaway:** Para encontrar el mayor elemento de una serie, inicializa tu variable con el primer dato conocido y actualízala cada vez que encuentres un valor estrictamente mayor.

---

### Paso 5 (`predict`) · Trazado de conteo condicional
- **Pregunta:** Un profesor procesa las notas de sus estudiantes para saber cuántos aprobaron la materia (nota mínima aprobatoria: 3.0). ¿Qué imprime este programa?
- **Código:**
```python
notas = [4.5, 2.8, 3.2, 1.9, 3.0]
ganaron = 0
for n in notas:
    if n >= 3.0:
        ganaron += 1
print("Aprobados:", ganaron)
```
- **Opciones:**
  - [ ] A) `Aprobados: 2`
    - *whyIncorrect:* "No contaste la nota 3.0, pero el operador '>=' incluye exactamente las notas iguales a 3.0."
  - [ ] B) `Aprobados: 4`
    - *whyIncorrect:* "Las notas 2.8 y 1.9 no superan el 3.0, por lo que no deben contabilizarse."
  - [x] C) `Aprobados: 3` *(Correcta)*
  - [ ] D) `Aprobados: 5`
    - *whyIncorrect:* "Solo 3 de los 5 estudiantes tienen nota mayor o igual a 3.0 (4.5, 3.2 y 3.0)."
- **Feedback Explicativo:** "¡Correcto! Cumplen la condición `n >= 3.0` las notas 4.5, 3.2 y 3.0, dando un total de 3 aprobados."

---

### Paso 6 (`code_sandbox`) · Práctica guiada con ranuras múltiples: Procesador de votaciones
- **Instrucción:** Completa las dos ranuras para detener el conteo cuando el voto sea `0` (centinela de urna cerrada) usando `break`:
- **Código inicial:**
```python
votos_c1 = 0
total_votos = 0
urnas = [1, 2, 1, 1, 0, 2]
for voto in urnas:
    if voto ___ 0:
        ___
    total_votos += 1
    if voto == 1:
        votos_c1 += 1
print(f"Candidato 1: {votos_c1} de {total_votos}")
```
- **Salida esperada:**
```text
Candidato 1: 3 de 4
```
- **Opciones de slots:**
  - [ ] A) `["!=", "continue"]`
    - *whyIncorrect:* "'!=' saltaría todos los votos válidos y solo procesaría los ceros."
  - [x] B) `["==", "break"]` *(Correcta)*
  - [ ] C) `["==", "continue"]`
    - *whyIncorrect:* "'continue' solo omitiría el 0 y seguiría contando los votos posteriores a la urna cerrada."
  - [ ] D) `[">", "break"]`
    - *whyIncorrect:* "'>' detendría el conteo inmediatamente en el primer voto positivo recibido."
- **Feedback Explicativo:** "¡Excelente lógica electoral! Al verificar `voto == 0`, `break` cierra la urna en el momento justo sin contar votos posteriores."

---

### Paso 7 (`predict`) · Caso Borde: Centinela inmediato en el primer dato
- **Pregunta:** Si una cuadrilla no realizó ningún trabajo y el primer dato digitado es inmediatamente el centinela `-1`, ¿qué imprime el programa?
- **Código:**
```python
entradas = [-1]
contador = 0
suma = 0
for val in entradas:
    if val == -1:
        break
    contador += 1
    suma += val
if contador > 0:
    print(suma / contador)
else:
    print("Sin datos")
```
- **Opciones:**
  - [ ] A) `0.0`
    - *whyIncorrect:* "Como contador quedó en 0, no entra al bloque if y no evalúa ninguna división matemática."
  - [ ] B) `-1`
    - *whyIncorrect:* "El centinela activa el break inmediatamente sin almacenarse ni en suma ni en contador."
  - [ ] C) `ZeroDivisionError: division by zero`
    - *whyIncorrect:* "El condicional `if contador > 0` protegió exitosamente al programa evitando ejecutar la división."
  - [x] D) `Sin datos` *(Correcta)*
- **Feedback Explicativo:** "¡Dominio total de casos borde! El `break` se dispara en el primer intento dejando `contador = 0`. El `if-else` previene la caída del sistema y emite el mensaje seguro `'Sin datos'`."
