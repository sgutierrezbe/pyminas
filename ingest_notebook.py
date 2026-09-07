#!/usr/bin/env python3
"""
=============================================================================
  📥 INGESTOR PEDAGÓGICO DE JUPYTER NOTEBOOKS — pyMinas v1.0
  Facultad de Minas · Universidad Nacional de Colombia - Sede Medellín
=============================================================================

Este script procesa un archivo Jupyter Notebook (.ipynb) enviado por el profesor
y extrae de manera estructurada:
1. Los temas principales y subtemas (encabezados Markdown).
2. Las celdas explicativas clave.
3. Los fragmentos de código, limpiando comandos mágicos de Jupyter (% y !).
4. Una propuesta de descomposición en Niveles Atómicos (1 concepto = 1 nivel)
   siguiendo la metodología de microaprendizaje estilo Brilliant.

Uso:
  python3 ingest_notebook.py ruta/al/archivo.ipynb
"""

import sys
import os
import json
import re

def clean_code_cell(source_lines):
    """Limpia líneas mágicas de Jupyter (% o !) no compatibles con Python puro."""
    cleaned = []
    for line in source_lines:
        stripped = line.strip()
        if stripped.startswith('%') or stripped.startswith('!'):
            continue
        cleaned.append(line)
    return "".join(cleaned).strip()

def parse_notebook(filepath):
    if not os.path.exists(filepath):
        print(f"❌ Error: El archivo '{filepath}' no existe.")
        sys.exit(1)

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            nb = json.load(f)
    except Exception as e:
        print(f"❌ Error al abrir el notebook JSON: {e}")
        sys.exit(1)

    cells = nb.get('cells', [])
    print(f"\n📖 Analizando notebook: {os.path.basename(filepath)}")
    print(f"   Total de celdas encontradas: {len(cells)}")

    sections = []
    current_section = {
        "title": "Introducción general",
        "level": 1,
        "markdown": [],
        "code_snippets": []
    }

    for idx, cell in enumerate(cells):
        cell_type = cell.get('cell_type')
        source = cell.get('source', [])
        if isinstance(source, list):
            source_text = "".join(source)
        else:
            source_text = str(source)

        if cell_type == 'markdown':
            header_match = re.search(r'^(#{1,3})\s+(.+)$', source_text, re.MULTILINE)
            if header_match:
                if current_section["markdown"] or current_section["code_snippets"]:
                    sections.append(current_section)

                h_level = len(header_match.group(1))
                h_title = header_match.group(2).strip()
                current_section = {
                    "title": h_title,
                    "level": h_level,
                    "markdown": [source_text],
                    "code_snippets": []
                }
            else:
                current_section["markdown"].append(source_text)

        elif cell_type == 'code':
            clean_code = clean_code_cell(source if isinstance(source, list) else source.splitlines(True))
            if clean_code:
                outputs = cell.get('outputs', [])
                output_text = ""
                for out in outputs:
                    if out.get('output_type') == 'stream':
                        text = out.get('text', [])
                        output_text += "".join(text) if isinstance(text, list) else str(text)
                    elif out.get('output_type') == 'execute_result':
                        data = out.get('data', {})
                        text = data.get('text/plain', '')
                        output_text += "".join(text) if isinstance(text, list) else str(text)

                current_section["code_snippets"].append({
                    "code": clean_code,
                    "recorded_output": output_text.strip()
                })

    if current_section["markdown"] or current_section["code_snippets"]:
        sections.append(current_section)

    return sections

def print_pedagogical_breakdown(sections):
    print("\n" + "=" * 70)
    print("  🧠 PROPUESTA DE DESCOMPOSICIÓN EN NIVELES ATÓMICOS (ESTILO BRILLIANT)")
    print("=" * 70)
    print("  Regla de Oro: 1 Concepto Único = 1 Nivel en el Mapa de pyMinas")
    print("  Cada nivel debe contener 4 a 6 micro-retos (resolubles en ~15 segundos c/u).\n")

    valid_sections = [s for s in sections if s["code_snippets"] or len(" ".join(s["markdown"]).strip()) > 30]

    for idx, sec in enumerate(valid_sections, 1):
        snippets_count = len(sec["code_snippets"])
        print(f"📍 Nivel {idx}: {sec['title']}")
        print(f"   ├─ Código fuente detectado: {snippets_count} fragmento(s)")

        raw_text = " ".join(sec["markdown"]).strip()
        cleaned_text = re.sub(r'#+\s*', '', raw_text)
        preview = " ".join(cleaned_text.split()[:20])
        if preview:
            print(f"   ├─ Resumen teórico: {preview}...")

        print(f"   └─ Sugerencia de micro-pasos:")
        print(f"        1. Explicación interactiva (traza en vivo del concepto)")
        print(f"        2. Predicción mental ('¿Qué imprime este programa?')")
        print(f"        3. Detección de error ('¿Cuál es el error en este código?')")
        print(f"        4. Práctica táctil ('Completa el código con ___')")
        print()

    print("=" * 70)
    print("💡 Próximo paso: Confirma los nombres de los niveles con el usuario antes")
    print("   de agregarlos a curriculum.js y ejecutar verify_curriculum.py.")
    print("=" * 70 + "\n")

def main():
    if len(sys.argv) < 2:
        print("Uso: python3 ingest_notebook.py <ruta_archivo.ipynb>")
        sys.exit(1)

    filepath = sys.argv[1]
    sections = parse_notebook(filepath)
    print_pedagogical_breakdown(sections)

if __name__ == '__main__':
    main()
