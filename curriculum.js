/**
 * pyMinas — Plataforma Interactiva de Fundamentos de Programación
 * Facultad de Minas · Universidad Nacional de Colombia - Sede Medellín
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
                  "text": "3. ¡Despegue! -> 2. Calentando turbinas -> 1. Encendiendo motor",
                  "isCorrect": false,
                  "whyIncorrect": "Python no lee de abajo hacia arriba. Lee estrictamente de arriba hacia abajo según el orden de las líneas."
                },
                {
                  "id": "B",
                  "text": "1. Encendiendo motor -> 2. Calentando turbinas -> 3. ¡Despegue!",
                  "isCorrect": true
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
                  "text": "Los tres mensajes completos",
                  "isCorrect": false,
                  "whyIncorrect": "La línea con el '#' al inicio es ignorada por el intérprete de Python, por lo que nunca se muestra."
                },
                {
                  "id": "B",
                  "text": "Solo \"Modo de prueba secreto\"",
                  "isCorrect": false,
                  "whyIncorrect": "Al tener '#' al principio, justamente esa línea es la única que NO se ejecutará."
                },
                {
                  "id": "C",
                  "text": "Solo \"Modo normal activado\" y \"Todo funcionando correctamente\"",
                  "isCorrect": true
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
              "intro": "Un programa interactivo necesita datos del mundo exterior. En Python, la función <code>input()</code> pausa la ejecución del programa, espera a que el usuario escriba en la terminal y presione Enter.",
              "examples": [
                {
                  "label": "Captura interactiva por teclado",
                  "code": "nombre = input(\"¿Cómo te llamas?: \")\nprint(\"¡Mucho gusto,\", nombre, \"bienvenido a pyMinas!\")",
                  "output": "¿Cómo te llamas?: Sara\n¡Mucho gusto, Sara bienvenido a pyMinas!",
                  "explanation": "La función input() interactiva pausa el código, recibe lo que el usuario escribe en la terminal y lo guarda en la variable 'nombre'."
                }
              ],
              "keyTakeaway": "<strong>Regla de oro:</strong> Todo lo que entrega <code>input()</code> llega a Python como <strong>texto (tipo str)</strong>, incluso si el usuario tecleó dígitos numéricos como <code>18</code> o <code>25</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Naturaleza de input()",
              "title": "¿Qué tipo de dato entrega input()?",
              "question": "Un usuario ejecuta `edad = input(\"Ingresa tu edad: \")` y teclea el número `20` en su pantalla. ¿De qué tipo de dato es la variable `edad` en memoria?",
              "theory": "Recuerda que input() captura pulsaciones del teclado como caracteres.",
              "options": [
                {
                  "id": "A",
                  "text": "Es de tipo int (número entero: 20)",
                  "isCorrect": false,
                  "whyIncorrect": "input() NUNCA devuelve un entero automáticamente. Aunque teclees números, Python los recibe como texto (\"20\")."
                },
                {
                  "id": "B",
                  "text": "Es de tipo str (cadena de texto: \"20\")",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Es de tipo bool (verdadero/falso)",
                  "isCorrect": false,
                  "whyIncorrect": "Un booleano solo puede ser True o False. La función input() entrega caracteres de texto."
                }
              ],
              "correctionTip": "La regla número 1 de input(): sin importar lo que el usuario escriba, el resultado SIEMPRE es de tipo str (texto).",
              "fullAnswerExplanation": "¡Exacto! input() siempre produce cadenas de texto (str). Si necesitas operar matemáticamente con el valor, debes convertirlo con int() o float()."
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
                  "text": "30",
                  "isCorrect": false,
                  "whyIncorrect": "Como a y b son textos ('10' y '20'), el operador + los une uno tras otro formando '1020', no 30."
                },
                {
                  "id": "B",
                  "text": "TypeError: no se pueden sumar números con comillas",
                  "isCorrect": false,
                  "whyIncorrect": "Sumar dos textos con + es 100% legal en Python. Es la operación de concatenación."
                },
                {
                  "id": "C",
                  "text": "1020",
                  "isCorrect": true
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
              "instruction": "Capturamos la edad del usuario desde el teclado con input(). Completa el código con la función de conversión apropiada para calcular la edad del próximo año:",
              "starterCode": "# Entrada interactiva recibida del teclado:\nedad_str = input(\"Ingresa tu edad: \")\n# Convierte para poder sumar matemáticamente:\nedad = ___(edad_str)\nprint(f\"El próximo año tendrás {edad + 1} años\")",
              "slotMarker": "___",
              "options": [
                {
                  "id": "A",
                  "code": "float",
                  "label": "float",
                  "isCorrect": false,
                  "explanation": "Aunque float funcionaría matemáticamente, las edades se expresan convencionalmente en números enteros int()."
                },
                {
                  "id": "B",
                  "code": "int",
                  "label": "int",
                  "isCorrect": true,
                  "explanation": "¡Excelente! int(edad_str) convierte el texto en un entero, permitiendo calcular edad + 1."
                },
                {
                  "id": "C",
                  "code": "str",
                  "label": "str",
                  "isCorrect": false,
                  "explanation": "str() dejaría el valor como texto, provocando un TypeError al intentar sumar texto con un entero (+ 1)."
                }
              ],
              "expectedOutput": "El próximo año tendrás 21 años"
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
                  "text": "Área del rectángulo: {base * altura} m2",
                  "isCorrect": false,
                  "whyIncorrect": "Al tener el prefijo 'f', Python no imprime las llaves literales, sino el resultado evaluado de la multiplicación."
                },
                {
                  "id": "B",
                  "text": "Área del rectángulo: 50 m2",
                  "isCorrect": true
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
              "question": "Un estudiante escribió este código esperando ver 'Hola Santiago...', pero la consola mostró literalmente: `Hola {usuario}, bienvenido al laboratorio`. ¿Cuál fue el error?",
              "theory": "Sin el prefijo especial, las llaves son solo caracteres normales de texto.",
              "options": [
                {
                  "id": "A",
                  "text": "En Python las variables deben rodearse con signos de porcentaje: %usuario%",
                  "isCorrect": false,
                  "whyIncorrect": "Esa sintaxis pertenece a scripts de consola por lotes (batch), no al estándar moderno de f-strings en Python."
                },
                {
                  "id": "B",
                  "text": "Las llaves {} están prohibidas dentro de las cadenas de texto de Python",
                  "isCorrect": false,
                  "whyIncorrect": "Las llaves están perfectamente permitidas; para que sustituyan valores deben acompañarse del prefijo f."
                },
                {
                  "id": "C",
                  "text": "Olvidó colocar la letra f antes de abrir las comillas: f\"Hola {usuario}...\"",
                  "isCorrect": true
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
                  "code": "str",
                  "label": "str",
                  "isCorrect": false,
                  "explanation": "str no es un prefijo de string válido. Provocaría un error de sintaxis."
                },
                {
                  "id": "B",
                  "code": "f",
                  "label": "f",
                  "isCorrect": true,
                  "explanation": "¡Correcto! El prefijo f convierte la cadena en un f-string activo, sustituyendo {facultad} y {costo}."
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
              "question": "¿A qué tipo de dato pertenece la variable `valor` en este código?",
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
                  "text": "4.54.5",
                  "isCorrect": false,
                  "whyIncorrect": "Como se usó float(horas_str), la variable ya no es texto, por lo que * 2 realiza multiplicación matemática, no repetición de texto."
                },
                {
                  "id": "B",
                  "text": "9",
                  "isCorrect": false,
                  "whyIncorrect": "Al multiplicar un número decimal (float) en Python, el resultado conserva la parte decimal: 9.0."
                },
                {
                  "id": "C",
                  "text": "9.0",
                  "isCorrect": true
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
                  "code": "int",
                  "label": "int",
                  "isCorrect": false,
                  "explanation": "int(\"68.5\") genera un ValueError porque int() no sabe procesar puntos decimales contenidos en un string."
                },
                {
                  "id": "B",
                  "code": "str",
                  "label": "str",
                  "isCorrect": false,
                  "explanation": "str() dejaría el dato como texto y al sumarle 1.5 Python arrojaría un TypeError."
                },
                {
                  "id": "C",
                  "code": "float",
                  "label": "float",
                  "isCorrect": true,
                  "explanation": "¡Correcto! float(\"68.5\") preserva los decimales y permite la suma 68.5 + 1.5 = 70.0."
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
                  "text": "2.08h 5m",
                  "isCorrect": false,
                  "whyIncorrect": "El operador // trunca los decimales, retornando estrictamente el entero 2, no 2.08."
                },
                {
                  "id": "B",
                  "text": "2h 5m",
                  "isCorrect": true
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
                  "text": "En Python las operaciones matemáticas se evalúan siempre de derecha a izquierda",
                  "isCorrect": false,
                  "whyIncorrect": "Python evalúa de izquierda a derecha respetando la jerarquía matemática universal (PEMDAS)."
                },
                {
                  "id": "B",
                  "text": "El operador / redondea los resultados hacia arriba automáticamente",
                  "isCorrect": false,
                  "whyIncorrect": "El operador / no redondea arbitrariamente. El resultado es 5.0 porque 4.0 + (2.0 / 2) = 4.0 + 1.0 = 5.0."
                },
                {
                  "id": "C",
                  "text": "La división '/' se ejecuta primero que la suma '+', calculando 2.0 / 2 = 1.0 y luego 4.0 + 1.0 = 5.0",
                  "isCorrect": true
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
                  "code": "lab1 + lab2",
                  "label": "lab1 + lab2",
                  "isCorrect": false,
                  "explanation": "Sin paréntesis, la división se aplicaría únicamente a lab2, resultando en 4.0 + (3.0 / 2) = 5.5 en lugar de 3.5."
                },
                {
                  "id": "B",
                  "code": "(lab1 + lab2)",
                  "label": "(lab1 + lab2)",
                  "isCorrect": true,
                  "explanation": "¡Exacto! Los paréntesis obligan a Python a sumar (4.0 + 3.0 = 7.0) antes de dividir entre 2, dando 3.5."
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
              "question": "¿Qué valor exacto mostrará en pantalla la siguiente llamada a `math.sqrt()`?",
              "theory": "La función math.sqrt() calcula la raíz cuadrada y en Python siempre entrega un tipo float.",
              "options": [
                {
                  "id": "A",
                  "text": "5",
                  "isCorrect": false,
                  "whyIncorrect": "La función math.sqrt siempre retorna un número decimal float con punto (.0), nunca un entero int."
                },
                {
                  "id": "B",
                  "text": "625",
                  "isCorrect": false,
                  "whyIncorrect": "math.sqrt calcula la raíz cuadrada de 25, no su cuadrado (25 al cuadrado sería 625)."
                },
                {
                  "id": "C",
                  "text": "5.0",
                  "isCorrect": true
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
              "question": "25 / 6 da 4.1666... ¿Qué imprimirá `math.ceil()` en la consola?",
              "theory": "math.ceil() (techo) redondea siempre hacia arriba al entero más cercano.",
              "options": [
                {
                  "id": "A",
                  "text": "4",
                  "isCorrect": false,
                  "whyIncorrect": "4 aulas solo albergarían 24 estudiantes, dejando 1 sin asiento. math.ceil redondea hacia arriba al entero mayor (5)."
                },
                {
                  "id": "B",
                  "text": "5",
                  "isCorrect": true
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
                  "code": "sqrt",
                  "label": "sqrt",
                  "isCorrect": false,
                  "explanation": "Genera NameError: name 'sqrt' is not defined porque la función sqrt pertenece a la librería math y requiere el prefijo math.sqrt()."
                },
                {
                  "id": "B",
                  "code": "math.floor",
                  "label": "math.floor",
                  "isCorrect": false,
                  "explanation": "math.floor() trunca hacia abajo, no calcula la raíz cuadrada de una cantidad."
                },
                {
                  "id": "C",
                  "code": "math.sqrt",
                  "label": "math.sqrt",
                  "isCorrect": true,
                  "explanation": "¡Brillante! math.sqrt(9 + 16) = math.sqrt(25) = 5.0. Has resuelto el triángulo clásico 3-4-5."
                }
              ],
              "expectedOutput": "Hipotenusa: 5.0"
            }
          ]
        }
      ]
    },
    {
      "id": "semana-2",
      "number": 2,
      "title": "Semana 2: Condicionales (7 sep - 13 sep)",
      "description": "Toma de decisiones en Python, operadores relacionales, lógica booleana, if, else y elif.",
      "status": "active",
      "lessons": [
        {
          "id": "w2-l1",
          "weekId": "semana-2",
          "number": 1,
          "tag": "Lógica",
          "shortTitle": "Comparadores",
          "title": "Operadores Relacionales y Comparaciones",
          "description": "Aprende a comparar números y cadenas en Python para obtener respuestas booleanas (True o False).",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Operadores relacionales",
              "title": "¿Cómo compara valores una computadora?",
              "intro": "Los operadores relacionales permiten comparar dos valores y responder siempre con una verdad lógica: <code>True</code> (Verdadero) o <code>False</code> (Falso). ¡Ingresa valores para ver cómo reaccionan los comparadores!",
              "examples": [
                {
                  "label": "Comparaciones numéricas interactivas",
                  "code": "x = int(input(\"Ingresa el primer número (x): \"))\ny = int(input(\"Ingresa el segundo número (y): \"))\nprint(\"¿x es menor que y?:\", x < y)\nprint(\"¿x es igual a y?:\", x == y)\nprint(\"¿x es diferente de y?:\", x != y)",
                  "output": "Ingresa el primer número (x): 10\nIngresa el segundo número (y): 20\n¿x es menor que y?: True\n¿x es igual a y?: False\n¿x es diferente de y?: True",
                  "explanation": "Cada comparación produce un valor de tipo bool. En Python, '==' evalúa igualdad y '!=' evalúa diferencia."
                }
              ],
              "keyTakeaway": "Los operadores relacionales (<code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>==</code>, <code>!=</code>) siempre producen un dato de tipo <strong>bool</strong>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Predicción relacional",
              "title": "¿Cuál es el resultado de la comparación?",
              "question": "Observa el valor de las variables y determina qué imprimirá exactamente este código:",
              "code": "a = 15\nb = 15\nc = 30\nprint(a == b)\nprint(a + b > c)",
              "options": [
                {
                  "id": "A",
                  "text": "True\nTrue",
                  "isCorrect": false,
                  "whyIncorrect": "a + b es 30, y 30 NO es estrictamente mayor que 30 (son iguales, por lo que > da False)."
                },
                {
                  "id": "B",
                  "text": "True\nFalse",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "False\nFalse",
                  "isCorrect": false,
                  "whyIncorrect": "a == b es True porque ambas variables valen exactamente 15."
                }
              ],
              "correctionTip": "Recuerda que 30 > 30 es False. Para que fuera True tendría que usarse el operador mayor o igual (>=).",
              "fullAnswerExplanation": "¡Exacto! 15 == 15 es True, pero 30 > 30 es False porque la comparación estricta requiere que el primer valor supere al segundo."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 3 · La trampa clásica",
              "title": "Diferencia crítica entre = y ==",
              "intro": "Uno de los errores más frecuentes en programación es confundir la asignación con la comparación de igualdad.",
              "examples": [
                {
                  "label": "Asignar vs Comparar",
                  "code": "# Con un solo signo '=' guardamos el valor 100 en la variable:\npuntos = 100\n# Con doble signo '==' preguntamos si puntos es igual a 100:\nes_cien = (puntos == 100)\nprint(\"Puntos guardados:\", puntos)\nprint(\"¿Son exactamente 100?:\", es_cien)",
                  "output": "Puntos guardados: 100\n¿Son exactamente 100?: True",
                  "explanation": "Un solo signo '=' modifica la variable. El doble signo '==' solo compara sin alterar el dato."
                }
              ],
              "keyTakeaway": "Usa <code>=</code> para <strong>guardar</strong> datos y <code>==</code> para <strong>preguntar</strong> si dos valores son iguales."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Práctica guiada",
              "title": "Verificación de orden numérico",
              "instruction": "Completa el código para verificar si la variable `menor` es efectivamente menor o igual que `mayor`.",
              "slotMarker": "___",
              "starterCode": "menor = 25\nmayor = 50\nresultado = menor ___ mayor\nprint(\"¿Cumple el orden?:\", resultado)",
              "options": [
                {
                  "id": "A",
                  "code": ">",
                  "label": ">",
                  "isCorrect": false,
                  "explanation": "El operador > pregunta si 25 es mayor que 50, lo cual evaluaría a False."
                },
                {
                  "id": "B",
                  "code": "==",
                  "label": "==",
                  "isCorrect": false,
                  "explanation": "El operador == verifica igualdad exacta (25 == 50 es False)."
                },
                {
                  "id": "C",
                  "code": "<=",
                  "label": "<=",
                  "isCorrect": true,
                  "explanation": "¡Correcto! 25 <= 50 es True porque 25 es menor o igual que 50."
                }
              ],
              "expectedOutput": "¿Cumple el orden?: True"
            }
          ]
        },
        {
          "id": "w2-l2",
          "weekId": "semana-2",
          "number": 2,
          "tag": "Lógica",
          "shortTitle": "Lógica and/or",
          "title": "Operadores Lógicos y Tablas de Verdad",
          "description": "Combina múltiples condiciones con los operadores lógicos and, or y not.",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Conjunción lógica (and)",
              "title": "Condiciones compuestas con and",
              "intro": "A menudo una decisión requiere que varias cosas ocurran al mismo tiempo. El operador <code>and</code> devuelve <code>True</code> únicamente si <strong>ambas</strong> condiciones son verdaderas.",
              "examples": [
                {
                  "label": "Verificación de requisitos",
                  "code": "edad = 20\ntiene_licencia = True\npuede_conducir = (edad >= 18) and tiene_licencia\nprint(\"¿Puede conducir el auto?:\", puede_conducir)",
                  "output": "¿Puede conducir el auto?: True",
                  "explanation": "Como la edad es >= 18 (True) Y tiene_licencia es True, el resultado global es True."
                }
              ],
              "keyTakeaway": "El operador <code>and</code> es exigente: basta con que una sola condición sea <code>False</code> para que todo el resultado sea <code>False</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Disyunción lógica (or)",
              "title": "Evaluando la alternativa con or",
              "question": "El operador `or` es flexible: es True si al menos una de las partes es verdadera. ¿Qué mostrará este código?",
              "code": "dia = \"domingo\"\nes_feriado = False\ndescanso = (dia == \"domingo\") or es_feriado\nprint(\"¿Es día de descanso?:\", descanso)\nprint(\"Inversión con not:\", not descanso)",
              "options": [
                {
                  "id": "A",
                  "text": "¿Es día de descanso?: False\nInversión con not: True",
                  "isCorrect": false,
                  "whyIncorrect": "dia == 'domingo' es True, y en un 'or' basta con que una parte sea True para que todo sea True."
                },
                {
                  "id": "B",
                  "text": "¿Es día de descanso?: True\nInversión con not: False",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "¿Es día de descanso?: True\nInversión con not: True",
                  "isCorrect": false,
                  "whyIncorrect": "not invierte el valor booleano: si descanso es True, not descanso obligatoriamente es False."
                }
              ],
              "correctionTip": "True or False produce True. Luego, not True se convierte en False.",
              "fullAnswerExplanation": "¡Excelente! Con 'or', al cumplirse que el día es domingo, la variable descanso es True. Luego, el operador 'not' invierte True a False."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Precedencia lógica",
              "title": "Jerarquía de operadores lógicos",
              "question": "En Python, `not` se evalúa primero, luego `and`, y finalmente `or`. ¿Cuál es la salida de esta expresión?",
              "code": "x = 5\nresultado = not (x > 10) and (x == 5)\nprint(\"Resultado lógico:\", resultado)",
              "options": [
                {
                  "id": "A",
                  "text": "Resultado lógico: True",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Resultado lógico: False",
                  "isCorrect": false,
                  "whyIncorrect": "x > 10 es False. not False da True. Luego True and True da True."
                },
                {
                  "id": "C",
                  "text": "Error: no se pueden combinar not y and",
                  "isCorrect": false,
                  "whyIncorrect": "En Python es completamente válido y muy común encadenar operadores lógicos."
                }
              ],
              "correctionTip": "Evalúa primero el paréntesis: 5 > 10 es False. not False se vuelve True. Luego True and (5 == 5) es True.",
              "fullAnswerExplanation": "¡Correcto! not (False) produce True. Luego evaluamos True and True, resultando en True."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Práctica guiada",
              "title": "Rango de presión seguro",
              "instruction": "En ingeniería química, un reactor opera seguro si la presión está entre 10 y 50 MPa inclusive. Completa con el operador lógico adecuado.",
              "slotMarker": "___",
              "starterCode": "presion = 35\nes_segura = (presion >= 10) ___ (presion <= 50)\nprint(\"¿Presión en rango seguro?:\", es_segura)",
              "options": [
                {
                  "id": "A",
                  "code": "or",
                  "label": "or",
                  "isCorrect": false,
                  "explanation": "Con 'or', una presión peligrosa de 100 MPa daría True porque 100 >= 10 es True. Necesitas que ambos límites se cumplan."
                },
                {
                  "id": "B",
                  "code": "and",
                  "label": "and",
                  "isCorrect": true,
                  "explanation": "¡Brillante! Se deben cumplir ambas condiciones simultáneamente: presión >= 10 Y presión <= 50."
                },
                {
                  "id": "C",
                  "code": "not",
                  "label": "not",
                  "isCorrect": false,
                  "explanation": "'not' es un operador unario (afecta a un solo término), no puede colocarse entre dos expresiones."
                }
              ],
              "expectedOutput": "¿Presión en rango seguro?: True"
            }
          ]
        },
        {
          "id": "w2-l3",
          "weekId": "semana-2",
          "number": 3,
          "tag": "Sintaxis",
          "shortTitle": "Indentación",
          "title": "La Regla de Indentación en Python (Off-side Rule)",
          "description": "Aprende cómo Python define qué código pertenece a una estructura usando 4 espacios y los dos puntos (:).",
          "duration": "7 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · La regla del fuera de juego",
              "title": "Bloques de código sin llaves {}",
              "intro": "A diferencia de lenguajes como C++ o Java que usan llaves <code>{}</code>, Python utiliza la <strong>indentación</strong> (sangría) para saber exactamente qué instrucciones pertenecen a un condicional.",
              "examples": [
                {
                  "label": "Estructura de bloques",
                  "code": "print(\"1. Antes de la decisión\")\nif True:\n    print(\"2. Dentro del bloque condicional (4 espacios)\")\n    print(\"3. También dentro del bloque\")\nprint(\"4. Fuera del bloque (sin sangría)\")",
                  "output": "1. Antes de la decisión\n2. Dentro del bloque condicional (4 espacios)\n3. También dentro del bloque\n4. Fuera del bloque (sin sangría)",
                  "explanation": "Las líneas con 4 espacios pertenecen al 'if'. La línea 4, al no tener sangría, se ejecuta siempre."
                }
              ],
              "keyTakeaway": "La línea de condición siempre termina con dos puntos <code>:</code> y el bloque subordinado lleva <strong>4 espacios</strong> de sangría."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Identificación de bloques",
              "title": "¿Qué líneas se ejecutarán?",
              "question": "Observa con atención la sangría de cada instrucción print. ¿Cuál será la salida en consola?",
              "code": "temperatura = 18\nif temperatura > 30:\n    print(\"Alerta: Ola de calor\")\n    print(\"Enciende el ventilador\")\nprint(\"Monitoreo climático finalizado\")",
              "options": [
                {
                  "id": "A",
                  "text": "Alerta: Ola de calor\nMonitoreo climático finalizado",
                  "isCorrect": false,
                  "whyIncorrect": "Como 18 > 30 es False, todo el bloque indentado bajo el if se salta."
                },
                {
                  "id": "B",
                  "text": "Monitoreo climático finalizado",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "No imprime nada",
                  "isCorrect": false,
                  "whyIncorrect": "El último print no tiene sangría, por lo que está fuera del if y siempre se ejecuta."
                }
              ],
              "correctionTip": "La condición 18 > 30 es False. Las dos líneas indentadas se omiten y el programa continúa con la línea sin sangría.",
              "fullAnswerExplanation": "¡Exacto! El bloque del if no se ejecuta porque 18 no supera 30. Solo se imprime la línea que está fuera del condicional."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Detección de error",
              "title": "¿Qué ocurre si falta la sangría?",
              "question": "Un estudiante escribe `if activo:` pero olvida la sangría en la siguiente línea: `print(\"El sistema está activo\")`. ¿Cómo responderá Python al ejecutarlo?",
              "options": [
                {
                  "id": "A",
                  "text": "Python asume automáticamente que está dentro y lo imprime.",
                  "isCorrect": false,
                  "whyIncorrect": "Python no asume sangrías ausentes: la indentación es estricta por diseño del lenguaje."
                },
                {
                  "id": "B",
                  "text": "Produce un IndentationError: expected an indented block after 'if' statement.",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "El programa imprime 'None'.",
                  "isCorrect": false,
                  "whyIncorrect": "No devuelve None; el intérprete detiene la ejecución inmediatamente con un error de indentación."
                }
              ],
              "correctionTip": "En Python, cualquier línea posterior a dos puntos (:) requiere obligatoriamente sangría.",
              "fullAnswerExplanation": "¡Correcto! En Python la indentación no es estética, es sintaxis obligatoria. Si falta, el compilador genera IndentationError."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Práctica guiada",
              "title": "Sintaxis con dos puntos",
              "instruction": "Completa la cabecera del condicional para que la sintaxis sea válida en Python.",
              "slotMarker": "___",
              "starterCode": "nivel_tanque = 90\nif nivel_tanque > 80___\n    print(\"¡Atención! Tanque casi lleno\")\nprint(\"Sensor en línea\")",
              "options": [
                {
                  "id": "A",
                  "code": ";",
                  "label": ";",
                  "isCorrect": false,
                  "explanation": "En Python las sentencias condicionales no se cierran con punto y coma (;)."
                },
                {
                  "id": "B",
                  "code": " then",
                  "label": "then",
                  "isCorrect": false,
                  "explanation": "La palabra clave 'then' se usa en otros lenguajes como Pascal o SQL, no en Python."
                },
                {
                  "id": "C",
                  "code": ":",
                  "label": ":",
                  "isCorrect": true,
                  "explanation": "¡Perfecto! Toda cabecera condicional en Python concluye con dos puntos (:) antes de abrir el bloque."
                }
              ],
              "expectedOutput": "¡Atención! Tanque casi lleno\nSensor en línea"
            }
          ]
        },
        {
          "id": "w2-l4",
          "weekId": "semana-2",
          "number": 4,
          "tag": "Decisiones",
          "shortTitle": "Condicional if",
          "title": "Toma de Decisiones: Condicional Simple",
          "description": "Aprende a bifurcar el flujo de tu programa para ejecutar código solo cuando una condición es verdadera.",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · La decisión simple",
              "title": "El condicional if en acción",
              "intro": "Un programa interactivo bifurca su comportamiento según los datos del usuario: por ejemplo, otorgar un 5% de descuento en una compra únicamente si el cliente es menor de edad. ¡Prueba ingresando una edad menor a 18 y luego una mayor!",
              "examples": [
                {
                  "label": "Descuento interactivo a menores de edad",
                  "code": "edad = int(input(\"Ingresa tu edad: \"))\nprecio = 5000\nif edad < 18:\n    precio = precio * 0.95\n    print(\"Descuento del 5% aplicado por ser menor de edad\")\nprint(\"Total a pagar: $\", precio)",
                  "output": "Ingresa tu edad: 14\nDescuento del 5% aplicado por ser menor de edad\nTotal a pagar: $ 4750.0",
                  "explanation": "Si la edad es menor a 18 (ej. 14), se ejecuta el descuento del 5% y el precio baja a 4750. Si es 18 o más (ej. 25), el bloque condicional se omite."
                }
              ],
              "keyTakeaway": "Si la condición evalúa a <code>True</code>, se ejecuta el bloque indentado. Si es <code>False</code>, el bloque se omite y el programa continúa."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Aprobación académica",
              "title": "¿Se imprimirá el mensaje de aprobación?",
              "question": "En el sistema de calificaciones: si la nota es mayor o igual a 3.0, el programa imprime 'Aprobado'. Si un estudiante tiene nota 2.8, ¿qué imprimirá exactamente?",
              "code": "nota = 2.8\nif nota >= 3.0:\n    print(\"Aprobado\")\nprint(\"Calificación registrada en el sistema\")",
              "options": [
                {
                  "id": "A",
                  "text": "Aprobado\nCalificación registrada en el sistema",
                  "isCorrect": false,
                  "whyIncorrect": "2.8 >= 3.0 es False, por lo que el print('Aprobado') jamás se ejecuta."
                },
                {
                  "id": "B",
                  "text": "Calificación registrada en el sistema",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "No imprime nada",
                  "isCorrect": false,
                  "whyIncorrect": "El último mensaje está fuera del if y se ejecuta incondicionalmente."
                }
              ],
              "correctionTip": "La condición 2.8 >= 3.0 es False. El print('Aprobado') se salta.",
              "fullAnswerExplanation": "¡Exacto! Como 2.8 no es mayor ni igual que 3.0, la condición falla y únicamente se muestra el mensaje final sin sangría."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Salario mínimo",
              "title": "Ajuste de salario mínimo",
              "question": "Si el salario de un empleado es de 1,500,000 y el salario mínimo es de 1,300,000, ¿cuál será el salario final tras evaluar el if?",
              "code": "SALARIO_MINIMO = 1300000\nsalario = 1500000\nif salario < SALARIO_MINIMO:\n    salario = salario * 1.10\nprint(\"Salario final:\", salario)",
              "options": [
                {
                  "id": "A",
                  "text": "Salario final: 1650000.0",
                  "isCorrect": false,
                  "whyIncorrect": "El incremento del 10% solo se aplica si el salario es inferior al mínimo (1500000 < 1300000 es False)."
                },
                {
                  "id": "B",
                  "text": "Salario final: 1300000",
                  "isCorrect": false,
                  "whyIncorrect": "El salario no se reduce al mínimo."
                },
                {
                  "id": "C",
                  "text": "Salario final: 1500000",
                  "isCorrect": true
                }
              ],
              "correctionTip": "1500000 < 1300000 es False, por lo que el bloque dentro del if no se ejecuta y el salario no cambia.",
              "fullAnswerExplanation": "¡Correcto! Al ganar más que el mínimo, la condición no se cumple y el salario se mantiene en 1,500,000 intacto."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Práctica guiada",
              "title": "Control de velocidad en carretera",
              "instruction": "Completa la condición para advertir si un vehículo sobrepasa el límite permitido de 80 km/h.",
              "slotMarker": "___",
              "starterCode": "velocidad = 92\nlimite = 80\nif ___:\n    print(\"¡Alerta! Exceso de velocidad detectado\")\nprint(\"Radar activo\")",
              "options": [
                {
                  "id": "A",
                  "code": "velocidad > limite",
                  "label": "velocidad > limite",
                  "isCorrect": true,
                  "explanation": "¡Correcto! 92 > 80 es True, activando la advertencia por superar el límite."
                },
                {
                  "id": "B",
                  "code": "velocidad == limite",
                  "label": "velocidad == limite",
                  "isCorrect": false,
                  "explanation": "El operador == solo detectaría si viaja a exactamente 80 km/h."
                },
                {
                  "id": "C",
                  "code": "velocidad < limite",
                  "label": "velocidad < limite",
                  "isCorrect": false,
                  "explanation": "Con < la condición daría False (92 no es menor que 80) y no advertiría la infracción."
                }
              ],
              "expectedOutput": "¡Alerta! Exceso de velocidad detectado\nRadar activo"
            }
          ]
        },
        {
          "id": "w2-l5",
          "weekId": "semana-2",
          "number": 5,
          "tag": "Decisiones",
          "shortTitle": "Estructura else",
          "title": "El Camino Alternativo: Condicional Doble if-else",
          "description": "Maneja bifurcaciones de dos caminos: qué hacer cuando la condición es verdadera y qué hacer cuando es falsa.",
          "duration": "8 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · La bifurcación doble",
              "title": "Manejando el caso contrario con else",
              "intro": "En problemas reales, necesitamos ejecutar una acción si la condición se cumple, y **otra acción diferente** si no se cumple: por ejemplo, aprobar o reprobar una materia. ¡Ingresa tu calificación y observa qué rama se ejecuta!",
              "examples": [
                {
                  "label": "Aprobado vs Reprobado interactivo",
                  "code": "nota = float(input(\"Ingresa tu nota final (0.0 a 5.0): \"))\nif nota >= 3.0:\n    print(\"¡Felicitaciones! Has aprobado\")\nelse:\n    print(\"Reprobado, debes habilitar\")\nprint(\"Cierre del periodo académico\")",
                  "output": "Ingresa tu nota final (0.0 a 5.0): 4.2\n¡Felicitaciones! Has aprobado\nCierre del periodo académico",
                  "explanation": "Si la nota es >= 3.0 (ej. 4.2), se toma la rama del if. Si la nota es menor a 3.0 (ej. 2.4), se activa automáticamente la rama del else."
                }
              ],
              "keyTakeaway": "La cláusula <code>else</code> nunca lleva condición propia: se activa automáticamente siempre que la condición del <code>if</code> resulte <code>False</code>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Detección de par o impar",
              "title": "Detección de par o impar",
              "question": "En programación se utiliza el residuo (%) para saber si un número es par. ¿Qué imprimirá este código con el número 7?",
              "code": "numero = 7\nif numero % 2 == 0:\n    print(\"El número es PAR\")\nelse:\n    print(\"El número es IMPAR\")",
              "options": [
                {
                  "id": "A",
                  "text": "El número es PAR",
                  "isCorrect": false,
                  "whyIncorrect": "7 % 2 es 1 (el residuo no es 0), por lo que entra al bloque del else."
                },
                {
                  "id": "B",
                  "text": "El número es IMPAR",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Error: no se puede usar % dentro de un if",
                  "isCorrect": false,
                  "whyIncorrect": "Las operaciones aritméticas son totalmente válidas dentro de una condición lógica."
                }
              ],
              "correctionTip": "7 dividido 2 da cociente 3 con residuo 1. Como 1 == 0 es False, salta al bloque else.",
              "fullAnswerExplanation": "¡Exacto! 7 % 2 entrega 1. La comparación 1 == 0 es False, por lo que el programa ejecuta inmediatamente la rama else imprimiendo 'El número es IMPAR'."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Salario condicional compuesto",
              "title": "Incremento salarial escalonado",
              "question": "Si el salario es menor al mínimo se incrementa un 10%, de lo contrario se incrementa un 5%. ¿Qué salario imprimirá?",
              "code": "salario = 2000000\nminimo = 1300000\nif salario < minimo:\n    salario = salario * 1.10\nelse:\n    salario = salario * 1.05\nprint(\"Salario ajustado:\", int(salario))",
              "options": [
                {
                  "id": "A",
                  "text": "Salario ajustado: 2100000",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Salario ajustado: 2200000",
                  "isCorrect": false,
                  "whyIncorrect": "2,000,000 no es menor al mínimo, por lo que no recibe el 10% sino el 5% del bloque else."
                },
                {
                  "id": "C",
                  "text": "Salario ajustado: 2000000",
                  "isCorrect": false,
                  "whyIncorrect": "El bloque else incrementa el salario en un 5% (2000000 * 1.05 = 2100000)."
                }
              ],
              "correctionTip": "Como 2,000,000 < 1,300,000 es False, entra al else: 2000000 * 1.05 = 2100000.",
              "fullAnswerExplanation": "¡Muy bien! Al no ser menor al mínimo, se ejecuta el else con aumento del 5%: 2,000,000 * 1.05 = 2,100,000."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Práctica guiada",
              "title": "Cajero automático: retiro de fondos",
              "instruction": "Completa el bloque alternativo para informar cuando el saldo no sea suficiente para el retiro.",
              "slotMarker": "___",
              "starterCode": "saldo = 50000\nretiro = 80000\nif retiro <= saldo:\n    saldo = saldo - retiro\n    print(\"Retiro exitoso\")\n___:\n    print(\"Fondos insuficientes\")\nprint(\"Saldo disponible: $\", saldo)",
              "options": [
                {
                  "id": "A",
                  "code": "elif",
                  "label": "elif",
                  "isCorrect": false,
                  "explanation": "'elif' exige escribir una condición adicional; aquí queremos cubrir todos los demás casos de forma directa."
                },
                {
                  "id": "B",
                  "code": "else",
                  "label": "else",
                  "isCorrect": true,
                  "explanation": "¡Correcto! 'else:' captura cualquier situación donde retiro <= saldo resulte False."
                },
                {
                  "id": "C",
                  "code": "otherwise",
                  "label": "otherwise",
                  "isCorrect": false,
                  "explanation": "'otherwise' no es una palabra reservada en Python; se utiliza siempre 'else:'."
                }
              ],
              "expectedOutput": "Fondos insuficientes\nSaldo disponible: $ 50000"
            }
          ]
        },
        {
          "id": "w2-l6",
          "weekId": "semana-2",
          "number": 6,
          "tag": "Decisiones",
          "shortTitle": "Escalera elif",
          "title": "Múltiples Alternativas: Condicionales if-elif-else",
          "description": "Evalúa múltiples casos excluyentes en cadena, como clasificar números, escalas de notas o categorías de tarifas.",
          "duration": "9 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · La escalera de decisiones",
              "title": "Clasificando con if-elif-else",
              "intro": "Cuando un problema tiene 3 o más posibles caminos, usamos <code>elif</code> (abreviatura de *else if*). Python evalúa cada caso en orden de arriba a abajo y se detiene en el primero que sea <code>True</code>. ¡Prueba con números positivos, cero o negativos!",
              "examples": [
                {
                  "label": "Clasificación interactiva de números",
                  "code": "numero = int(input(\"Ingresa un número entero para clasificar: \"))\nif numero > 0:\n    print(\"El número es POSITIVO\")\nelif numero == 0:\n    print(\"El número es CERO\")\nelse:\n    print(\"El número es NEGATIVO\")\nprint(\"Clasificación terminada\")",
                  "output": "Ingresa un número entero para clasificar: -8\nEl número es NEGATIVO\nClasificación terminada",
                  "explanation": "Python evalúa en cascada: si es mayor a 0 entra al primer bloque; si es 0 entra al elif; y si no, entra al else."
                }
              ],
              "keyTakeaway": "En cuanto una condición de la escalera resulta <code>True</code>, Python ejecuta ese bloque y <strong>salta todas las demás ramas restantes</strong>."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Escala de calificaciones",
              "title": "¿Cuál bloque se activará?",
              "question": "Un estudiante obtiene 85 puntos en su examen. ¿Cuál mensaje exacto mostrará el programa?",
              "code": "puntos = 85\nif puntos >= 90:\n    calificacion = \"Excelente\"\nelif puntos >= 80:\n    calificacion = \"Sobresaliente\"\nelif puntos >= 60:\n    calificacion = \"Aprobado\"\nelse:\n    calificacion = \"Insuficiente\"\nprint(\"Calificación final:\", calificacion)",
              "options": [
                {
                  "id": "A",
                  "text": "Calificación final: Excelente",
                  "isCorrect": false,
                  "whyIncorrect": "85 >= 90 es False, por lo que no entra al primer bloque."
                },
                {
                  "id": "B",
                  "text": "Calificación final: Sobresaliente",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Calificación final: Aprobado",
                  "isCorrect": false,
                  "whyIncorrect": "Aunque 85 >= 60 también es True, Python ya entró en el elif de >= 80 y se detuvo ahí."
                }
              ],
              "correctionTip": "La primera condición verdadera encontrada es 85 >= 80, por lo que calificacion se fija en 'Sobresaliente' y no evalúa más.",
              "fullAnswerExplanation": "¡Exacto! Python evalúa en cascada. Como 85 >= 80 es True, asigna 'Sobresaliente' y omite inmediatamente las siguientes comparaciones."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · El orden de las condiciones",
              "title": "La trampa del orden en elif",
              "question": "¿Qué problema tiene este código al verificar la edad para un descuento especial de adulto mayor (65+)?",
              "code": "edad = 70\nif edad >= 18:\n    print(\"Adulto general\")\nelif edad >= 65:\n    print(\"Adulto mayor con descuento especial\")",
              "options": [
                {
                  "id": "A",
                  "text": "El programa imprime ambos mensajes.",
                  "isCorrect": false,
                  "whyIncorrect": "En una estructura if-elif solo se puede ejecutar una rama como máximo."
                },
                {
                  "id": "B",
                  "text": "Imprime 'Adulto general' y nunca llega a evaluar el descuento de 65+ porque 70 >= 18 ya fue True.",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Produce un error de sintaxis por no incluir la cláusula else.",
                  "isCorrect": false,
                  "whyIncorrect": "La cláusula else es totalmente opcional en Python."
                }
              ],
              "correctionTip": "Como 70 >= 18 es True, entra a la primera rama y salta el elif. Las condiciones más específicas siempre deben ir antes.",
              "fullAnswerExplanation": "¡Brillante observación! En una escalera condicional las condiciones más específicas y restrictivas deben colocarse primero, o de lo contrario una condición amplia las 'ocultará'."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 4 · Práctica guiada",
              "title": "Tarifa predial por estrato",
              "instruction": "En Medellín el impuesto predial depende del estrato socioeconómico. Completa la condición para clasificar a los estratos medios (3 o 4) sin subsidio ni recargo.",
              "slotMarker": "___",
              "starterCode": "estrato = 3\nif estrato <= 2:\n    regimen = \"Subsidio social\"\nelif ___:\n    regimen = \"Tarifa plena sin recargo\"\nelse:\n    regimen = \"Contribución solidaria\"\nprint(\"Régimen aplicado:\", regimen)",
              "options": [
                {
                  "id": "A",
                  "code": "estrato > 4",
                  "label": "estrato > 4",
                  "isCorrect": false,
                  "explanation": "Con estrato > 4 estarías clasificando estratos 5 y 6 en tarifa plena en lugar de contribución solidaria."
                },
                {
                  "id": "B",
                  "code": "estrato <= 4",
                  "label": "estrato <= 4",
                  "isCorrect": true,
                  "explanation": "¡Perfecto! Como los estratos 1 y 2 ya fueron filtrados por el primer if, 'estrato <= 4' atrapa exactamente los estratos 3 y 4."
                },
                {
                  "id": "C",
                  "code": "estrato == 6",
                  "label": "estrato == 6",
                  "isCorrect": false,
                  "explanation": "El estrato 6 corresponde a estratos altos con contribución solidaria."
                }
              ],
              "expectedOutput": "Régimen aplicado: Tarifa plena sin recargo"
            }
          ]
        }
      ]
    },
    {
      "id": "semana-3",
      "number": 3,
      "title": "Semana 3: Aplicaciones Prácticas y Resolución de Problemas",
      "description": "Casos prácticos de ingeniería integrando operadores aritméticos, lógica booleana, condicionales y reportes técnicos.",
      "status": "active",
      "lessons": [
        {
          "id": "w3-l1",
          "weekId": "semana-3",
          "number": 1,
          "tag": "Operadores",
          "shortTitle": "Logística Minera",
          "title": "Logística Minera: Fórmulas y Operadores",
          "description": "Resolución de problemas con división entera, residuo y precedencia en transporte y tolvas.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · La tolva y los viajes en camión",
              "title": "División entera y residuo en transporte de carga",
              "intro": "En una mina de carbón no puedes enviar medio camión: los viajes son cantidades enteras. La división entera // calcula los viajes completos y el residuo % nos da el remanente que se queda en acopio.",
              "examples": [
                {
                  "label": "Viajes y acopio",
                  "code": "material = 95\ncapacidad = 20\nviajes = material // capacidad\nsobrante = material % capacidad\nprint(\"Viajes llenos:\", viajes)\nprint(\"Toneladas en acopio:\", sobrante)",
                  "output": "Viajes llenos: 4\nToneladas en acopio: 15",
                  "explanation": "El operador // calcula cuántas veces cabe 20 en 95 (4 veces), y % extrae las 15 toneladas restantes."
                }
              ],
              "keyTakeaway": "Usa // para contar unidades discretas indivisibles y % para saber exactamente cuánto material sobra."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Reparto de cargamento",
              "title": "¿Cuánto cemento queda en bodega?",
              "question": "Una cuadrilla tiene 74 bultos de cemento y cada camioneta transporta 12 bultos. ¿Cuál es el valor exacto de sobrante al ejecutar este código?",
              "code": "bultos = 74\ncapacidad = 12\nsobrante = bultos % capacidad\nprint(sobrante)",
              "options": [
                {
                  "id": "A",
                  "text": "6",
                  "isCorrect": false,
                  "whyIncorrect": "12 * 6 = 72; el residuo restante de 74 - 72 es 2 bultos, no 6."
                },
                {
                  "id": "B",
                  "text": "2",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "6.16",
                  "isCorrect": false,
                  "whyIncorrect": "El operador % calcula el residuo entero exacto, nunca entrega decimales fraccionarios."
                },
                {
                  "id": "D",
                  "text": "0",
                  "isCorrect": false,
                  "whyIncorrect": "74 no es divisible exactamente entre 12; sobran bultos en bodega."
                }
              ],
              "correctionTip": "El operador % extrae el sobrante de una división: 74 = (12 * 6) + 2.",
              "fullAnswerExplanation": "¡Exacto! 12 cabe 6 veces en 74 dando 72 bultos transportados, y sobran exactamente 2 bultos."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Spot the Bug: La trampa de la división real",
              "title": "¿Por qué falló el cálculo logístico?",
              "question": "Un ingeniero novato escribió este código para saber cuántas volquetas completas se necesitan, pero el programa arrojó un error lógico en la operación. ¿Cuál es la falla?",
              "code": "toneladas = 50\ncapacidad = 8\nvolquetas = toneladas / capacidad\nprint(\"Volquetas requeridas:\", volquetas)",
              "options": [
                {
                  "id": "A",
                  "text": "toneladas no puede dividirse porque fue declarada como texto.",
                  "isCorrect": false,
                  "whyIncorrect": "50 fue declarado como número entero int sin comillas."
                },
                {
                  "id": "B",
                  "text": "En Python el operador de división no existe y causa SyntaxError.",
                  "isCorrect": false,
                  "whyIncorrect": "La barra diagonal / es el operador nativo de división real en Python."
                },
                {
                  "id": "C",
                  "text": "Se usó / que produce 6.25; para unidades físicas indivisibles se debe usar división entera //.",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "Falta convertir capacidad con la función float().",
                  "isCorrect": false,
                  "whyIncorrect": "La división con enteros es perfectamente válida y genera flotante sin conversión previa."
                }
              ],
              "correctionTip": "La división real / genera decimales; para vehículos o viajes completos se emplea //.",
              "fullAnswerExplanation": "¡Brillante diagnóstico! En operaciones físicas no existen 6.25 volquetas; se debe emplear // para cantidades enteras."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 4 · Potencia y resistencia cuadrática",
              "title": "La precedencia de la exponenciación (**)",
              "intro": "La resistencia aerodinámica de los camiones aumenta con el cuadrado de la velocidad (v**2). En Python, el operador de exponenciación ** tiene mayor precedencia que la multiplicación *.",
              "examples": [
                {
                  "label": "Cálculo de potencia",
                  "code": "velocidad = 6\nfactor = 3\npotencia = factor * velocidad ** 2\nprint(\"Potencia requerida (kW):\", potencia)",
                  "output": "Potencia requerida (kW): 108",
                  "explanation": "Python evalúa primero velocidad ** 2 (6**2 = 36), y luego multiplica por factor (3 * 36 = 108)."
                }
              ],
              "keyTakeaway": "La potencia (**) se calcula antes que la multiplicación (*). Si deseas multiplicar primero, debes usar paréntesis."
            },
            {
              "type": "predict",
              "partLabel": "Paso 5 · Precedencia en la fórmula de potencia",
              "title": "¿Qué alteran los paréntesis?",
              "question": "Si un estudiante altera los paréntesis en el cálculo anterior, ¿cuál será la salida exacta de este código?",
              "code": "factor = 2\nbase = 3\nresultado = (factor * base) ** 2\nprint(resultado)",
              "options": [
                {
                  "id": "A",
                  "text": "18",
                  "isCorrect": false,
                  "whyIncorrect": "18 resultaría de 2 * (3 ** 2) = 2 * 9; aquí los paréntesis fuerzan primero 2 * 3 = 6."
                },
                {
                  "id": "B",
                  "text": "12",
                  "isCorrect": false,
                  "whyIncorrect": "Confundes elevar al cuadrado con multiplicar por 2: (6) * 2 = 12."
                },
                {
                  "id": "C",
                  "text": "24",
                  "isCorrect": false,
                  "whyIncorrect": "24 no corresponde a ninguna combinación válida de las variables dadas."
                },
                {
                  "id": "D",
                  "text": "36",
                  "isCorrect": true
                }
              ],
              "correctionTip": "Los paréntesis tienen la máxima prioridad: primero (2 * 3) = 6, y luego 6 ** 2.",
              "fullAnswerExplanation": "¡Exacto! Los paréntesis obligan a evaluar primero la multiplicación factor * base = 6, y 6 elevado al cuadrado da 36."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Práctica guiada con ranuras múltiples",
              "title": "Tolvas y material restante",
              "instruction": "Completa el código con los operadores adecuados para calcular: 1) el número de viajes completos y 2) los kilogramos que quedan en el silo.",
              "slotMarker": "___",
              "starterCode": "kilos_totales = 850\ncapacidad_camion = 200\n\nviajes = kilos_totales ___ capacidad_camion\nrestante = kilos_totales ___ capacidad_camion\n\nprint(\"Viajes completos:\", viajes)\nprint(\"Kilos restantes:\", restante)",
              "expectedOutput": "Viajes completos: 4\nKilos restantes: 50",
              "options": [
                {
                  "id": "A",
                  "slots": [
                    "//",
                    "%"
                  ],
                  "label": "//  y  %",
                  "code": "//  y  %",
                  "isCorrect": true,
                  "explanation": "¡Excelente! // calcula los 4 viajes enteros y % extrae los 50 kg restantes sin fraccionar."
                },
                {
                  "id": "B",
                  "slots": [
                    "/",
                    "%"
                  ],
                  "label": "/  y  %",
                  "code": "/  y  %",
                  "isCorrect": false,
                  "explanation": "Usar / daría 4.25 viajes con decimales en vez de un conteo entero de vehículos."
                },
                {
                  "id": "C",
                  "slots": [
                    "%",
                    "//"
                  ],
                  "label": "%  y  //",
                  "code": "%  y  //",
                  "isCorrect": false,
                  "explanation": "Los operadores están invertidos; calcularías 50 viajes y 4 kilos sobrantes."
                },
                {
                  "id": "D",
                  "slots": [
                    "//",
                    "/"
                  ],
                  "label": "//  y  /",
                  "code": "//  y  /",
                  "isCorrect": false,
                  "explanation": "La segunda ranura debe ser % para calcular el residuo, no la división real."
                }
              ]
            },
            {
              "type": "predict",
              "partLabel": "Paso 7 · Caso Borde: Descarga exacta",
              "title": "¿Qué pasa si no sobra nada?",
              "question": "¿Qué imprime la variable sobrante si el material a despachar es múltiplo exacto de la capacidad del vehículo?",
              "code": "cajas = 60\ncapacidad = 15\nsobrante = cajas % capacidad\nprint(\"Sobrante:\", sobrante)",
              "options": [
                {
                  "id": "A",
                  "text": "Sobrante: 4",
                  "isCorrect": false,
                  "whyIncorrect": "4 es el resultado de la división 60 // 15, no el sobrante de la operación."
                },
                {
                  "id": "B",
                  "text": "Sobrante: None",
                  "isCorrect": false,
                  "whyIncorrect": "El operador módulo siempre devuelve un número entero, nunca None."
                },
                {
                  "id": "C",
                  "text": "Sobrante: 0",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "Sobrante: 15",
                  "isCorrect": false,
                  "whyIncorrect": "Si sobran 15 unidades, cabría exactamente un viaje completo adicional."
                }
              ],
              "correctionTip": "Cuando una cantidad es divisible exactamente por otra, el residuo es estrictamente 0.",
              "fullAnswerExplanation": "¡Correcto! Como 15 * 4 = 60 exactos, no queda ninguna unidad suelta y el residuo es 0."
            }
          ]
        },
        {
          "id": "w3-l2",
          "weekId": "semana-3",
          "number": 2,
          "tag": "Lógica Booleana",
          "shortTitle": "Seguridad Industrial",
          "title": "Seguridad Industrial: Sensores y Lógica Booleana",
          "description": "Monitoreo de parámetros críticos con operadores relacionales y combinaciones lógicas.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Alerta en la caldera de vapor",
              "title": "Condiciones compuestas con and",
              "intro": "En una planta térmica, una alarma de emergencia solo debe activarse si dos condiciones críticas ocurren simultáneamente: alta presión Y alta temperatura.",
              "examples": [
                {
                  "label": "Monitoreo de caldera",
                  "code": "presion_psi = 160\ntemp_celsius = 95\nalarma = (presion_psi > 150) and (temp_celsius > 90)\nprint(\"¿Activar alarma de caldera?\", alarma)",
                  "output": "¿Activar alarma de caldera? True",
                  "explanation": "Como ambas comparaciones son verdaderas (160 > 150 y 95 > 90), el operador and resulta en True."
                }
              ],
              "keyTakeaway": "El operador and exige que ambas condiciones sean verdaderas para dar True. Si una sola falla, todo es False."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Condición de parada de emergencia",
              "title": "¿Cuándo se detiene la cinta?",
              "question": "El sistema detiene una cinta transportadora si el botón de paro está pulsado O si el peso excede 500 kg. ¿Qué imprimirá este programa?",
              "code": "boton_paro = False\npeso_kg = 580\ndetener = boton_paro or (peso_kg > 500)\nprint(\"Detener cinta:\", detener)",
              "options": [
                {
                  "id": "A",
                  "text": "Detener cinta: False",
                  "isCorrect": false,
                  "whyIncorrect": "En el operador or, basta con que una sola de las dos ramas sea True para que todo sea True."
                },
                {
                  "id": "B",
                  "text": "Detener cinta: True",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Detener cinta: 580",
                  "isCorrect": false,
                  "whyIncorrect": "Una expresión con operadores relacionales produce un booleano True/False, no el número."
                },
                {
                  "id": "D",
                  "text": "Detener cinta: Error",
                  "isCorrect": false,
                  "whyIncorrect": "Mezclar booleanos y comparaciones numéricas con or es sintaxis totalmente válida en Python."
                }
              ],
              "correctionTip": "El operador or devuelve True si al menos una de las condiciones es verdadera.",
              "fullAnswerExplanation": "¡Muy bien! Como peso_kg > 500 es True (580 > 500), el operador or produce True inmediatamente."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Spot the Bug: El falso or sin variable",
              "title": "¿Por qué este condicional siempre da True?",
              "question": "Un estudiante quería verificar si el voltaje es 110 o 220 voltios, pero escribió el código de abajo. ¿Por qué este código siempre imprime True sin importar el voltaje?",
              "code": "voltaje = 15\nvalido = (voltaje == 110 or 220)\nprint(\"¿Voltaje válido?\", bool(valido))",
              "options": [
                {
                  "id": "A",
                  "text": "En Python or 220 no compara con voltaje; como el número 220 no es cero, siempre se evalúa como True.",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Porque la variable voltaje debe declararse obligatoriamente con decimales float.",
                  "isCorrect": false,
                  "whyIncorrect": "El tipo de dato entero es perfectamente adecuado para representar voltajes nominales."
                },
                {
                  "id": "C",
                  "text": "Porque el operador == debe colocarse después del paréntesis.",
                  "isCorrect": false,
                  "whyIncorrect": "La sintaxis de los paréntesis es válida, el fallo es la expresión booleana incompleta del or."
                },
                {
                  "id": "D",
                  "text": "Porque la función bool() produce un error al recibir números enteros.",
                  "isCorrect": false,
                  "whyIncorrect": "bool(n) convierte cualquier número entero distinto de 0 en True sin generar errores."
                }
              ],
              "correctionTip": "Cada lado del or debe ser una comparación completa: voltaje == 110 or voltaje == 220.",
              "fullAnswerExplanation": "¡Clave fundamental! En Python, 220 es un valor truthy. Debes escribir explícitamente: (voltaje == 110 or voltaje == 220)."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 4 · El operador not e inversión de sensores",
              "title": "Inversión lógica de señales con not",
              "intro": "Muchos sensores industriales entregan True cuando la válvula está bloqueada. Para verificar si el flujo está libre, invertimos la señal usando not.",
              "examples": [
                {
                  "label": "Inversión de estado",
                  "code": "valvula_bloqueada = False\nflujo_activo = not valvula_bloqueada\nprint(\"¿Hay flujo en la tubería?\", flujo_activo)",
                  "output": "¿Hay flujo en la tubería? True",
                  "explanation": "El operador not convierte False en True y viceversa."
                }
              ],
              "keyTakeaway": "El operador not invierte el valor de verdad: not True es False, y not False es True."
            },
            {
              "type": "predict",
              "partLabel": "Paso 5 · Verificación de ventilación y gases",
              "title": "¿Es seguro ingresar al túnel?",
              "question": "En un túnel subterráneo, la entrada es segura si los gases tóxicos NO están presentes Y los ventiladores están encendidos. ¿Qué imprimirá?",
              "code": "gas_detectado = False\nventilacion_on = True\nseguro = (not gas_detectado) and ventilacion_on\nprint(\"Ingreso seguro:\", seguro)",
              "options": [
                {
                  "id": "A",
                  "text": "Ingreso seguro: False",
                  "isCorrect": false,
                  "whyIncorrect": "not gas_detectado se convierte en True, y True and True resulta en True."
                },
                {
                  "id": "B",
                  "text": "Ingreso seguro: None",
                  "isCorrect": false,
                  "whyIncorrect": "Las expresiones booleanas devuelven exclusivamente True o False en este caso."
                },
                {
                  "id": "C",
                  "text": "Ingreso seguro: True",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "Ingreso seguro: Error",
                  "isCorrect": false,
                  "whyIncorrect": "La expresión lógica está perfectamente estructurada en sintaxis Python."
                }
              ],
              "correctionTip": "not False es True; luego True and True da True.",
              "fullAnswerExplanation": "¡Exacto! Como no hay gas (not False = True) y la ventilación está encendida (True), el túnel es seguro."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Práctica guiada con ranuras múltiples",
              "title": "Protocolo de emergencia",
              "instruction": "Completa el código para activar la alarma si la temperatura excede los 80 grados Y el sistema de refrigeración NO está encendido.",
              "slotMarker": "___",
              "starterCode": "temperatura = 92\nrefrigeracion_activa = False\n\nalarma = (temperatura > 80) ___ (___ refrigeracion_activa)\nprint(\"Alarma crítica:\", alarma)",
              "expectedOutput": "Alarma crítica: True",
              "options": [
                {
                  "id": "A",
                  "slots": [
                    "or",
                    "not"
                  ],
                  "label": "or  y  not",
                  "code": "or  y  not",
                  "isCorrect": false,
                  "explanation": "Con or la alarma sonaría si la temperatura sube aunque la refrigeración funcione bien."
                },
                {
                  "id": "B",
                  "slots": [
                    "and",
                    "bool"
                  ],
                  "label": "and  y  bool",
                  "code": "and  y  bool",
                  "isCorrect": false,
                  "explanation": "Usar bool dejaría la refrigeración en False, activando alarma sin invertir."
                },
                {
                  "id": "C",
                  "slots": [
                    "==",
                    "not"
                  ],
                  "label": "==  y  not",
                  "code": "==  y  not",
                  "isCorrect": false,
                  "explanation": "== compara igualdad entre condiciones en lugar de combinarlas lógicamente."
                },
                {
                  "id": "D",
                  "slots": [
                    "and",
                    "not"
                  ],
                  "label": "and  y  not",
                  "code": "and  y  not",
                  "isCorrect": true,
                  "explanation": "¡Correcto! Exige alta temperatura (and) junto con la ausencia de refrigeración (not refrigeracion_activa)."
                }
              ]
            },
            {
              "type": "predict",
              "partLabel": "Paso 7 · Caso Borde: Cortocircuito en and",
              "title": "¿Qué sucede con el error de división?",
              "question": "En la evaluación lógica de Python, si la primera condición de un and es False, Python descarta evaluar la segunda parte (cortocircuito). ¿Cuál es la salida?",
              "code": "sistema_online = False\nprint(sistema_online and (10 / 0 > 1))",
              "options": [
                {
                  "id": "A",
                  "text": "ZeroDivisionError: division by zero",
                  "isCorrect": false,
                  "whyIncorrect": "Como el primer término es False, Python nunca ejecuta la división por cortocircuito."
                },
                {
                  "id": "B",
                  "text": "True",
                  "isCorrect": false,
                  "whyIncorrect": "Un and donde el primer operando es False jamás puede evaluar a True."
                },
                {
                  "id": "C",
                  "text": "False",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "None",
                  "isCorrect": false,
                  "whyIncorrect": "El resultado de una operación lógica con booleanos es estrictamente False."
                }
              ],
              "correctionTip": "Por la regla de cortocircuito, Python se detiene en cuanto sabe que el resultado no puede cambiar.",
              "fullAnswerExplanation": "¡Principio avanzado de Python! Al ver False en el lado izquierdo del and, Python no evalúa la derecha y evita el error de división."
            }
          ]
        },
        {
          "id": "w3-l3",
          "weekId": "semana-3",
          "number": 3,
          "tag": "Condicionales",
          "shortTitle": "Tarifas Escalonadas",
          "title": "Facturación Energética: Tarifas Escalonadas",
          "description": "Modelos de cobro por bloques de consumo y rangos numéricos con if-elif-else.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Los tres rangos de consumo eléctrico",
              "title": "Clasificación por bloques con if-elif-else",
              "intro": "Las empresas de energía cobran el kilovatio-hora según el nivel de consumo: Tarifa Básica (hasta 100 kWh), Tarifa Intermedia (hasta 200 kWh) y Tarifa Industrial (más de 200 kWh).",
              "examples": [
                {
                  "label": "Facturación por rangos",
                  "code": "consumo = 140\nif consumo <= 100:\n    tarifa = 500\nelif consumo <= 200:\n    tarifa = 750\nelse:\n    tarifa = 1100\nprint(\"Tarifa aplicada ($/kWh):\", tarifa)",
                  "output": "Tarifa aplicada ($/kWh): 750",
                  "explanation": "Como 140 no es <= 100 pero sí es <= 200, entra a la rama elif y asigna la tarifa de 750."
                }
              ],
              "keyTakeaway": "elif solo se evalúa si las condiciones previas fueron False; una vez que una rama se cumple, Python salta todo el resto del bloque."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Asignación de categoría",
              "title": "¿Cuál tarifa aplica a la fábrica?",
              "question": "Si una fábrica pequeña registra un consumo de 250 kWh, ¿qué tarifa imprime el programa?",
              "code": "consumo = 250\nif consumo <= 100:\n    costo = 400\nelif consumo <= 200:\n    costo = 650\nelse:\n    costo = 900\nprint(\"Costo unitario:\", costo)",
              "options": [
                {
                  "id": "A",
                  "text": "Costo unitario: 400",
                  "isCorrect": false,
                  "whyIncorrect": "250 no es menor ni igual a 100, por lo que la primera condición es False."
                },
                {
                  "id": "B",
                  "text": "Costo unitario: 650",
                  "isCorrect": false,
                  "whyIncorrect": "250 tampoco es menor o igual a 200; la rama elif también falla."
                },
                {
                  "id": "C",
                  "text": "Costo unitario: 900",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "Costo unitario: 1950",
                  "isCorrect": false,
                  "whyIncorrect": "Python no suma los costos de las ramas, ejecuta una sola rama de la estructura."
                }
              ],
              "correctionTip": "Como 250 supera tanto a 100 como a 200, entra en la cláusula de descarte else.",
              "fullAnswerExplanation": "¡Exacto! Al fallar tanto el if (<= 100) como el elif (<= 200), el flujo desemboca en la rama else asignando 900."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Spot the Bug: El error del orden invertido",
              "title": "¿Por qué nunca llega a Industrial?",
              "question": "Un programador novato invirtió el orden de las comparaciones en este script de clasificación. Si un usuario consume 300 kWh, ¿qué error genera este código?",
              "code": "consumo = 300\nif consumo > 50:\n    categoria = \"Básico\"\nelif consumo > 200:\n    categoria = \"Industrial\"\nprint(categoria)",
              "options": [
                {
                  "id": "A",
                  "text": "Imprime 'Básico' porque 300 > 50 es True, eclipsando la rama de 'Industrial'.",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Causa un SyntaxError porque los elif deben ir siempre antes del if.",
                  "isCorrect": false,
                  "whyIncorrect": "La sintaxis es válida; el fallo es de lógica algorítmica por orden de evaluación."
                },
                {
                  "id": "C",
                  "text": "Imprime 'Industrial' porque Python busca la condición con el número más grande.",
                  "isCorrect": false,
                  "whyIncorrect": "Python evalúa de arriba a abajo en orden secuencial estricto."
                },
                {
                  "id": "D",
                  "text": "Produce un error de indentación en la variable categoria.",
                  "isCorrect": false,
                  "whyIncorrect": "Las líneas interiores están correctamente indentadas con 4 espacios."
                }
              ],
              "correctionTip": "Las condiciones deben ordenarse de la más restrictiva a la más general para no tapar los casos específicos.",
              "fullAnswerExplanation": "¡Lección crítica de diseño! Como 300 > 50 es True, entra a 'Básico' y jamás evalúa > 200. Debió ordenar primero > 200."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 4 · Cargo fijo según estrato",
              "title": "Combinar categorías con or dentro de if",
              "intro": "En servicios públicos domiciliarios, el cargo fijo cambia según el estrato socioeconómico. Puedes agrupar estratos con or en la cabecera condicional.",
              "examples": [
                {
                  "label": "Cargo fijo estratificado",
                  "code": "estrato = 2\ncargo_fijo = 0\nif estrato == 1 or estrato == 2:\n    cargo_fijo = 5000\nelif estrato == 3 or estrato == 4:\n    cargo_fijo = 12000\nelse:\n    cargo_fijo = 25000\nprint(\"Cargo fijo liquidado: $\", cargo_fijo, sep=\"\")",
                  "output": "Cargo fijo liquidado: $5000",
                  "explanation": "Como estrato == 2 es True, la primera rama se ejecuta y fija el cargo en 5000."
                }
              ],
              "keyTakeaway": "Puedes usar operadores lógicos dentro de if y elif para simplificar la lógica y evitar anidar código innecesariamente."
            },
            {
              "type": "predict",
              "partLabel": "Paso 5 · Liquidación de estrato medio",
              "title": "¿Cuál es el cargo para estrato 4?",
              "question": "Si el predio pertenece a estrato = 4, ¿cuál es el valor exacto de cargo tras la ejecución?",
              "code": "estrato = 4\nif estrato <= 2:\n    cargo = 6000\nelif estrato <= 4:\n    cargo = 14000\nelse:\n    cargo = 28000\nprint(\"Cargo:\", cargo)",
              "options": [
                {
                  "id": "A",
                  "text": "Cargo: 6000",
                  "isCorrect": false,
                  "whyIncorrect": "4 no es menor o igual a 2, por lo que el primer if da False."
                },
                {
                  "id": "B",
                  "text": "Cargo: 14000",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Cargo: 28000",
                  "isCorrect": false,
                  "whyIncorrect": "La rama else solo se ejecuta si estrato es estrictamente mayor que 4."
                },
                {
                  "id": "D",
                  "text": "Cargo: 20000",
                  "isCorrect": false,
                  "whyIncorrect": "No se suman tarifas intermedias, solo se asigna el valor de la rama activa."
                }
              ],
              "correctionTip": "4 <= 4 es True, activando inmediatamente el bloque del elif.",
              "fullAnswerExplanation": "¡Muy bien! Como 4 no es <= 2 pero sí cumple 4 <= 4, se le asigna la tarifa de 14000."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Práctica guiada con ranuras múltiples",
              "title": "Tarifario de consumo de agua",
              "instruction": "Completa las dos ranuras del condicional para clasificar el consumo de agua: hasta 20 m³ es 'Consumo normal', y si supera 20 pero es menor o igual a 40 es 'Consumo alto'.",
              "slotMarker": "___",
              "starterCode": "metros_cubicos = 35\n\nif metros_cubicos ___ 20:\n    tipo = \"Consumo normal\"\n___ metros_cubicos <= 40:\n    tipo = \"Consumo alto\"\nelse:\n    tipo = \"Consumo crítico\"\n\nprint(\"Diagnóstico:\", tipo)",
              "expectedOutput": "Diagnóstico: Consumo alto",
              "options": [
                {
                  "id": "A",
                  "slots": [
                    "<",
                    "else"
                  ],
                  "label": "<  y  else",
                  "code": "<  y  else",
                  "isCorrect": false,
                  "explanation": "Si pones else, no puedes incluir una condición posterior como <= 40."
                },
                {
                  "id": "B",
                  "slots": [
                    "==",
                    "elif"
                  ],
                  "label": "==  y  elif",
                  "code": "==  y  elif",
                  "isCorrect": false,
                  "explanation": "Con == 20 dejarías por fuera todos los consumos menores a 20 m³."
                },
                {
                  "id": "C",
                  "slots": [
                    "<=",
                    "elif"
                  ],
                  "label": "<=  y  elif",
                  "code": "<=  y  elif",
                  "isCorrect": true,
                  "explanation": "¡Perfecto! <= captura hasta 20 m³, y elif evalúa la siguiente condición de hasta 40 m³."
                },
                {
                  "id": "D",
                  "slots": [
                    ">=",
                    "elif"
                  ],
                  "label": ">=  y  elif",
                  "code": ">=  y  elif",
                  "isCorrect": false,
                  "explanation": "Con >= 20 atraparías 35 en la primera rama clasificándolo erróneamente como 'Consumo normal'."
                }
              ]
            },
            {
              "type": "predict",
              "partLabel": "Paso 7 · Caso Borde: Valor exactamente en la frontera",
              "title": "¿Qué sucede en el punto de corte exacto?",
              "question": "Observa con atención los operadores: ¿qué ocurre cuando el valor evaluado es exactamente igual al límite 20?",
              "code": "temperatura = 20\nif temperatura < 20:\n    estado = \"Frío\"\nelif temperatura > 20:\n    estado = \"Caliente\"\nelse:\n    estado = \"Neutro\"\nprint(\"Estado:\", estado)",
              "options": [
                {
                  "id": "A",
                  "text": "Estado: Frío",
                  "isCorrect": false,
                  "whyIncorrect": "La condición exige estrictamente < 20; 20 no es menor que 20."
                },
                {
                  "id": "B",
                  "text": "Estado: Caliente",
                  "isCorrect": false,
                  "whyIncorrect": "La condición exige estrictamente > 20; 20 no es mayor que 20."
                },
                {
                  "id": "C",
                  "text": "Estado: None",
                  "isCorrect": false,
                  "whyIncorrect": "Al no cumplirse ni if ni elif, el flujo desemboca en la cláusula else."
                },
                {
                  "id": "D",
                  "text": "Estado: Neutro",
                  "isCorrect": true
                }
              ],
              "correctionTip": "Como 20 no es estrictamente menor ni mayor que 20, cae en la cláusula else.",
              "fullAnswerExplanation": "¡Atención al detalle! 20 no cumple < 20 ni > 20. Por descarte exacto de frontera, se ejecuta el else dando 'Neutro'."
            }
          ]
        },
        {
          "id": "w3-l4",
          "weekId": "semana-3",
          "number": 4,
          "tag": "Anidamiento",
          "shortTitle": "Control de Calidad",
          "title": "Control de Calidad: Diagnóstico Multicriterio",
          "description": "Decisiones anidadas, banderas booleanas y filtros multicriterio en laboratorio.",
          "duration": "10 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · Clasificación de mineral de cobre",
              "title": "Condicionales anidados (un if dentro de otro)",
              "intro": "En el laboratorio de metalurgia, una muestra de cobre se clasifica como 'Premium' solo si su pureza supera el 85% Y su humedad es menor al 8%. Si la pureza es alta pero tiene humedad, se manda a secado.",
              "examples": [
                {
                  "label": "Filtro de laboratorio",
                  "code": "pureza = 88\nhumedad = 5\nif pureza >= 85:\n    if humedad < 8:\n        dictamen = \"Lote Premium\"\n    else:\n        dictamen = \"Requiere Secado\"\nelse:\n    dictamen = \"Rechazado por baja ley\"\nprint(\"Resultado de laboratorio:\", dictamen)",
                  "output": "Resultado de laboratorio: Lote Premium",
                  "explanation": "El if interno solo se evalúa si la muestra supera primero el umbral de pureza (pureza >= 85)."
                }
              ],
              "keyTakeaway": "Los condicionales anidados permiten tomar decisiones secundarias solo después de haber superado un primer filtro principal."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Trazado de lote húmedo",
              "title": "¿Qué dictamen recibe la muestra?",
              "question": "Si ingresa una muestra con pureza = 90 y humedad = 14, ¿cuál es el resultado exacto de la evaluación?",
              "code": "pureza = 90\nhumedad = 14\nif pureza >= 85:\n    if humedad < 8:\n        print(\"Aprobado directo\")\n    else:\n        print(\"Aprobado con secado previo\")\nelse:\n    print(\"Rechazado\")",
              "options": [
                {
                  "id": "A",
                  "text": "Aprobado con secado previo",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Aprobado directo",
                  "isCorrect": false,
                  "whyIncorrect": "La humedad de 14 no es menor a 8, por lo que no entra al primer print."
                },
                {
                  "id": "C",
                  "text": "Rechazado",
                  "isCorrect": false,
                  "whyIncorrect": "La pureza de 90 supera 85, por lo que no cae en el rechazo general externo."
                },
                {
                  "id": "D",
                  "text": "Error: indentación inválida",
                  "isCorrect": false,
                  "whyIncorrect": "El anidamiento con 4 y 8 espacios es completamente válido en Python."
                }
              ],
              "correctionTip": "Supera la pureza (90 >= 85), pero al tener 14 de humedad entra al else interior.",
              "fullAnswerExplanation": "¡Excelente trazado! Entra al bloque principal porque 90 >= 85, y dentro falla la humedad (14 < 8 es False), cayendo en el else interno."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Spot the Bug: Asignación vs comparación",
              "title": "¿Por qué falló la comparación de texto?",
              "question": "Un estudiante de ingeniería de materiales escribió este condicional para verificar si la muestra era de tipo 'Au' (oro), pero el intérprete arrojó SyntaxError. ¿Por qué?",
              "code": "mineral = \"Au\"\nif mineral = \"Au\":\n    print(\"Muestra de oro detectada\")",
              "options": [
                {
                  "id": "A",
                  "text": "Las cadenas de texto no pueden compararse en condicionales if.",
                  "isCorrect": false,
                  "whyIncorrect": "Los textos se comparan habitualmente con los operadores relacionales == o !=."
                },
                {
                  "id": "B",
                  "text": "Se debe usar la palabra reservada equals en lugar del signo igual.",
                  "isCorrect": false,
                  "whyIncorrect": "Python no tiene palabra clave equals, utiliza operadores relacionales."
                },
                {
                  "id": "C",
                  "text": "Falta cerrar el texto con comillas dobles triples.",
                  "isCorrect": false,
                  "whyIncorrect": "Las comillas estándar 'Au' son completamente correctas."
                },
                {
                  "id": "D",
                  "text": "Se usó el operador de asignación = en lugar del operador de comparación relacional ==.",
                  "isCorrect": true
                }
              ],
              "correctionTip": "Un solo = asigna valores; para comparar igualdad en un condicional se usa ==.",
              "fullAnswerExplanation": "¡Error clásico de principiantes! Un solo '=' intenta asignar una variable, lo cual es ilegal en la condición de un if. Se debe usar '=='."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 4 · El uso de banderas de control (flags)",
              "title": "Banderas booleanas para control multicriterio",
              "intro": "En software de ingeniería es una práctica excelente usar una variable booleana como 'bandera' (aprobado = True). Si alguna prueba de laboratorio falla, la bandera se conmuta a False.",
              "examples": [
                {
                  "label": "Inspección de concreto",
                  "code": "resistencia_mpa = 28\ngrietas_visibles = False\naprobado = True\nif resistencia_mpa < 25:\n    aprobado = False\nif grietas_visibles:\n    aprobado = False\nprint(\"¿El concreto superó la prueba técnica?\", aprobado)",
                  "output": "¿El concreto superó la prueba técnica? True",
                  "explanation": "Como la resistencia superó los 25 MPa y no hay grietas, aprobado permanece en True."
                }
              ],
              "keyTakeaway": "Las banderas permiten evaluar múltiples reglas de validación independientes sin necesidad de escaleras complejas de if-else."
            },
            {
              "type": "predict",
              "partLabel": "Paso 5 · Inspección estructural con bandera",
              "title": "¿Supera la viga la prueba de deflexión?",
              "question": "Si una viga de acero tiene una deflexión de 12 mm y el límite permitido es 10 mm, ¿cuál será el valor impreso de viga_segura?",
              "code": "deflexion_mm = 12\nlimite = 10\nviga_segura = True\nif deflexion_mm > limite:\n    viga_segura = False\nprint(\"Segura:\", viga_segura)",
              "options": [
                {
                  "id": "A",
                  "text": "Segura: True",
                  "isCorrect": false,
                  "whyIncorrect": "Como 12 > 10 es True, la línea interior conmuta la variable a False."
                },
                {
                  "id": "B",
                  "text": "Segura: False",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "Segura: 12",
                  "isCorrect": false,
                  "whyIncorrect": "La variable viga_segura almacena un valor booleano, no la deflexión."
                },
                {
                  "id": "D",
                  "text": "Segura: 2",
                  "isCorrect": false,
                  "whyIncorrect": "No se realiza una resta, sino una asignación booleana directa a False."
                }
              ],
              "correctionTip": "Al superar el límite (12 > 10), la bandera viga_segura se apaga a False.",
              "fullAnswerExplanation": "¡Exacto! La condición 12 > 10 se cumple, ejecutando la asignación viga_segura = False."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Práctica guiada con ranuras múltiples",
              "title": "Filtro de aptitud de roca para cimentación",
              "instruction": "Completa el código con las ranuras faltantes: verifica que la dureza sea al menos 7.0 Y que la densidad sea estrictamente mayor a 3.5 para marcar la roca como apta.",
              "slotMarker": "___",
              "starterCode": "dureza_mohs = 7.5\ndensidad_gcm3 = 4.2\n\nif dureza_mohs ___ 7.0 and densidad_gcm3 ___ 3.5:\n    dictamen = \"Apta para cimentación\"\nelse:\n    dictamen = \"Roca descartada\"\n\nprint(\"Diagnóstico final:\", dictamen)",
              "expectedOutput": "Diagnóstico final: Apta para cimentación",
              "options": [
                {
                  "id": "A",
                  "slots": [
                    ">=",
                    ">"
                  ],
                  "label": ">=  y  >",
                  "code": ">=  y  >",
                  "isCorrect": true,
                  "explanation": "¡Excelente! >= 7.0 asegura al menos 7.0 de dureza y > 3.5 exige densidad superior al umbral."
                },
                {
                  "id": "B",
                  "slots": [
                    "==",
                    "<"
                  ],
                  "label": "==  y  <",
                  "code": "==  y  <",
                  "isCorrect": false,
                  "explanation": "Exigiría exactamente 7.0 y densidad baja, descartando la roca apta."
                },
                {
                  "id": "C",
                  "slots": [
                    "<=",
                    ">"
                  ],
                  "label": "<=  y  >",
                  "code": "<=  y  >",
                  "isCorrect": false,
                  "explanation": "<= admitiría rocas blandas con dureza inferior a la requerida."
                },
                {
                  "id": "D",
                  "slots": [
                    ">=",
                    "<="
                  ],
                  "label": ">=  y  <=",
                  "code": ">=  y  <=",
                  "isCorrect": false,
                  "explanation": "La segunda ranura admitiría densidades bajas en lugar de altas."
                }
              ]
            },
            {
              "type": "predict",
              "partLabel": "Paso 7 · Caso Borde: Sensibilidad a mayúsculas",
              "title": "¿Son iguales 'COBRE' y 'cobre'?",
              "question": "Un operador escribe el mineral en mayúscula 'COBRE', pero el sistema compara contra 'cobre'. ¿Qué salida produce Python?",
              "code": "mineral = \"COBRE\"\nif mineral == \"cobre\":\n    precio = 4.5\nelse:\n    precio = 0.0\nprint(\"Precio:\", precio)",
              "options": [
                {
                  "id": "A",
                  "text": "Precio: 4.5",
                  "isCorrect": false,
                  "whyIncorrect": "En Python la comparación de texto distingue entre mayúsculas y minúsculas (case-sensitive)."
                },
                {
                  "id": "B",
                  "text": "Precio: 0.0",
                  "isCorrect": true
                },
                {
                  "id": "C",
                  "text": "TypeError",
                  "isCorrect": false,
                  "whyIncorrect": "Comparar cadenas con diferente mayúscula es válido y da False sin errores."
                },
                {
                  "id": "D",
                  "text": "Precio: None",
                  "isCorrect": false,
                  "whyIncorrect": "La variable precio se inicializa limpiamente en la rama else con 0.0."
                }
              ],
              "correctionTip": "Python es case-sensitive: 'COBRE' != 'cobre'. Para igualarlos se usaría .lower().",
              "fullAnswerExplanation": "¡Atención! Las mayúsculas y minúsculas tienen códigos de caracter distintos. Al no ser idénticos, salta al else dando 0.0."
            }
          ]
        },
        {
          "id": "w3-l5",
          "weekId": "semana-3",
          "number": 5,
          "tag": "Integración",
          "shortTitle": "Reto Integrador",
          "title": "Reto Integrador: Del Sensor al Reporte Técnico",
          "description": "Pipeline completo: entrada, conversión de datos, cómputo con fórmulas y reporte con f-strings.",
          "duration": "12 min",
          "steps": [
            {
              "type": "explanation",
              "partLabel": "Paso 1 · La anatomía de un script de ingeniería",
              "title": "El ciclo Entrada -> Procesamiento -> Decisión -> Reporte",
              "intro": "Todo programa profesional de ingeniería sigue una estructura limpia en 4 fases: 1) Entrada de datos, 2) Procesamiento y cálculos físicos, 3) Decisión lógica y 4) Salida de reporte técnico con f-strings.",
              "examples": [
                {
                  "label": "Cálculo hidráulico y reporte",
                  "code": "diametro_m = 0.5\ncaudal_m3s = 0.25\narea = 3.1416 * (diametro_m / 2) ** 2\nvelocidad = caudal_m3s / area\nestado = \"Adecuada\" if velocidad <= 2.0 else \"Excesiva\"\nprint(f\"Velocidad: {velocidad:.2f} m/s | Estado: {estado}\")",
                  "output": "Velocidad: 1.27 m/s | Estado: Adecuada",
                  "explanation": "Calcula el área, obtiene la velocidad y reporta el diagnóstico formateado con 2 decimales."
                }
              ],
              "keyTakeaway": "Integrar cálculo físico y toma de decisiones permite generar reportes técnicos claros y automatizados."
            },
            {
              "type": "predict",
              "partLabel": "Paso 2 · Trazado de consumo de bomba hidráulica",
              "title": "¿Cuál es la potencia y qué motor se asigna?",
              "question": "Una bomba eleva agua a un tanque. Si la altura es 30 metros y el caudal es 5 litros/segundo, ¿qué potencia imprime este script?",
              "code": "altura = 30\ncaudal = 5\npotencia_kw = (altura * caudal) / 100\nif potencia_kw > 1.0:\n    motor = \"Trifásico\"\nelse:\n    motor = \"Monofásico\"\nprint(f\"Potencia: {potencia_kw} kW -> Motor {motor}\")",
              "options": [
                {
                  "id": "A",
                  "text": "Potencia: 15.0 kW -> Motor Trifásico",
                  "isCorrect": false,
                  "whyIncorrect": "(30 * 5) / 100 = 150 / 100 = 1.5, no 15.0."
                },
                {
                  "id": "B",
                  "text": "Potencia: 1.5 kW -> Motor Monofásico",
                  "isCorrect": false,
                  "whyIncorrect": "Como 1.5 > 1.0 es True, el motor asignado es Trifásico."
                },
                {
                  "id": "C",
                  "text": "Potencia: 1.5 kW -> Motor Trifásico",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "Potencia: 1 kW -> Motor Trifásico",
                  "isCorrect": false,
                  "whyIncorrect": "El operador / produce un float con decimales exactos 1.5."
                }
              ],
              "correctionTip": "(30 * 5) / 100 = 1.5 kW. Al superar 1.0 kW, se selecciona motor Trifásico.",
              "fullAnswerExplanation": "¡Cálculo impecable! 150 / 100 da 1.5 kW; al superar 1.0 kW el condicional activa el motor Trifásico."
            },
            {
              "type": "predict",
              "partLabel": "Paso 3 · Spot the Bug: La trampa de input() sin casting",
              "title": "¿Por qué no duplicó la dosificación?",
              "question": "Un estudiante recolectó datos con input() y quiso duplicar la dosificación, pero ocurrió una falla al ejecutar. ¿Cuál es el error exacto?",
              "code": "dosis_texto = \"50\"\ntotal = dosis_texto * 2\nprint(\"Dosificación final:\", total)",
              "options": [
                {
                  "id": "A",
                  "text": "Produce un error de sintaxis SyntaxError por usar comillas en un número.",
                  "isCorrect": false,
                  "whyIncorrect": "\"50\" es un string válido en Python, no genera ningún SyntaxError."
                },
                {
                  "id": "B",
                  "text": "Imprime 100 porque Python convierte automáticamente los strings numéricos al multiplicar.",
                  "isCorrect": false,
                  "whyIncorrect": "Python no hace coerción implícita de str a int en multiplicación."
                },
                {
                  "id": "C",
                  "text": "Produce un TypeError porque los strings no admiten el operador *.",
                  "isCorrect": false,
                  "whyIncorrect": "Los strings sí admiten * pero para duplicar texto: \"50\" * 2 = \"5050\"."
                },
                {
                  "id": "D",
                  "text": "Imprime '5050' en lugar de 100 porque repite el texto dos veces; falta convertir con int().",
                  "isCorrect": true
                }
              ],
              "correctionTip": "Multiplicar texto por 2 concatena dos veces la cadena. Se debe convertir con int(dosis_texto).",
              "fullAnswerExplanation": "¡Error clásico de input()! Multiplicar un str por un entero repite el texto ('50' * 2 = '5050'). Se requería int(dosis_texto) * 2 = 100."
            },
            {
              "type": "explanation",
              "partLabel": "Paso 4 · Redondeo técnico en f-strings",
              "title": "El modificador :.2f para decimales limpios",
              "intro": "En minería y obras civiles, los informes técnicos no deben mostrar 15 decimales como 8.4720000000. Usamos :.2f en la f-string para formatear a exactamente 2 decimales limpios.",
              "examples": [
                {
                  "label": "Formato de pendiente",
                  "code": "pendiente = 0.08472\nporcentaje = pendiente * 100\nprint(f\"Pendiente de la rampa: {porcentaje:.2f}%\")",
                  "output": "Pendiente de la rampa: 8.47%",
                  "explanation": "El especificador :.2f redondea visualmente el número a 2 decimales."
                }
              ],
              "keyTakeaway": "Dentro de las llaves {variable:.2f} de una f-string puedes controlar la cantidad exacta de decimales para reportes profesionales."
            },
            {
              "type": "predict",
              "partLabel": "Paso 5 · Formato técnico de presión en bar",
              "title": "¿Cuál es la salida con :.1f?",
              "question": "¿Cuál es la salida exacta de este reporte de presión formateado con 1 decimal (:.1f)?",
              "code": "presion_psi = 145.68\npresion_bar = presion_psi * 0.068947\nprint(f\"Presión: {presion_bar:.1f} bar\")",
              "options": [
                {
                  "id": "A",
                  "text": "Presión: 10.0 bar",
                  "isCorrect": true
                },
                {
                  "id": "B",
                  "text": "Presión: 10 bar",
                  "isCorrect": false,
                  "whyIncorrect": "El especificador :.1f siempre muestra el punto y exactamente un dígito decimal: 10.0."
                },
                {
                  "id": "C",
                  "text": "Presión: 10.04 bar",
                  "isCorrect": false,
                  "whyIncorrect": ":.1f formatea a un solo decimal, no a dos."
                },
                {
                  "id": "D",
                  "text": "Presión: {presion_bar:.1f} bar",
                  "isCorrect": false,
                  "whyIncorrect": "Al llevar la 'f' inicial antes de las comillas, las llaves se interpolan con el valor."
                }
              ],
              "correctionTip": "145.68 * 0.068947 = 10.044... Redondeado a 1 decimal se formatea como 10.0.",
              "fullAnswerExplanation": "¡Exacto! El cálculo da 10.044..., que formateado con :.1f muestra '10.0 bar'."
            },
            {
              "type": "code_sandbox",
              "partLabel": "Paso 6 · Práctica guiada con ranuras múltiples",
              "title": "Sistema integral de bombeo",
              "instruction": "Completa el script del sistema de drenaje: 1) convierte el caudal recibido en texto a decimal float y 2) define la condición para encender la bomba auxiliar si la presión es menor a 2.5 bar.",
              "slotMarker": "___",
              "starterCode": "caudal_str = \"15.5\"\ncaudal = ___ (caudal_str)\n\npresion = caudal * 0.18\n\nif presion ___ 2.5:\n    accion = \"Encender bomba auxiliar\"\nelse:\n    accion = \"Presión óptima en línea\"\n\nprint(f\"Presión: {presion:.2f} bar | Acción: {accion}\")",
              "expectedOutput": "Presión: 2.79 bar | Acción: Presión óptima en línea",
              "options": [
                {
                  "id": "A",
                  "slots": [
                    "str",
                    ">"
                  ],
                  "label": "str  y  >",
                  "code": "str  y  >",
                  "isCorrect": false,
                  "explanation": "caudal_str ya es string y > encendería la bomba cuando la presión es alta en vez de baja."
                },
                {
                  "id": "B",
                  "slots": [
                    "float",
                    "<"
                  ],
                  "label": "float  y  <",
                  "code": "float  y  <",
                  "isCorrect": true,
                  "explanation": "¡Brillante integración! float() permite operar el texto con decimales y < detecta la caída de presión."
                },
                {
                  "id": "C",
                  "slots": [
                    "int",
                    "<="
                  ],
                  "label": "int  y  <=",
                  "code": "int  y  <=",
                  "isCorrect": false,
                  "explanation": "int(\"15.5\") causaría un ValueError porque el texto contiene un punto decimal."
                },
                {
                  "id": "D",
                  "slots": [
                    "float",
                    "=="
                  ],
                  "label": "float  y  ==",
                  "code": "float  y  ==",
                  "isCorrect": false,
                  "explanation": "La bomba debe arrancar con cualquier valor por debajo de 2.5 bar, no solo exactamente 2.5."
                }
              ]
            },
            {
              "type": "predict",
              "partLabel": "Paso 7 · Caso Borde: Prevención de división por cero",
              "title": "¿Cómo se evita el colapso del programa?",
              "question": "En una fórmula de rendimiento de maquinaria, si las horas trabajadas son 0, dividir directamente causaría ZeroDivisionError. ¿Cómo evita este script el colapso?",
              "code": "produccion = 500\nhoras = 0\nif horas > 0:\n    rendimiento = produccion / horas\nelse:\n    rendimiento = 0.0\nprint(f\"Rendimiento: {rendimiento} ton/h\")",
              "options": [
                {
                  "id": "A",
                  "text": "El programa colapsa con ZeroDivisionError en la línea del if.",
                  "isCorrect": false,
                  "whyIncorrect": "La condición horas > 0 es False, por lo que nunca entra a ejecutar la división."
                },
                {
                  "id": "B",
                  "text": "Imprime Rendimiento: 500 ton/h.",
                  "isCorrect": false,
                  "whyIncorrect": "No se copia la producción, se asigna 0.0 en la rama else."
                },
                {
                  "id": "C",
                  "text": "Imprime Rendimiento: 0.0 ton/h.",
                  "isCorrect": true
                },
                {
                  "id": "D",
                  "text": "Imprime Rendimiento: None ton/h.",
                  "isCorrect": false,
                  "whyIncorrect": "En la rama else se asignó explícitamente el flotante 0.0."
                }
              ],
              "correctionTip": "La guarda condicional if horas > 0 previene la división por cero y asigna un valor seguro 0.0.",
              "fullAnswerExplanation": "¡Técnica esencial de ingeniería! Antes de dividir por una variable, un condicional previene que una entrada de 0 tumbe el software."
            },
            {
              "type": "predict",
              "partLabel": "Paso 8 · Consolidación de variables acumuladas",
              "title": "¿Cuál es el monto final a pagar?",
              "question": "Se aplica un descuento por volumen de compra de tubería PVC. Si el precio base es 1000 y la cantidad es 15 metros, ¿cuál es el total a pagar tras la bonificación?",
              "code": "precio_metro = 1000\nmetros = 15\nsubtotal = precio_metro * metros\nif metros >= 10:\n    descuento = subtotal * 0.10\nelse:\n    descuento = 0.0\ntotal = subtotal - descuento\nprint(f\"Total a pagar: ${total:.0f}\")",
              "options": [
                {
                  "id": "A",
                  "text": "Total a pagar: $15000",
                  "isCorrect": false,
                  "whyIncorrect": "15000 es el subtotal bruto sin aplicar el 10% de descuento ganado."
                },
                {
                  "id": "B",
                  "text": "Total a pagar: $1500",
                  "isCorrect": false,
                  "whyIncorrect": "1500 es el valor del descuento, no el total final a pagar."
                },
                {
                  "id": "C",
                  "text": "Total a pagar: $12000",
                  "isCorrect": false,
                  "whyIncorrect": "El 10% de 15000 es 1500, no 3000."
                },
                {
                  "id": "D",
                  "text": "Total a pagar: $13500",
                  "isCorrect": true
                }
              ],
              "correctionTip": "Subtotal = 15 * 1000 = 15000; Descuento = 1500; Total = 15000 - 1500 = 13500.",
              "fullAnswerExplanation": "¡Consolidación exitosa! El subtotal es 15000, supera los 10 metros activando el 10% de descuento (1500), resultando en 13500 a pagar."
            }
          ]
        }
      ]
    }
  ]
};
