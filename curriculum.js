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
    }
  ]
};
