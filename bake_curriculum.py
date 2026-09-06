#!/usr/bin/env python3
"""
bake_curriculum.py
------------------
Ejecuta todo el codigo del curriculo en el interprete real de Python (CPython 3)
y genera un archivo baked_traces.js con la traza de ejecucion exacta linea por linea.
"""

import ast
import io
import json
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CURRICULUM_PATH = BASE_DIR / "curriculum.js"
OUTPUT_PATH = BASE_DIR / "baked_traces.js"

def trace_python_code(code_str, slot_value=None):
    lines = code_str.split("\n")
    if slot_value is not None:
        clean_code = code_str.replace("___", slot_value)
    else:
        clean_code = code_str.replace("___", "None")
    
    try:
        tree = ast.parse(clean_code)
    except Exception as e:
        print(f"  [WARN] No se pudo parsear AST: {e}")
        return None

    scope = {}
    captured_stdout_at_line = {}
    stdout_buffer = ""
    
    for stmt in tree.body:
        buf = io.StringIO()
        old_stdout = sys.stdout
        sys.stdout = buf
        try:
            compiled = compile(ast.Module(body=[stmt], type_ignores=[]), "<curriculum>", "exec")
            exec(compiled, scope)
        except Exception as e:
            buf.write(f"Error: {e}\n")
        finally:
            sys.stdout = old_stdout

        out = buf.getvalue()
        if out:
            stdout_buffer += out
            lines_so_far = stdout_buffer.rstrip("\n").split("\n") if stdout_buffer else []
            captured_stdout_at_line[stmt.end_lineno - 1] = {
                "prints": out.rstrip("\n") if out.endswith("\n") else out,
                "outputSoFar": lines_so_far
            }

    line_trace = []
    current_output = []
    for idx in range(len(lines)):
        entry = captured_stdout_at_line.get(idx)
        if entry:
            current_output = list(entry["outputSoFar"])
            line_trace.append({
                "prints": entry["prints"],
                "outputSoFar": current_output
            })
        else:
            line_trace.append({
                "prints": None,
                "outputSoFar": list(current_output)
            })

    return {
        "lines": lines,
        "lineTrace": line_trace,
        "totalOutput": stdout_buffer.rstrip("\n")
    }

def main():
    print("=" * 60)
    print("Bake Curriculum: Ejecutando en Python real y horneando trazas...")
    print(f"Python version: {sys.version}")
    print("=" * 60)

    content = CURRICULUM_PATH.read_text(encoding="utf-8")
    pattern = re.compile(r"code:\s*`([^`]+)`", re.DOTALL)
    matches = list(pattern.finditer(content))

    print(f"Encontrados {len(matches)} bloques de codigo en curriculum.js.\n")

    baked = {}
    success_count = 0

    for idx, match in enumerate(matches):
        code_trimmed = match.group(1).strip()
        first_line = code_trimmed.splitlines()[0] if code_trimmed else ""
        print(f"[{idx + 1}/{len(matches)}] Procesando: {first_line[:40]}...")

        slot_value = None
        if "___" in code_trimmed:
            # Buscar la opcion correcta en el bloque del paso
            end_pos = match.end()
            surrounding = content[end_pos:end_pos + 1200]
            opt_match = re.search(r"slotText:\s*\"([^\"]+)\"[^}]*?isCorrect:\s*true|isCorrect:\s*true[^}]*?slotText:\s*\"([^\"]+)\"", surrounding)
            if opt_match:
                slot_value = opt_match.group(1) or opt_match.group(2)
                print(f"    -> Slot '___' resuelto con opcion correcta: '{slot_value}'")

        trace = trace_python_code(code_trimmed, slot_value=slot_value)
        if trace:
            baked[code_trimmed] = trace
            if slot_value:
                # Tambien hornear la version con el slot rellenado para busqueda directa
                filled_code = code_trimmed.replace("___", slot_value)
                filled_trace = trace_python_code(filled_code)
                if filled_trace:
                    baked[filled_code] = filled_trace
            success_count += 1
            if trace["totalOutput"]:
                print(f"    v Salida generada ({len(trace['lineTrace'])} lineas):")
                for out_line in trace["totalOutput"].splitlines():
                    print(f"      | {out_line}")
            else:
                print(f"    - Sin salida en pantalla ({len(trace['lineTrace'])} lineas)")

    baked_json = json.dumps(baked, ensure_ascii=False, indent=2)
    js_content = f"// Archivo generado automaticamente por bake_curriculum.py\n// CPython {sys.version_info.major}.{sys.version_info.minor}\nwindow.BAKED_TRACES = {baked_json};\n"
    OUTPUT_PATH.write_text(js_content, encoding="utf-8")
    print("\n" + "=" * 60)
    print(f"Exito! Se hornearon {success_count} trazas en {OUTPUT_PATH}")
    print("=" * 60)

if __name__ == "__main__":
    main()
