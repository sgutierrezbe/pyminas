# Syllabus Oficial: Fundamentos de Programación (Python 3)
## Facultad de Minas · Universidad Nacional de Colombia - Sede Medellín
*Código de Asignatura: 3006888 / Asignaturas Afines*

Este documento describe la malla curricular temática estándar de la materia semana a semana, sirviendo como guía de referencia para el diseño de los módulos pedagógicos en **pyMinas**.

---

## 📅 Distribución Semanal de Contenidos

### Semana 1: Introducción, Algoritmos y Ciclo E-P-S
* **Conceptos clave:**
  - ¿Qué es un algoritmo? Pensamiento computacional y secuencia lógica.
  - Modelo Entrada-Procesamiento-Salida (E-P-S).
  - Tipos de datos primitivos en Python: Entero (`int`), Flotante (`float`), Texto (`str`), Booleano (`bool`).
  - Función de entrada `input()` y conversión explícita de tipos (*type casting*).
  - Salida formateada con `print()` y cadenas literales interpoladas (`f-strings`).
  - Operadores aritméticos fundamentales: `+`, `-`, `*`, `/`, división entera `//`, módulo `%` y potencia `**`.
  - Precedencia de operadores aritméticos (PEMDAS).

### Semana 2: Estructuras Condicionales y Lógica Booleana
* **Conceptos clave:**
  - Operadores relacionales: `==`, `!=`, `<`, `<=`, `>`, `>=`.
  - Operadores lógicos y tablas de verdad: `and`, `or`, `not`.
  - Evaluación en cortocircuito (*short-circuit evaluation*).
  - La regla de indentación en Python (*off-side rule*) y delimitación con dos puntos `:`.
  - Condicional simple: `if`.
  - Condicional alternativo mutuamente excluyente: `if-else`.
  - Condicional múltiple / encadenado: `if-elif-else`.
  - Condicionales anidados y diseño de árboles de decisión.

### Semana 3: Ciclos Indefinidos (`while`) y Control de Flujo
* **Conceptos clave:**
  - Motivación de la iteración: evitar repetición de código (*DRY*).
  - Estructura del ciclo `while`: condición de permanencia y variable de control.
  - Inicialización, condición y actualización de la variable de control.
  - Patrón de Contador (`c += 1`) y Acumulador/Sumatoria (`total += valor`).
  - Prevención y diagnóstico de ciclos infinitos.
  - Variables centinela y banderas booleanas (*flags*).
  - Interrupción de flujo con `break` y salto de iteración con `continue`.

### Semana 4: Ciclos Definidos (`for`) y la Función `range()`
* **Conceptos clave:**
  - Diferencia conceptual entre ciclo definido (`for`) e indefinido (`while`).
  - La función generadora `range()`: sintaxis con 1 argumento (`stop`), 2 argumentos (`start, stop`) y 3 argumentos (`start, stop, step`).
  - Recorridos ascendentes y descendentes (paso negativo).
  - Bucles anidados (`for` dentro de `for`) y coordenadas cartesianas/patrones.
  - Rastreo mental de variables en bucles anidados.

### Semana 5: Cadenas de Texto (`str`) como Secuencias
* **Conceptos clave:**
  - Strings como secuencias indexadas de caracteres de solo lectura (inmutabilidad).
  - Indexación positiva (desde `0`) e indexación negativa (desde `-1`).
  - Slicing o rebanado de cadenas: `texto[inicio:fin:paso]`.
  - Longitud con `len()`, pertenencia con operador `in`.
  - Recorrido carácter por carácter con `for car in texto:`.
  - Métodos esenciales de strings: `.upper()`, `.lower()`, `.strip()`, `.replace()`, `.split()`, `.join()`, `.find()`, `.count()`.

### Semana 6: Funciones, Modularidad y Alcance
* **Conceptos clave:**
  - Principio de abstracción y reutilización de código.
  - Definición de funciones con `def` y nomenclatura estandarizada (*snake_case*).
  - Parámetros vs Argumentos (posicionales y nombrados).
  - Parámetros por defecto (`def f(x=0):`).
  - La instrucción `return` vs la función `print()`: captura del valor devuelto.
  - Ámbito o alcance de variables (*scope*): Variables locales vs variables globales.
  - Funciones puras y efectos secundarios.

### Semana 7: Estructuras de Datos Mutables: Listas (`list`)
* **Conceptos clave:**
  - Colecciones ordenadas de elementos y mutabilidad.
  - Creación de listas, acceso por índice y reasignación directa (`lista[i] = valor`).
  - Longitud, pertenencia (`in`), desempaquetado básico.
  - Métodos clave de modificación: `.append()`, `.insert()`, `.extend()`, `.pop()`, `.remove()`.
  - Métodos de inspección y ordenamiento: `.index()`, `.count()`, `.sort()`, `.reverse()`.
  - Referencias en memoria vs copias superficiales (`.copy()` o `[:]`).
  - Recorridos con `for elemento in lista:` y con `for i in range(len(lista)):`.

### Semana 8: Tuplas (`tuple`) y Diccionarios (`dict`)
* **Conceptos clave:**
  - **Tuplas:** Inmutabilidad, síntesis de datos heterogéneos, empaquetado y desempaquetado de retornos múltiples.
  - **Diccionarios:** Asociación de pares clave-valor (`key: value`).
  - Restricción de claves inmutables (strings, ints, tuplas) y valores arbitrarios.
  - Acceso seguro mediante corchetes `d[clave]` vs método `.get(clave, defecto)`.
  - Mutación: adición, actualización y eliminación (`del`, `.pop()`).
  - Iteración sobre diccionarios: `.keys()`, `.values()`, `.items()`.

### Semana 9+: Algoritmos Clásicos y Matrices
* **Conceptos clave:**
  - Búsqueda lineal vs búsqueda binaria (condición de lista ordenada).
  - Algoritmo de ordenamiento elemental (burbuja o selección directa).
  - Matrices: Listas bidimensionales (listas de listas).
  - Indexación doble (`matriz[fila][columna]`) y recorridos matriciales con doble `for`.
  - Nociones introductorias de complejidad algorítmica ($O(1)$, $O(n)$, $O(n^2)$).
