#!/usr/bin/env python3
"""
bake_curriculum.py
------------------
Ejecuta todo el código del currículo en el intérprete real de Python (CPython 3)
y genera un archivo baked_traces.js con la traza de ejecución exacta línea por línea,
incluyendo errores de sintaxis (SyntaxError, IndentationError) y excepciones en tiempo
de ejecución (NameError, TypeError, etc.) formateados tal como los emite CPython.
"""

import ast
import io
import json
import re
import sys
import traceback
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CURRICULUM_PATH = BASE_DIR / "curriculum.js"
OUTPUT_PATH = BASE_DIR / "baked_traces.js"

def trace_python_code(code_str, slot_value=None, expected_output=""):
    if slot_value is not None:
        clean_code = code_str.replace("___", slot_value)
    else:
        clean_code = code_str
    
    lines = clean_code.split("\n")

    # 1. Comprobar errores de sintaxis en tiempo de compilación (SyntaxError, IndentationError)
    try:
        tree = ast.parse(clean_code, filename="main.py")
    except (SyntaxError, IndentationError) as e:
        err_msg = "".join(traceback.format_exception_only(type(e), e)).strip()
        err_line = max(0, min((e.lineno or 1) - 1, len(lines) - 1))
        
        line_trace = []
        for idx in range(len(lines)):
            if idx < err_line:
                line_trace.append({"prints": None, "outputSoFar": []})
            elif idx == err_line:
                line_trace.append({
                    "prints": err_msg,
                    "outputSoFar": err_msg.split("\n"),
                    "hasError": True,
                    "errorType": type(e).__name__,
                    "errorLine": err_line
                })
            else:
                line_trace.append({
                    "prints": None,
                    "outputSoFar": err_msg.split("\n"),
                    "skipped": True
                })
        return {
            "lines": lines,
            "lineTrace": line_trace,
            "totalOutput": err_msg,
            "hasError": True,
            "errorLine": err_line,
            "errorType": type(e).__name__
        }
    except Exception as e:
        print(f"  [WARN] No se pudo parsear AST: {e}")
        return None

    # 2. Extraer entradas interactivas simuladas
    from verify_curriculum import extract_inputs_from_code_and_output
    inputs = extract_inputs_from_code_and_output(clean_code, expected_output)

    scope = {}
    captured_stdout_at_line = {}
    stdout_buffer = ""
    has_runtime_error = False
    error_line = None
    error_type = None

    class EchoStdin:
        def __init__(self, in_list):
            self.inputs = list(in_list)
        def readline(self, *args):
            if self.inputs:
                return self.inputs.pop(0)
            return "20\n"

    echo_stdin = EchoStdin(inputs)
    
    for stmt in tree.body:
        buf = io.StringIO()
        old_stdout = sys.stdout
        old_stdin = sys.stdin
        sys.stdout = buf

        class StdinWithEcho:
            def readline(self, *args):
                line = echo_stdin.readline(*args)
                if line:
                    buf.write(line)
                return line

        sys.stdin = StdinWithEcho()
        stmt_error = None
        try:
            compiled = compile(ast.Module(body=[stmt], type_ignores=[]), "main.py", "exec")
            exec(compiled, scope)
        except Exception as e:
            stmt_error = e
        finally:
            sys.stdout = old_stdout
            sys.stdin = old_stdin

        out = buf.getvalue()
        if out:
            stdout_buffer += out

        stmt_end_idx = stmt.end_lineno - 1

        if stmt_error:
            has_runtime_error = True
            error_line = stmt.lineno - 1
            error_type = type(stmt_error).__name__
            code_line_str = lines[stmt.lineno - 1].strip() if 0 <= stmt.lineno - 1 < len(lines) else ""
            error_msg = f"Traceback (most recent call last):\n  File \"main.py\", line {stmt.lineno}, in <module>\n    {code_line_str}\n{type(stmt_error).__name__}: {stmt_error}"
            
            if stdout_buffer:
                full_out = stdout_buffer.rstrip("\n") + "\n" + error_msg
            else:
                full_out = error_msg

            stdout_buffer = full_out
            lines_so_far = stdout_buffer.split("\n")
            captured_stdout_at_line[error_line] = {
                "prints": error_msg,
                "outputSoFar": lines_so_far,
                "hasError": True,
                "errorType": error_type,
                "errorLine": error_line
            }
            break
        else:
            lines_so_far = stdout_buffer.rstrip("\n").split("\n") if stdout_buffer else []
            captured_stdout_at_line[stmt_end_idx] = {
                "prints": out.rstrip("\n") if out.endswith("\n") else (out if out else None),
                "outputSoFar": lines_so_far
            }

    line_trace = []
    current_output = []
    encountered_error = False

    for idx in range(len(lines)):
        entry = captured_stdout_at_line.get(idx)
        if entry:
            current_output = list(entry["outputSoFar"])
            line_trace.append({
                "prints": entry["prints"],
                "outputSoFar": current_output,
                "hasError": entry.get("hasError", False)
            })
            if entry.get("hasError"):
                encountered_error = True
        else:
            line_trace.append({
                "prints": None,
                "outputSoFar": list(current_output),
                "skipped": encountered_error
            })

    return {
        "lines": lines,
        "lineTrace": line_trace,
        "totalOutput": stdout_buffer.rstrip("\n"),
        "hasError": has_runtime_error,
        "errorLine": error_line if has_runtime_error else None,
        "errorType": error_type if has_runtime_error else None
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
                            trace = trace_python_code(c, expected_output=ex.get("output", ""))
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

                    # 3. Código en pasos sandbox (hornear TODAS las opciones: correctas e incorrectas)
                    if s.get("type") == "code_sandbox" and s.get("starterCode"):
                        starter = s["starterCode"].strip()
                        marker = s.get("slotMarker", "___")
                        for opt in s.get("options", []):
                            code_val = opt.get("code")
                            if code_val is not None:
                                filled = starter.replace(marker, code_val)
                                exp_out = s.get("expectedOutput", "") if opt.get("isCorrect") else ""
                                trace = trace_python_code(filled, expected_output=exp_out)
                                if trace:
                                    baked[filled] = trace
                                    success_count += 1
                                    err_status = f" ({trace['errorType']})" if trace.get("hasError") else ""
                                    print(f"    [SANDBOX] {l.get('id', '')} opt '{code_val}'{err_status}: {len(trace['lineTrace'])} líneas")
    except Exception as e:
        print(f"  [WARN] Curriculum baking: {e}")

    baked_json = json.dumps(baked, ensure_ascii=False, indent=2)
    js_content = f"// Archivo generado automaticamente por bake_curriculum.py\n// CPython {sys.version_info.major}.{sys.version_info.minor}\nwindow.BAKED_TRACES = {baked_json};\n"
    OUTPUT_PATH.write_text(js_content, encoding="utf-8")
    print("\n" + "=" * 60)
    print(f"Éxito! Se hornearon {success_count} trazas en {OUTPUT_PATH}")
    print("=" * 60)

if __name__ == "__main__":
    main()
