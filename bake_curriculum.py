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

    baked = {}
    success_count = 0

    try:
        from verify_curriculum import load_curriculum
        curr = load_curriculum()
        for w in curr.get("weeks", []):
            for l in w.get("lessons", []):
                for s in l.get("steps", []):
                    # 1. Ejemplos en pasos de explicación
                    for ex in s.get("examples", []):
                        c = ex.get("code", "").strip()
                        if c:
                            trace = trace_python_code(c)
                            if trace:
                                baked[c] = trace
                                success_count += 1
                                print(f"    [EJEMPLO] {l.get('id')} - {ex.get('label', '')}: {len(trace['lineTrace'])} líneas")
                    
                    # 2. Código en pasos predict
                    if s.get("type") == "predict" and s.get("code"):
                        c = s["code"].strip()
                        trace = trace_python_code(c)
                        if trace:
                            baked[c] = trace
                            success_count += 1
                            print(f"    [PREDICT] {l.get('id')}: {len(trace['lineTrace'])} líneas")

                    # 3. Código en pasos sandbox
                    if s.get("type") == "code_sandbox" and s.get("starterCode"):
                        starter = s["starterCode"].strip()
                        marker = s.get("slotMarker", "___")
                        for opt in s.get("options", []):
                            code_val = opt.get("code")
                            if code_val:
                                filled = starter.replace(marker, code_val)
                                trace = trace_python_code(filled)
                                if trace:
                                    baked[filled] = trace
                                    success_count += 1
                                    print(f"    [SANDBOX] {l.get('id', '')} opt '{code_val}': {len(trace['lineTrace'])} lineas")
    except Exception as e:
        print(f"  [WARN] Curriculum baking: {e}")

    baked_json = json.dumps(baked, ensure_ascii=False, indent=2)
    js_content = f"// Archivo generado automaticamente por bake_curriculum.py\n// CPython {sys.version_info.major}.{sys.version_info.minor}\nwindow.BAKED_TRACES = {baked_json};\n"
    OUTPUT_PATH.write_text(js_content, encoding="utf-8")
    print("\n" + "=" * 60)
    print(f"Exito! Se hornearon {success_count} trazas en {OUTPUT_PATH}")
    print("=" * 60)

if __name__ == "__main__":
    main()
