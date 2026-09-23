import json, sys, subprocess
from pathlib import Path

semana3 = {
    "id": "semana-3",
    "number": 3,
    "title": "Semana 3: Ciclos y Repetición",
    "description": "Automatización de tareas repetitivas con for, while, range, acumuladores, centinelas y control de flujo.",
    "status": "active",
    "lessons": [
        # --- LECCIÓN 1 ---
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
                            "isCorrect": False,
                            "whyIncorrect": "Sumaste las 3 líneas de código en vez de los valores reales asignados en cada suma (1 + 1 + 2)."
                        },
                        {
                            "id": "B",
                            "text": "4",
                            "isCorrect": True
                        },
                        {
                            "id": "C",
                            "text": "2",
                            "isCorrect": False,
                            "whyIncorrect": "Solo tomaste el último incremento de 2, olvidando que los anteriores ya habían acumulado 2 piezas."
                        },
                        {
                            "id": "D",
                            "text": "5",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "El operador '+=' funciona perfectamente con números enteros en cualquier parte del código."
                        },
                        {
                            "id": "B",
                            "text": "Falta convertir total con la función int() antes de imprimirlo en terminal.",
                            "isCorrect": False,
                            "whyIncorrect": "La variable ya es un número entero; no requiere ninguna conversión de tipo de dato."
                        },
                        {
                            "id": "C",
                            "text": "La variable gasto no puede recibir valores de una lista de corchetes.",
                            "isCorrect": False,
                            "whyIncorrect": "El ciclo for recorre la lista correctamente asignando cada elemento a la variable 'gasto'."
                        },
                        {
                            "id": "D",
                            "text": "La línea total = 0 está dentro del ciclo, reinicializando la suma en cada vuelta y borrando lo acumulado.",
                            "isCorrect": True
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
                            "isCorrect": True
                        },
                        {
                            "id": "B",
                            "text": "3 30",
                            "isCorrect": False,
                            "whyIncorrect": "Olvidaste acumular los dos primeros elementos (10 y 20); la suma total es 10 + 20 + 30 = 60."
                        },
                        {
                            "id": "C",
                            "text": "60 3",
                            "isCorrect": False,
                            "whyIncorrect": "Invertiste las variables en el print: primero se imprime 'cant' (3) y luego 'suma' (60)."
                        },
                        {
                            "id": "D",
                            "text": "4 60",
                            "isCorrect": False,
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
                            "slots": ["=", "="],
                            "label": "=  y  =",
                            "code": "=  y  =",
                            "isCorrect": False,
                            "whyIncorrect": "El operador '=' sobrescribe el valor en vez de acumularlo; dejaría vehiculos=1 y total_plata=12000."
                        },
                        {
                            "id": "B",
                            "slots": ["+=", "="],
                            "label": "+=  y  =",
                            "code": "+=  y  =",
                            "isCorrect": False,
                            "whyIncorrect": "Al usar '=' en total_plata, solo conservarás la última tarifa cobrada en lugar de sumarlas todas."
                        },
                        {
                            "id": "C",
                            "slots": ["+=", "+="],
                            "label": "+=  y  +=",
                            "code": "+=  y  +=",
                            "isCorrect": True,
                            "explanation": "¡Excelente! Ambos requieren += para que el valor de cada iteración se agregue a la memoria acumulada previa."
                        },
                        {
                            "id": "D",
                            "slots": ["=", "+="],
                            "label": "=  y  +=",
                            "code": "=  y  +=",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "Las variables numéricas pueden valer 0 sin ningún inconveniente en Python."
                        },
                        {
                            "id": "B",
                            "text": "Porque dividir entre cero causaría un colapso fatal con ZeroDivisionError.",
                            "isCorrect": True
                        },
                        {
                            "id": "C",
                            "text": "Porque la función print() falla si se le pasa una variable que almacena 0.",
                            "isCorrect": False,
                            "whyIncorrect": "print() puede imprimir el número 0 perfectamente; el problema es la operación matemática de división."
                        },
                        {
                            "id": "D",
                            "text": "Porque las variables no inicializadas se borran automáticamente de la memoria.",
                            "isCorrect": False,
                            "whyIncorrect": "Las variables sí fueron inicializadas en 0 y permanecen vivas en el ámbito del script."
                        }
                    ],
                    "correctionTip": "Dividir acumulador / contador con contador=0 lanza un ZeroDivisionError inmediato.",
                    "fullAnswerExplanation": "¡Exacto! Siempre que calcules un promedio a partir de un contador, debes verificar que contador > 0 para evitar el temido ZeroDivisionError."
                }
            ]
        },

        # --- LECCIÓN 2 ---
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
                            "isCorrect": False,
                            "whyIncorrect": "El ciclo no toma la palabra completa de golpe; itera letra por letra añadiendo un guión a cada una."
                        },
                        {
                            "id": "B",
                            "text": "-M-I-N-A-S",
                            "isCorrect": False,
                            "whyIncorrect": "El guión se concatena después de cada letra (`letra + '-'`), no antes."
                        },
                        {
                            "id": "C",
                            "text": "M I N A S",
                            "isCorrect": False,
                            "whyIncorrect": "El programa concatena guiones medios '-', no espacios en blanco."
                        },
                        {
                            "id": "D",
                            "text": "M-I-N-A-S-",
                            "isCorrect": True
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
                            "isCorrect": True
                        },
                        {
                            "id": "B",
                            "text": "La variable i solo puede utilizarse para recorrer palabras y no variables numéricas.",
                            "isCorrect": False,
                            "whyIncorrect": "'i' es solo un nombre de variable arbitrario; puede recibir cualquier tipo de dato si la colección es iterable."
                        },
                        {
                            "id": "C",
                            "text": "Falta envolver el número 35 entre comillas dobles para que Python pueda iterarlo.",
                            "isCorrect": False,
                            "whyIncorrect": "Poner '35' iteraría sobre los caracteres '3' y '5' (2 vueltas), lo cual no es la lista de 35 alumnos buscada."
                        },
                        {
                            "id": "D",
                            "text": "La palabra clave for está obsoleta en Python 3 para números enteros.",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "Sumaste todos los números incluyendo los negativos (10 - 5 + 20 - 3 = 22), pero el if filtró solo los mayores a 0."
                        },
                        {
                            "id": "B",
                            "text": "Suma positivos: 38",
                            "isCorrect": False,
                            "whyIncorrect": "Sumaste el valor absoluto de los números negativos en lugar de ignorarlos como manda la condición."
                        },
                        {
                            "id": "C",
                            "text": "Suma positivos: 30",
                            "isCorrect": True
                        },
                        {
                            "id": "D",
                            "text": "Suma positivos: 25",
                            "isCorrect": False,
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
                            "slots": ["while", "=="],
                            "label": "while  y  ==",
                            "code": "while  y  ==",
                            "isCorrect": False,
                            "whyIncorrect": "'while' evalúa una condición booleana, no una relación de pertenencia sobre una lista."
                        },
                        {
                            "id": "B",
                            "slots": ["for", "in"],
                            "label": "for  y  in",
                            "code": "for  y  in",
                            "isCorrect": True,
                            "explanation": "¡Excelente! La construcción canónica en Python para iterar colecciones es for <elemento> in <coleccion>:."
                        },
                        {
                            "id": "C",
                            "slots": ["for", "=="],
                            "label": "for  y  ==",
                            "code": "for  y  ==",
                            "isCorrect": False,
                            "whyIncorrect": "El operador '==' compara igualdad de valores; para iterar sobre una colección se utiliza la palabra 'in'."
                        },
                        {
                            "id": "D",
                            "slots": ["if", "in"],
                            "label": "if  y  in",
                            "code": "if  y  in",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "En Python, a diferencia de lenguajes como C++ o Java, la variable del ciclo no tiene un ámbito local aislado."
                        },
                        {
                            "id": "B",
                            "text": "Se reinicia al valor inicial de la lista (\"arcilla\").",
                            "isCorrect": False,
                            "whyIncorrect": "La variable no se rebobina al finalizar; conserva la última asignación que recibió."
                        },
                        {
                            "id": "C",
                            "text": "Su valor pasa a ser None.",
                            "isCorrect": False,
                            "whyIncorrect": "Python no limpia la variable asignándole None; mantiene en memoria su último contenido asignado."
                        },
                        {
                            "id": "D",
                            "text": "Conserva en memoria el último valor que procesó (\"cuarzo\").",
                            "isCorrect": True
                        }
                    ],
                    "correctionTip": "En Python, las variables de ciclo permanecen en el ámbito y conservan el último valor asignado en la iteración final.",
                    "fullAnswerExplanation": "¡Gran observación! En Python, la variable del ciclo permanece viva en el ámbito actual con el último elemento que tomó de la secuencia."
                }
            ]
        },

        # --- LECCIÓN 3 ---
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
                            "isCorrect": True
                        },
                        {
                            "id": "B",
                            "text": "10",
                            "isCorrect": False,
                            "whyIncorrect": "Sumaste 0 + 1 + 2 + 3 + 4 = 10, pero range(4) se detiene en 3 y nunca llega al 4."
                        },
                        {
                            "id": "C",
                            "text": "4",
                            "isCorrect": False,
                            "whyIncorrect": "4 es el valor del parámetro stop, no la suma de los valores producidos (0 + 1 + 2 + 3)."
                        },
                        {
                            "id": "D",
                            "text": "3",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "range() acepta perfectamente 1, 2 o 3 argumentos enteros."
                        },
                        {
                            "id": "B",
                            "text": "Las variables de una sola letra como s no son válidas en ciclos numéricos.",
                            "isCorrect": False,
                            "whyIncorrect": "Cualquier identificador válido en Python puede ser usado como variable de ciclo."
                        },
                        {
                            "id": "C",
                            "text": "Con el paso por defecto (+1), un inicio mayor que el final genera un rango vacío (0 vueltas).",
                            "isCorrect": True
                        },
                        {
                            "id": "D",
                            "text": "Python requiere que los rangos hacia atrás se escriban dentro de una lista con corchetes.",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "El paso es -2, por lo que desciende dando saltos de 2 en 2, no de 1 en 1."
                        },
                        {
                            "id": "B",
                            "text": "6 4 2",
                            "isCorrect": True
                        },
                        {
                            "id": "C",
                            "text": "6 4",
                            "isCorrect": False,
                            "whyIncorrect": "El 2 sigue siendo estrictamente mayor que el límite 1, por lo que el 2 sí entra en el ciclo."
                        },
                        {
                            "id": "D",
                            "text": "4 2 0",
                            "isCorrect": False,
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
                            "slots": ["30", "5"],
                            "label": "30  y  5",
                            "code": "30  y  5",
                            "isCorrect": False,
                            "whyIncorrect": "Como el límite superior es abierto, poner 30 se detendría en 25 excluyendo el 30."
                        },
                        {
                            "id": "B",
                            "slots": ["30", "1"],
                            "label": "30  y  1",
                            "code": "30  y  1",
                            "isCorrect": False,
                            "whyIncorrect": "Con paso 1 imprimiría todos los enteros consecutivos (10, 11, 12...), no los múltiplos de 5."
                        },
                        {
                            "id": "C",
                            "slots": ["35", "10"],
                            "label": "35  y  10",
                            "code": "35  y  10",
                            "isCorrect": False,
                            "whyIncorrect": "Con paso 10 daría saltos de 10 en 10 (10, 20, 30), omitiendo 15 y 25."
                        },
                        {
                            "id": "D",
                            "slots": ["35", "5"],
                            "label": "35  y  5",
                            "code": "35  y  5",
                            "isCorrect": True,
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
                            "isCorrect": True
                        },
                        {
                            "id": "B",
                            "text": "1 vez, ejecutando la iteración con i = 10.",
                            "isCorrect": False,
                            "whyIncorrect": "El límite superior siempre se excluye; al no haber espacio entre inicio y fin, el rango es vacío."
                        },
                        {
                            "id": "C",
                            "text": "10 veces, tomando el número especificado como cantidad de repeticiones.",
                            "isCorrect": False,
                            "whyIncorrect": "range(10, 10) no significa '10 veces'; especifica inicio=10 y fin=10."
                        },
                        {
                            "id": "D",
                            "text": "Produce un error de tipo ValueError por parámetros redundantes.",
                            "isCorrect": False,
                            "whyIncorrect": "Es una instrucción válida en Python que simplemente produce un generador sin elementos."
                        }
                    ],
                    "correctionTip": "La regla matemática es inicio <= x < fin. Con 10 <= x < 10 no hay ningún entero posible.",
                    "fullAnswerExplanation": "¡Exacto! La condición de pertenencia es inicio <= x < fin. Si ambos son 10, el conjunto es vacío y no da ninguna vuelta."
                }
            ]
        },

        # --- LECCIÓN 4 ---
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
                            "isCorrect": False,
                            "whyIncorrect": "La división entera se detiene cuando n llega a 1 (1 > 1 es False), nunca llega a 0."
                        },
                        {
                            "id": "B",
                            "text": "2 2",
                            "isCorrect": False,
                            "whyIncorrect": "Cuando n vale 2, la condición 2 > 1 sigue siendo True, por lo que da una vuelta más dividiendo a 1."
                        },
                        {
                            "id": "C",
                            "text": "3 1",
                            "isCorrect": True
                        },
                        {
                            "id": "D",
                            "text": "3 2",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "Al inicio segundos vale 3, por lo que 3 > 0 es True y el ciclo sí inicia."
                        },
                        {
                            "id": "B",
                            "text": "Falta actualizar la variable adentro (segundos -= 1), haciendo que la condición sea eternamente True.",
                            "isCorrect": True
                        },
                        {
                            "id": "C",
                            "text": "Falta un bloque else al final de la instrucción while para cerrar el flujo.",
                            "isCorrect": False,
                            "whyIncorrect": "El bloque 'else' en ciclos es completamente opcional y no tiene relación con el bucle infinito."
                        },
                        {
                            "id": "D",
                            "text": "La función print() no está permitida dentro del cuerpo de un ciclo condicional.",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "Cuando p vale 4, la condición 4 <= 4 es True, por lo que vuelve a entrar y se multiplica por 2 a 8."
                        },
                        {
                            "id": "B",
                            "text": "Final: 2",
                            "isCorrect": False,
                            "whyIncorrect": "El ciclo no se detiene en 2 porque 2 <= 4 sigue siendo verdadero."
                        },
                        {
                            "id": "C",
                            "text": "Final: 16",
                            "isCorrect": False,
                            "whyIncorrect": "Para llegar a 16 necesitaría entrar cuando p vale 8, pero 8 <= 4 es False."
                        },
                        {
                            "id": "D",
                            "text": "Final: 8",
                            "isCorrect": True
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
                            "slots": ["<", "+="],
                            "label": "<  y  +=",
                            "code": "<  y  +=",
                            "isCorrect": True,
                            "explanation": "¡Excelente! Mientras toneladas < 100, se suman += 25 en cada viaje hasta alcanzar exactamente 100."
                        },
                        {
                            "id": "B",
                            "slots": [">", "+="],
                            "label": ">  y  +=",
                            "code": ">  y  +=",
                            "isCorrect": False,
                            "whyIncorrect": "Al inicio toneladas=0; como 0 > 100 es False, nunca entraría al ciclo y terminaría en 0."
                        },
                        {
                            "id": "C",
                            "slots": ["<=", "="],
                            "label": "<=  y  =",
                            "code": "<=  y  =",
                            "isCorrect": False,
                            "whyIncorrect": "Usar '=' asignaría siempre el valor fijo 25 en cada ciclo, provocando un bucle infinito."
                        },
                        {
                            "id": "D",
                            "slots": ["==", "+="],
                            "label": "==  y  +=",
                            "code": "==  y  +=",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "x disminuye de 2 en 2: 10 -> 8 -> 6 -> 4 -> 2. Nunca toma el valor 3."
                        },
                        {
                            "id": "B",
                            "text": "Salida: 4",
                            "isCorrect": False,
                            "whyIncorrect": "Cuando x vale 4, 4 > 3 sigue siendo True, por lo que entra una última vez y resta a 2."
                        },
                        {
                            "id": "C",
                            "text": "Salida: 2",
                            "isCorrect": True
                        },
                        {
                            "id": "D",
                            "text": "Salida: 0",
                            "isCorrect": False,
                            "whyIncorrect": "Cuando x llega a 2, 2 > 3 es False y el ciclo se detiene de inmediato sin llegar a 0."
                        }
                    ],
                    "correctionTip": "Cuando x vale 4 entra y resta a 2. Como 2 > 3 es False, el bucle termina con x = 2.",
                    "fullAnswerExplanation": "¡Exacto! El ciclo se detiene cuando la condición se rompe: al restar 2 a 4, x queda en 2, haciendo que 2 > 3 sea False."
                }
            ]
        },

        # --- LECCIÓN 5 ---
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
                            "isCorrect": False,
                            "whyIncorrect": "Sumaste todos los números ignorando la instrucción break que cancela el ciclo en el -1."
                        },
                        {
                            "id": "B",
                            "text": "Total: 15",
                            "isCorrect": True
                        },
                        {
                            "id": "C",
                            "text": "Total: 14",
                            "isCorrect": False,
                            "whyIncorrect": "El -1 activa el break antes de sumarse, por lo que la suma es 5 + 10 = 15, no 14."
                        },
                        {
                            "id": "D",
                            "text": "Total: 0",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "continue es completamente legal tanto en for como en while."
                        },
                        {
                            "id": "B",
                            "text": "El operador == debe sustituirse por = para asignar el nuevo valor.",
                            "isCorrect": False,
                            "whyIncorrect": "'=' asignaría un valor dentro del if en lugar de comparar; la condición requiere '=='."
                        },
                        {
                            "id": "C",
                            "text": "La condición i < 4 se vuelve falsa antes de tiempo.",
                            "isCorrect": False,
                            "whyIncorrect": "Al contrario: i se queda congelado en 2 y 2 < 4 sigue siendo siempre True."
                        },
                        {
                            "id": "D",
                            "text": "continue salta a la siguiente vuelta sin ejecutar i += 1, dejando a i estancado para siempre en 2.",
                            "isCorrect": True
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
                            "isCorrect": True
                        },
                        {
                            "id": "B",
                            "text": "Consonantes: 2",
                            "isCorrect": False,
                            "whyIncorrect": "2 es la cantidad de vocales que fueron omitidas ('I' y 'A'), pero contamos las consonantes."
                        },
                        {
                            "id": "C",
                            "text": "Consonantes: 5",
                            "isCorrect": False,
                            "whyIncorrect": "5 es la longitud total de 'MINAS', pero las vocales fueron omitidas por el continue."
                        },
                        {
                            "id": "D",
                            "text": "Consonantes: 4",
                            "isCorrect": False,
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
                            "slots": ["break", "continue"],
                            "label": "break  y  continue",
                            "code": "break  y  continue",
                            "isCorrect": False,
                            "whyIncorrect": "Si pones break en s == 0, detendrías todo el programa en la segunda lectura contabilizando solo 1."
                        },
                        {
                            "id": "B",
                            "slots": ["continue", "pass"],
                            "label": "continue  y  pass",
                            "code": "continue  y  pass",
                            "isCorrect": False,
                            "whyIncorrect": "Usar 'pass' en s < 0 procesaría la lectura -99 como válida, arrojando 3 lecturas en vez de 2."
                        },
                        {
                            "id": "C",
                            "slots": ["continue", "break"],
                            "label": "continue  y  break",
                            "code": "continue  y  break",
                            "isCorrect": True,
                            "explanation": "¡Gran trabajo! continue ignora el 0 sin detener el programa, y break detiene todo ante la alarma crítica -99."
                        },
                        {
                            "id": "D",
                            "slots": ["break", "break"],
                            "label": "break  y  break",
                            "code": "break  y  break",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "La línea `print('B')` nunca se ejecuta porque el break anterior interrumpe el ciclo de inmediato."
                        },
                        {
                            "id": "B",
                            "text": "A\nC",
                            "isCorrect": True
                        },
                        {
                            "id": "C",
                            "text": "A\nA\nA\nC",
                            "isCorrect": False,
                            "whyIncorrect": "El break finaliza el ciclo en la primera vuelta; no llega a ejecutarse para el 2 ni para el 3."
                        },
                        {
                            "id": "D",
                            "text": "Produce un error de sintaxis SyntaxError: unreachable code.",
                            "isCorrect": False,
                            "whyIncorrect": "Python permite escribir código después de un break sin lanzar error de sintaxis; simplemente no lo ejecuta jamás."
                        }
                    ],
                    "correctionTip": "Imprime 'A', luego el break termina el for inmediatamente saltando a print('C'). 'B' nunca se imprime.",
                    "fullAnswerExplanation": "¡Perfecto! Imprime 'A', el break cancela el ciclo (dejando a print('B') inalcanzable) y continúa en print('C')."
                }
            ]
        },

        # --- LECCIÓN 6 ---
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
                            "isCorrect": False,
                            "whyIncorrect": "El 0 activa el break antes de incrementar la cantidad, por lo que se contaron 3 valores, no 4."
                        },
                        {
                            "id": "B",
                            "text": "5 219",
                            "isCorrect": False,
                            "whyIncorrect": "El break interrumpe el ciclo al llegar al 0; el número 99 nunca llega a procesarse."
                        },
                        {
                            "id": "C",
                            "text": "3 219",
                            "isCorrect": False,
                            "whyIncorrect": "La suma solo incluye 40 + 60 + 20 = 120; el 99 está después del centinela de salida."
                        },
                        {
                            "id": "D",
                            "text": "3 120",
                            "isCorrect": True
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
                            "isCorrect": True
                        },
                        {
                            "id": "B",
                            "text": "La variable total debió inicializarse en -1 para compensar la resta.",
                            "isCorrect": False,
                            "whyIncorrect": "Los acumuladores de sumas siempre deben iniciar en 0; parchear con -1 solo funcionaría por azar en este caso."
                        },
                        {
                            "id": "C",
                            "text": "El ciclo for no permite números negativos en sus colecciones.",
                            "isCorrect": False,
                            "whyIncorrect": "Las listas de Python aceptan cualquier número positivo, negativo o decimal."
                        },
                        {
                            "id": "D",
                            "text": "La instrucción if requiere obligatoriamente un bloque else para ejecutar un break.",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "No contaste la nota 3.0, pero el operador '>=' incluye exactamente las notas iguales a 3.0."
                        },
                        {
                            "id": "B",
                            "text": "Aprobados: 4",
                            "isCorrect": False,
                            "whyIncorrect": "Las notas 2.8 y 1.9 no superan el 3.0, por lo que no deben contabilizarse."
                        },
                        {
                            "id": "C",
                            "text": "Aprobados: 3",
                            "isCorrect": True
                        },
                        {
                            "id": "D",
                            "text": "Aprobados: 5",
                            "isCorrect": False,
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
                            "slots": ["!=", "continue"],
                            "label": "!=  y  continue",
                            "code": "!=  y  continue",
                            "isCorrect": False,
                            "whyIncorrect": "'!=' saltaría todos los votos válidos y solo procesaría los ceros."
                        },
                        {
                            "id": "B",
                            "slots": ["==", "break"],
                            "label": "==  y  break",
                            "code": "==  y  break",
                            "isCorrect": True,
                            "explanation": "¡Excelente lógica electoral! Al verificar voto == 0, break cierra la urna en el momento justo sin contar votos posteriores."
                        },
                        {
                            "id": "C",
                            "slots": ["==", "continue"],
                            "label": "==  y  continue",
                            "code": "==  y  continue",
                            "isCorrect": False,
                            "whyIncorrect": "'continue' solo omitiría el 0 y seguiría contando los votos posteriores a la urna cerrada."
                        },
                        {
                            "id": "D",
                            "slots": [">", "break"],
                            "label": ">  y  break",
                            "code": ">  y  break",
                            "isCorrect": False,
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
                            "isCorrect": False,
                            "whyIncorrect": "Como contador quedó en 0, no entra al bloque if y no evalúa ninguna división matemática."
                        },
                        {
                            "id": "B",
                            "text": "-1",
                            "isCorrect": False,
                            "whyIncorrect": "El centinela activa el break inmediatamente sin almacenarse ni en suma ni en contador."
                        },
                        {
                            "id": "C",
                            "text": "ZeroDivisionError: division by zero",
                            "isCorrect": False,
                            "whyIncorrect": "El condicional if contador > 0 protegió exitosamente al programa evitando ejecutar la división."
                        },
                        {
                            "id": "D",
                            "text": "Sin datos",
                            "isCorrect": True
                        }
                    ],
                    "correctionTip": "Al entrar con -1, se ejecuta el break. contador queda en 0, por lo que va al else e imprime 'Sin datos'.",
                    "fullAnswerExplanation": "¡Dominio total de casos borde! El break se dispara en el primer intento dejando contador = 0. El if-else previene la caída del sistema y emite el mensaje seguro 'Sin datos'."
                }
            ]
        }
    ]
}

print(f"Semana 3 creada con {len(semana3['lessons'])} lecciones.")

# Inyector histórico: el único destino es el proyecto local de Programacion.
# ARCHIVO HISTÓRICO: no ejecutar. Los datos no representan la versión final.
for base_path in [
    Path(__file__).resolve().parent
]:
    curr_path = f"{base_path}/curriculum.js"
    with open(curr_path, "r", encoding="utf-8") as f:
        curr_text = f.read()
    
    # Check if semana-3 is already in curriculum.js
    if "\"id\": \"semana-3\"" in curr_text:
        print(f"semana-3 already present in {curr_path}, skipping injection.")
        continue
    
    # We want to insert semana3 before the closing bracket of CURRICULUM.weeks
    # CURRICULUM.weeks ends with:
    #   ]
    # };
    # Let's find the last ']' in the file
    last_bracket = curr_text.rfind("]")
    if last_bracket == -1:
        print(f"Error: Could not find closing bracket in {curr_path}")
        sys.exit(1)
    
    # Format semana3 as pretty JSON
    s3_json = json.dumps(semana3, indent=4, ensure_ascii=False)
    # Indent it by 4 spaces
    indented_s3 = "\n".join("    " + line for line in s3_json.split("\n"))
    
    # We need a comma before inserting if there's preceding content
    prefix = curr_text[:last_bracket].rstrip()
    if not prefix.endswith(","):
        prefix += ","
    
    new_curr_text = prefix + "\n" + indented_s3 + "\n  ]\n};\n"
    
    with open(curr_path, "w", encoding="utf-8") as f:
        f.write(new_curr_text)
    print(f"Injected semana-3 successfully into {curr_path}")
