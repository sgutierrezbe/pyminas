/**
 * pyMinas — Plataforma Interactiva de Fundamentos de Programación
 * Facultad de Minas · Universidad Nacional de Colombia - Sede Medellín
 * Diseñado pedagógicamente para estudiantes de ingeniería.
 * Enfoque: Intuición primero, retos táctiles, progresión guiada y ejecución en vivo.
 */

const CURRICULUM = {
  "courseTitle": "pyMinas: Fundamentos de Programación",
  "courseSubtitle": "Facultad de Minas · Universidad Nacional de Colombia. Construye bases sólidas en programación con práctica guiada e interactiva.",
  "weeks": [
    {
      "id": "semana-1",
      "number": 1,
      "title": "Semana 1: Introducción (31 ago - 6 sep)",
      "description": "Fundamentos de programación, ciclo E-P-S, tipos, operadores y math.",
      "status": "active",
      "lessons": [
        {
          "id": "w1-l1",
          "weekId": "semana-1",
          "number": 1,
          "tag": "Fundamentos",
          "shortTitle": "Algoritmos",
          "title": "¿Qué es un algoritmo y cómo piensa Python?",
          "description": "Concepto de algoritmo, código fuente, secuencia lógica y ejecución paso a paso.",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · El concepto",
              "title": "¿Qué es programar y qué es un algoritmo?",
              "intro": "Una computadora es increíblemente rápida, pero no sabe qué hacer por su cuenta. <strong>Programar</strong> es darle una serie de instrucciones claras y ordenadas para resolver una tarea.",
              "examples": [
                {
                  "label": "La receta de cocina",
                  "code": "# En programación, esta secuencia lógica se llama ALGORITMO:\n# 1. Poner agua a hervir\n# 2. Agregar el café\n# 3. Servir en la taza\nprint(\"¡Café listo para beber!\")",
                  "output": "¡Café listo para beber!",
                  "explanation": "Si intentas servir antes de hervir el agua, todo falla. Un algoritmo necesita un orden estricto."
                }
              ],
              "keyTakeaway": "El texto con instrucciones que escribes en un lenguaje entendible (como Python) se llama <strong>código fuente</strong>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Intuición algorítmica",
              "title": "¿Cuál es un algoritmo correcto?",
              "question": "Imagina que le das instrucciones a un robot para cruzar una calle con seguridad. ¿Cuál secuencia representa un algoritmo correcto?",
              "theory": "Recuerda que una máquina no puede adivinar tus intenciones: solo sigue el orden exacto que tú le indiques.",
              "options": [
                {
                  "id": "A",
                  "text": "Caminar hacia adelante -> Mirar el semáforo -> Detenerse en medio de la calle",
                  "isCorrect": false,
                  "whyIncorrect": "Si caminas antes de mirar el semáforo, corres grave peligro. Un algoritmo debe verificar las condiciones de seguridad antes de actuar."
                },
                {
                  "id": "B",
                  "text": "Mirar el semáforo -> Esperar luz verde peatonal -> Mirar a ambos lados -> Cruzar la calle",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Cruzar corriendo con los ojos cerrados -> Esperar que no pasen vehículos",
                  "isCorrect": false,
                  "whyIncorrect": "No tiene lógica de seguridad ni pasos ordenados. Las computadoras necesitan instrucciones exactas y verificables."
                }
              ],
              "correctionTip": "Un algoritmo debe ser lógico, seguro y con pasos en el orden correcto antes de ejecutar una acción crítica.",
              "fullAnswerExplanation": "La opción B es un algoritmo real: verifica las condiciones necesarias antes de actuar. Las computadoras necesitan esta misma precisión."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 3 · Lenguaje interpretado",
              "title": "Python lee de arriba hacia abajo",
              "intro": "Python es un lenguaje interpretado: su motor lee el archivo línea por línea, de arriba hacia abajo, ejecutando cada instrucción en el orden en que fue escrita.",
              "examples": [
                {
                  "label": "Ejecución línea por línea",
                  "code": "# Python lee tu archivo de arriba hacia abajo:\nprint(\"Línea 1: Verificando datos\")\nprint(\"Línea 2: Procesando cálculo\")\nprint(\"Línea 3: Operación terminada\")",
                  "output": "Línea 1: Verificando datos\nLínea 2: Procesando cálculo\nLínea 3: Operación terminada",
                  "explanation": "El intérprete de Python lee y ejecuta tu código paso a paso en tiempo real."
                }
              ],
              "keyTakeaway": "Si hay un error en la línea 10, Python ejecutará con éxito las líneas 1 a 9 y se detendrá exactamente en la 10 explicándote qué falló."
            },
            {
              "type": "predict",
              "partLabel": "Paso 4 · Orden de ejecución",
              "title": "¿En qué orden se ejecuta?",
              "code": "print(\"1. Encendiendo motor\")\nprint(\"2. Calentando turbinas\")\nprint(\"3. ¡Despegue!\")",
              "question": "¿En qué orden exacto imprimirá Python estos tres mensajes en la consola?",
              "theory": "El intérprete de Python lee el archivo siempre de arriba hacia abajo.",
              "options": [
                {
                  "id": "A",
                  "text": "1. Encendiendo motor -> 2. Calentando turbinas -> 3. ¡Despegue!",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "3. ¡Despegue! -> 2. Calentando turbinas -> 1. Encendiendo motor",
                  "isCorrect": false,
                  "whyIncorrect": "Python no lee de abajo hacia arriba. Lee estrictamente de arriba hacia abajo según el orden de las líneas."
                },
                {
                  "id": "C",
                  "text": "Las tres líneas se imprimen al mismo tiempo en paralelo sin orden",
                  "isCorrect": false,
                  "whyIncorrect": "La ejecución secuencial significa que cada línea espera a que termine la anterior antes de comenzar."
                }
              ],
              "correctionTip": "La regla de oro de la ejecución secuencial: Python sigue estrictamente el orden de las líneas de arriba hacia abajo.",
              "fullAnswerExplanation": "¡Exacto! Python ejecuta cada instrucción en el orden exacto en que fue escrita, de arriba a abajo."
            },
            {
              "type": "predict",
              "partLabel": "Paso 5 · Comentarios (#)",
              "title": "El superpoder del símbolo #",
              "question": "En Python, las líneas que inician con el símbolo # son comentarios para humanos. ¿Qué mensaje se verá en pantalla?",
              "code": "print(\"Modo normal activado\")\n# print(\"Modo de prueba secreto\")\nprint(\"Todo funcionando correctamente\")",
              "theory": "El intérprete de Python ignora por completo cualquier línea o texto que comience con el símbolo #.",
              "options": [
                {
                  "id": "A",
                  "text": "Solo \"Modo normal activado\" y \"Todo funcionando correctamente\"",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Los tres mensajes completos",
                  "isCorrect": false,
                  "whyIncorrect": "La línea con el '#' al inicio es ignorada por el intérprete de Python, por lo que nunca se muestra."
                },
                {
                  "id": "C",
                  "text": "Solo \"Modo de prueba secreto\"",
                  "isCorrect": false,
                  "whyIncorrect": "Al tener '#' al principio, justamente esa línea es la única que NO se ejecutará."
                }
              ],
              "correctionTip": "El símbolo '#' convierte la línea en invisible para la máquina. Los programadores lo usamos para tomar notas o desactivar código temporalmente.",
              "fullAnswerExplanation": "El símbolo '#' convierte la línea en invisible para la máquina. Los programadores lo usamos para tomar notas o desactivar código temporalmente."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Tu primer algoritmo",
              "title": "Completa el algoritmo de bienvenida",
              "instruction": "En pyMinas queremos mostrar un mensaje de bienvenida. Elige la función correcta para mostrar texto en pantalla:",
              "starterCode": "# Algoritmo de bienvenida a pyMinas\n___(\"¡Bienvenido a la Facultad de Minas!\")",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "print",
                  "label": "print",
                  "isCorrect": true,
                  "explanation": "¡Correcto! print() es la función estándar de Python para mostrar salidas en pantalla."
                },
                {
                  "id": "B",
                  "code": "mostrar",
                  "label": "mostrar",
                  "isCorrect": false,
                  "explanation": "En Python las funciones están en inglés. 'mostrar' no existe y generaría un NameError."
                },
                {
                  "id": "C",
                  "code": "escribir",
                  "label": "escribir",
                  "isCorrect": false,
                  "explanation": "'escribir' no es una función de Python. La función oficial para imprimir texto es print()."
                }
              ],
              "expectedOutput": "¡Bienvenido a la Facultad de Minas!"
            }
          ]
        },
        {
          "id": "w1-l2",
          "weekId": "semana-1",
          "number": 2,
          "tag": "Entrada",
          "shortTitle": "Función input",
          "title": "Entrada de datos con input()",
          "description": "Cómo recibir datos del usuario por teclado, almacenarlos en memoria y entender por qué siempre entrega texto.",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · El concepto",
              "title": "¿Cómo recibe datos un programa?",
              "intro": "Un programa interactivo necesita datos del mundo exterior. En Python, la función <code>input()</code> pausa la ejecución del programa y espera a que el usuario escriba algo en el teclado y presione Enter.",
              "examples": [
                {
                  "label": "Guardando datos en memoria",
                  "code": "# input() captura lo que el usuario escribe:\n# nombre = input(\"¿Tu nombre?: \")\n# El valor queda guardado en la variable:\nnombre = \"Valentina\"\nprint(\"Hola,\", nombre)",
                  "output": "Hola, Valentina",
                  "explanation": "El valor capturado se guarda en una variable asignada a la izquierda del signo igual (=)."
                }
              ],
              "keyTakeaway": "<strong>Regla de oro:</strong> Todo lo que entrega <code>input()</code> llega a Python como <strong>texto (tipo str)</strong>, incluso si el usuario tecleó dígitos numéricos como <code>18</code> o <code>25</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Naturaleza de input()",
              "title": "¿Qué tipo de dato entrega input()?",
              "question": "Un usuario ejecuta <code>edad = input(\"Ingresa tu edad: \")</code> y teclea el número <code>20</code> en su pantalla. ¿De qué tipo de dato es la variable <code>edad</code> en memoria?",
              "theory": "Recuerda que input() captura pulsaciones del teclado como caracteres.",
              "options": [
                {
                  "id": "A",
                  "text": "Es de tipo str (cadena de texto: \"20\")",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Es de tipo int (número entero: 20)",
                  "isCorrect": false,
                  "whyIncorrect": "input() NUNCA devuelve un entero automáticamente. Aunque teclees números, Python los recibe como texto (\"20\")."
                },
                {
                  "id": "C",
                  "text": "Es de tipo bool (verdadero/falso)",
                  "isCorrect": false,
                  "whyIncorrect": "Un booleano solo puede ser True o False. La función input() entrega caracteres de texto."
                }
              ],
              "correctionTip": "La regla número 1 de input(): sin importar lo que el usuario escriba, el resultado SIEMPRE es de tipo str (texto).",
              "fullAnswerExplanation": "¡Exacto! input() siempre produce cadenas de texto (str). Si necesitas operar matemáticamente con el valor, debes convertirlo."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · La trampa de la suma",
              "title": "Spot-the-bug: ¿Qué ocurre al sumar entradas?",
              "code": "# Supongamos dos entradas obtenidas con input():\na = \"10\"\nb = \"20\"\ntotal = a + b\nprint(total)",
              "question": "¿Qué mostrará este programa en la consola al sumar las dos variables?",
              "theory": "En Python, el operador + entre textos concatena (une) en lugar de sumar matemáticamente.",
              "options": [
                {
                  "id": "A",
                  "text": "1020",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "30",
                  "isCorrect": false,
                  "whyIncorrect": "Como a y b son textos ('10' y '20'), el operador + los une uno tras otro formando '1020', no 30."
                },
                {
                  "id": "C",
                  "text": "TypeError: no se pueden sumar números con comillas",
                  "isCorrect": false,
                  "whyIncorrect": "Sumar dos textos con + es 100% legal en Python. Es la operación de concatenación."
                }
              ],
              "correctionTip": "El operador + con texto une las palabras. Para sumar números debes convertir con int() o float().",
              "fullAnswerExplanation": "¡Exactamente! Al no haber convertido las entradas a número, Python realizó concatenación de texto: '10' + '20' = '1020'."
            },
            {
              "type": "visualizer_input",
              "partLabel": "Paso 4 · Laboratorio interactivo",
              "title": "Laboratorio: Conversión de texto a entero"
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 5 · Reto de conversión",
              "title": "Convierte la entrada a entero",
              "instruction": "Un estudiante ingresó sus puntos como texto. Completa el código con la función de conversión que permite sumar los 5 puntos adicionales correctamente:",
              "starterCode": "# Entrada recibida como texto del teclado:\nentrada_str = \"15\"\n# Convierte para poder sumar matemáticamente:\npuntos = ___(entrada_str)\nprint(puntos + 5)",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "int",
                  "label": "int",
                  "isCorrect": true,
                  "explanation": "¡Excelente! int(\"15\") transforma el texto en el entero 15, permitiendo la suma aritmética 15 + 5 = 20."
                },
                {
                  "id": "B",
                  "code": "str",
                  "label": "str",
                  "isCorrect": false,
                  "explanation": "str() mantendría el tipo como texto, por lo que puntos + 5 daría TypeError al intentar sumar texto con entero."
                },
                {
                  "id": "C",
                  "code": "len",
                  "label": "len",
                  "isCorrect": false,
                  "explanation": "len() mide la cantidad de caracteres de un texto, no convierte su valor a número."
                }
              ],
              "expectedOutput": "20"
            }
          ]
        },
        {
          "id": "w1-l3",
          "weekId": "semana-1",
          "number": 3,
          "tag": "Salida",
          "shortTitle": "Función print",
          "title": "Salida de datos y f-strings con print()",
          "description": "Uso de print(), múltiples argumentos, separadores y el formato moderno de f-strings f\"str{variable}\".",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Múltiples argumentos",
              "title": "La función print() básica",
              "intro": "La función <code>print()</code> envía información a la consola. Puedes pasarle varios datos separados por comas y Python los mostrará separados por un espacio.",
              "examples": [
                {
                  "label": "Separando con comas",
                  "code": "nombre = \"Carlos\"\nsemestre = 1\nprint(\"Estudiante:\", nombre, \"Semestre:\", semestre)",
                  "output": "Estudiante: Carlos Semestre: 1",
                  "explanation": "Cada argumento separado por coma se imprime automáticamente con un espacio intermedio."
                }
              ],
              "keyTakeaway": "Por defecto, cada llamada a <code>print()</code> termina con un salto de línea automático."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 2 · f-strings modernos",
              "title": "Formateo moderno con f-strings",
              "intro": "A partir de Python 3.6, la forma oficial, más legible y potente de mostrar salidas es usando <strong>f-strings</strong> (cadenas literales formateadas). Solo antepones una <code>f</code> antes de abrir las comillas y colocas cualquier variable o expresión entre llaves: <code>f\"Texto {variable}\"</code>.",
              "examples": [
                {
                  "label": "f-strings en acción",
                  "code": "curso = \"pyMinas\"\nedicion = 2026\nprint(f\"¡Bienvenido a {curso} versión {edicion}!\")",
                  "output": "¡Bienvenido a pyMinas versión 2026!",
                  "explanation": "Python evalúa el contenido de cada {llave} y coloca su valor directamente dentro de la cadena."
                }
              ],
              "keyTakeaway": "Dentro de las llaves <code>{ }</code> puedes colocar variables e incluso operaciones matemáticas como <code>{precio * 1.19}</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Expresiones dentro de f-strings",
              "title": "¿Qué imprime este f-string?",
              "code": "base = 10\naltura = 5\nprint(f\"Área del rectángulo: {base * altura} m2\")",
              "question": "¿Cuál es la salida exacta que mostrará la consola?",
              "theory": "Python calcula la expresión matemática dentro de { } antes de imprimir.",
              "options": [
                {
                  "id": "A",
                  "text": "Área del rectángulo: 50 m2",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Área del rectángulo: {base * altura} m2",
                  "isCorrect": false,
                  "whyIncorrect": "Al tener el prefijo 'f', Python no imprime las llaves literales, sino el resultado evaluado de la multiplicación."
                },
                {
                  "id": "C",
                  "text": "Área del rectángulo: base * altura m2",
                  "isCorrect": false,
                  "whyIncorrect": "Las llaves activan la evaluación de código Python. base * altura se calcula como 10 * 5 = 50."
                }
              ],
              "correctionTip": "El prefijo f antes de las comillas indica a Python que debe evaluar todo lo que esté entre llaves {}.",
              "fullAnswerExplanation": "¡Exacto! base * altura se calcula como 50 y se inserta limpiamente en el texto final."
            },
            {
              "type": "predict",
              "partLabel": "Paso 4 · Spot the bug",
              "title": "Spot-the-bug: ¿Por qué no reemplaza la variable?",
              "code": "usuario = \"Santiago\"\nprint(\"Hola {usuario}, bienvenido al laboratorio\")",
              "question": "Un estudiante escribió este código esperando ver 'Hola Santiago...', pero la consola mostró literalmente: <code>Hola {usuario}, bienvenido al laboratorio</code>. ¿Cuál fue el error?",
              "theory": "Sin el prefijo especial, las llaves son solo caracteres normales de texto.",
              "options": [
                {
                  "id": "A",
                  "text": "Olvidó colocar la letra f antes de abrir las comillas: f\"Hola {usuario}...\"",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "En Python las variables deben rodearse con signos de porcentaje: %usuario%",
                  "isCorrect": false,
                  "whyIncorrect": "Esa sintaxis pertenece a scripts de consola por lotes (batch), no al estándar moderno de f-strings en Python."
                },
                {
                  "id": "C",
                  "text": "Las llaves {} están prohibidas dentro de las cadenas de texto de Python",
                  "isCorrect": false,
                  "whyIncorrect": "Las llaves están perfectamente permitidas; para que sustituyan valores deben acompañarse del prefijo f."
                }
              ],
              "correctionTip": "Sin la 'f' inicial, Python trata a '{usuario}' como texto plano ordinario.",
              "fullAnswerExplanation": "¡Muy bien visto! Si omites la 'f', Python asume que es una cadena común y corriente e imprime las llaves tal cual."
            },
            {
              "type": "visualizer_print",
              "partLabel": "Paso 5 · Laboratorio interactivo",
              "title": "Laboratorio: Control de separadores sep=\"...\""
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Reto f-string",
              "title": "Activa el f-string",
              "instruction": "Completa el código eligiendo el prefijo que activa la interpolación de variables dentro de las llaves {}:",
              "starterCode": "# Formateo dinámico del precio de matrícula:\nfacultad = \"Minas\"\ncosto = 0\nmensaje = ___\"Facultad de {facultad} · Costo: ${costo}\"\nprint(mensaje)",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "f",
                  "label": "f",
                  "isCorrect": true,
                  "explanation": "¡Correcto! El prefijo f convierte la cadena en un f-string activo, sustituyendo {facultad} y {costo}."
                },
                {
                  "id": "B",
                  "code": "str",
                  "label": "str",
                  "isCorrect": false,
                  "explanation": "str no es un prefijo de string válido. Provocaría un error de sintaxis."
                },
                {
                  "id": "C",
                  "code": "r",
                  "label": "r",
                  "isCorrect": false,
                  "explanation": "El prefijo r indica una cadena cruda (raw string) para escapar barras invertidas, no evalúa llaves { }."
                }
              ],
              "expectedOutput": "Facultad de Minas · Costo: $0"
            }
          ]
        },
        {
          "id": "w1-l4",
          "weekId": "semana-1",
          "number": 4,
          "tag": "Datos",
          "shortTitle": "Tipos de datos",
          "title": "Tipos primitivos y conversiones (Casting)",
          "description": "Enteros (int), decimales (float), texto (str), booleanos (bool) y cómo convertir entre ellos.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Los 4 tipos fundamentales",
              "title": "Las cuatro cajas de memoria fundamentales",
              "intro": "En Python, cada dato almacenado en memoria pertenece a un tipo específico que determina qué operaciones podemos realizar con él.",
              "examples": [
                {
                  "label": "Tipos primitivos",
                  "code": "edad = 21          # int: entero sin punto decimal\naltura = 1.78      # float: número con punto decimal\nnombre = \"Andrés\"  # str: cadena de caracteres\nmatriculado = True # bool: Verdadero o Falso\nprint(edad, altura, nombre, matriculado)",
                  "output": "21 1.78 Andrés True",
                  "explanation": "Python infiere automáticamente el tipo según el valor que asignes."
                }
              ],
              "keyTakeaway": "Puedes consultar el tipo de cualquier variable en cualquier momento usando la función <code>type(variable)</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Distinguiendo tipos",
              "title": "¿Cuál es el tipo de dato?",
              "code": "valor = \"3.1416\"",
              "question": "¿A qué tipo de dato pertenece la variable <code>valor</code> en este código?",
              "theory": "Presta especial atención a la presencia de comillas en la asignación.",
              "options": [
                {
                  "id": "A",
                  "text": "float (número decimal)",
                  "isCorrect": false,
                  "whyIncorrect": "Tiene punto decimal, ¡pero está envuelto en comillas! Para Python, cualquier cosa entre comillas es texto (str)."
                },
                {
                  "id": "B",
                  "text": "str (cadena de texto)",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "int (número entero)",
                  "isCorrect": false,
                  "whyIncorrect": "Un int no tiene punto decimal ni comillas. En este caso es texto debido a las comillas."
                }
              ],
              "correctionTip": "Regla infalible: Si tiene comillas dobles \" \" o simples ' ', Python lo clasifica como str sin importar lo que contenga dentro.",
              "fullAnswerExplanation": "¡Exacto! Las comillas convierten cualquier contenido en texto (str), incluso si parece un número decimal."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Conversión con float",
              "title": "Cálculo con conversión explícita",
              "code": "horas_str = \"4.5\"\nhoras = float(horas_str)\ntotal = horas * 2\nprint(total)",
              "question": "¿Qué valor se mostrará en pantalla al ejecutar este código?",
              "theory": "float() convierte la cadena en número decimal, habilitando la multiplicación aritmética.",
              "options": [
                {
                  "id": "A",
                  "text": "9.0",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "4.54.5",
                  "isCorrect": false,
                  "whyIncorrect": "Como se usó float(horas_str), la variable ya no es texto, por lo que * 2 realiza multiplicación matemática, no repetición de texto."
                },
                {
                  "id": "C",
                  "text": "9",
                  "isCorrect": false,
                  "whyIncorrect": "Al multiplicar un número decimal (float) en Python, el resultado conserva la parte decimal: 9.0."
                }
              ],
              "correctionTip": "Al convertir con float(\"4.5\"), la multiplicación 4.5 * 2 produce un resultado float: 9.0.",
              "fullAnswerExplanation": "¡Muy bien! float() convierte exitosamente la cadena a número decimal, y 4.5 * 2 es 9.0."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Conversión en ingeniería",
              "title": "Reto: Conversión de peso con decimales",
              "instruction": "Un sensor de laboratorio envía el peso en kilogramos como texto con decimales. Completa el código con la función de conversión apropiada:",
              "starterCode": "# Dato recibido del sensor:\nlectura_sensor = \"68.5\"\n# Convierte para sumar la calibración:\npeso_real = ___(lectura_sensor)\nprint(peso_real + 1.5)",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "float",
                  "label": "float",
                  "isCorrect": true,
                  "explanation": "¡Correcto! float(\"68.5\") preserva los decimales y permite la suma 68.5 + 1.5 = 70.0."
                },
                {
                  "id": "B",
                  "code": "int",
                  "label": "int",
                  "isCorrect": false,
                  "explanation": "int(\"68.5\") genera un ValueError porque int() no sabe procesar puntos decimales contenidos en un string."
                },
                {
                  "id": "C",
                  "code": "str",
                  "label": "str",
                  "isCorrect": false,
                  "explanation": "str() dejaría el dato como texto y al sumarle 1.5 Python arrojaría un TypeError."
                }
              ],
              "expectedOutput": "70.0"
            }
          ]
        },
        {
          "id": "w1-l5",
          "weekId": "semana-1",
          "number": 5,
          "tag": "Operaciones",
          "shortTitle": "Operadores",
          "title": "Aritmética, precedencia y división en Python",
          "description": "Las tres divisiones (/, //, %), potencia (**), precedencia PEMDAS y el cálculo de promedios.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Las tres divisiones",
              "title": "División real (/), entera (//) y residuo (%)",
              "intro": "Python ofrece tres operadores para dividir. En ingeniería es vital diferenciarlos:",
              "examples": [
                {
                  "label": "Comparativa de divisiones",
                  "code": "# 1. División real (siempre entrega float):\nprint(7 / 2)\n# 2. División entera (trunca los decimales):\nprint(7 // 2)\n# 3. Módulo (residuo o sobrante de la división entera):\nprint(7 % 2)",
                  "output": "3.5\n3\n1",
                  "explanation": "7 dividido 2 es 3 veces entero (3 * 2 = 6) con un residuo de 1."
                }
              ],
              "keyTakeaway": "El operador módulo <code>%</code> es ideal para verificar si un número es par (<code>n % 2 == 0</code>) o para descomponer unidades de tiempo."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Horas y minutos",
              "title": "¿Cuántos minutos sobran?",
              "code": "minutos_totales = 125\nhoras = minutos_totales // 60\nminutos_restantes = minutos_totales % 60\nprint(f\"{horas}h {minutos_restantes}m\")",
              "question": "¿Qué mostrará este programa en pantalla?",
              "theory": "1 hora tiene 60 minutos. // calcula horas enteras y % calcula los minutos sobrantes.",
              "options": [
                {
                  "id": "A",
                  "text": "2h 5m",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "2.08h 5m",
                  "isCorrect": false,
                  "whyIncorrect": "El operador // trunca los decimales, retornando estrictamente el entero 2, no 2.08."
                },
                {
                  "id": "C",
                  "text": "2h 25m",
                  "isCorrect": false,
                  "whyIncorrect": "125 minutos dividido 60 da 2 horas (120 minutos). El residuo sobrante es 125 - 120 = 5 minutos, no 25."
                }
              ],
              "correctionTip": "125 // 60 = 2 horas completas (120 min). El sobrante 125 % 60 = 5 minutos.",
              "fullAnswerExplanation": "¡Exacto! 125 // 60 entrega 2 horas, y 125 % 60 entrega los 5 minutos restantes."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Precedencia de operaciones",
              "title": "Spot-the-bug: El error clásico del promedio",
              "code": "nota1 = 4.0\nnota2 = 2.0\n# El estudiante intenta calcular el promedio:\npromedio = nota1 + nota2 / 2\nprint(promedio)",
              "question": "El promedio entre 4.0 y 2.0 debería ser 3.0, pero este código imprime 5.0. ¿Por qué ocurrió esto?",
              "theory": "Regla PEMDAS: La división y multiplicación tienen mayor jerarquía que la suma y la resta.",
              "options": [
                {
                  "id": "A",
                  "text": "La división '/' se ejecuta primero que la suma '+', calculando 2.0 / 2 = 1.0 y luego 4.0 + 1.0 = 5.0",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "En Python las operaciones matemáticas se evalúan siempre de derecha a izquierda",
                  "isCorrect": false,
                  "whyIncorrect": "Python evalúa de izquierda a derecha respetando la jerarquía matemática universal (PEMDAS)."
                },
                {
                  "id": "C",
                  "text": "El operador / redondea los resultados hacia arriba automáticamente",
                  "isCorrect": false,
                  "whyIncorrect": "El operador / no redondea arbitrariamente. El resultado es 5.0 porque 4.0 + (2.0 / 2) = 4.0 + 1.0 = 5.0."
                }
              ],
              "correctionTip": "Para que la suma se realice antes de la división, debes agruparla entre paréntesis: (nota1 + nota2) / 2.",
              "fullAnswerExplanation": "¡Correcto! Debido a la precedencia matemática, la división se realizó antes. Para corregirlo se requiere: (nota1 + nota2) / 2."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Corrección con paréntesis",
              "title": "Calcula el promedio correcto",
              "instruction": "Usa paréntesis para forzar que Python sume ambas notas antes de dividir entre 2:",
              "starterCode": "# Notas de laboratorio:\nlab1 = 4.0\nlab2 = 3.0\n# Completa la expresión para calcular el promedio:\npromedio = ___ / 2\nprint(promedio)",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "(lab1 + lab2)",
                  "label": "(lab1 + lab2)",
                  "isCorrect": true,
                  "explanation": "¡Exacto! Los paréntesis obligan a Python a sumar (4.0 + 3.0 = 7.0) antes de dividir entre 2, dando 3.5."
                },
                {
                  "id": "B",
                  "code": "lab1 + lab2",
                  "label": "lab1 + lab2",
                  "isCorrect": false,
                  "explanation": "Sin paréntesis, la división se aplicaría únicamente a lab2, resultando en 4.0 + (3.0 / 2) = 5.5 en lugar de 3.5."
                },
                {
                  "id": "C",
                  "code": "[lab1 + lab2]",
                  "label": "[lab1 + lab2]",
                  "isCorrect": false,
                  "explanation": "Los corchetes [] crean una lista en Python, produciendo un TypeError al intentar dividirla entre 2."
                }
              ],
              "expectedOutput": "3.5"
            }
          ]
        },
        {
          "id": "w1-l6",
          "weekId": "semana-1",
          "number": 6,
          "tag": "Librería",
          "shortTitle": "Módulo Math",
          "title": "Cálculos de ingeniería con el módulo math",
          "description": "Uso de bibliotecas, constantes como math.pi, math.sqrt(), redondeos con math.ceil() y fórmulas científicas.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Importar módulos",
              "title": "La biblioteca matemática de Python",
              "intro": "Python incluye herramientas avanzadas organizadas en <strong>módulos</strong>. Para usarlas, debemos importarlas con <code>import math</code> antes de llamarlas.",
              "examples": [
                {
                  "label": "Área de una circunferencia",
                  "code": "import math\n\nradio = 3\n# math.pi almacena el valor preciso de pi\narea = math.pi * (radio ** 2)\nprint(f\"Área: {round(area, 2)}\")",
                  "output": "Área: 28.27",
                  "explanation": "math.pi nos da el valor de π y el operador ** eleva a una potencia."
                }
              ],
              "keyTakeaway": "Para invocar cualquier función de una librería importada, debes anteponer el nombre del módulo: <code>math.nombre_funcion()</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Salida de math.sqrt",
              "title": "¿Qué valor retorna math.sqrt?",
              "code": "import math\n\nresultado = math.sqrt(25)\nprint(resultado)",
              "question": "¿Qué valor exacto mostrará en pantalla la siguiente llamada a <code>math.sqrt()</code>?",
              "theory": "La función math.sqrt() calcula la raíz cuadrada y en Python siempre entrega un tipo float.",
              "options": [
                {
                  "id": "A",
                  "text": "5.0",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "5",
                  "isCorrect": false,
                  "whyIncorrect": "La función math.sqrt siempre retorna un número decimal float con punto (.0), nunca un entero int."
                },
                {
                  "id": "C",
                  "text": "625",
                  "isCorrect": false,
                  "whyIncorrect": "math.sqrt calcula la raíz cuadrada de 25, no su cuadrado (25 al cuadrado sería 625)."
                }
              ],
              "correctionTip": "math.sqrt(x) calcula la raíz cuadrada y su salida siempre es de tipo float (con punto decimal).",
              "fullAnswerExplanation": "¡Exacto! La raíz cuadrada de 25 es 5, y dado que math.sqrt siempre retorna float, el valor en consola es 5.0."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Redondeos en ingeniería",
              "title": "Redondeo hacia arriba con math.ceil()",
              "code": "import math\n\nestudiantes = 25\ncapacidad_aula = 6\n# Necesitamos aulas suficientes para todos:\naulas = math.ceil(estudiantes / capacidad_aula)\nprint(aulas)",
              "question": "25 / 6 da 4.1666... ¿Qué imprimirá <code>math.ceil()</code> en la consola?",
              "theory": "math.ceil() (techo) redondea siempre hacia arriba al entero más cercano.",
              "options": [
                {
                  "id": "A",
                  "text": "5",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "4",
                  "isCorrect": false,
                  "whyIncorrect": "4 aulas solo albergarían 24 estudiantes, dejando 1 sin asiento. math.ceil redondea hacia arriba al entero mayor (5)."
                },
                {
                  "id": "C",
                  "text": "4.17",
                  "isCorrect": false,
                  "whyIncorrect": "math.ceil() siempre entrega un número entero, no un decimal redondeado."
                }
              ],
              "correctionTip": "math.ceil() redondea al entero superior inmediato. 4.166 -> 5.",
              "fullAnswerExplanation": "¡Exacto! math.ceil() garantiza 5 aulas para que ningún estudiante se quede sin espacio."
            },
            {
              "type": "visualizer_math",
              "partLabel": "Paso 4 · Laboratorio interactivo",
              "title": "Laboratorio: Comparativa math.ceil vs math.floor"
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 5 · Teorema de Pitágoras",
              "title": "Reto: Hipotenusa de un triángulo rectángulo",
              "instruction": "Completa el código con la función de math que calcula la raíz cuadrada para hallar la hipotenusa (c = √(a² + b²)):",
              "starterCode": "import math\n\n# Catetos de un triángulo rectángulo:\ncateto_a = 3\ncateto_b = 4\n# c = √(a² + b²)\nhipotenusa = ___(cateto_a**2 + cateto_b**2)\nprint(f\"Hipotenusa: {hipotenusa}\")",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "math.sqrt",
                  "label": "math.sqrt",
                  "isCorrect": true,
                  "explanation": "¡Brillante! math.sqrt(9 + 16) = math.sqrt(25) = 5.0. Has resuelto el triángulo clásico 3-4-5."
                },
                {
                  "id": "B",
                  "code": "sqrt",
                  "label": "sqrt",
                  "isCorrect": false,
                  "explanation": "Genera NameError: name 'sqrt' is not defined porque la función sqrt pertenece a la librería math y requiere el prefijo math.sqrt()."
                },
                {
                  "id": "C",
                  "code": "math.floor",
                  "label": "math.floor",
                  "isCorrect": false,
                  "explanation": "math.floor() trunca hacia abajo, no calcula la raíz cuadrada de una cantidad."
                }
              ],
              "expectedOutput": "Hipotenusa: 5.0"
            }
          ]
        }
      ]
    }
  ]
};
