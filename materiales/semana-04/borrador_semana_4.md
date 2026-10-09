# Storyboard pedagógico — Semana 4 de pyMinas: Listas

**Estado:** Aprobado por el docente el 9 de octubre de 2026; implementado en pyMinas v1.53.
**Fuente:** `Clase04_E.ipynb` (cuaderno de clase recibido localmente), secciones 2 y ejercicios 0, 1, 4 y 6, adaptados a micropasos.
**Numeración:** siguiente semana de contenido en pyMinas (tras sus semanas 1–3). El cuaderno la ubica en la Semana 5 del calendario académico, del 28 de septiembre al 4 de octubre; la Semana 4 fue taller y parcial.
**Prerequisitos:** variables, tipos, `print`, comparaciones y ciclos `for`/`range` de las semanas anteriores.
**Estructura:** 6 lecciones × 9 micropasos = 54 pantallas; 30 preguntas y 6 prácticas de dos ranuras independientes.
**Duración orientativa:** 3–5 minutos por lección, incluyendo interacción y ejecución.

## Mapa de lecciones

1. **Acceder y actualizar una posición.** Ubicar elementos con índices positivos o negativos y reemplazar una posición.
2. **Extraer una parte y copiar.** Extraer un tramo con slicing y distinguir una copia de un segundo nombre para la misma lista.
3. **Recorrer y contar.** Recorrer valores o posiciones y distinguir cantidad total de frecuencia de un valor.
4. **Agregar elementos.** Ampliar una lista al final, en una posición o con los elementos de otra lista.
5. **Eliminar elementos.** Elegir entre eliminar por posición o por valor y vaciar una lista.
6. **Ordenar o invertir.** Distinguir ordenamiento, inversión del orden actual y creación de una lista ordenada nueva.

## Alcance y decisiones didácticas

El eje de cada lección es una acción sobre una lista: acceder, extraer, recorrer, agregar, eliminar o reorganizar. Los métodos relacionados se presentan uno por pantalla y con explicación previa a su evaluación. Los valores, índices y longitudes se distinguen explícitamente.

Se cubren creación con `[]`, listas vacías y repetidos, `len`, índices positivos/negativos, asignación por índice, slicing, alias y `copy`, recorrido directo y `range(len)`, `count`, `append`, `insert`, `extend`, `pop`, `remove`, `clear`, `sort`, `reverse` y `sorted` con una demostración de `reverse=True`.

Se reservan para una ampliación: `enumerate`, `zip`, asignación por rangos, `del`, `index`, orden de cadenas con `key`, slicing con paso y algoritmos largos de los ejercicios finales. No se introducen tuplas, diccionarios, conjuntos ni comprensiones de listas en esta semana. El contraste entre `append` y `extend` muestra una lista anidada únicamente como resultado, sin exigir acceso bidimensional.

La copia se demuestra con números; no se promete independencia de objetos anidados. Se evita trasladar las afirmaciones imprecisas del cuaderno sobre listas «ordenadas»: tienen un orden de posiciones, pero no están necesariamente clasificadas por valor.

## Convenciones para la implementación posterior

Los bloques `text` representan solo stdout: los saltos de línea mostrados, incluido el final de cada bloque, forman parte de la salida. En las preguntas con error, se conserva el stdout previo y el error se presenta aparte: los tracebacks no son salida de terminal. `⏎` dentro de una opción representa un salto de línea.

Cada práctica tiene dos ranuras que se seleccionan por separado, con cuatro opciones y feedback propio. Las posiciones correctas se balancean contando cada pregunta y cada ranura como una decisión; no se impone una única opción conjunta a toda la práctica.


---

## Lección 4.1: Acceder y actualizar una posición

- **ID propuesto:** `w4-l1`
- **Objetivo:** Ubicar elementos con índices positivos o negativos y reemplazar una posición.
- **Pasos:** 9


### Paso 1 (explanation): Una fila de casilleros

- **Explicación:** Una lista es una fila de casilleros numerados desde cero; guarda varios valores en una variable. El orden es el de las posiciones, no un orden numérico automático.

```python
bloques = [12, 19, 21]
print(bloques)
print(bloques[0])
```


- **Salida esperada (stdout):**

```text
[12, 19, 21]
12
```

- **Idea clave:** Los corchetes crean la lista; [0] accede al primer elemento.


### Paso 2 (predict): El segundo casillero

- **Pregunta:** ¿Qué imprime este programa?

```python
notas = [3.0, 4.5, 2.0]
nota = notas[1]
print(nota)
```

- **Opciones:**
  - [ ] A) `3.0` — **whyIncorrect:** El índice 1 señala el segundo elemento; el primero tiene índice 0.
  - [x] B) `4.5` — **Correcta.**
  - [ ] C) `2.0` — **whyIncorrect:** El valor 2.0 está en el índice 2, no en el índice 1.
  - [ ] D) `[4.5]` — **whyIncorrect:** Indexar obtiene un elemento, no una lista de un solo elemento.
- **Feedback correcto:** 4.5. El índice 1 selecciona el segundo elemento de la lista.

- **Salida esperada (stdout):**

```text
4.5
```


### Paso 3 (predict): Un casillero que no existe

- **Pregunta:** ¿Cuál es el error al intentar imprimir la última nota?

```python
notas = [3, 4, 5]
ultimo = len(notas)
print(notas[ultimo])
```

- **Opciones:**
  - [x] A) `Se usa el índice 3, pero el último es 2.` — **Correcta.**
  - [ ] B) `len(notas) devuelve 2.` — **whyIncorrect:** len cuenta los tres elementos; no devuelve el último índice.
  - [ ] C) `La lista debe contener solo textos.` — **whyIncorrect:** Las listas pueden contener números; el fallo está en el índice.
  - [ ] D) `print no acepta elementos de una lista.` — **whyIncorrect:** print acepta el número obtenido si su índice existe.
- **Feedback correcto:** Se usa el índice 3, pero el último es 2. El tipo de error es `IndexError`.

- **stdout:** vacío; el programa falla antes de imprimir.

- **Error aparte de stdout:** `IndexError`.


### Paso 4 (explanation): Contar desde el final

- **Explicación:** Como en una fila vista desde atrás, -1 señala el último casillero. Los índices negativos permiten acceder sin calcular la longitud.

```python
bloques = [12, 19, 21]
print(bloques[-1])
print(bloques[-2])
```


- **Salida esperada (stdout):**

```text
21
19
```

- **Idea clave:** -1 es el último; -2 es el penúltimo.


### Paso 5 (predict): Desde atrás

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10, 20, 30, 40]
penultima = cargas[-2]
print(penultima)
```

- **Opciones:**
  - [ ] A) `20` — **whyIncorrect:** Contaste desde el inicio; -2 cuenta dos posiciones desde el final.
  - [ ] B) `40` — **whyIncorrect:** El último elemento usa -1; -2 señala el anterior.
  - [x] C) `30` — **Correcta.**
  - [ ] D) `-2` — **whyIncorrect:** El índice selecciona el valor almacenado, no se imprime a sí mismo.
- **Feedback correcto:** 30. -1 es el último; -2 es el penúltimo.

- **Salida esperada (stdout):**

```text
30
```


### Paso 6 (code_sandbox): Consultar dos extremos

- **Instrucción:** Completa los índices para imprimir primero 12 y luego 21.

```python
bloques = [12, 19, 21]
print(bloques[___])
print(bloques[___])
```


**Ranura 1** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `1` — **whyIncorrect:** El índice 1 imprime 19; necesitamos el primer bloque, 12.
  - [ ] B) `2` — **whyIncorrect:** El índice 2 imprime el último bloque, no el primero.
  - [ ] C) `3` — **whyIncorrect:** No existe el índice 3 en una lista de tres elementos.
  - [x] D) `0` — **Correcta.**

**Ranura 2** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `-2` — **whyIncorrect:** El índice -2 selecciona 19, no el último bloque.
  - [ ] B) `0` — **whyIncorrect:** El índice 0 vuelve a imprimir 12, no el último bloque.
  - [x] C) `-1` — **Correcta.**
  - [ ] D) `3` — **whyIncorrect:** len es 3, pero el índice 3 está fuera de la lista.

- **Código completado:**

```python
bloques = [12, 19, 21]
print(bloques[0])
print(bloques[-1])
```

- **Salida esperada (stdout):**

```text
12
21
```

- **Feedback al completar:** Ambas ranuras correctas producen la salida indicada; cada distractor explica qué operación o posición cambiaría.


### Paso 7 (predict): La lista vacía

- **Pregunta:** ¿Qué ocurre en la última línea?

```python
cargas = []
print(len(cargas))
print(cargas[0])
```

- **Opciones:**
  - [ ] A) `Imprime 0 y luego 0.` — **whyIncorrect:** Una lista vacía no contiene un cero; carece de elementos.
  - [ ] B) `Imprime 0 y luego None.` — **whyIncorrect:** Un índice inexistente genera error; no devuelve None.
  - [ ] C) `Imprime 1 y luego [].` — **whyIncorrect:** Los corchetes vacíos representan cero elementos, no uno.
  - [x] D) `Imprime 0 y luego ocurre IndexError.` — **Correcta.**
- **Feedback correcto:** Imprime 0 y luego ocurre IndexError. El tipo de error es `IndexError`.

- **Salida esperada (stdout):**

```text
0
```

- **Error aparte de stdout:** `IndexError`.


### Paso 8 (explanation): Reemplazar un valor

- **Explicación:** Cambiar lo que hay en un casillero conserva el número de casilleros. La asignación por índice modifica la lista existente.

```python
notas = [2.0, 4.0, 3.0]
notas[0] = 3.5
print(notas)
```


- **Salida esperada (stdout):**

```text
[3.5, 4.0, 3.0]
```

- **Idea clave:** lista[i] = valor reemplaza un elemento; no agrega otro.


### Paso 9 (predict): Cambio puntual

- **Pregunta:** ¿Qué imprime este programa?

```python
bloques = [12, 19, 21]
bloques[-1] = 24
print(bloques)
```

- **Opciones:**
  - [ ] A) `[12, 19, 21, 24]` — **whyIncorrect:** Asignar por índice reemplaza; no añade un cuarto elemento.
  - [x] B) `[12, 19, 24]` — **Correcta.**
  - [ ] C) `[24, 19, 21]` — **whyIncorrect:** El índice -1 señala el final, no la primera posición.
  - [ ] D) `[12, 24, 21]` — **whyIncorrect:** El bloque 19 está en -2; se modificó la posición -1.
- **Feedback correcto:** [12, 19, 24]. lista[i] = valor reemplaza un elemento; no agrega otro.

- **Salida esperada (stdout):**

```text
[12, 19, 24]
```


---

## Lección 4.2: Extraer una parte y copiar

- **ID propuesto:** `w4-l2`
- **Objetivo:** Extraer un tramo con slicing y distinguir una copia de un segundo nombre para la misma lista.
- **Pasos:** 9


### Paso 1 (explanation): Una ventana sobre la fila

- **Explicación:** Un rebanado abre una ventana sobre varias posiciones. Incluye el inicio y se detiene antes del límite final.

```python
cargas = [10, 20, 30, 40]
tramo = cargas[1:3]
print(tramo)
```


- **Salida esperada (stdout):**

```text
[20, 30]
```

- **Idea clave:** lista[inicio:fin] produce una nueva lista; fin queda excluido.


### Paso 2 (predict): El límite excluido

- **Pregunta:** ¿Qué imprime este programa?

```python
bloques = [12, 14, 19, 21]
tramo = bloques[0:2]
print(tramo)
```

- **Opciones:**
  - [x] A) `[12, 14]` — **Correcta.**
  - [ ] B) `[12, 14, 19]` — **whyIncorrect:** Incluiste el índice 2; el límite final del rebanado se excluye.
  - [ ] C) `[14, 19]` — **whyIncorrect:** El inicio 0 incluye el primer elemento, no comienza en 1.
  - [ ] D) `12` — **whyIncorrect:** Un rebanado devuelve una lista, no un único elemento.
- **Feedback correcto:** [12, 14]. lista[inicio:fin] produce una nueva lista; fin queda excluido.

- **Salida esperada (stdout):**

```text
[12, 14]
```


### Paso 3 (predict): Índice o rebanado

- **Pregunta:** Se quería obtener [20, 30]. ¿Cuál es la corrección?

```python
cargas = [10, 20, 30, 40]
tramo = cargas[1, 3]
print(tramo)
```

- **Opciones:**
  - [ ] A) `Cambiar [1, 3] por [1:2].` — **whyIncorrect:** El fin 2 excluiría la posición del 30; solo obtendrías [20].
  - [ ] B) `Cambiar [1, 3] por [1:4].` — **whyIncorrect:** El fin 4 también incluiría el 40, que no se pidió.
  - [x] C) `Cambiar [1, 3] por [1:3].` — **Correcta.**
  - [ ] D) `Cambiar [1, 3] por [3:1].` — **whyIncorrect:** Con avance normal, el inicio 3 queda después del fin 1 y da [].
- **Feedback correcto:** Cambiar [1, 3] por [1:3]. El tipo de error es `TypeError`.

- **stdout:** vacío; el programa falla antes de imprimir.

- **Error aparte de stdout:** `TypeError`.


### Paso 4 (explanation): Límites que se pueden omitir

- **Explicación:** Una ventana puede comenzar en el primer elemento o llegar hasta el final. Si omites inicio o fin, Python usa ese extremo de la lista.

```python
cargas = [10, 20, 30, 40]
print(cargas[:2])
print(cargas[2:])
```


- **Salida esperada (stdout):**

```text
[10, 20]
[30, 40]
```

- **Idea clave:** [:fin] toma el prefijo; [inicio:] toma el resto.


### Paso 5 (predict): El resto de la fila

- **Pregunta:** ¿Qué imprime este programa?

```python
notas = [2, 3, 4, 5]
resto = notas[2:]
print(resto)
```

- **Opciones:**
  - [ ] A) `[2, 3]` — **whyIncorrect:** Ese sería el prefijo [:2]; [2:] empieza en el índice 2.
  - [x] B) `[4, 5]` — **Correcta.**
  - [ ] C) `[3, 4, 5]` — **whyIncorrect:** El índice 2 es el tercer elemento, no el segundo.
  - [ ] D) `4` — **whyIncorrect:** El rebanado conserva la forma de lista, aunque acceda desde un índice.
- **Feedback correcto:** [4, 5]. [:fin] toma el prefijo; [inicio:] toma el resto.

- **Salida esperada (stdout):**

```text
[4, 5]
```


### Paso 6 (code_sandbox): Separar dos tramos

- **Instrucción:** Completa los límites para imprimir [10, 20] y [30, 40], en ese orden.

```python
cargas = [10, 20, 30, 40]
print(cargas[:___])
print(cargas[___:])
```


**Ranura 1** (de arriba abajo).
- **Opciones de esta ranura:**
  - [x] A) `2` — **Correcta.**
  - [ ] B) `1` — **whyIncorrect:** El fin 1 solo incluye el 10; faltaría el segundo elemento.
  - [ ] C) `3` — **whyIncorrect:** El fin 3 también incluye el 30, fuera del primer tramo.
  - [ ] D) `4` — **whyIncorrect:** El fin 4 incluye toda la lista, no sus dos primeros elementos.

**Ranura 2** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `1` — **whyIncorrect:** El inicio 1 incluye 20; el segundo tramo debe comenzar en 30.
  - [x] B) `2` — **Correcta.**
  - [ ] C) `3` — **whyIncorrect:** El inicio 3 solo incluye 40; faltaría el 30.
  - [ ] D) `4` — **whyIncorrect:** El inicio 4 coincide con el final y produce una lista vacía.

- **Código completado:**

```python
cargas = [10, 20, 30, 40]
print(cargas[:2])
print(cargas[2:])
```

- **Salida esperada (stdout):**

```text
[10, 20]
[30, 40]
```

- **Feedback al completar:** Ambas ranuras correctas producen la salida indicada; cada distractor explica qué operación o posición cambiaría.


### Paso 7 (predict): Un límite muy lejano

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10, 20, 30]
tramo = cargas[1:99]
print(tramo)
```

- **Opciones:**
  - [x] A) `[20, 30]` — **Correcta.**
  - [ ] B) `Ocurre IndexError.` — **whyIncorrect:** El rebanado recorta su límite al final disponible; no es un acceso [99].
  - [ ] C) `[20, 30, 99]` — **whyIncorrect:** El límite 99 no se agrega como dato; solo marca dónde detenerse.
  - [ ] D) `[]` — **whyIncorrect:** El inicio 1 sí existe; se toma desde allí hasta el final disponible.
- **Feedback correcto:** [20, 30]. El rebanado se detiene al final disponible aunque el límite indicado sea 99.

- **Salida esperada (stdout):**

```text
[20, 30]
```


### Paso 8 (explanation): Dos etiquetas o una copia

- **Explicación:** Dos etiquetas sobre la misma caja ven los mismos cambios; una copia crea otra caja. Para estas listas de números, copy() permite modificar los elementos por separado.

```python
original = [12, 19]
alias = original
copia = original.copy()
original[0] = 14
print(alias)
print(copia)
```


- **Salida esperada (stdout):**

```text
[14, 19]
[12, 19]
```

- **Idea clave:** Asignar otro nombre no copia; copy() crea otra lista.


### Paso 9 (predict): La caja compartida

- **Pregunta:** ¿Qué imprime este programa?

```python
original = [3, 4]
otra = original
otra[1] = 5
print(original)
```

- **Opciones:**
  - [ ] A) `[3, 4]` — **whyIncorrect:** otra y original nombran la misma lista; no se hizo una copia.
  - [ ] B) `[5, 4]` — **whyIncorrect:** Se cambió el índice 1, que es la segunda posición.
  - [ ] C) `[3, 4, 5]` — **whyIncorrect:** Asignar otra[1] reemplaza un elemento; no añade una posición.
  - [x] D) `[3, 5]` — **Correcta.**
- **Feedback correcto:** [3, 5]. Asignar otro nombre no copia; copy() crea otra lista.

- **Salida esperada (stdout):**

```text
[3, 5]
```


---

## Lección 4.3: Recorrer y contar

- **ID propuesto:** `w4-l3`
- **Objetivo:** Recorrer valores o posiciones y distinguir cantidad total de frecuencia de un valor.
- **Pasos:** 9


### Paso 1 (explanation): Visitar cada casillero

- **Explicación:** Como una inspección de cada muestra, for visita los elementos en su orden actual. La variable del ciclo recibe el valor, no su posición.

```python
cargas = [10, 20]
for carga in cargas:
    print(carga)
```


- **Salida esperada (stdout):**

```text
10
20
```

- **Idea clave:** for valor in lista entrega un elemento en cada iteración.


### Paso 2 (predict): Sumar mediciones

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [2, 3, 2]
total = 0
for carga in cargas:
    total += carga
print(total)
```

- **Opciones:**
  - [ ] A) `3` — **whyIncorrect:** Contaste elementos, pero el programa acumula sus valores.
  - [x] B) `7` — **Correcta.**
  - [ ] C) `2` — **whyIncorrect:** Ese es el último valor visitado; total conserva toda la suma.
  - [ ] D) `5` — **whyIncorrect:** La lista admite repetidos y el segundo 2 también se suma.
- **Feedback correcto:** 7. for valor in lista entrega un elemento en cada iteración.

- **Salida esperada (stdout):**

```text
7
```


### Paso 3 (predict): Confundir valor con índice

- **Pregunta:** ¿Por qué falla este recorrido?

```python
cargas = [10, 20]
for i in cargas:
    print(cargas[i])
```

- **Opciones:**
  - [ ] A) `for no puede recorrer listas.` — **whyIncorrect:** for sí recorre listas; entrega sus valores en cada vuelta.
  - [ ] B) `Los índices de esta lista empiezan en 10.` — **whyIncorrect:** Los índices empiezan en 0, independientemente del valor almacenado.
  - [x] C) `i recibe 10 y 20; no son índices válidos.` — **Correcta.**
  - [ ] D) `Hace falta convertir cargas a texto.` — **whyIncorrect:** Cambiar el tipo no resuelve la confusión entre valor e índice.
- **Feedback correcto:** i recibe 10 y 20; no son índices válidos. El tipo de error es `IndexError`.

- **stdout:** vacío; el programa falla antes de imprimir.

- **Error aparte de stdout:** `IndexError`.


### Paso 4 (explanation): Visitar por posición

- **Explicación:** Cuando necesitas la posición, range(len(lista)) genera sus índices válidos. Así puedes consultar cada valor mediante su índice.

```python
cargas = [10, 20]
for i in range(len(cargas)):
    print(i, cargas[i])
```


- **Salida esperada (stdout):**

```text
0 10
1 20
```

- **Idea clave:** range(len(lista)) va desde 0 hasta len(lista) - 1.


### Paso 5 (predict): Última vuelta

- **Pregunta:** ¿Qué imprime este programa al terminar?

```python
cargas = [8, 6, 4]
for i in range(len(cargas)):
    ultimo = cargas[i]
print(i, ultimo)
```

- **Opciones:**
  - [ ] A) `3 4` — **whyIncorrect:** range(3) excluye el 3; el último índice visitado es 2.
  - [ ] B) `4 2` — **whyIncorrect:** print recibe primero el índice y después el valor, no al revés.
  - [ ] C) `2 6` — **whyIncorrect:** En la última vuelta el índice 2 selecciona el 4, no el 6.
  - [x] D) `2 4` — **Correcta.**
- **Feedback correcto:** 2 4. range(len(lista)) va desde 0 hasta len(lista) - 1.

- **Salida esperada (stdout):**

```text
2 4
```


### Paso 6 (code_sandbox): Recorrer todas las posiciones

- **Instrucción:** Completa el recorrido para imprimir 0 12 y luego 1 19.

```python
bloques = [12, 19]
for i in range(___):
    print(i, bloques[___])
```


**Ranura 1** (de arriba abajo).
- **Opciones de esta ranura:**
  - [x] A) `len(bloques)` — **Correcta.**
  - [ ] B) `len(bloques) - 1` — **whyIncorrect:** range(1) solo visita el índice 0; faltaría el segundo bloque.
  - [ ] C) `len(bloques) + 1` — **whyIncorrect:** range(3) incluye el índice 2, que está fuera de la lista.
  - [ ] D) `0` — **whyIncorrect:** range(0) no ejecuta ninguna vuelta; no imprimirías los bloques.

**Ranura 2** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `0` — **whyIncorrect:** Usar siempre 0 repite el primer bloque en todas las vueltas.
  - [ ] B) `-1` — **whyIncorrect:** Usar siempre -1 repite el último bloque, sin seguir el índice.
  - [ ] C) `i + 1` — **whyIncorrect:** Desplazas el acceso; omites el primero y sales de rango al final.
  - [x] D) `i` — **Correcta.**

- **Código completado:**

```python
bloques = [12, 19]
for i in range(len(bloques)):
    print(i, bloques[i])
```

- **Salida esperada (stdout):**

```text
0 12
1 19
```

- **Feedback al completar:** Ambas ranuras correctas producen la salida indicada; cada distractor explica qué operación o posición cambiaría.


### Paso 7 (predict): Recorrer una lista vacía

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = []
total = 0
for carga in cargas:
    total += carga
print(total)
```

- **Opciones:**
  - [x] A) `0` — **Correcta.**
  - [ ] B) `Ocurre IndexError.` — **whyIncorrect:** No hay accesos por índice y el ciclo no ejecuta ninguna vuelta.
  - [ ] C) `None` — **whyIncorrect:** total conserva el número 0 de su inicialización.
  - [ ] D) `No imprime nada.` — **whyIncorrect:** El print está fuera del ciclo y se ejecuta incluso sin elementos.
- **Feedback correcto:** 0. La lista vacía no produce iteraciones; total conserva su valor inicial y el print exterior se ejecuta.

- **Salida esperada (stdout):**

```text
0
```


### Paso 8 (explanation): Cantidad y frecuencia

- **Explicación:** Contar todos los casilleros no es contar cuántos tienen la misma etiqueta. len mide la cantidad total y count(valor) cuenta sus apariciones.

```python
bloques = [12, 19, 12]
print(len(bloques))
print(bloques.count(12))
print(bloques.count(21))
```


- **Salida esperada (stdout):**

```text
3
2
0
```

- **Idea clave:** count no modifica la lista y devuelve 0 si el valor no aparece.


### Paso 9 (predict): Repetidos permitidos

- **Pregunta:** ¿Qué imprime este programa?

```python
notas = [3, 4, 3, 5]
cantidad = notas.count(3)
print(cantidad, len(notas))
```

- **Opciones:**
  - [ ] A) `3 4` — **whyIncorrect:** count(3) cuenta apariciones del 3; no devuelve el valor buscado.
  - [ ] B) `2 2` — **whyIncorrect:** count no elimina elementos; la longitud sigue siendo 4.
  - [x] C) `2 4` — **Correcta.**
  - [ ] D) `1 3` — **whyIncorrect:** Las listas conservan duplicados; los dos valores 3 cuentan.
- **Feedback correcto:** 2 4. count no modifica la lista y devuelve 0 si el valor no aparece.

- **Salida esperada (stdout):**

```text
2 4
```


---

## Lección 4.4: Agregar elementos

- **ID propuesto:** `w4-l4`
- **Objetivo:** Ampliar una lista al final, en una posición o con los elementos de otra lista.
- **Pasos:** 9


### Paso 1 (explanation): Una muestra nueva

- **Explicación:** Como añadir una muestra al final de una bandeja, append agrega un elemento. Los que ya estaban conservan su orden.

```python
cargas = [10, 20]
cargas.append(30)
print(cargas)
```


- **Salida esperada (stdout):**

```text
[10, 20, 30]
```

- **Idea clave:** append(valor) añade un elemento al final.


### Paso 2 (predict): Construir una lista

- **Pregunta:** ¿Qué imprime este programa?

```python
pares = []
for n in range(2, 7, 2):
    pares.append(n)
print(pares)
```

- **Opciones:**
  - [x] A) `[2, 4, 6]` — **Correcta.**
  - [ ] B) `[2, 4]` — **whyIncorrect:** El fin 7 se excluye, pero 6 sí está dentro del recorrido.
  - [ ] C) `[0, 2, 4, 6]` — **whyIncorrect:** range comienza en 2; no genera el número 0.
  - [ ] D) `[6]` — **whyIncorrect:** append conserva los anteriores; no reemplaza toda la lista.
- **Feedback correcto:** [2, 4, 6]. append(valor) añade un elemento al final.

- **Salida esperada (stdout):**

```text
[2, 4, 6]
```


### Paso 3 (predict): Agregar no es asignar el retorno

- **Pregunta:** Se quería conservar [10, 20]. ¿Dónde está el error?

```python
cargas = [10]
cargas = cargas.append(20)
print(cargas)
```

- **Opciones:**
  - [ ] A) `append reemplaza el primer elemento por 20.` — **whyIncorrect:** append agrega al final; no reemplaza el valor que ya estaba.
  - [ ] B) `append requiere también un índice.` — **whyIncorrect:** append solo recibe el valor; insert es el método que recibe una posición.
  - [ ] C) `No se puede agregar a una lista de un elemento.` — **whyIncorrect:** Cualquier lista puede crecer; el fallo es asignar el retorno de append.
  - [x] D) `append devuelve None; la asignación pierde la referencia a la lista.` — **Correcta.**
- **Feedback correcto:** La lista se modifica, pero el método devuelve `None`; llama al método sin reasignar la variable.

- **Salida esperada (stdout):**

```text
None
```


### Paso 4 (explanation): Abrir espacio en medio

- **Explicación:** insert abre un casillero en la posición indicada y desplaza los siguientes. A diferencia de asignar por índice, no reemplaza el elemento existente.

```python
bloques = [12, 19]
bloques.insert(1, 14)
print(bloques)
```


- **Salida esperada (stdout):**

```text
[12, 14, 19]
```

- **Idea clave:** insert(indice, valor) añade el valor antes del elemento de ese índice.


### Paso 5 (predict): Desplazar posiciones

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10, 30]
cargas.insert(1, 20)
print(cargas[2], len(cargas))
```

- **Opciones:**
  - [ ] A) `20 3` — **whyIncorrect:** El nuevo 20 ocupa el índice 1; el 30 se desplaza al índice 2.
  - [x] B) `30 3` — **Correcta.**
  - [ ] C) `30 2` — **whyIncorrect:** insert agrega un elemento; la longitud aumenta de 2 a 3.
  - [ ] D) `20 2` — **whyIncorrect:** insert no reemplaza el 30; lo desplaza y aumenta la longitud.
- **Feedback correcto:** 30 3. insert(indice, valor) añade el valor antes del elemento de ese índice.

- **Salida esperada (stdout):**

```text
30 3
```


### Paso 6 (code_sandbox): Completar la ruta

- **Instrucción:** Completa los métodos para obtener [12, 14, 19, 21].

```python
bloques = [12, 19]
bloques.___(1, 14)
bloques.___(21)
print(bloques)
```


**Ranura 1** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `append` — **whyIncorrect:** append recibe un solo valor; aquí se pasan posición y valor.
  - [ ] B) `remove` — **whyIncorrect:** remove elimina un valor y no recibe dos argumentos.
  - [x] C) `insert` — **Correcta.**
  - [ ] D) `pop` — **whyIncorrect:** pop elimina por índice; no inserta un elemento nuevo.

**Ranura 2** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `insert` — **whyIncorrect:** insert requiere posición y valor; aquí solo se proporciona 21.
  - [x] B) `append` — **Correcta.**
  - [ ] C) `remove` — **whyIncorrect:** remove intenta eliminar el 21; no lo agrega y aún no existe.
  - [ ] D) `pop` — **whyIncorrect:** pop usaría 21 como índice para eliminar, fuera de esta lista.

- **Código completado:**

```python
bloques = [12, 19]
bloques.insert(1, 14)
bloques.append(21)
print(bloques)
```

- **Salida esperada (stdout):**

```text
[12, 14, 19, 21]
```

- **Feedback al completar:** Ambas ranuras correctas producen la salida indicada; cada distractor explica qué operación o posición cambiaría.


### Paso 7 (predict): Agregar un repetido

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10, 20]
cargas.append(10)
print(cargas)
```

- **Opciones:**
  - [ ] A) `[10, 20]` — **whyIncorrect:** Las listas admiten valores repetidos; append sí añade otro 10.
  - [ ] B) `[10, 10, 20]` — **whyIncorrect:** append añade al final, no junto al valor que coincide.
  - [ ] C) `[20, 10]` — **whyIncorrect:** append no elimina el primer 10; conserva todos los anteriores.
  - [x] D) `[10, 20, 10]` — **Correcta.**
- **Feedback correcto:** [10, 20, 10]. append agrega al final y conserva los valores repetidos.

- **Salida esperada (stdout):**

```text
[10, 20, 10]
```


### Paso 8 (explanation): Un lote de muestras

- **Explicación:** extend añade por separado los elementos de otra lista. append añade su argumento como un solo elemento, incluso si ese argumento es una lista.

```python
a = [10]
b = [10]
a.extend([20, 30])
b.append([20, 30])
print(a)
print(b)
```


- **Salida esperada (stdout):**

```text
[10, 20, 30]
[10, [20, 30]]
```

- **Idea clave:** extend incorpora los elementos; append incorpora un solo objeto.


### Paso 9 (predict): Incorporar un lote

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10]
cargas.extend([20, 30])
print(cargas, len(cargas))
```

- **Opciones:**
  - [x] A) `[10, 20, 30] 3` — **Correcta.**
  - [ ] B) `[10, [20, 30]] 2` — **whyIncorrect:** Ese sería el resultado de append; extend agrega los dos elementos.
  - [ ] C) `[20, 30] 2` — **whyIncorrect:** extend conserva la lista inicial y añade el lote al final.
  - [ ] D) `[10, 20, 30] 2` — **whyIncorrect:** La longitud cuenta los tres elementos, no el número de operaciones.
- **Feedback correcto:** [10, 20, 30] 3. extend incorpora los elementos; append incorpora un solo objeto.

- **Salida esperada (stdout):**

```text
[10, 20, 30] 3
```


---

## Lección 4.5: Eliminar elementos

- **ID propuesto:** `w4-l5`
- **Objetivo:** Elegir entre eliminar por posición o por valor y vaciar una lista.
- **Pasos:** 9


### Paso 1 (explanation): Retirar por posición

- **Explicación:** Como retirar la última muestra de una bandeja, pop elimina y entrega ese elemento. Sin argumento, usa la última posición.

```python
cargas = [10, 20, 30]
retirada = cargas.pop()
print(retirada)
print(cargas)
```


- **Salida esperada (stdout):**

```text
30
[10, 20]
```

- **Idea clave:** pop() retira el último; pop(i) retira el elemento del índice i.


### Paso 2 (predict): Retirar el primero

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10, 20, 30]
retirada = cargas.pop(0)
print(retirada, cargas)
```

- **Opciones:**
  - [ ] A) `0 [10, 20, 30]` — **whyIncorrect:** pop devuelve el valor retirado, no el índice, y sí modifica la lista.
  - [x] B) `10 [20, 30]` — **Correcta.**
  - [ ] C) `30 [10, 20]` — **whyIncorrect:** Eso corresponde a pop() sin argumento; aquí se indicó el índice 0.
  - [ ] D) `10 [10, 20, 30]` — **whyIncorrect:** El valor se retira de la lista; no basta con leerlo.
- **Feedback correcto:** 10 [20, 30]. pop() retira el último; pop(i) retira el elemento del índice i.

- **Salida esperada (stdout):**

```text
10 [20, 30]
```


### Paso 3 (predict): Valor usado como posición

- **Pregunta:** Se quería retirar el valor 20. ¿Por qué falla?

```python
cargas = [10, 20, 30]
cargas.pop(20)
print(cargas)
```

- **Opciones:**
  - [ ] A) `pop solo funciona sin argumentos.` — **whyIncorrect:** pop acepta un índice válido; el 20 está fuera de esta lista.
  - [ ] B) `20 no está en la lista.` — **whyIncorrect:** El valor 20 sí aparece; pop no busca valores, sino posiciones.
  - [x] C) `pop interpreta 20 como índice, que no existe.` — **Correcta.**
  - [ ] D) `No se pueden eliminar números.` — **whyIncorrect:** Los números se eliminan igual que otros elementos; el índice es el problema.
- **Feedback correcto:** pop interpreta 20 como índice, que no existe. El tipo de error es `IndexError`.

- **stdout:** vacío; el programa falla antes de imprimir.

- **Error aparte de stdout:** `IndexError`.


### Paso 4 (explanation): Retirar por etiqueta

- **Explicación:** remove busca el valor indicado y elimina su primera aparición. Los elementos posteriores se desplazan para cerrar el espacio.

```python
cargas = [10, 20, 10]
cargas.remove(10)
print(cargas)
```


- **Salida esperada (stdout):**

```text
[20, 10]
```

- **Idea clave:** remove(valor) elimina una aparición; no interpreta el argumento como índice.


### Paso 5 (predict): Solo la primera aparición

- **Pregunta:** ¿Qué imprime este programa?

```python
bloques = [12, 19, 12, 21]
bloques.remove(12)
print(bloques)
```

- **Opciones:**
  - [ ] A) `[19, 21]` — **whyIncorrect:** remove elimina solo la primera aparición, no todas las coincidencias.
  - [ ] B) `[12, 19, 21]` — **whyIncorrect:** Se elimina el primer 12 encontrado desde el inicio, no el segundo.
  - [ ] C) `Ocurre IndexError.` — **whyIncorrect:** remove recibe un valor; no intenta acceder al índice 12.
  - [x] D) `[19, 12, 21]` — **Correcta.**
- **Feedback correcto:** [19, 12, 21]. remove(valor) elimina una aparición; no interpreta el argumento como índice.

- **Salida esperada (stdout):**

```text
[19, 12, 21]
```


### Paso 6 (code_sandbox): Retirar por dos criterios

- **Instrucción:** Completa los argumentos para retirar primero el índice 0 y luego el valor 30; debe quedar [20].

```python
cargas = [10, 20, 30]
cargas.pop(___)
cargas.remove(___)
print(cargas)
```


**Ranura 1** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `10` — **whyIncorrect:** pop espera un índice; el valor 10 no es una posición válida.
  - [ ] B) `1` — **whyIncorrect:** El índice 1 retira 20, que es precisamente el valor que debemos conservar.
  - [x] C) `0` — **Correcta.**
  - [ ] D) `-1` — **whyIncorrect:** El índice -1 retira 30 antes de la operación remove(30).

**Ranura 2** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `1` — **whyIncorrect:** remove busca el valor 1, que no aparece en la lista.
  - [ ] B) `20` — **whyIncorrect:** Eliminar el valor 20 deja [30], no el resultado pedido.
  - [ ] C) `2` — **whyIncorrect:** remove busca el valor 2; no usa el índice de la lista original.
  - [x] D) `30` — **Correcta.**

- **Código completado:**

```python
cargas = [10, 20, 30]
cargas.pop(0)
cargas.remove(30)
print(cargas)
```

- **Salida esperada (stdout):**

```text
[20]
```

- **Feedback al completar:** Ambas ranuras correctas producen la salida indicada; cada distractor explica qué operación o posición cambiaría.


### Paso 7 (predict): Buscar un ausente

- **Pregunta:** ¿Qué ocurre en la segunda línea?

```python
cargas = [10, 20]
cargas.remove(30)
print(cargas)
```

- **Opciones:**
  - [ ] A) `La lista queda igual y se imprime.` — **whyIncorrect:** remove no ignora un valor ausente; genera ValueError antes del print.
  - [ ] B) `Elimina 20 por ser el último.` — **whyIncorrect:** Solo pop() sin argumento retira el último; remove busca el valor exacto.
  - [x] C) `Ocurre ValueError porque 30 no está.` — **Correcta.**
  - [ ] D) `Agrega 30 y luego lo elimina.` — **whyIncorrect:** remove no crea elementos cuando no encuentra el valor pedido.
- **Feedback correcto:** Ocurre ValueError porque 30 no está. El tipo de error es `ValueError`.

- **stdout:** vacío; el programa falla antes de imprimir.

- **Error aparte de stdout:** `ValueError`.


### Paso 8 (explanation): Una bandeja vacía

- **Explicación:** clear retira todos los elementos, pero la lista sigue existiendo. Después puedes volver a agregar elementos a ella.

```python
cargas = [10, 20]
cargas.clear()
print(cargas)
print(len(cargas))
```


- **Salida esperada (stdout):**

```text
[]
0
```

- **Idea clave:** clear() conserva la lista y deja su longitud en cero.


### Paso 9 (predict): Volver a usar la lista

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [10, 20]
cargas.clear()
cargas.append(30)
print(cargas)
```

- **Opciones:**
  - [ ] A) `Ocurre NameError.` — **whyIncorrect:** clear no elimina la variable; la lista sigue disponible para append.
  - [x] B) `[30]` — **Correcta.**
  - [ ] C) `[10, 20, 30]` — **whyIncorrect:** clear eliminó 10 y 20 antes de agregar 30.
  - [ ] D) `[]` — **whyIncorrect:** Después de clear se ejecuta append, que añade el nuevo elemento.
- **Feedback correcto:** [30]. clear() conserva la lista y deja su longitud en cero.

- **Salida esperada (stdout):**

```text
[30]
```


---

## Lección 4.6: Ordenar o invertir

- **ID propuesto:** `w4-l6`
- **Objetivo:** Distinguir ordenamiento, inversión del orden actual y creación de una lista ordenada nueva.
- **Pasos:** 9


### Paso 1 (explanation): Ordenar mediciones

- **Explicación:** Como acomodar muestras de menor a mayor peso, sort reorganiza una lista de números. La operación modifica la lista existente.

```python
cargas = [30, 10, 20]
cargas.sort()
print(cargas)
```


- **Salida esperada (stdout):**

```text
[10, 20, 30]
```

- **Idea clave:** sort() ordena de menor a mayor y devuelve None.


### Paso 2 (predict): Orden con repetidos

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [3, 1, 3, 2]
cargas.sort()
print(cargas)
```

- **Opciones:**
  - [x] A) `[1, 2, 3, 3]` — **Correcta.**
  - [ ] B) `[1, 2, 3]` — **whyIncorrect:** sort conserva las repeticiones; ordenar no elimina duplicados.
  - [ ] C) `[3, 3, 2, 1]` — **whyIncorrect:** Ese es el orden descendente; sort() usa el ascendente por defecto.
  - [ ] D) `[3, 1, 3, 2]` — **whyIncorrect:** sort modifica las posiciones de la lista original.
- **Feedback correcto:** [1, 2, 3, 3]. sort() ordena de menor a mayor y devuelve None.

- **Salida esperada (stdout):**

```text
[1, 2, 3, 3]
```


### Paso 3 (predict): El retorno de sort

- **Pregunta:** Se quería imprimir la lista ordenada. ¿Cuál es el fallo?

```python
cargas = [30, 10, 20]
cargas = cargas.sort()
print(cargas)
```

- **Opciones:**
  - [ ] A) `sort no funciona con números.` — **whyIncorrect:** Los números de esta lista sí se comparan y se ordenan correctamente.
  - [x] B) `Se asignó None, el retorno de sort, a cargas.` — **Correcta.**
  - [ ] C) `sort devuelve el primer número ordenado.` — **whyIncorrect:** sort devuelve None; la lista se modifica durante la llamada.
  - [ ] D) `Los datos debían estar ordenados antes.` — **whyIncorrect:** sort sirve para reorganizar datos desordenados; no exige orden previo.
- **Feedback correcto:** La lista se modifica, pero el método devuelve `None`; llama al método sin reasignar la variable.

- **Salida esperada (stdout):**

```text
None
```


### Paso 4 (explanation): Dar vuelta a la bandeja

- **Explicación:** reverse invierte las posiciones actuales sin comparar los valores. Cambiar de extremo no equivale a ordenar de mayor a menor.

```python
cargas = [30, 10, 20]
cargas.reverse()
print(cargas)
```


- **Salida esperada (stdout):**

```text
[20, 10, 30]
```

- **Idea clave:** reverse() invierte el orden actual y también devuelve None.


### Paso 5 (predict): Invertir sin ordenar

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [4, 1, 3]
cargas.reverse()
print(cargas)
```

- **Opciones:**
  - [x] A) `[3, 1, 4]` — **Correcta.**
  - [ ] B) `[4, 3, 1]` — **whyIncorrect:** Ese sería un orden descendente; reverse solo invierte las posiciones.
  - [ ] C) `[1, 3, 4]` — **whyIncorrect:** Ese sería un orden ascendente; reverse no compara los valores.
  - [ ] D) `[4, 1, 3]` — **whyIncorrect:** reverse sí cambia la lista; el primer y el último elemento intercambian lugar.
- **Feedback correcto:** [3, 1, 4]. reverse() invierte el orden actual y también devuelve None.

- **Salida esperada (stdout):**

```text
[3, 1, 4]
```


### Paso 6 (code_sandbox): Ordenar y después invertir

- **Instrucción:** Completa los métodos para imprimir primero [1, 2, 3] y luego [3, 2, 1].

```python
cargas = [3, 1, 2]
cargas.___()
print(cargas)
cargas.___()
print(cargas)
```


**Ranura 1** (de arriba abajo).
- **Opciones de esta ranura:**
  - [ ] A) `reverse` — **whyIncorrect:** Invertir [3, 1, 2] da [2, 1, 3], no el primer resultado pedido.
  - [x] B) `sort` — **Correcta.**
  - [ ] C) `clear` — **whyIncorrect:** Vaciar la lista elimina los datos que se deben ordenar.
  - [ ] D) `copy` — **whyIncorrect:** Una copia sin guardar su retorno no cambia el orden de cargas.

**Ranura 2** (de arriba abajo).
- **Opciones de esta ranura:**
  - [x] A) `reverse` — **Correcta.**
  - [ ] B) `sort` — **whyIncorrect:** Volver a ordenar de menor a mayor conserva [1, 2, 3].
  - [ ] C) `clear` — **whyIncorrect:** clear elimina todos los elementos; no produce un orden descendente.
  - [ ] D) `copy` — **whyIncorrect:** copy crea otra lista, pero no invierte la lista que se imprime.

- **Código completado:**

```python
cargas = [3, 1, 2]
cargas.sort()
print(cargas)
cargas.reverse()
print(cargas)
```

- **Salida esperada (stdout):**

```text
[1, 2, 3]
[3, 2, 1]
```

- **Feedback al completar:** Ambas ranuras correctas producen la salida indicada; cada distractor explica qué operación o posición cambiaría.


### Paso 7 (predict): Todos iguales

- **Pregunta:** ¿Qué imprime este programa?

```python
cargas = [2, 2, 2]
cargas.reverse()
print(cargas)
```

- **Opciones:**
  - [ ] A) `[]` — **whyIncorrect:** reverse reorganiza posiciones; no elimina valores repetidos.
  - [ ] B) `[2]` — **whyIncorrect:** La inversión conserva los tres elementos, incluso cuando son iguales.
  - [x] C) `[2, 2, 2]` — **Correcta.**
  - [ ] D) `None` — **whyIncorrect:** Se imprime la lista después de modificarla, no el retorno de reverse.
- **Feedback correcto:** [2, 2, 2]. reverse() invierte el orden actual y también devuelve None.

- **Salida esperada (stdout):**

```text
[2, 2, 2]
```


### Paso 8 (explanation): Ordenar otra bandeja

- **Explicación:** sorted crea una lista nueva y deja el orden original intacto. reverse=True pide el orden de mayor a menor; aquí no significa invertir sin ordenar.

```python
original = [3, 1, 2]
ordenada = sorted(original, reverse=True)
print(original)
print(ordenada)
```


- **Salida esperada (stdout):**

```text
[3, 1, 2]
[3, 2, 1]
```

- **Idea clave:** sorted devuelve otra lista; sort modifica la existente.


### Paso 9 (predict): Conservar el original

- **Pregunta:** ¿Qué imprime este programa?

```python
original = [4, 1, 3]
ordenada = sorted(original)
print(original)
print(ordenada)
```

- **Opciones:**
  - [ ] A) `[1, 3, 4] ⏎ [1, 3, 4]` — **whyIncorrect:** sorted no modifica original; solo la nueva lista queda ordenada.
  - [ ] B) `[4, 1, 3] ⏎ None` — **whyIncorrect:** sorted devuelve una lista nueva; quien devuelve None es el método sort.
  - [ ] C) `[4, 1, 3] ⏎ [3, 1, 4]` — **whyIncorrect:** sorted compara los valores; invertir las posiciones sería reverse.
  - [x] D) `[4, 1, 3] ⏎ [1, 3, 4]` — **Correcta.**
- **Feedback correcto:** [4, 1, 3] ⏎ [1, 3, 4]. sorted devuelve otra lista; sort modifica la existente.

- **Salida esperada (stdout):**

```text
[4, 1, 3]
[1, 3, 4]
```


---

## Auditoría previa a la aprobación

**Revisión de Codex:** 9 de octubre de 2026. Se revalidaron los 54 pasos con CPython y se ajustaron los feedbacks de acceso, slicing, recorrido vacío y elementos repetidos.

- **Estructura:** 6 lecciones de 9 pasos; secuencia canónica 1–7 y refuerzo explicado en 8, evaluado en 9.
- **Balance total (42 decisiones):** A=11, B=11, C=10, D=10; 26,2%, 26,2%, 23,8%, 23,8%. No hay aciertos consecutivos en la misma letra.
- **Preguntas (30):** A=8, B=8, C=7, D=7.
- **Ranuras (12):** A=3, B=3, C=3, D=3.
- **Opciones:** cuatro por decisión; 126 distractores con explicación específica de al menos 20 caracteres.
- **Código:** todos los snippets tienen 3–7 líneas y comienzan en columna 0; los cuerpos de ciclos usan cuatro espacios.
- **Ejecución:** 54 snippets ejecutados de forma aislada con CPython, incluidas las seis prácticas completadas; los errores intencionales se comprueban por tipo y se separan de stdout.
- **Concisión:** cada explicación o pregunta tiene como máximo dos oraciones, más una idea clave corta. El límite de 15 segundos es una pauta de diseño; el tiempo real y la ausencia de scroll se verificarán en la interfaz durante la Fase 2.
- **Estado:** aprobado e implementado en v1.53. Se verificaron 144 ejecuciones CPython y su carga por el motor JavaScript, incluyendo todas las combinaciones de las prácticas y sus estados de memoria. La comprobación visual de navegación, audio, confeti y scroll queda pendiente: no había navegador conectado en esta sesión.

## Aprobación registrada

El docente respondió «apruebo» el 9 de octubre de 2026.
