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
        "title": "Semana 3: Ciclos y Repetición",
        "description": "Automatización de tareas repetitivas con for, while, range, acumuladores, centinelas y control de flujo.",
        "status": "active",
        "lessons": [
            {
                "id": "w3-l1",
                "weekId": "semana-3",
                "number": 1,
                "tag": "Ciclos",
                "shortTitle": "Contadores y Acumuladores",
                "title": "Variables de memoria cíclica: Contadores y Acumuladores",
                "description": "Incrementos fijos vs acumulaciones variables y promedios estadísticos.",
                "duration": "8 min",
                "steps": [
                    {
                        "type": "explanation",
                        "partLabel": "Paso 1 · El concepto",
                        "title": "El torniquete y la alcancía",
                        "intro": "Un torniquete de metro es un contador: suma una persona fija en cada giro. Una alcancía es un acumulador: cada moneda tiene un valor variable ($500, $1000, $200) que se agrega al saldo total.",
                        "examples": [
                            {
                                "label": "Contador y acumulador en taquilla",
                                "code": "pasajeros = 0\nrecaudo = 0\n\npasajeros += 1\nrecaudo += 3200\n\npasajeros += 1\nrecaudo += 3200\n\nprint(f\"Total personas: {pasajeros}\")\nprint(f\"Total dinero: ${recaudo}\")",
                                "output": "Total personas: 2\nTotal dinero: $6400",
                                "explanation": "pasajeros suma de 1 en 1 (contador); recaudo suma el precio de cada boleto (acumulador)."
                            }
                        ],
                        "keyTakeaway": "Un contador suma una cantidad constante (suele ser += 1); un acumulador suma valores variables o montos cambiantes (+= valor)."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 2 · Trazado mental",
                        "title": "Conteo en la línea de ensamble",
                        "code": "piezas = 0\npiezas += 1\npiezas += 1\npiezas += 2\nprint(piezas)",
                        "question": "¿Qué número imprimirá Python en la consola al finalizar este script?",
                        "theory": "Rastrea el valor de piezas en cada línea: 0 -> 1 -> 2 -> 4.",
                        "options": [
                            {
                                "id": "A",
                                "text": "3",
                                "isCorrect": false,
                                "whyIncorrect": "Sumaste las 3 líneas de código en vez de los valores reales asignados en cada suma (1 + 1 + 2)."
                            },
                            {
                                "id": "B",
                                "text": "4",
                                "isCorrect": true
                            },
                            {
                                "id": "C",
                                "text": "2",
                                "isCorrect": false,
                                "whyIncorrect": "Solo tomaste el último incremento de 2, olvidando que los anteriores ya habían acumulado 2 piezas."
                            },
                            {
                                "id": "D",
                                "text": "5",
                                "isCorrect": false,
                                "whyIncorrect": "Calculaste un incremento de más; las sumas son 0 + 1 + 1 + 2 = 4."
                            }
                        ],
                        "correctionTip": "Sigue la traza en cada suma: 0 + 1 = 1; 1 + 1 = 2; 2 + 2 = 4.",
                        "fullAnswerExplanation": "¡Correcto! La variable piezas arranca en 0 y va mutando: 0 -> 1 -> 2 -> 4."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 3 · Spot the Bug",
                        "title": "El acumulador que no retiene",
                        "code": "total = 0\nfor gasto in [15000, 22000, 8000]:\n    total = 0\n    total += gasto\nprint(\"Total:\", total)",
                        "question": "El programa imprime Total: 8000 en vez de 45000. ¿Cuál es la causa exacta del error?",
                        "theory": "Fíjate bien en qué líneas están dentro del bloque indentado del ciclo.",
                        "options": [
                            {
                                "id": "A",
                                "text": "El operador += no funciona con números enteros dentro de un ciclo.",
                                "isCorrect": false,
                                "whyIncorrect": "El operador '+=' funciona perfectamente con números enteros en cualquier parte del código."
                            },
                            {
                                "id": "B",
                                "text": "Falta convertir total con la función int() antes de imprimirlo en terminal.",
                                "isCorrect": false,
                                "whyIncorrect": "La variable ya es un número entero; no requiere ninguna conversión de tipo de dato."
                            },
                            {
                                "id": "C",
                                "text": "La variable gasto no puede recibir valores de una lista de corchetes.",
                                "isCorrect": false,
                                "whyIncorrect": "El ciclo for recorre la lista correctamente asignando cada elemento a la variable 'gasto'."
                            },
                            {
                                "id": "D",
                                "text": "La línea total = 0 está dentro del ciclo, reinicializando la suma en cada vuelta y borrando lo acumulado.",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "Al poner total = 0 dentro del for, en cada vuelta se borra el total acumulado y solo sobrevive el último gasto.",
                        "fullAnswerExplanation": "¡Exacto! Los acumuladores y contadores SIEMPRE deben inicializarse en 0 antes de que comience el ciclo; de lo contrario, se resetean en cada iteración."
                    },
                    {
                        "type": "explanation",
                        "partLabel": "Paso 4 · Promedios",
                        "title": "El cálculo del promedio",
                        "intro": "Para calcular una nota definitiva o el peso promedio de mineral, combinas los dos conceptos: la suma acumulada dividida entre el número de muestras contadas.",
                        "examples": [
                            {
                                "label": "Promedio aritmético",
                                "code": "suma_notas = 4.2 + 3.8 + 4.6\ncantidad = 3\npromedio = suma_notas / cantidad\nprint(f\"Promedio: {promedio:.1f}\")",
                                "output": "Promedio: 4.2",
                                "explanation": "Se divide la suma total entre la cantidad de notas para obtener la media exacta."
                            }
                        ],
                        "keyTakeaway": "La fórmula estadística fundamental en programación es: promedio = acumulador / contador. Ambos deben completarse antes de realizar la división."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 5 · Trazado simultáneo",
                        "title": "Actualización simultánea",
                        "code": "cant = 0\nsuma = 0\nfor peso in [10, 20, 30]:\n    cant += 1\n    suma += peso\nprint(cant, suma)",
                        "question": "¿Qué valores imprime exactamente Python al finalizar el ciclo?",
                        "theory": "cant cuenta de uno en uno; suma va acumulando cada peso individual.",
                        "options": [
                            {
                                "id": "A",
                                "text": "3 60",
                                "isCorrect": true
                            },
                            {
                                "id": "B",
                                "text": "3 30",
                                "isCorrect": false,
                                "whyIncorrect": "Olvidaste acumular los dos primeros elementos (10 y 20); la suma total es 10 + 20 + 30 = 60."
                            },
                            {
                                "id": "C",
                                "text": "60 3",
                                "isCorrect": false,
                                "whyIncorrect": "Invertiste las variables en el print: primero se imprime 'cant' (3) y luego 'suma' (60)."
                            },
                            {
                                "id": "D",
                                "text": "4 60",
                                "isCorrect": false,
                                "whyIncorrect": "El ciclo solo tiene 3 elementos en la lista, por lo que 'cant' se incrementa exactamente 3 veces."
                            }
                        ],
                        "correctionTip": "cant cuenta 3 elementos (cant=3); suma acumula 10 + 20 + 30 = 60.",
                        "fullAnswerExplanation": "¡Impecable! cant cuenta 3 vueltas (1 + 1 + 1 = 3) y suma acumula los pesos (10 + 20 + 30 = 60)."
                    },
                    {
                        "type": "code_sandbox",
                        "partLabel": "Paso 6 · Práctica guiada",
                        "title": "Caja de peaje vehicular",
                        "instruction": "Completa las dos ranuras con el operador adecuado para que vehiculos cuente de 1 en 1 y total_plata acumule las tarifas:",
                        "starterCode": "vehiculos = 0\ntotal_plata = 0\ntarifas = [12000, 18000, 12000]\nfor peaje in tarifas:\n    vehiculos ___ 1\n    total_plata ___ peaje\nprint(vehiculos, total_plata)",
                        "slotMarker": "___",
                        "expectedOutput": "3 42000",
                        "options": [
                            {
                                "id": "A",
                                "slots": [
                                    "=",
                                    "="
                                ],
                                "label": "=  y  =",
                                "code": "=  y  =",
                                "isCorrect": false,
                                "whyIncorrect": "El operador '=' sobrescribe el valor en vez de acumularlo; dejaría vehiculos=1 y total_plata=12000."
                            },
                            {
                                "id": "B",
                                "slots": [
                                    "+=",
                                    "="
                                ],
                                "label": "+=  y  =",
                                "code": "+=  y  =",
                                "isCorrect": false,
                                "whyIncorrect": "Al usar '=' en total_plata, solo conservarás la última tarifa cobrada en lugar de sumarlas todas."
                            },
                            {
                                "id": "C",
                                "slots": [
                                    "+=",
                                    "+="
                                ],
                                "label": "+=  y  +=",
                                "code": "+=  y  +=",
                                "isCorrect": true,
                                "explanation": "¡Excelente! Ambos requieren += para que el valor de cada iteración se agregue a la memoria acumulada previa."
                            },
                            {
                                "id": "D",
                                "slots": [
                                    "=",
                                    "+="
                                ],
                                "label": "=  y  +=",
                                "code": "=  y  +=",
                                "isCorrect": false,
                                "whyIncorrect": "Al usar '=' en vehiculos, la cuenta siempre se sobreescribirá en 1 al salir del ciclo."
                            }
                        ]
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 7 · Caso Borde",
                        "title": "El peaje vacío",
                        "code": "contador = 0\nacumulador = 0\nif contador > 0:\n    promedio = acumulador / contador\n    print(\"Promedio:\", promedio)\nelse:\n    print(\"Sin registros\")",
                        "question": "Si una estación de peaje no registró ningún vehículo (contador = 0), ¿por qué es indispensable proteger el cálculo del promedio con un condicional?",
                        "theory": "¿Qué sucede matemáticamente y en Python al dividir cualquier número entre 0?",
                        "options": [
                            {
                                "id": "A",
                                "text": "Porque Python no permite que una variable valga 0 al terminar el programa.",
                                "isCorrect": false,
                                "whyIncorrect": "Las variables numéricas pueden valer 0 sin ningún inconveniente en Python."
                            },
                            {
                                "id": "B",
                                "text": "Porque dividir entre cero causaría un colapso fatal con ZeroDivisionError.",
                                "isCorrect": true
                            },
                            {
                                "id": "C",
                                "text": "Porque la función print() falla si se le pasa una variable que almacena 0.",
                                "isCorrect": false,
                                "whyIncorrect": "print() puede imprimir el número 0 perfectamente; el problema es la operación matemática de división."
                            },
                            {
                                "id": "D",
                                "text": "Porque las variables no inicializadas se borran automáticamente de la memoria.",
                                "isCorrect": false,
                                "whyIncorrect": "Las variables sí fueron inicializadas en 0 y permanecen vivas en el ámbito del script."
                            }
                        ],
                        "correctionTip": "Dividir acumulador / contador con contador=0 lanza un ZeroDivisionError inmediato.",
                        "fullAnswerExplanation": "¡Exacto! Siempre que calcules un promedio a partir de un contador, debes verificar que contador > 0 para evitar el temido ZeroDivisionError."
                    }
                ]
            },
            {
                "id": "w3-l2",
                "weekId": "semana-3",
                "number": 2,
                "tag": "Ciclos",
                "shortTitle": "El Ciclo FOR",
                "title": "Recorrido de secuencias iterables con FOR",
                "description": "Iteración sobre listas y cadenas, variable iteradora y filtros con condicionales.",
                "duration": "8 min",
                "steps": [
                    {
                        "type": "explanation",
                        "partLabel": "Paso 1 · El concepto",
                        "title": "La cinta transportadora de elementos",
                        "intro": "En una planta de fundición, una cinta transportadora acerca lingotes de diferentes metales uno detrás de otro. El ciclo for toma cada elemento de la colección de izquierda a derecha sin necesidad de índices manuales.",
                        "examples": [
                            {
                                "label": "Recorrido de lista",
                                "code": "minerales = [\"oro\", \"plata\", \"cobre\"]\nfor mineral in minerales:\n    print(f\"Muestra: {mineral}\")",
                                "output": "Muestra: oro\nMuestra: plata\nMuestra: cobre",
                                "explanation": "La variable mineral toma automáticamente cada string de la lista en cada iteración."
                            }
                        ],
                        "keyTakeaway": "La sintaxis for variable in coleccion: extrae secuencialmente cada elemento de la colección de principio a fin."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 2 · Cadenas iterables",
                        "title": "Recorrido de una cadena de texto",
                        "code": "palabra = \"MINAS\"\nsalida = \"\"\nfor letra in palabra:\n    salida += letra + \"-\"\nprint(salida)",
                        "question": "Las cadenas de texto (str) también son secuencias de caracteres iterables. ¿Qué imprimirá este programa?",
                        "theory": "En cada vuelta, letra toma un solo caracter de la cadena 'MINAS'.",
                        "options": [
                            {
                                "id": "A",
                                "text": "MINAS-",
                                "isCorrect": false,
                                "whyIncorrect": "El ciclo no toma la palabra completa de golpe; itera letra por letra añadiendo un guión a cada una."
                            },
                            {
                                "id": "B",
                                "text": "-M-I-N-A-S",
                                "isCorrect": false,
                                "whyIncorrect": "El guión se concatena después de cada letra (`letra + '-'`), no antes."
                            },
                            {
                                "id": "C",
                                "text": "M I N A S",
                                "isCorrect": false,
                                "whyIncorrect": "El programa concatena guiones medios '-', no espacios en blanco."
                            },
                            {
                                "id": "D",
                                "text": "M-I-N-A-S-",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "Cada una de las 5 letras de 'MINAS' recibe un '-' al final: 'M-' + 'I-' + 'N-' + 'A-' + 'S-'.",
                        "fullAnswerExplanation": "¡Correcto! En cada vuelta, letra toma un caracter de 'MINAS' y le anexa un guión al final de salida."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 3 · Spot the Bug",
                        "title": "El intento de iterar sobre un entero",
                        "code": "alumnos = 35\nfor i in alumnos:\n    print(f\"Alumno {i}\")",
                        "question": "Al ejecutar este código, Python arroja TypeError: 'int' object is not iterable. ¿A qué se debe este error?",
                        "theory": "¿Qué tipos de datos se pueden recorrer con un ciclo for en Python?",
                        "options": [
                            {
                                "id": "A",
                                "text": "Los números enteros son escalares atómicos individuales, no secuencias iterables de elementos.",
                                "isCorrect": true
                            },
                            {
                                "id": "B",
                                "text": "La variable i solo puede utilizarse para recorrer palabras y no variables numéricas.",
                                "isCorrect": false,
                                "whyIncorrect": "'i' es solo un nombre de variable arbitrario; puede recibir cualquier tipo de dato si la colección es iterable."
                            },
                            {
                                "id": "C",
                                "text": "Falta envolver el número 35 entre comillas dobles para que Python pueda iterarlo.",
                                "isCorrect": false,
                                "whyIncorrect": "Poner '35' iteraría sobre los caracteres '3' y '5' (2 vueltas), lo cual no es la lista de 35 alumnos buscada."
                            },
                            {
                                "id": "D",
                                "text": "La palabra clave for está obsoleta en Python 3 para números enteros.",
                                "isCorrect": false,
                                "whyIncorrect": "'for' es una palabra clave vigente y central; para generar una secuencia numérica se debe usar 'range()'."
                            }
                        ],
                        "correctionTip": "Los tipos int y float no tienen elementos internos. Para iterar 35 veces debes usar range(alumnos).",
                        "fullAnswerExplanation": "¡Exacto! Los tipos primitivos int y float no son iterables. Para iterar 35 veces numéricamente se utiliza range(alumnos)."
                    },
                    {
                        "type": "explanation",
                        "partLabel": "Paso 4 · Filtros",
                        "title": "Filtrando elementos con condicionales",
                        "intro": "En una subestación eléctrica, un sensor monitorea voltajes. Podemos colocar un condicional if dentro del for para contabilizar únicamente las líneas peligrosas.",
                        "examples": [
                            {
                                "label": "Filtro de alto voltaje",
                                "code": "voltajes = [110, 240, 115, 440]\naltos = 0\nfor v in voltajes:\n    if v > 200:\n        altos += 1\nprint(f\"Líneas de alto voltaje: {altos}\")",
                                "output": "Líneas de alto voltaje: 2",
                                "explanation": "Solo 240 y 440 superan el límite de 200V, incrementando el contador altos dos veces."
                            }
                        ],
                        "keyTakeaway": "Puedes anidar estructuras if dentro de un ciclo for para filtrar, clasificar o procesar selectivamente elementos específicos."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 5 · Trazado con filtro",
                        "title": "Trazado con acumulador y condición",
                        "code": "valores = [10, -5, 20, -3]\npositivos = 0\nfor n in valores:\n    if n > 0:\n        positivos += n\nprint(\"Suma positivos:\", positivos)",
                        "question": "¿Cuál será el valor final de positivos al terminar la ejecución?",
                        "theory": "Revisa cuáles elementos de la lista cumplen estrictamente n > 0.",
                        "options": [
                            {
                                "id": "A",
                                "text": "Suma positivos: 22",
                                "isCorrect": false,
                                "whyIncorrect": "Sumaste todos los números incluyendo los negativos (10 - 5 + 20 - 3 = 22), pero el if filtró solo los mayores a 0."
                            },
                            {
                                "id": "B",
                                "text": "Suma positivos: 38",
                                "isCorrect": false,
                                "whyIncorrect": "Sumaste el valor absoluto de los números negativos en lugar de ignorarlos como manda la condición."
                            },
                            {
                                "id": "C",
                                "text": "Suma positivos: 30",
                                "isCorrect": true
                            },
                            {
                                "id": "D",
                                "text": "Suma positivos: 25",
                                "isCorrect": false,
                                "whyIncorrect": "El resultado de sumar únicamente los números estrictamente positivos (10 + 20) es exactamente 30."
                            }
                        ],
                        "correctionTip": "Solo 10 y 20 cumplen n > 0. La suma acumulada es 10 + 20 = 30.",
                        "fullAnswerExplanation": "¡Muy bien analizado! El condicional n > 0 solo deja pasar a 10 y 20; los negativos se descartan, sumando 30."
                    },
                    {
                        "type": "code_sandbox",
                        "partLabel": "Paso 6 · Práctica guiada",
                        "title": "Control de calidad de mineral",
                        "instruction": "Completa las dos ranuras para estructurar el ciclo for que inspecciona la lista de muestras:",
                        "starterCode": "muestras = [85, 42, 91, 38]\naprobadas = 0\n___ muestra ___ muestras:\n    if muestra >= 50:\n        aprobadas += 1\nprint(\"Aprobadas:\", aprobadas)",
                        "slotMarker": "___",
                        "expectedOutput": "Aprobadas: 2",
                        "options": [
                            {
                                "id": "A",
                                "slots": [
                                    "while",
                                    "=="
                                ],
                                "label": "while  y  ==",
                                "code": "while  y  ==",
                                "isCorrect": false,
                                "whyIncorrect": "'while' evalúa una condición booleana, no una relación de pertenencia sobre una lista."
                            },
                            {
                                "id": "B",
                                "slots": [
                                    "for",
                                    "in"
                                ],
                                "label": "for  y  in",
                                "code": "for  y  in",
                                "isCorrect": true,
                                "explanation": "¡Excelente! La construcción canónica en Python para iterar colecciones es for <elemento> in <coleccion>:."
                            },
                            {
                                "id": "C",
                                "slots": [
                                    "for",
                                    "=="
                                ],
                                "label": "for  y  ==",
                                "code": "for  y  ==",
                                "isCorrect": false,
                                "whyIncorrect": "El operador '==' compara igualdad de valores; para iterar sobre una colección se utiliza la palabra 'in'."
                            },
                            {
                                "id": "D",
                                "slots": [
                                    "if",
                                    "in"
                                ],
                                "label": "if  y  in",
                                "code": "if  y  in",
                                "isCorrect": false,
                                "whyIncorrect": "'if muestra in muestras' evaluaría una sola vez la condición sin generar ninguna repetición cíclica."
                            }
                        ]
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 7 · Caso Borde",
                        "title": "Estado de la variable tras terminar el ciclo",
                        "code": "for item in [\"arcilla\", \"grava\", \"cuarzo\"]:\n    pass\nprint(\"Último item:\", item)",
                        "question": "¿Qué ocurre con la variable item cuando el ciclo for termina de iterar sobre todos los elementos?",
                        "theory": "¿Sobreviven las variables del ciclo en el ámbito actual de Python?",
                        "options": [
                            {
                                "id": "A",
                                "text": "Causa un error NameError porque las variables de ciclo se eliminan al salir.",
                                "isCorrect": false,
                                "whyIncorrect": "En Python, a diferencia de lenguajes como C++ o Java, la variable del ciclo no tiene un ámbito local aislado."
                            },
                            {
                                "id": "B",
                                "text": "Se reinicia al valor inicial de la lista (\"arcilla\").",
                                "isCorrect": false,
                                "whyIncorrect": "La variable no se rebobina al finalizar; conserva la última asignación que recibió."
                            },
                            {
                                "id": "C",
                                "text": "Su valor pasa a ser None.",
                                "isCorrect": false,
                                "whyIncorrect": "Python no limpia la variable asignándole None; mantiene en memoria su último contenido asignado."
                            },
                            {
                                "id": "D",
                                "text": "Conserva en memoria el último valor que procesó (\"cuarzo\").",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "En Python, las variables de ciclo permanecen en el ámbito y conservan el último valor asignado en la iteración final.",
                        "fullAnswerExplanation": "¡Gran observación! En Python, la variable del ciclo permanece viva en el ámbito actual con el último elemento que tomó de la secuencia."
                    }
                ]
            },
            {
                "id": "w3-l3",
                "weekId": "semana-3",
                "number": 3,
                "tag": "Ciclos",
                "shortTitle": "Función range()",
                "title": "Generación automática de secuencias con range()",
                "description": "Rangos con inicio, fin y paso; límites superiores abiertos y cuentas regresivas.",
                "duration": "8 min",
                "steps": [
                    {
                        "type": "explanation",
                        "partLabel": "Paso 1 · El concepto",
                        "title": "El odómetro numérico y el límite abierto",
                        "intro": "Un cortador láser corta varillas marcadas del centímetro 1 al 4. Al indicarle range(1, 4), el láser se detiene en seco justo antes del 4. En Python, el valor final nunca se incluye.",
                        "examples": [
                            {
                                "label": "Rango secuencial",
                                "code": "for i in range(1, 4):\n    print(f\"Piso {i}\")",
                                "output": "Piso 1\nPiso 2\nPiso 3",
                                "explanation": "range(1, 4) produce los números 1, 2 y 3. El 4 queda estrictamente por fuera."
                            }
                        ],
                        "keyTakeaway": "¡Regla de oro! range(inicio, fin) arranca en inicio y llega hasta fin - 1. Si quieres llegar a N, el fin debe ser N + 1."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 2 · Límite con range(n)",
                        "title": "Trazado del límite con range(n)",
                        "code": "conteo = 0\nfor k in range(4):\n    conteo += k\nprint(conteo)",
                        "question": "Cuando pasas un solo argumento a range(4), Python asume que empieza en 0. ¿Qué número imprimirá este script?",
                        "theory": "¿Qué secuencia exacta de números genera range(4)?",
                        "options": [
                            {
                                "id": "A",
                                "text": "6",
                                "isCorrect": true
                            },
                            {
                                "id": "B",
                                "text": "10",
                                "isCorrect": false,
                                "whyIncorrect": "Sumaste 0 + 1 + 2 + 3 + 4 = 10, pero range(4) se detiene en 3 y nunca llega al 4."
                            },
                            {
                                "id": "C",
                                "text": "4",
                                "isCorrect": false,
                                "whyIncorrect": "4 es el valor del parámetro stop, no la suma de los valores producidos (0 + 1 + 2 + 3)."
                            },
                            {
                                "id": "D",
                                "text": "3",
                                "isCorrect": false,
                                "whyIncorrect": "3 es el último valor individual que toma 'k', pero la variable 'conteo' los va sumando todos acumulativamente."
                            }
                        ],
                        "correctionTip": "range(4) produce 0, 1, 2, 3. La suma es 0 + 1 + 2 + 3 = 6.",
                        "fullAnswerExplanation": "¡Correcto! range(4) genera los valores 0, 1, 2, 3. La suma acumulada es 0 + 1 + 2 + 3 = 6."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 3 · Spot the Bug",
                        "title": "El rango vacío inesperado",
                        "code": "for s in range(5, 1):\n    print(s)\nprint(\"¡Despegue!\")",
                        "question": "Queremos imprimir una cuenta regresiva 5, 4, 3, 2, 1, pero el programa solo imprime ¡Despegue! sin ningún número. ¿Por qué?",
                        "theory": "¿Cuál es el paso por defecto de range() cuando no se especifica el tercer argumento?",
                        "options": [
                            {
                                "id": "A",
                                "text": "La función range() solo admite un único argumento numérico y falla con dos.",
                                "isCorrect": false,
                                "whyIncorrect": "range() acepta perfectamente 1, 2 o 3 argumentos enteros."
                            },
                            {
                                "id": "B",
                                "text": "Las variables de una sola letra como s no son válidas en ciclos numéricos.",
                                "isCorrect": false,
                                "whyIncorrect": "Cualquier identificador válido en Python puede ser usado como variable de ciclo."
                            },
                            {
                                "id": "C",
                                "text": "Con el paso por defecto (+1), un inicio mayor que el final genera un rango vacío (0 vueltas).",
                                "isCorrect": true
                            },
                            {
                                "id": "D",
                                "text": "Python requiere que los rangos hacia atrás se escriban dentro de una lista con corchetes.",
                                "isCorrect": false,
                                "whyIncorrect": "No requiere listas; simplemente necesita el tercer parámetro de paso negativo: `range(5, 0, -1)`."
                            }
                        ],
                        "correctionTip": "Con paso +1, si inicio >= fin el rango se considera completado inmediatamente.",
                        "fullAnswerExplanation": "¡Exacto! El paso por defecto de range es +1. Si el inicio (5) es mayor que el fin (1), Python produce una secuencia vacía."
                    },
                    {
                        "type": "explanation",
                        "partLabel": "Paso 4 · El paso (step)",
                        "title": "El tercer parámetro: el paso (step)",
                        "intro": "Subir una escalera de dos en dos escalones nos ahorra tiempo. El tercer parámetro range(inicio, fin, paso) define el tamaño y la dirección del salto en cada iteración.",
                        "examples": [
                            {
                                "label": "Saltos de 2 en 2",
                                "code": "for num in range(2, 9, 2):\n    print(f\"Par: {num}\")",
                                "output": "Par: 2\nPar: 4\nPar: 6\nPar: 8",
                                "explanation": "Comienza en 2, suma 2 en cada salto (4, 6, 8) y se detiene antes de 9."
                            }
                        ],
                        "keyTakeaway": "El parámetro paso determina el incremento sucesivo. Si el paso es negativo (ej. -1), la secuencia cuenta hacia atrás."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 5 · Cuenta regresiva",
                        "title": "Trazado de cuenta regresiva",
                        "code": "salida = \"\"\nfor x in range(6, 1, -2):\n    salida += str(x) + \" \"\nprint(salida.strip())",
                        "question": "¿Cuál es la salida exacta producida por este ciclo con paso negativo?",
                        "theory": "Comienza en 6 y resta 2 mientras el valor sea estrictamente mayor a 1.",
                        "options": [
                            {
                                "id": "A",
                                "text": "6 5 4 3 2 1",
                                "isCorrect": false,
                                "whyIncorrect": "El paso es -2, por lo que desciende dando saltos de 2 en 2, no de 1 en 1."
                            },
                            {
                                "id": "B",
                                "text": "6 4 2",
                                "isCorrect": true
                            },
                            {
                                "id": "C",
                                "text": "6 4",
                                "isCorrect": false,
                                "whyIncorrect": "El 2 sigue siendo estrictamente mayor que el límite 1, por lo que el 2 sí entra en el ciclo."
                            },
                            {
                                "id": "D",
                                "text": "4 2 0",
                                "isCorrect": false,
                                "whyIncorrect": "El rango comienza obligatoriamente en 6 (el inicio especificado) y no en 4."
                            }
                        ],
                        "correctionTip": "x toma 6, luego 4, luego 2. El siguiente sería 0, que no es > 1.",
                        "fullAnswerExplanation": "¡Brillante! Arranca en 6, resta 2 (4), resta 2 (2). El siguiente sería 0, que no cumple x > 1. Imprime 6 4 2."
                    },
                    {
                        "type": "code_sandbox",
                        "partLabel": "Paso 6 · Práctica guiada",
                        "title": "Múltiplos de 5",
                        "instruction": "Completa las dos ranuras para imprimir los múltiplos de 5 desde el 10 hasta el 30 inclusive:",
                        "starterCode": "for m in range(10, ___, ___):\n    print(m)",
                        "slotMarker": "___",
                        "expectedOutput": "10\n15\n20\n25\n30",
                        "options": [
                            {
                                "id": "A",
                                "slots": [
                                    "30",
                                    "5"
                                ],
                                "label": "30  y  5",
                                "code": "30  y  5",
                                "isCorrect": false,
                                "whyIncorrect": "Como el límite superior es abierto, poner 30 se detendría en 25 excluyendo el 30."
                            },
                            {
                                "id": "B",
                                "slots": [
                                    "30",
                                    "1"
                                ],
                                "label": "30  y  1",
                                "code": "30  y  1",
                                "isCorrect": false,
                                "whyIncorrect": "Con paso 1 imprimiría todos los enteros consecutivos (10, 11, 12...), no los múltiplos de 5."
                            },
                            {
                                "id": "C",
                                "slots": [
                                    "35",
                                    "10"
                                ],
                                "label": "35  y  10",
                                "code": "35  y  10",
                                "isCorrect": false,
                                "whyIncorrect": "Con paso 10 daría saltos de 10 en 10 (10, 20, 30), omitiendo 15 y 25."
                            },
                            {
                                "id": "D",
                                "slots": [
                                    "35",
                                    "5"
                                ],
                                "label": "35  y  5",
                                "code": "35  y  5",
                                "isCorrect": true,
                                "explanation": "¡Perfecto! Para incluir el 30 con paso 5, el límite superior debe ser un número mayor a 30 (como 31 o 35)."
                            }
                        ]
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 7 · Caso Borde",
                        "title": "Límites idénticos range(n, n)",
                        "code": "vueltas = 0\nfor i in range(10, 10):\n    vueltas += 1\nprint(\"Iteraciones:\", vueltas)",
                        "question": "¿Cuántas veces se ejecuta el cuerpo del ciclo si el inicio y el fin son exactamente el mismo número?",
                        "theory": "¿Existe algún número entero que cumpla 10 <= x < 10?",
                        "options": [
                            {
                                "id": "A",
                                "text": "0 veces, porque no existe ningún entero que cumpla 10 <= i < 10.",
                                "isCorrect": true
                            },
                            {
                                "id": "B",
                                "text": "1 vez, ejecutando la iteración con i = 10.",
                                "isCorrect": false,
                                "whyIncorrect": "El límite superior siempre se excluye; al no haber espacio entre inicio y fin, el rango es vacío."
                            },
                            {
                                "id": "C",
                                "text": "10 veces, tomando el número especificado como cantidad de repeticiones.",
                                "isCorrect": false,
                                "whyIncorrect": "range(10, 10) no significa '10 veces'; especifica inicio=10 y fin=10."
                            },
                            {
                                "id": "D",
                                "text": "Produce un error de tipo ValueError por parámetros redundantes.",
                                "isCorrect": false,
                                "whyIncorrect": "Es una instrucción válida en Python que simplemente produce un generador sin elementos."
                            }
                        ],
                        "correctionTip": "La regla matemática es inicio <= x < fin. Con 10 <= x < 10 no hay ningún entero posible.",
                        "fullAnswerExplanation": "¡Exacto! La condición de pertenencia es inicio <= x < fin. Si ambos son 10, el conjunto es vacío y no da ninguna vuelta."
                    }
                ]
            },
            {
                "id": "w3-l4",
                "weekId": "semana-3",
                "number": 4,
                "tag": "Ciclos",
                "shortTitle": "El Ciclo WHILE",
                "title": "Repetición condicional y prevención de bucles infinitos",
                "description": "Las tres reglas del while: inicialización, condición de guardia y actualización.",
                "duration": "9 min",
                "steps": [
                    {
                        "type": "explanation",
                        "partLabel": "Paso 1 · El concepto",
                        "title": "La bomba de achique y la condición de parada",
                        "intro": "Una bomba de drenaje en un túnel subterráneo debe operar mientras el nivel del agua sea mayor a cero. No sabemos cuántos minutos tomará: mientras la condición sea verdadera, el motor sigue encendido.",
                        "examples": [
                            {
                                "label": "Drenaje controlado",
                                "code": "bateria = 3\nwhile bateria > 0:\n    print(f\"Batería restante: {bateria}\")\n    bateria -= 1\nprint(\"Dispositivo apagado.\")",
                                "output": "Batería restante: 3\nBatería restante: 2\nBatería restante: 1\nDispositivo apagado.",
                                "explanation": "El ciclo evalúa bateria > 0. Al llegar a 0, la condición se vuelve False y el ciclo finaliza."
                            }
                        ],
                        "keyTakeaway": "El ciclo while repite su bloque mientras su condición lógica sea True. En cuanto se evalúa False, termina inmediatamente."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 2 · Trazado mental",
                        "title": "Trazado mental de reducción",
                        "code": "n = 8\npasos = 0\nwhile n > 1:\n    n //= 2\n    pasos += 1\nprint(pasos, n)",
                        "question": "Sigue mentalmente los valores de n y pasos. ¿Qué números imprimirá Python al finalizar?",
                        "theory": "En cada ciclo, n se divide a la mitad de forma entera y pasos suma 1.",
                        "options": [
                            {
                                "id": "A",
                                "text": "4 0",
                                "isCorrect": false,
                                "whyIncorrect": "La división entera se detiene cuando n llega a 1 (1 > 1 es False), nunca llega a 0."
                            },
                            {
                                "id": "B",
                                "text": "2 2",
                                "isCorrect": false,
                                "whyIncorrect": "Cuando n vale 2, la condición 2 > 1 sigue siendo True, por lo que da una vuelta más dividiendo a 1."
                            },
                            {
                                "id": "C",
                                "text": "3 1",
                                "isCorrect": true
                            },
                            {
                                "id": "D",
                                "text": "3 2",
                                "isCorrect": false,
                                "whyIncorrect": "En el tercer paso, n se divide de 2 entre 2 quedando en 1, no en 2."
                            }
                        ],
                        "correctionTip": "Vuelta 1: n=4, pasos=1. Vuelta 2: n=2, pasos=2. Vuelta 3: n=1, pasos=3. Termina porque 1 > 1 es False.",
                        "fullAnswerExplanation": "¡Excelente trazado! Vuelta 1: n=4, pasos=1. Vuelta 2: n=2, pasos=2. Vuelta 3: n=1, pasos=3. Como 1 > 1 es False, imprime 3 1."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 3 · Spot the Bug",
                        "title": "La pesadilla del bucle infinito",
                        "code": "segundos = 3\nwhile segundos > 0:\n    print(\"Contando:\", segundos)\nprint(\"¡Tiempo!\")",
                        "question": "Este temporizador se queda congelado consumiendo memoria y CPU sin llegar nunca a imprimir ¡Tiempo!. ¿Cuál es el error crítico?",
                        "theory": "¿Qué le ocurre a una condición si sus variables nunca cambian de valor dentro del ciclo?",
                        "options": [
                            {
                                "id": "A",
                                "text": "La condición segundos > 0 evalúa como False desde la primera línea.",
                                "isCorrect": false,
                                "whyIncorrect": "Al inicio segundos vale 3, por lo que 3 > 0 es True y el ciclo sí inicia."
                            },
                            {
                                "id": "B",
                                "text": "Falta actualizar la variable adentro (segundos -= 1), haciendo que la condición sea eternamente True.",
                                "isCorrect": true
                            },
                            {
                                "id": "C",
                                "text": "Falta un bloque else al final de la instrucción while para cerrar el flujo.",
                                "isCorrect": false,
                                "whyIncorrect": "El bloque 'else' en ciclos es completamente opcional y no tiene relación con el bucle infinito."
                            },
                            {
                                "id": "D",
                                "text": "La función print() no está permitida dentro del cuerpo de un ciclo condicional.",
                                "isCorrect": false,
                                "whyIncorrect": "print() puede usarse con total libertad dentro de cualquier ciclo."
                            }
                        ],
                        "correctionTip": "Si la variable de control no cambia dentro del ciclo, la condición nunca se convertirá en False.",
                        "fullAnswerExplanation": "¡Exacto! Todo ciclo while requiere una instrucción que modifique la variable hacia la condición de parada; si no se resta segundos, el ciclo es infinito."
                    },
                    {
                        "type": "explanation",
                        "partLabel": "Paso 4 · Pre-evaluación",
                        "title": "¿Qué pasa si la condición es False de entrada?",
                        "intro": "Si intentas encender la calefacción cuando la temperatura ya es alta, el termostato ni siquiera activa los quemadores. El while funciona exactamente igual.",
                        "examples": [
                            {
                                "label": "Condición falsa inicial",
                                "code": "nivel_alerta = 0\nwhile nivel_alerta > 5:\n    print(\"¡Alarma sonando!\")\n    nivel_alerta -= 1\nprint(\"Sistema en reposo.\")",
                                "output": "Sistema en reposo.",
                                "explanation": "Como 0 > 5 es False, el bloque indentado se ignora por completo."
                            }
                        ],
                        "keyTakeaway": "En Python, la condición del while se evalúa antes de entrar a cada vuelta. Si es falsa desde el principio, el cuerpo se ejecuta 0 veces."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 5 · Operador <=",
                        "title": "Trazado con operador <=",
                        "code": "p = 1\nwhile p <= 4:\n    p *= 2\nprint(\"Final:\", p)",
                        "question": "¿Cuál será el valor final de p al salir del ciclo?",
                        "theory": "Rastrea el valor de p en cada multiplicación: 1 -> 2 -> 4 -> 8.",
                        "options": [
                            {
                                "id": "A",
                                "text": "Final: 4",
                                "isCorrect": false,
                                "whyIncorrect": "Cuando p vale 4, la condición 4 <= 4 es True, por lo que vuelve a entrar y se multiplica por 2 a 8."
                            },
                            {
                                "id": "B",
                                "text": "Final: 2",
                                "isCorrect": false,
                                "whyIncorrect": "El ciclo no se detiene en 2 porque 2 <= 4 sigue siendo verdadero."
                            },
                            {
                                "id": "C",
                                "text": "Final: 16",
                                "isCorrect": false,
                                "whyIncorrect": "Para llegar a 16 necesitaría entrar cuando p vale 8, pero 8 <= 4 es False."
                            },
                            {
                                "id": "D",
                                "text": "Final: 8",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "1 <= 4 (entra -> 2); 2 <= 4 (entra -> 4); 4 <= 4 (entra -> 8); 8 <= 4 es False (sale).",
                        "fullAnswerExplanation": "¡Correcto! Rastro de p: 1 -> 2 -> 4 -> 8. Cuando vale 8, 8 <= 4 es False y el ciclo finaliza."
                    },
                    {
                        "type": "code_sandbox",
                        "partLabel": "Paso 6 · Práctica guiada",
                        "title": "Llenado de tolva",
                        "instruction": "Completa el operador de comparación y el de asignación compuesta para llenar la tolva hasta alcanzar 100 toneladas:",
                        "starterCode": "toneladas = 0\nwhile toneladas ___ 100:\n    toneladas ___ 25\nprint(\"Tolva llena:\", toneladas)",
                        "slotMarker": "___",
                        "expectedOutput": "Tolva llena: 100",
                        "options": [
                            {
                                "id": "A",
                                "slots": [
                                    "<",
                                    "+="
                                ],
                                "label": "<  y  +=",
                                "code": "<  y  +=",
                                "isCorrect": true,
                                "explanation": "¡Excelente! Mientras toneladas < 100, se suman += 25 en cada viaje hasta alcanzar exactamente 100."
                            },
                            {
                                "id": "B",
                                "slots": [
                                    ">",
                                    "+="
                                ],
                                "label": ">  y  +=",
                                "code": ">  y  +=",
                                "isCorrect": false,
                                "whyIncorrect": "Al inicio toneladas=0; como 0 > 100 es False, nunca entraría al ciclo y terminaría en 0."
                            },
                            {
                                "id": "C",
                                "slots": [
                                    "<=",
                                    "="
                                ],
                                "label": "<=  y  =",
                                "code": "<=  y  =",
                                "isCorrect": false,
                                "whyIncorrect": "Usar '=' asignaría siempre el valor fijo 25 en cada ciclo, provocando un bucle infinito."
                            },
                            {
                                "id": "D",
                                "slots": [
                                    "==",
                                    "+="
                                ],
                                "label": "==  y  +=",
                                "code": "==  y  +=",
                                "isCorrect": false,
                                "whyIncorrect": "0 == 100 es False desde el primer momento, impidiendo que el ciclo se ejecute."
                            }
                        ]
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 7 · Caso Borde",
                        "title": "El valor exacto al salir del bucle",
                        "code": "x = 10\nwhile x > 3:\n    x -= 2\nprint(\"Salida:\", x)",
                        "question": "¿Qué valor exacto tiene la variable x justo después de terminar el ciclo?",
                        "theory": "Sigue los decrementos de 2 en 2: 10 -> 8 -> 6 -> 4 -> 2.",
                        "options": [
                            {
                                "id": "A",
                                "text": "Salida: 3",
                                "isCorrect": false,
                                "whyIncorrect": "x disminuye de 2 en 2: 10 -> 8 -> 6 -> 4 -> 2. Nunca toma el valor 3."
                            },
                            {
                                "id": "B",
                                "text": "Salida: 4",
                                "isCorrect": false,
                                "whyIncorrect": "Cuando x vale 4, 4 > 3 sigue siendo True, por lo que entra una última vez y resta a 2."
                            },
                            {
                                "id": "C",
                                "text": "Salida: 2",
                                "isCorrect": true
                            },
                            {
                                "id": "D",
                                "text": "Salida: 0",
                                "isCorrect": false,
                                "whyIncorrect": "Cuando x llega a 2, 2 > 3 es False y el ciclo se detiene de inmediato sin llegar a 0."
                            }
                        ],
                        "correctionTip": "Cuando x vale 4 entra y resta a 2. Como 2 > 3 es False, el bucle termina con x = 2.",
                        "fullAnswerExplanation": "¡Exacto! El ciclo se detiene cuando la condición se rompe: al restar 2 a 4, x queda en 2, haciendo que 2 > 3 sea False."
                    }
                ]
            },
            {
                "id": "w3-l5",
                "weekId": "semana-3",
                "number": 5,
                "tag": "Ciclos",
                "shortTitle": "break y continue",
                "title": "Alteración de flujo en ciclos con break y continue",
                "description": "Parada abrupta de emergencia vs salto de iteración y trampas en bucles while.",
                "duration": "8 min",
                "steps": [
                    {
                        "type": "explanation",
                        "partLabel": "Paso 1 · El concepto",
                        "title": "El freno de mano de emergencia (break)",
                        "intro": "En una cinta de equipaje, si el sensor detecta un paquete peligroso, se activa la parada de emergencia (break): el sistema se frena por completo y no revisa ninguna maleta más.",
                        "examples": [
                            {
                                "label": "Parada con break",
                                "code": "for item in [\"tornillo\", \"piedra\", \"arandela\"]:\n    if item == \"piedra\":\n        print(\"¡Parada de emergencia!\")\n        break\n    print(\"Procesando:\", item)",
                                "output": "Procesando: tornillo\n¡Parada de emergencia!",
                                "explanation": "Al encontrar 'piedra', el break cancela el ciclo de inmediato e ignora 'arandela'."
                            }
                        ],
                        "keyTakeaway": "break rompe y finaliza el ciclo en el acto. La ejecución salta a la primera línea fuera del bucle, ignorando lo restante."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 2 · Trazado con break",
                        "title": "Trazado con break y acumulación",
                        "code": "suma = 0\nfor n in [5, 10, -1, 20]:\n    if n < 0:\n        break\n    suma += n\nprint(\"Total:\", suma)",
                        "question": "¿Cuál será el valor impreso de total al ejecutarse este programa?",
                        "theory": "¿Qué ocurre con la variable suma cuando n vale -1?",
                        "options": [
                            {
                                "id": "A",
                                "text": "Total: 35",
                                "isCorrect": false,
                                "whyIncorrect": "Sumaste todos los números ignorando la instrucción break que cancela el ciclo en el -1."
                            },
                            {
                                "id": "B",
                                "text": "Total: 15",
                                "isCorrect": true
                            },
                            {
                                "id": "C",
                                "text": "Total: 14",
                                "isCorrect": false,
                                "whyIncorrect": "El -1 activa el break antes de sumarse, por lo que la suma es 5 + 10 = 15, no 14."
                            },
                            {
                                "id": "D",
                                "text": "Total: 0",
                                "isCorrect": false,
                                "whyIncorrect": "Las dos primeras iteraciones (5 y 10) se ejecutan y acumulan normalmente antes del break."
                            }
                        ],
                        "correctionTip": "Suma 5, luego 10 (suma=15). En -1 se activa el break antes de sumar, por lo que 20 nunca se procesa.",
                        "fullAnswerExplanation": "¡Correcto! Suma 5, luego 10 (suma = 15). Al llegar a -1, n < 0 es True y break interrumpe el ciclo antes de sumar 20."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 3 · Spot the Bug",
                        "title": "El continue atrapado en while",
                        "code": "i = 0\nwhile i < 4:\n    if i == 2:\n        continue\n    print(i)\n    i += 1",
                        "question": "Un estudiante escribió este código para saltarse el número 2. Al ejecutarlo imprime 0 y 1, pero luego se congela en un bucle infinito. ¿Por qué?",
                        "theory": "¿Qué líneas se saltan cuando se ejecuta continue en un ciclo while?",
                        "options": [
                            {
                                "id": "A",
                                "text": "La palabra clave continue solo está permitida en ciclos for.",
                                "isCorrect": false,
                                "whyIncorrect": "continue es completamente legal tanto en for como en while."
                            },
                            {
                                "id": "B",
                                "text": "El operador == debe sustituirse por = para asignar el nuevo valor.",
                                "isCorrect": false,
                                "whyIncorrect": "'=' asignaría un valor dentro del if en lugar de comparar; la condición requiere '=='."
                            },
                            {
                                "id": "C",
                                "text": "La condición i < 4 se vuelve falsa antes de tiempo.",
                                "isCorrect": false,
                                "whyIncorrect": "Al contrario: i se queda congelado en 2 y 2 < 4 sigue siendo siempre True."
                            },
                            {
                                "id": "D",
                                "text": "continue salta a la siguiente vuelta sin ejecutar i += 1, dejando a i estancado para siempre en 2.",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "Al saltarse el incremento i += 1, 'i' se queda en 2 indefinidamente, repitiendo la condición True.",
                        "fullAnswerExplanation": "¡Fallo clásico de novato! Al ejecutar continue, Python salta al inicio del while sin ejecutar las líneas posteriores, por lo que i += 1 nunca se ejecuta cuando i == 2."
                    },
                    {
                        "type": "explanation",
                        "partLabel": "Paso 4 · Salto con continue",
                        "title": "Saltar el turno con continue",
                        "intro": "En un control de calidad, si una botella viene vacía, no queremos apagar la fábrica: simplemente la descartamos (continue) y pasamos a inspeccionar la siguiente.",
                        "examples": [
                            {
                                "label": "Filtro de números impares",
                                "code": "for n in [1, 2, 3, 4]:\n    if n % 2 != 0:\n        continue\n    print(f\"Par detectado: {n}\")",
                                "output": "Par detectado: 2\nPar detectado: 4",
                                "explanation": "Cuando n es impar, continue salta directamente al siguiente número sin imprimir."
                            }
                        ],
                        "keyTakeaway": "continue termina únicamente la iteración en curso y avanza directamente al siguiente elemento de la secuencia."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 5 · Trazado con continue",
                        "title": "Trazado combinando continue",
                        "code": "conteo = 0\nfor letra in \"MINAS\":\n    if letra in \"IA\":\n        continue\n    conteo += 1\nprint(\"Consonantes:\", conteo)",
                        "question": "¿Qué número imprimirá este contador de consonantes al saltarse las vocales 'I' y 'A'?",
                        "theory": "Revisa cuáles letras de 'MINAS' ejecutan el conteo y cuáles ejecutan continue.",
                        "options": [
                            {
                                "id": "A",
                                "text": "Consonantes: 3",
                                "isCorrect": true
                            },
                            {
                                "id": "B",
                                "text": "Consonantes: 2",
                                "isCorrect": false,
                                "whyIncorrect": "2 es la cantidad de vocales que fueron omitidas ('I' y 'A'), pero contamos las consonantes."
                            },
                            {
                                "id": "C",
                                "text": "Consonantes: 5",
                                "isCorrect": false,
                                "whyIncorrect": "5 es la longitud total de 'MINAS', pero las vocales fueron omitidas por el continue."
                            },
                            {
                                "id": "D",
                                "text": "Consonantes: 4",
                                "isCorrect": false,
                                "whyIncorrect": "'MINAS' tiene exactamente 3 consonantes (M, N, S) y 2 vocales (I, A)."
                            }
                        ],
                        "correctionTip": "Para 'M', 'N' y 'S' se suma 1 a conteo. Para 'I' y 'A' el continue salta la suma. Total = 3.",
                        "fullAnswerExplanation": "¡Exacto! Para 'M', 'N' y 'S', conteo se incrementa; para 'I' y 'A', continue salta el incremento. Total: 3."
                    },
                    {
                        "type": "code_sandbox",
                        "partLabel": "Paso 6 · Práctica guiada",
                        "title": "Filtro y parada de emergencia",
                        "instruction": "Completa las dos ranuras para omitir lecturas en cero usando continue y detener ante valores negativos usando break:",
                        "starterCode": "sensores = [14, 0, 18, -99, 25]\nlecturas_validas = 0\nfor s in sensores:\n    if s == 0:\n        ___\n    if s < 0:\n        ___\n    lecturas_validas += 1\nprint(\"Válidas:\", lecturas_validas)",
                        "slotMarker": "___",
                        "expectedOutput": "Válidas: 2",
                        "options": [
                            {
                                "id": "A",
                                "slots": [
                                    "break",
                                    "continue"
                                ],
                                "label": "break  y  continue",
                                "code": "break  y  continue",
                                "isCorrect": false,
                                "whyIncorrect": "Si pones break en s == 0, detendrías todo el programa en la segunda lectura contabilizando solo 1."
                            },
                            {
                                "id": "B",
                                "slots": [
                                    "continue",
                                    "pass"
                                ],
                                "label": "continue  y  pass",
                                "code": "continue  y  pass",
                                "isCorrect": false,
                                "whyIncorrect": "Usar 'pass' en s < 0 procesaría la lectura -99 como válida, arrojando 3 lecturas en vez de 2."
                            },
                            {
                                "id": "C",
                                "slots": [
                                    "continue",
                                    "break"
                                ],
                                "label": "continue  y  break",
                                "code": "continue  y  break",
                                "isCorrect": true,
                                "explanation": "¡Gran trabajo! continue ignora el 0 sin detener el programa, y break detiene todo ante la alarma crítica -99."
                            },
                            {
                                "id": "D",
                                "slots": [
                                    "break",
                                    "break"
                                ],
                                "label": "break  y  break",
                                "code": "break  y  break",
                                "isCorrect": false,
                                "whyIncorrect": "Poner break en ambas condiciones abortaría en la lectura 0, registrando solo 1 válida."
                            }
                        ]
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 7 · Caso Borde",
                        "title": "Código inalcanzable tras un break",
                        "code": "for k in [1, 2, 3]:\n    print(\"A\")\n    break\n    print(\"B\")\nprint(\"C\")",
                        "question": "¿Cuál es la salida exacta producida en la terminal por este script?",
                        "theory": "¿Se ejecuta alguna instrucción que esté inmediatamente después de un break dentro del mismo bloque?",
                        "options": [
                            {
                                "id": "A",
                                "text": "A\\nB\\nC",
                                "isCorrect": false,
                                "whyIncorrect": "La línea `print('B')` nunca se ejecuta porque el break anterior interrumpe el ciclo de inmediato."
                            },
                            {
                                "id": "B",
                                "text": "A\nC",
                                "isCorrect": true
                            },
                            {
                                "id": "C",
                                "text": "A\nA\nA\nC",
                                "isCorrect": false,
                                "whyIncorrect": "El break finaliza el ciclo en la primera vuelta; no llega a ejecutarse para el 2 ni para el 3."
                            },
                            {
                                "id": "D",
                                "text": "Produce un error de sintaxis SyntaxError: unreachable code.",
                                "isCorrect": false,
                                "whyIncorrect": "Python permite escribir código después de un break sin lanzar error de sintaxis; simplemente no lo ejecuta jamás."
                            }
                        ],
                        "correctionTip": "Imprime 'A', luego el break termina el for inmediatamente saltando a print('C'). 'B' nunca se imprime.",
                        "fullAnswerExplanation": "¡Perfecto! Imprime 'A', el break cancela el ciclo (dejando a print('B') inalcanzable) y continúa en print('C')."
                    }
                ]
            },
            {
                "id": "w3-l6",
                "weekId": "semana-3",
                "number": 6,
                "tag": "Ciclos",
                "shortTitle": "Centinelas y Validación",
                "title": "Reto Integrador: Valores centinela y robustez algorítmica",
                "description": "Lectura continua hasta centinela de fin, cálculo de máximos y prevención de ZeroDivisionError.",
                "duration": "10 min",
                "steps": [
                    {
                        "type": "explanation",
                        "partLabel": "Paso 1 · El concepto",
                        "title": "El valor centinela",
                        "intro": "En una báscula para camiones mineros, no sabemos cuántos vehículos llegarán en el turno. El operario pesa camión tras camión hasta que ingresa una clave especial (ej. -1 o 'fin'). Ese dato especial de parada es el centinela.",
                        "examples": [
                            {
                                "label": "Parada con centinela -1",
                                "code": "total = 0\nentradas = [150, 200, -1, 80]\nfor peso in entradas:\n    if peso == -1:\n        break\n    total += peso\nprint(\"Carga total:\", total)",
                                "output": "Carga total: 350",
                                "explanation": "El -1 señala el final de la jornada; 80 queda ignorado y la carga acumulada es 150 + 200 = 350."
                            }
                        ],
                        "keyTakeaway": "Un centinela es un valor especial de control que no forma parte de los datos reales y sirve exclusivamente para indicar el fin de la captura."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 2 · Trazado con centinela",
                        "title": "Trazado con centinela y contador",
                        "code": "cantidad = 0\nsuma = 0\ndatos = [40, 60, 20, 0, 99]\nfor x in datos:\n    if x == 0:\n        break\n    cantidad += 1\n    suma += x\nprint(cantidad, suma)",
                        "question": "El número 0 actúa como centinela en esta serie de datos. ¿Qué imprimirá el script al finalizar?",
                        "theory": "¿Se procesa el número 99 después del centinela 0?",
                        "options": [
                            {
                                "id": "A",
                                "text": "4 120",
                                "isCorrect": false,
                                "whyIncorrect": "El 0 activa el break antes de incrementar la cantidad, por lo que se contaron 3 valores, no 4."
                            },
                            {
                                "id": "B",
                                "text": "5 219",
                                "isCorrect": false,
                                "whyIncorrect": "El break interrumpe el ciclo al llegar al 0; el número 99 nunca llega a procesarse."
                            },
                            {
                                "id": "C",
                                "text": "3 219",
                                "isCorrect": false,
                                "whyIncorrect": "La suma solo incluye 40 + 60 + 20 = 120; el 99 está después del centinela de salida."
                            },
                            {
                                "id": "D",
                                "text": "3 120",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "Procesa 40, 60 y 20 (cantidad=3, suma=120). En 0 hace break y no llega al 99.",
                        "fullAnswerExplanation": "¡Correcto! Procesa 40, 60 y 20 (cantidad = 3, suma = 120). Al encontrar el centinela 0, sale inmediatamente."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 3 · Spot the Bug",
                        "title": "El centinela colado en la suma",
                        "code": "total = 0\nfor v in [10, 20, -1]:\n    total += v\n    if v == -1:\n        break\nprint(\"Total neto:\", total)",
                        "question": "El programa debería sumar los ingresos hasta que se digite -1. Sin embargo, imprime Total neto: 29 en vez de 30. ¿Cuál es el error de diseño?",
                        "theory": "¿En qué orden se debe acumular y verificar el centinela?",
                        "options": [
                            {
                                "id": "A",
                                "text": "El valor del centinela -1 se acumuló en total antes de verificar si debía detener el ciclo.",
                                "isCorrect": true
                            },
                            {
                                "id": "B",
                                "text": "La variable total debió inicializarse en -1 para compensar la resta.",
                                "isCorrect": false,
                                "whyIncorrect": "Los acumuladores de sumas siempre deben iniciar en 0; parchear con -1 solo funcionaría por azar en este caso."
                            },
                            {
                                "id": "C",
                                "text": "El ciclo for no permite números negativos en sus colecciones.",
                                "isCorrect": false,
                                "whyIncorrect": "Las listas de Python aceptan cualquier número positivo, negativo o decimal."
                            },
                            {
                                "id": "D",
                                "text": "La instrucción if requiere obligatoriamente un bloque else para ejecutar un break.",
                                "isCorrect": false,
                                "whyIncorrect": "El condicional if simple es perfectamente válido y autosuficiente sin bloque else."
                            }
                        ],
                        "correctionTip": "La comprobación if v == -1 debe hacerse antes de total += v, para no sumarle el -1 al total.",
                        "fullAnswerExplanation": "¡Exacto! El orden de las instrucciones es crucial: la verificación del centinela debe hacerse antes de procesar o acumular el dato."
                    },
                    {
                        "type": "explanation",
                        "partLabel": "Paso 4 · Cálculo de máximos",
                        "title": "Búsqueda del valor máximo",
                        "intro": "Para recordar la temperatura récord de un reactor químico, guardamos la primera lectura como el campeón actual. Cada vez que una nueva lectura supera al campeón, la coronamos como el nuevo récord.",
                        "examples": [
                            {
                                "label": "Máximo elemento",
                                "code": "temperaturas = [24, 38, 19, 41, 30]\nmaxima = temperaturas[0]\nfor t in temperaturas:\n    if t > maxima:\n        maxima = t\nprint(f\"Temperatura máxima: {maxima}°C\")",
                                "output": "Temperatura máxima: 41°C",
                                "explanation": "maxima arranca en 24, sube a 38, y finalmente a 41 cuando se compara con 41."
                            }
                        ],
                        "keyTakeaway": "Para encontrar el mayor de una serie, inicializa tu variable con el primer dato conocido y actualízala cada vez que encuentres uno estrictamente mayor."
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 5 · Trazado condicional",
                        "title": "Trazado de conteo condicional",
                        "code": "notas = [4.5, 2.8, 3.2, 1.9, 3.0]\nganaron = 0\nfor n in notas:\n    if n >= 3.0:\n        ganaron += 1\nprint(\"Aprobados:\", ganaron)",
                        "question": "Un profesor procesa las notas para saber cuántos aprobaron la materia (nota mínima: 3.0). ¿Qué imprime este programa?",
                        "theory": "¿Cuáles notas son mayores o iguales a 3.0?",
                        "options": [
                            {
                                "id": "A",
                                "text": "Aprobados: 2",
                                "isCorrect": false,
                                "whyIncorrect": "No contaste la nota 3.0, pero el operador '>=' incluye exactamente las notas iguales a 3.0."
                            },
                            {
                                "id": "B",
                                "text": "Aprobados: 4",
                                "isCorrect": false,
                                "whyIncorrect": "Las notas 2.8 y 1.9 no superan el 3.0, por lo que no deben contabilizarse."
                            },
                            {
                                "id": "C",
                                "text": "Aprobados: 3",
                                "isCorrect": true
                            },
                            {
                                "id": "D",
                                "text": "Aprobados: 5",
                                "isCorrect": false,
                                "whyIncorrect": "Solo 3 de los 5 estudiantes tienen nota mayor o igual a 3.0 (4.5, 3.2 y 3.0)."
                            }
                        ],
                        "correctionTip": "4.5 >= 3.0 (sí); 2.8 (no); 3.2 (sí); 1.9 (no); 3.0 >= 3.0 (sí). Total = 3.",
                        "fullAnswerExplanation": "¡Correcto! Cumplen la condición n >= 3.0 las notas 4.5, 3.2 y 3.0, dando un total de 3 aprobados."
                    },
                    {
                        "type": "code_sandbox",
                        "partLabel": "Paso 6 · Práctica guiada",
                        "title": "Procesador de votaciones",
                        "instruction": "Completa las dos ranuras para detener el conteo cuando el voto sea 0 (centinela de urna cerrada) usando break:",
                        "starterCode": "votos_c1 = 0\ntotal_votos = 0\nurnas = [1, 2, 1, 1, 0, 2]\nfor voto in urnas:\n    if voto ___ 0:\n        ___\n    total_votos += 1\n    if voto == 1:\n        votos_c1 += 1\nprint(f\"Candidato 1: {votos_c1} de {total_votos}\")",
                        "slotMarker": "___",
                        "expectedOutput": "Candidato 1: 3 de 4",
                        "options": [
                            {
                                "id": "A",
                                "slots": [
                                    "!=",
                                    "continue"
                                ],
                                "label": "!=  y  continue",
                                "code": "!=  y  continue",
                                "isCorrect": false,
                                "whyIncorrect": "'!=' saltaría todos los votos válidos y solo procesaría los ceros."
                            },
                            {
                                "id": "B",
                                "slots": [
                                    "==",
                                    "break"
                                ],
                                "label": "==  y  break",
                                "code": "==  y  break",
                                "isCorrect": true,
                                "explanation": "¡Excelente lógica electoral! Al verificar voto == 0, break cierra la urna en el momento justo sin contar votos posteriores."
                            },
                            {
                                "id": "C",
                                "slots": [
                                    "==",
                                    "continue"
                                ],
                                "label": "==  y  continue",
                                "code": "==  y  continue",
                                "isCorrect": false,
                                "whyIncorrect": "'continue' solo omitiría el 0 y seguiría contando los votos posteriores a la urna cerrada."
                            },
                            {
                                "id": "D",
                                "slots": [
                                    ">",
                                    "break"
                                ],
                                "label": ">  y  break",
                                "code": ">  y  break",
                                "isCorrect": false,
                                "whyIncorrect": "'>' detendría el conteo inmediatamente en el primer voto positivo recibido."
                            }
                        ]
                    },
                    {
                        "type": "predict",
                        "partLabel": "Paso 7 · Caso Borde",
                        "title": "Centinela inmediato en el primer dato",
                        "code": "entradas = [-1]\ncontador = 0\nsuma = 0\nfor val in entradas:\n    if val == -1:\n        break\n    contador += 1\n    suma += val\nif contador > 0:\n    print(suma / contador)\nelse:\n    print(\"Sin datos\")",
                        "question": "Si una cuadrilla no realizó ningún trabajo y el primer dato digitado es inmediatamente el centinela -1, ¿qué imprime el programa?",
                        "theory": "¿Llega a ejecutarse la división si contador queda en 0?",
                        "options": [
                            {
                                "id": "A",
                                "text": "0.0",
                                "isCorrect": false,
                                "whyIncorrect": "Como contador quedó en 0, no entra al bloque if y no evalúa ninguna división matemática."
                            },
                            {
                                "id": "B",
                                "text": "-1",
                                "isCorrect": false,
                                "whyIncorrect": "El centinela activa el break inmediatamente sin almacenarse ni en suma ni en contador."
                            },
                            {
                                "id": "C",
                                "text": "ZeroDivisionError: division by zero",
                                "isCorrect": false,
                                "whyIncorrect": "El condicional if contador > 0 protegió exitosamente al programa evitando ejecutar la división."
                            },
                            {
                                "id": "D",
                                "text": "Sin datos",
                                "isCorrect": true
                            }
                        ],
                        "correctionTip": "Al entrar con -1, se ejecuta el break. contador queda en 0, por lo que va al else e imprime 'Sin datos'.",
                        "fullAnswerExplanation": "¡Dominio total de casos borde! El break se dispara en el primer intento dejando contador = 0. El if-else previene la caída del sistema y emite el mensaje seguro 'Sin datos'."
                    }
                ]
            }
        ]
    }
  ]
};
