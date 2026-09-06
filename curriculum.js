/**
 * pyMinas — Plataforma Interactiva de Fundamentos de Programación
 * Facultad de Minas · Universidad Nacional de Colombia - Sede Medellín
 * Diseñado pedagógicamente para estudiantes de ingeniería.
 * Enfoque: Intuición primero, retos táctiles, progresión guiada y ejecución en vivo.
 */

const CURRICULUM = {
  courseTitle: "pyMinas: Fundamentos de Programación",
  courseSubtitle: "Facultad de Minas · Universidad Nacional de Colombia. Construye bases sólidas en programación con práctica guiada e interactiva.",
  weeks: [
    {
      id: "semana-1",
      number: 1,
      title: "Semana 1: Introducción (31 ago - 6 sep)",
      description: "Fundamentos de programación, ciclo E-P-S, tipos, operadores y math.",
      status: "active",
      lessons: [
        // ==========================================
        // LECCIÓN 1: Estructura Python
        // ==========================================
        {
          id: "w1-l1",
          weekId: "semana-1",
          number: 1,
          tag: "Fundamentos",
          shortTitle: "Estructura Python",
          title: "¿Qué es programar y por qué Python?",
          description: "Algoritmos, código fuente, lenguajes compilados vs interpretados y el orden secuencial.",
          duration: "10 min",
          steps: [
            {
              type: "explanation",
              partLabel: "Paso 1 · El concepto",
              title: "¿Qué es programar y qué es un algoritmo?",
              intro: "Una computadora es increíblemente rápida, pero no sabe qué hacer por su cuenta. <strong>Programar</strong> es darle una serie de instrucciones claras y ordenadas para resolver una tarea.",
              examples: [
                {
                  label: "La receta de cocina",
                  code: `# En programación, esta secuencia lógica se llama ALGORITMO:
# 1. Poner agua a hervir
# 2. Agregar el café
# 3. Servir en la taza
print("¡Café listo para beber!")`,
                  output: "¡Café listo para beber!",
                  explanation: "Si intentas servir antes de hervir el agua, todo falla. Un algoritmo necesita un orden estricto."
                }
              ],
              keyTakeaway: "El texto con instrucciones que escribes en un lenguaje entendible (como Python) se llama <strong>código fuente</strong>."
            },
            {
              type: "predict",
              partLabel: "Paso 2 · Intuición algorítmica",
              title: "¿Cuál es un algoritmo correcto?",
              question: "Imagina que le das instrucciones a un robot para cruzar una calle con seguridad. ¿Cuál secuencia representa un algoritmo correcto?",
              theory: "Recuerda que una máquina no puede adivinar tus intenciones: solo sigue el orden exacto que tú le indiques.",
              options: [
                { 
                  id: "A", 
                  text: "Caminar hacia adelante -> Mirar el semáforo -> Detenerse en medio de la calle", 
                  isCorrect: false,
                  whyIncorrect: "Si caminas antes de mirar el semáforo, corres grave peligro. Un algoritmo debe verificar las condiciones de seguridad antes de actuar."
                },
                { 
                  id: "B", 
                  text: "Mirar el semáforo -> Esperar luz verde peatonal -> Mirar a ambos lados -> Cruzar la calle", 
                  isCorrect: true 
                },
                { 
                  id: "C", 
                  text: "Cruzar corriendo con los ojos cerrados -> Esperar que no pasen vehículos", 
                  isCorrect: false,
                  whyIncorrect: "No tiene lógica de seguridad ni pasos ordenados. Las computadoras necesitan instrucciones exactas y verificables."
                }
              ],
              correctionTip: "Un algoritmo debe ser lógico, seguro y con pasos en el orden correcto antes de ejecutar una acción crítica.",
              fullAnswerExplanation: "La opción B es un algoritmo real: verifica las condiciones necesarias antes de actuar. Las computadoras necesitan esta misma precisión."
            },
            {
              type: "explanation",
              partLabel: "Paso 3 · Lenguaje interpretado",
              title: "Python: Un lenguaje interpretado",
              intro: "¿Por qué elegimos Python? Porque se lee casi como inglés y es el lenguaje más usado en Inteligencia Artificial y Ciencia de Datos.",
              examples: [
                {
                  label: "Ejecución línea por línea",
                  code: `# Python lee tu archivo de arriba hacia abajo:
print("Línea 1: Verificando datos")
print("Línea 2: Procesando cálculo")
print("Línea 3: Operación terminada")`,
                  output: "Línea 1: Verificando datos\nLínea 2: Procesando cálculo\nLínea 3: Operación terminada",
                  explanation: "A diferencia de lenguajes compilados (como C) que deben traducirse por completo antes de abrirse, el intérprete de Python lee y ejecuta tu código línea por línea en tiempo real."
                }
              ],
              keyTakeaway: "Si hay un error en la línea 10, Python ejecutará con éxito las líneas 1 a la 9 y se detendrá exactamente en la 10 explicándote qué ocurrió."
            },
            {
              type: "predict",
              partLabel: "Paso 4 · Orden de ejecución",
              title: "¿En qué orden se ejecuta?",
              question: "¿Qué texto exacto imprimirá Python en SEGUNDO lugar al ejecutar este código?",
              code: `print("Conectando al servidor...")
print("Cargando perfil de usuario")
print("¡Bienvenido al sistema!")`,
              options: [
                { 
                  id: "A", 
                  text: "\"Cargando perfil de usuario\"", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "\"Conectando al servidor...\"", 
                  isCorrect: false,
                  whyIncorrect: "Esta es la primera línea que se ejecuta, no la segunda."
                },
                { 
                  id: "C", 
                  text: "\"¡Bienvenido al sistema!\"", 
                  isCorrect: false,
                  whyIncorrect: "Esta es la tercera y última línea del código; se imprimirá al final."
                },
                { 
                  id: "D", 
                  text: "Todas se imprimen a la vez", 
                  isCorrect: false,
                  whyIncorrect: "Python es un lenguaje interpretado que avanza estrictamente de arriba hacia abajo, una instrucción a la vez."
                }
              ],
              correctionTip: "Python es secuencial: la línea 1 va primero, la línea 2 va después, y la línea 3 al final.",
              fullAnswerExplanation: "La línea 2 («Cargando perfil de usuario») se ejecuta estrictamente después de la línea 1 y antes de la 3."
            },
            {
              type: "predict",
              partLabel: "Paso 5 · Comentarios (#)",
              title: "El superpoder del símbolo #",
              question: "En Python, las líneas que inician con el símbolo # son comentarios para humanos. ¿Qué mensaje se verá en pantalla?",
              code: `print("Modo normal activado")
# print("Modo de prueba secreto")
print("Todo funcionando correctamente")`,
              options: [
                { 
                  id: "A", 
                  text: "Solo \"Modo normal activado\" y \"Todo funcionando correctamente\"", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "Los tres mensajes completos", 
                  isCorrect: false,
                  whyIncorrect: "La línea con el '#' al inicio es ignorada por el intérprete de Python, por lo que nunca se muestra."
                },
                { 
                  id: "C", 
                  text: "Solo \"Modo de prueba secreto\"", 
                  isCorrect: false,
                  whyIncorrect: "Al tener '#' al principio, justamente esa línea es la única que NO se ejecutará."
                },
                { 
                  id: "D", 
                  text: "Dará un error por el símbolo #", 
                  isCorrect: false,
                  whyIncorrect: "El símbolo '#' es una característica estándar de Python y nunca genera error: se usa para escribir notas humanas."
                }
              ],
              correctionTip: "El intérprete de Python ignora por completo cualquier línea o texto que comience con el símbolo #.",
              fullAnswerExplanation: "El símbolo '#' convierte la línea en invisible para la máquina. Los programadores lo usamos para tomar notas o desactivar código temporalmente."
            },
            {
              type: "code_sandbox",
              partLabel: "Paso 6 · Práctica guiada",
              title: "Completa y ejecuta tu primer programa",
              instruction: "Elige la instrucción correcta para completar la última línea y mostrar tu meta de programación en pantalla.",
              starterCode: `# Mi primer programa en Python
print("¡Hola mundo!")
print("Mi nombre es: Estudiante")
___`,
              slotMarker: "___",
              options: [
                {
                  id: "A",
                  code: 'print("Meta: Crear mis propios proyectos")',
                  label: 'print("Meta: Crear mis propios proyectos")',
                  isCorrect: true,
                  feedback: "¡Excelente! print() es la instrucción que muestra texto en la pantalla."
                },
                {
                  id: "B",
                  code: '"Meta: Crear mis propios proyectos"',
                  label: '"Meta: Crear mis propios proyectos"',
                  isCorrect: false,
                  feedback: "El texto se crearía en memoria, pero sin la función print() nunca aparecerá en pantalla."
                },
                {
                  id: "C",
                  code: 'imprimir("Meta: Crear mis propios proyectos")',
                  label: 'imprimir("Meta: Crear mis propios proyectos")',
                  isCorrect: false,
                  feedback: "En Python las funciones están en inglés ('print'). Usar 'imprimir' produce NameError."
                }
              ]
            }
          ]
        },

        // ==========================================
        // LECCIÓN 2: Programas (E -> P -> S)
        // ==========================================
        {
          id: "w1-l2",
          weekId: "semana-1",
          number: 2,
          tag: "Arquitectura",
          shortTitle: "Programas",
          title: "Esquema general de un programa (E -> P -> S)",
          description: "El ciclo vital de todo software: Entrada (datos) -> Procesamiento (cálculo) -> Salida (print).",
          duration: "12 min",
          steps: [
            {
              type: "explanation",
              partLabel: "Paso 1 · El ciclo universal",
              title: "Las 3 etapas: Entrada ➔ Procesamiento ➔ Salida",
              intro: "Cualquier programa en el mundo —desde la app del clima hasta el buscador de Google— realiza exactamente el mismo ciclo de 3 pasos.",
              examples: [
                {
                  label: "La fábrica de software",
                  code: `# 1. ENTRADA: Llegan los datos iniciales
precio = 100
descuento = 20
print("Precio original: $", precio, sep="")
print("Descuento: $", descuento, sep="")

# 2. PROCESAMIENTO: La máquina calcula
total = precio - descuento

# 3. SALIDA: Mostramos el resultado al usuario
print("Total a pagar con descuento: $", total, sep="")`,
                  output: "Precio original: $100\nDescuento: $20\nTotal a pagar con descuento: $80",
                  explanation: "Sin entrada no hay qué procesar; sin procesamiento no hay valor; sin salida el usuario nunca se entera del resultado."
                }
              ],
              keyTakeaway: "En Python usamos variables o <code>input()</code> para la Entrada, operadores para el Procesamiento, y <code>print()</code> para la Salida."
            },
            {
              type: "predict",
              partLabel: "Paso 2 · Identificar etapas",
              title: "¿Qué etapa representa esta línea?",
              question: "Observa la línea central (total_puntos = monedas * 10): ¿a cuál de las 3 etapas (Entrada, Procesamiento, Salida) corresponde?",
              code: `monedas = 15
total_puntos = monedas * 10
print("Puntos calculados:", total_puntos)`,
              options: [
                { 
                  id: "A", 
                  text: "Procesamiento (calcula un nuevo valor en memoria)", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "Salida (muestra datos en la pantalla con print)", 
                  isCorrect: false,
                  whyIncorrect: "La salida ocurre en la línea 3 con print(). La línea 2 realiza el cálculo matemático en la memoria."
                },
                { 
                  id: "C", 
                  text: "Entrada (solicita datos al usuario por teclado)", 
                  isCorrect: false,
                  whyIncorrect: "La asignación inicial 'monedas = 15' representa los datos de entrada. La línea 2 multiplica."
                },
                { 
                  id: "D", 
                  text: "Compilación", 
                  isCorrect: false,
                  whyIncorrect: "La compilación es un proceso técnico del sistema, no una de las 3 etapas (E-P-S) de tu programa."
                }
              ],
              correctionTip: "La línea 1 define la entrada (15), la línea 2 procesa (multiplica por 10), y la línea 3 produce la salida con print().",
              fullAnswerExplanation: "La instrucción 'total_puntos = monedas * 10' toma el valor de monedas y realiza una operación matemática interna en la memoria de la máquina. Esa es la etapa de Procesamiento."
            },
            {
              type: "explanation",
              partLabel: "Paso 3 · Control de Salida",
              title: "Dominando print(): Parámetros sep y end",
              intro: "La función <code>print()</code> es más poderosa de lo que parece. Por defecto separa con un espacio y salta de renglón al final, pero puedes cambiarlo.",
              examples: [
                {
                  label: "Personalizando el separador",
                  code: `# sep define qué va entre cada elemento:
print("2026", "09", "04", sep="-")

# end define qué va al final (por defecto es salto de línea):
print("Hola", end=" ")
print("Mundo")`,
                  output: "2026-09-04\nHola Mundo",
                  explanation: "Con sep='-' unimos los textos con un guion. Con end=' ' evitamos que la siguiente línea baje al siguiente renglón."
                }
              ],
              keyTakeaway: "<code>sep</code> = separador entre elementos. <code>end</code> = carácter final que se imprime después de todo."
            },
            {
              type: "predict",
              partLabel: "Paso 4 · El separador sep",
              title: "¿Cómo funciona sep exactamente?",
              question: "¿Cuál será la salida exacta producida por esta instrucción?",
              code: `print("Python", "es", "genial", sep="*")`,
              options: [
                { 
                  id: "A", 
                  text: "\"Python*es*genial\"", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "\"*Python*es*genial*\"", 
                  isCorrect: false,
                  whyIncorrect: "El parámetro sep solo se inserta ENTRE los elementos, nunca en los extremos exteriores."
                },
                { 
                  id: "C", 
                  text: "\"Python es genial*\"", 
                  isCorrect: false,
                  whyIncorrect: "sep='*' reemplaza el espacio entre cada una de las palabras, no solo al final."
                },
                { 
                  id: "D", 
                  text: "\"Python* es* genial\"", 
                  isCorrect: false,
                  whyIncorrect: "sep='*' sustituye por completo el espacio habitual, no añade asteriscos con espacios."
                }
              ],
              correctionTip: "El parámetro sep (separador) solo se coloca ENTRE los elementos, nunca al principio ni al final.",
              fullAnswerExplanation: "El asterisco sustituye el espacio habitual y se ubica únicamente entre las palabras."
            },
            {
              type: "visualizer_print",
              partLabel: "Paso 5 · Laboratorio interactivo",
              title: "Experimenta con el separador sep",
              theory: "Haz clic en los diferentes botones para ver cómo cambia la salida en tiempo real."
            },
            {
              type: "code_sandbox",
              partLabel: "Paso 6 · Práctica guiada",
              title: "Crea un ticket de compra con E-P-S",
              instruction: "Completa la etapa de Procesamiento sumando las variables de los productos para calcular el total a pagar.",
              starterCode: `# 1. ENTRADA (Datos iniciales):
producto_a = 45
producto_b = 30

# 2. PROCESAMIENTO (Suma los dos productos):
total = ___

# 3. SALIDA (Muestra el ticket):
print("Producto 1: $", producto_a, sep="")
print("Producto 2: $", producto_b, sep="")
print("Total a pagar: $", total, sep="")`,
              slotMarker: "___",
              options: [
                {
                  id: "A",
                  code: "producto_a + producto_b",
                  label: "producto_a + producto_b",
                  isCorrect: true,
                  feedback: "¡Perfecto! Sumas las dos variables numéricas para obtener el total exacto ($75)."
                },
                {
                  id: "B",
                  code: '"producto_a" + "producto_b"',
                  label: '"producto_a" + "producto_b"',
                  isCorrect: false,
                  feedback: "Al poner comillas, Python une los nombres como texto y daría 'producto_aproducto_b'."
                },
                {
                  id: "C",
                  code: "producto_a * producto_b",
                  label: "producto_a * producto_b",
                  isCorrect: false,
                  feedback: "El asterisco multiplica en lugar de sumar (daría $1350 en lugar de $75)."
                }
              ]
            }
          ]
        },

        // ==========================================
        // LECCIÓN 3: Tipos de datos
        // ==========================================
        {
          id: "w1-l3",
          weekId: "semana-1",
          number: 3,
          tag: "Datos",
          shortTitle: "Tipos de datos",
          title: "Tipos de datos y conversiones (Casting)",
          description: "Enteros (int), decimales (float), texto (str), booleanos (bool) y la función input().",
          duration: "15 min",
          steps: [
            {
              type: "explanation",
              partLabel: "Paso 1 · Los 4 tipos esenciales",
              title: "¿Qué es un tipo de dato en Python?",
              intro: "En el mundo real no puedes multiplicar una manzana por un zapato. En programación pasa lo mismo: cada dato tiene una etiqueta que define qué podemos hacer con él.",
              examples: [
                {
                  label: "Los 4 tipos primitivos",
                  code: `nombre = "Lucía"   # str: texto (entre comillas)
edad = 20          # int: número entero (sin decimales)
precio = 19.99     # float: número con punto decimal
activo = True      # bool: booleano (True o False)

print("Nombre (str):", nombre)
print("Edad (int):", edad)
print("Precio (float): $", precio, sep="")
print("Activo (bool):", activo)`,
                  output: "Nombre (str): Lucía\nEdad (int): 20\nPrecio (float): $19.99\nActivo (bool): True",
                  explanation: "Las comillas hacen toda la diferencia: 20 es un número operable, pero \"Lucía\" es texto. Cada tipo tiene su propio propósito."
                }
              ],
              keyTakeaway: "Python deduce el tipo automáticamente, pero tú debes tener claro si estás manejando texto o números."
            },
            {
              type: "predict",
              partLabel: "Paso 2 · La gran trampa de principiantes",
              title: "¿Número o texto?",
              question: "Observa este código con atención: ¿cuál es la salida exacta en pantalla?",
              code: `a = "5"
b = "5"
print(a + b)`,
              options: [
                { 
                  id: "A", 
                  text: "\"55\"", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "10", 
                  isCorrect: false,
                  whyIncorrect: "Como '5' tiene comillas, Python lo trata como texto (str). El signo '+' entre textos los pega (concatena) formando '55', no los suma como números."
                },
                { 
                  id: "C", 
                  text: "Error: no se pueden sumar", 
                  isCorrect: false,
                  whyIncorrect: "En Python sí se pueden 'sumar' textos: la operación se llama concatenación y une los textos uno al lado del otro."
                },
                { 
                  id: "D", 
                  text: "\"10\"", 
                  isCorrect: false,
                  whyIncorrect: "La concatenación une los caracteres literales '5' y '5', dando '55'."
                }
              ],
              correctionTip: "¡Cuidado clásico! Al poner comillas \"5\", son textos (str). El operador + entre dos textos los 'pega' uno tras otro (concatenación).",
              fullAnswerExplanation: "Como son cadenas de texto, el signo + las concatena. Para que dé 10, tendríamos que escribir a = 5 y b = 5 sin comillas."
            },
            {
              type: "explanation",
              partLabel: "Paso 3 · Conversión de tipos (Casting)",
              title: "Cómo transformar datos: int(), float() y str()",
              intro: "A veces recibes un número guardado como texto y necesitas convertirlo para hacer cálculos. A esta transformación la llamamos <strong>casting</strong>.",
              examples: [
                {
                  label: "Funciones de conversión",
                  code: `# 1. De texto "40" a entero con int():
numero = int("40") + 10
print("Texto \"40\" a entero + 10 =", numero)

# 2. De entero 7 a decimal con float():
decimal = float(7)
print("Entero 7 a decimal =", decimal)

# 3. De número 100 a texto con str():
texto = str(100) + " puntos"
print("Número 100 a texto =", texto)`,
                  output: "Texto \"40\" a entero + 10 = 50\nEntero 7 a decimal = 7.0\nNúmero 100 a texto = 100 puntos",
                  explanation: "Si el usuario escribe \"18\" por teclado, input() te da texto. Para sumarle 1 año, debes usar int(input())."
                }
              ],
              keyTakeaway: "<code>int()</code> convierte a entero, <code>float()</code> a decimal, y <code>str()</code> a texto."
            },
            {
              type: "predict",
              partLabel: "Paso 4 · Conversión de tipos",
              title: "¿Cómo transformar texto en número?",
              question: "El usuario escribió su edad y se guardó como texto \"18\". ¿Qué función de conversión completa el recuadro para sumarle 2 años?",
              code: `edad_texto = "18"
edad_numero = ___(edad_texto)
print(edad_numero + 2)`,
              options: [
                { 
                  id: "A", 
                  text: "int", 
                  slotText: "int",
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "str", 
                  slotText: "str",
                  isCorrect: false,
                  whyIncorrect: "str() mantiene el valor como texto '18'. En Python no puedes sumar un texto con un número int."
                },
                { 
                  id: "C", 
                  text: "float", 
                  slotText: "float",
                  isCorrect: false,
                  whyIncorrect: "float() lo transformaría en decimal 18.0. Para representar años cumplidos se utiliza un número entero con int()."
                },
                { 
                  id: "D", 
                  text: "bool", 
                  slotText: "bool",
                  isCorrect: false,
                  whyIncorrect: "bool() lo convertiría en el booleano True, perdiendo por completo el número 18."
                }
              ],
              correctionTip: "Para convertir una cadena de texto numérico a entero operable matemáticamente, usamos int().",
              fullAnswerExplanation: "int('18') transforma el texto en el entero 18. Al sumarle 2, Python realiza la suma matemática y muestra 20."
            },
            {
              type: "visualizer_input",
              partLabel: "Paso 5 · Máquina de conversión",
              title: "Laboratorio: Conversión de tipos en RAM",
              theory: "Observa cómo un texto entre comillas pasa por el conversor y se transforma en un número listo para operar."
            },
            {
              type: "code_sandbox",
              partLabel: "Paso 6 · Práctica guiada",
              title: "Calculadora de edad con conversión",
              instruction: "El año de nacimiento fue recibido como texto (\"2005\"). Elige la conversión adecuada a número entero para poder calcular la edad.",
              starterCode: `# Dato recibido como texto (como si viniera de input):
nacimiento_texto = "2005"
anio_actual = 2026

# Convierte a entero:
nacimiento_numero = ___

# Calcula la edad:
edad = anio_actual - nacimiento_numero

print("Año de nacimiento:", nacimiento_numero)
print("Tu edad en", anio_actual, "es:", edad, "años")`,
              slotMarker: "___",
              options: [
                {
                  id: "A",
                  code: "int(nacimiento_texto)",
                  label: "int(nacimiento_texto)",
                  isCorrect: true,
                  feedback: "¡Excelente! int() convierte el texto \"2005\" al entero 2005, permitiendo calcular: 2026 - 2005 = 21 años."
                },
                {
                  id: "B",
                  code: "str(nacimiento_texto)",
                  label: "str(nacimiento_texto)",
                  isCorrect: false,
                  feedback: "str() lo deja como cadena de texto. En Python restar texto de un número (2026 - \"2005\") causa un TypeError."
                },
                {
                  id: "C",
                  code: "float(\"edad\")",
                  label: "float(\"edad\")",
                  isCorrect: false,
                  feedback: "La palabra \"edad\" entre comillas no es un número y aún no existe; produce un ValueError."
                }
              ]
            }
          ]
        },

        // ==========================================
        // LECCIÓN 4: Operadores aritméticos
        // ==========================================
        {
          id: "w1-l4",
          weekId: "semana-1",
          number: 4,
          tag: "Operadores",
          shortTitle: "Operadores",
          title: "Operadores aritméticos y su jerarquía",
          description: "Suma (+), resta (-), mult (*), división real (/), floor (//), módulo (%) y potencia (**).",
          duration: "15 min",
          steps: [
            {
              type: "explanation",
              partLabel: "Paso 1 · Los 7 operadores",
              title: "Las matemáticas en Python: 7 herramientas clave",
              intro: "Python cuenta con los operadores tradicionales que ya conoces, más 3 operadores especiales que todo programador utiliza constantemente.",
              examples: [
                {
                  label: "Los 3 operadores estrella de Python",
                  code: `# 1. Exponente o potencia (**):
print("2 ** 3 =", 2 ** 3)

# 2. División entera // (descarta decimales):
print("14 // 4 =", 14 // 4)

# 3. Módulo % (residuo de la división):
print("14 % 4 =", 14 % 4)`,
                  output: "2 ** 3 = 8\n14 // 4 = 3\n14 % 4 = 2",
                  explanation: "¡Atención! En programación el símbolo % NO calcula porcentajes. Calcula el sobrante o residuo de una división entera."
                }
              ],
              keyTakeaway: "<code>/</code> = división con decimales. <code>//</code> = división entera sin decimales. <code>%</code> = residuo sobrante. <code>**</code> = potencia."
            },
            {
              type: "predict",
              partLabel: "Paso 2 · División real vs División entera",
              title: "¿Cuál es la diferencia entre / y //?",
              question: "Observa estas dos divisiones con los mismos números. ¿Cuál será la salida de cada una?",
              code: `print(10 / 2)
print(10 // 2)`,
              options: [
                { 
                  id: "A", 
                  text: "5.0 y 5 (la primera da float decimal, la segunda da int entero)", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "5 y 5 (ambas dan números enteros)", 
                  isCorrect: false,
                  whyIncorrect: "La división '/' siempre produce un tipo float con punto decimal (.0), aunque el resultado sea matemáticamente exacto."
                },
                { 
                  id: "C", 
                  text: "5.0 y 5.0 (ambas dan números con decimales)", 
                  isCorrect: false,
                  whyIncorrect: "El operador '//' (floor division) descarta los decimales y entrega un entero (int)."
                },
                { 
                  id: "D", 
                  text: "Error en la segunda línea", 
                  isCorrect: false,
                  whyIncorrect: "El operador '//' es completamente válido en Python y se utiliza para divisiones enteras."
                }
              ],
              correctionTip: "La división normal / SIEMPRE devuelve un decimal (float), aunque la división sea exacta. // devuelve un entero (int).",
              fullAnswerExplanation: "Incluso si 10 entre 2 es exacto, 10 / 2 produce 5.0 (float). En cambio 10 // 2 produce el entero 5."
            },
            {
              type: "predict",
              partLabel: "Paso 3 · El operador Módulo %",
              title: "Comprendiendo el residuo (%)",
              question: "Imagina que tienes 17 galletas y las repartes equitativamente entre 5 niños. ¿Qué resultado imprimirá la variable sobrante?",
              code: `galletas = 17
ninos = 5
sobrante = galletas % ninos
print(sobrante)`,
              options: [
                { 
                  id: "A", 
                  text: "2 galletas", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "3 galletas", 
                  isCorrect: false,
                  whyIncorrect: "3 es el cociente (cuántas galletas recibe cada niño: 17 // 5 = 3), pero el operador '%' calcula lo que sobra (residuo)."
                },
                { 
                  id: "C", 
                  text: "3.4 galletas", 
                  isCorrect: false,
                  whyIncorrect: "El módulo '%' siempre entrega el residuo entero de la división, no un resultado con decimales."
                },
                { 
                  id: "D", 
                  text: "0 galletas", 
                  isCorrect: false,
                  whyIncorrect: "La división no es exacta: 5 niños * 3 galletas = 15 galletas entregadas, por lo que sobran 2 galletas en el plato."
                }
              ],
              correctionTip: "5 niños x 3 galletas = 15 galletas entregadas. ¿Cuánto falta para llegar a 17? Faltan 2 galletas.",
              fullAnswerExplanation: "A cada niño le tocan 3 galletas (17 // 5 = 3) y sobran 2 galletas en el plato (17 % 5 = 2)."
            },
            {
              type: "explanation",
              partLabel: "Paso 4 · Jerarquía de operaciones",
              title: "La regla de precedencia (PEMDAS)",
              intro: "Al igual que en álgebra, Python sigue un orden estricto para resolver operaciones combinadas en una misma línea.",
              examples: [
                {
                  label: "Orden de prioridad",
                  code: `# Sin paréntesis: la multiplicación se resuelve primero (3 * 4 = 12)
calculo1 = 2 + 3 * 4
print("2 + 3 * 4 =", calculo1)

# Con paréntesis: la suma se resuelve primero (2 + 3 = 5)
calculo2 = (2 + 3) * 4
print("(2 + 3) * 4 =", calculo2)`,
                  output: "2 + 3 * 4 = 14\n(2 + 3) * 4 = 20",
                  explanation: "Si quieres que la suma se haga primero, debes usar paréntesis: (2 + 3) * 4 = 20."
                }
              ],
              keyTakeaway: "Si tienes dudas sobre qué se resolverá primero, usa paréntesis <code>()</code> para controlar el orden con total seguridad."
            },
            {
              type: "predict",
              partLabel: "Paso 5 · Reto de jerarquía",
              title: "¿Cuál es el resultado de la expresión?",
              question: "Siguiendo las reglas de jerarquía (paréntesis -> potencias -> multiplicación -> suma), ¿cuál es el resultado de x?",
              code: `x = 10 + 2 * 3 ** 2
print(x)`,
              options: [
                { 
                  id: "A", 
                  text: "28", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "108", 
                  isCorrect: false,
                  whyIncorrect: "Si sumas 10 + 2 antes de multiplicar y elevar a la potencia, violas la jerarquía. La suma siempre se evalúa al final."
                },
                { 
                  id: "C", 
                  text: "36", 
                  isCorrect: false,
                  whyIncorrect: "Recuerda que la potencia 3**2 se evalúa antes de multiplicar por 2."
                },
                { 
                  id: "D", 
                  text: "144", 
                  isCorrect: false,
                  whyIncorrect: "No se evalúa de izquierda a derecha ciegamente; la jerarquía PEMDAS da prioridad a las potencias y multiplicaciones."
                }
              ],
              correctionTip: "Paso 1: Exponente 3 ** 2 = 9. Paso 2: Multiplicación 2 * 9 = 18. Paso 3: Suma 10 + 18 = 28.",
              fullAnswerExplanation: "Los exponentes tienen prioridad sobre la multiplicación, y esta a su vez sobre la suma."
            },
            {
              type: "code_sandbox",
              partLabel: "Paso 6 · Práctica guiada",
              title: "Convertidor de minutos a horas y minutos",
              instruction: "Selecciona el operador adecuado para calcular las horas enteras a partir de un total de 195 minutos y ejecuta el código.",
              slotMarker: "___",
              starterCode: `total_minutos = 195

# 1 hora tiene 60 minutos
horas = total_minutos ___ 60
minutos_sobrantes = total_minutos % 60

print("Total inicial:", total_minutos, "minutos")
print("Equivale a:", horas, "horas y", minutos_sobrantes, "minutos")`,
              options: [
                {
                  id: "A",
                  code: "//",
                  label: "// (División entera)",
                  isCorrect: true,
                  feedback: "¡Excelente! La división entera // calcula cuántas horas completas caben en 195 minutos descartando los decimales (195 // 60 = 3)."
                },
                {
                  id: "B",
                  code: "/",
                  label: "/ (División decimal)",
                  isCorrect: false,
                  feedback: "Con / obtienes un número flotante (3.25), lo cual no representa horas enteras separadas de los minutos restantes."
                },
                {
                  id: "C",
                  code: "%",
                  label: "% (Módulo / Residuo)",
                  isCorrect: false,
                  feedback: "El operador % entrega el residuo (los minutos sobrantes), no la cantidad de horas enteras."
                }
              ]
            }
          ]
        },

        // ==========================================
        // LECCIÓN 5: Librería Math
        // ==========================================
        {
          id: "w1-l5",
          weekId: "semana-1",
          number: 5,
          tag: "Biblioteca",
          shortTitle: "Librería Math",
          title: "La librería Math y funciones matemáticas",
          description: "Aprende a importar math y utilizar sqrt, ceil, floor, pi y trigonometría.",
          duration: "12 min",
          steps: [
            {
              type: "explanation",
              partLabel: "Paso 1 · Módulos y Librerías",
              title: "¿Qué es una librería y cómo usar import math?",
              intro: "En programación no reinventamos la rueda. Una <strong>librería</strong> es una caja de herramientas preprogramada que puedes traer a tu código con la palabra <code>import</code>.",
              examples: [
                {
                  label: "La caja de herramientas math",
                  code: `# Importamos el módulo oficial de matemáticas de Python
import math

print("Pi =", math.pi)
print("Raíz cuadrada de 49 =", math.sqrt(49))`,
                  output: "Pi = 3.141592653589793\nRaíz cuadrada de 49 = 7.0",
                  explanation: "Al escribir math.pi o math.sqrt() le decimos a Python: 'busca la herramienta pi o sqrt dentro del módulo math'."
                }
              ],
              keyTakeaway: "Siempre debes colocar <code>import math</code> al inicio de tu archivo antes de usar cualquiera de sus funciones."
            },
            {
              type: "predict",
              partLabel: "Paso 2 · Predicción",
              title: "¿Qué imprime este cálculo con math?",
              question: "¿Qué valor exacto mostrará en pantalla la siguiente llamada a math.sqrt?",
              code: `import math
resultado = math.sqrt(25)
print(resultado)`,
              options: [
                { 
                  id: "A", 
                  text: "5.0", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "5", 
                  isCorrect: false,
                  whyIncorrect: "La función sqrt siempre retorna un tipo float con punto decimal, no un número entero int."
                },
                { 
                  id: "C", 
                  text: "625", 
                  isCorrect: false,
                  whyIncorrect: "math.sqrt calcula la raíz cuadrada de 25, no su cuadrado (25 al cuadrado sería 625)."
                },
                { 
                  id: "D", 
                  text: "Error de sintaxis", 
                  isCorrect: false,
                  whyIncorrect: "El código es completamente válido; importamos math y usamos math.sqrt(25) sin ningún error."
                }
              ],
              correctionTip: "math.sqrt() calcula la raíz cuadrada de un número y siempre retorna un float (número decimal).",
              fullAnswerExplanation: "La raíz cuadrada de 25 es 5, y como math.sqrt siempre devuelve un float, el resultado en pantalla es 5.0."
            },
            {
              type: "explanation",
              partLabel: "Paso 3 · Redondeo matemático",
              title: "Redondear con precisión: ceil y floor",
              intro: "A menudo necesitamos redondear números según la lógica del negocio: siempre hacia arriba (techo) o siempre hacia abajo (piso).",
              examples: [
                {
                  label: "Redondeo hacia arriba (Ceil) y abajo (Floor)",
                  code: `import math

# ceil() = 'ceiling' (techo) -> siempre redondea al entero superior
resultado_techo = math.ceil(4.2)
print("math.ceil(4.2) =", resultado_techo)

# floor() = piso -> siempre trunca o redondea al entero inferior
resultado_piso = math.floor(4.9)
print("math.floor(4.9) =", resultado_piso)`,
                  output: "math.ceil(4.2) = 5\nmath.floor(4.9) = 4",
                  explanation: "ceil(4.2) sube a 5 aunque el decimal sea pequeño. floor(4.9) baja a 4 aunque el decimal esté muy cerca de 5."
                }
              ],
              keyTakeaway: "Usa <code>math.ceil()</code> cuando necesitas asegurar capacidad completa (ej. número de taxis necesarios) y <code>math.floor()</code> para descartar fracciones."
            },
            {
              type: "predict",
              partLabel: "Paso 4 · Caso práctico de transporte",
              title: "Capacidad de transporte con math.ceil",
              question: "Si tienes 19 personas y cada van transporta máximo 4 personas, ¿cuántas vans completas necesitas?",
              code: `import math
personas = 19
capacidad_van = 4

vans_necesarias = math.ceil(personas / capacidad_van)
print(vans_necesarias)`,
              options: [
                { 
                  id: "A", 
                  text: "5 vans", 
                  isCorrect: true 
                },
                { 
                  id: "B", 
                  text: "4 vans", 
                  isCorrect: false,
                  whyIncorrect: "En 4 vans solo caben 16 personas (4 * 4 = 16), por lo que 3 pasajeros se quedarían sin viajar. ceil() siempre redondea al entero superior para que todos quepan."
                },
                { 
                  id: "C", 
                  text: "4.75 vans", 
                  isCorrect: false,
                  whyIncorrect: "No puedes alquilar 0.75 de una camioneta en el mundo real. math.ceil() entrega un número entero redondeado hacia arriba (5)."
                },
                { 
                  id: "D", 
                  text: "20 vans", 
                  isCorrect: false,
                  whyIncorrect: "No necesitas tantas vans; con 5 vans tienes capacidad para 20 personas, suficiente para llevar a los 19 pasajeros."
                }
              ],
              correctionTip: "19 / 4 es 4.75. Como no puedes alquilar 0.75 de una van, necesitas redondear hacia arriba (ceil) a 5 vans completas.",
              fullAnswerExplanation: "En 4 vans solo caben 16 personas. Para llevar a las 19 necesitamos redondear hacia el techo con ceil a 5 vehículos."
            },
            {
              type: "visualizer_math",
              partLabel: "Paso 5 · Laboratorio interactivo",
              title: "Simulador interactivo del módulo math",
              theory: "Prueba interactivamente calcular raíces cuadradas, techos, pisos y potencias."
            },
            {
              type: "code_sandbox",
              partLabel: "Paso 6 · Práctica guiada",
              title: "Cálculo de la Hipotenusa (Teorema de Pitágoras)",
              instruction: "Completa la llamada a la función de la librería math para calcular la hipotenusa de los catetos.",
              slotMarker: "___",
              starterCode: `import math

cateto_a = 6
cateto_b = 8

# Teorema de Pitágoras: hipotenusa = raíz(a^2 + b^2)
suma_cuadrados = (cateto_a ** 2) + (cateto_b ** 2)
hipotenusa = ___

print("Cateto A:", cateto_a)
print("Cateto B:", cateto_b)
print("Hipotenusa calculada:", hipotenusa)`,
              options: [
                {
                  id: "A",
                  code: "math.sqrt(suma_cuadrados)",
                  label: "math.sqrt(suma_cuadrados)",
                  isCorrect: true,
                  feedback: "¡Perfecto! Como importamos con 'import math', debemos anteponer 'math.' para acceder a la función sqrt()."
                },
                {
                  id: "B",
                  code: "sqrt(suma_cuadrados)",
                  label: "sqrt(suma_cuadrados)",
                  isCorrect: false,
                  feedback: "Esto generaría un NameError porque 'sqrt' no fue importado directamente al espacio de nombres global; debes usar 'math.sqrt()'."
                },
                {
                  id: "C",
                  code: "math.ceil(suma_cuadrados)",
                  label: "math.ceil(suma_cuadrados)",
                  isCorrect: false,
                  feedback: "math.ceil() redondea al entero superior, no calcula la raíz cuadrada requerida por el Teorema de Pitágoras."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "semana-2",
      number: 2,
      title: "Semana 2: Estructuras de Control y Decisiones",
      description: "Condicionales if, elif, else, operadores de comparación (>, <, ==, !=) y operadores lógicos (and, or, not).",
      status: "locked",
      lessons: [
        { id: "w2-l1", number: 1, shortTitle: "Condicionales", title: "Condicionales simples: if y else", duration: "10 min" },
        { id: "w2-l2", number: 2, shortTitle: "Caminos elif", title: "Múltiples caminos con elif", duration: "12 min" },
        { id: "w2-l3", number: 3, shortTitle: "Lógica booleana", title: "Operadores lógicos: and, or, not", duration: "15 min" }
      ]
    },
    {
      id: "semana-3",
      number: 3,
      title: "Semana 3: Bucles y Estructuras Repetitivas",
      description: "Automatización de tareas repetitivas mediante ciclos for, while y la función range().",
      status: "locked",
      lessons: [
        { id: "w3-l1", number: 1, shortTitle: "Ciclos for", title: "Ciclos contadores con for y range()", duration: "15 min" },
        { id: "w3-l2", number: 2, shortTitle: "Ciclos while", title: "Ciclos condicionales con while", duration: "12 min" },
        { id: "w3-l3", number: 3, shortTitle: "Control de flujo", title: "Control de flujo: break y continue", duration: "10 min" }
      ]
    }
  ]
};
