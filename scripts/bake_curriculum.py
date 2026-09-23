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
import itertools
import json
import re
import signal
import sys
import traceback
import types
from pathlib import Path

class InfiniteLoopTimeout(Exception):
    def __init__(self, message, loop_line=None):
        super().__init__(message)
        self.loop_line = loop_line

def _timeout_handler(signum, frame):
    raise InfiniteLoopTimeout("Límite de tiempo de ejecución excedido (bucle infinito)")

PROJECT_ROOT = Path(__file__).resolve().parents[1]
CURRICULUM_PATH = PROJECT_ROOT / "curriculum.js"
OUTPUT_PATH = PROJECT_ROOT / "baked_traces.js"

def snapshot_variables(namespace):
    """Serializa variables simples del estudiante para el panel de memoria."""
    snapshot = {}
    for name, value in namespace.items():
        if name.startswith("__") or callable(value) or isinstance(value, types.ModuleType):
            continue

        try:
            display = repr(value)
        except Exception:
            display = f"<{type(value).__name__}>"

        if len(display) > 90:
            display = display[:87] + "..."

        snapshot[name] = {
            "value": display,
            "type": type(value).__name__
        }
    return snapshot

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
                line_trace.append({"prints": None, "outputSoFar": [], "variables": {}})
            elif idx == err_line:
                line_trace.append({
                    "prints": err_msg,
                    "outputSoFar": err_msg.split("\n"),
                    "hasError": True,
                    "errorType": type(e).__name__,
                    "errorLine": err_line,
                    "variables": {}
                })
            else:
                line_trace.append({
                    "prints": None,
                    "outputSoFar": err_msg.split("\n"),
                    "skipped": True,
                    "variables": {}
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

    class EchoStdin:
        def __init__(self, in_list):
            self.inputs = list(in_list)
        def readline(self, *args):
            if self.inputs:
                return self.inputs.pop(0)
            return "20\n"

    echo_stdin = EchoStdin(inputs)

    scope = {}
    buf = io.StringIO()
    steps = []
    last_pos = 0
    MAX_STEPS = 60
    MAX_STALLED_ITERATIONS = 8
    while_lines = {node.lineno - 1 for node in ast.walk(tree) if isinstance(node, ast.While)}
    while_states = {}

    def tracer(frame, event, arg):
        nonlocal last_pos
        if frame.f_code.co_filename == "main.py" and event == "line":
            lineno = max(0, min(frame.f_lineno - 1, len(lines) - 1))
            if lineno in while_lines:
                state = tuple(sorted(
                    (name, type(value).__name__, repr(value))
                    for name, value in frame.f_locals.items()
                    if not name.startswith("__") and not callable(value)
                    and not isinstance(value, types.ModuleType)
                ))
                previous_state, repetitions = while_states.get(lineno, (None, 0))
                repetitions = repetitions + 1 if state == previous_state else 1
                if repetitions > MAX_STALLED_ITERATIONS:
                    raise InfiniteLoopTimeout(
                        f"El ciclo no avanza: se detuvo tras {MAX_STALLED_ITERATIONS} iteraciones con las mismas variables",
                        lineno
                    )
                while_states[lineno] = (state, repetitions)
            if len(steps) >= MAX_STEPS:
                raise InfiniteLoopTimeout("Límite de pasos de ejecución excedido (bucle infinito)")
            cur_val = buf.getvalue()
            if steps:
                steps[-1]["outputSoFar"] = [l for l in cur_val.split("\n") if l]
                steps[-1]["prints"] = cur_val[last_pos:].rstrip("\n") if cur_val[last_pos:] else None
                steps[-1]["variables"] = snapshot_variables(frame.f_locals)
                last_pos = len(cur_val)
            steps.append({
                "line": lineno,
                "outputSoFar": [l for l in cur_val.split("\n") if l],
                "prints": None,
                "hasError": False,
                "variables": snapshot_variables(frame.f_locals)
            })
        return tracer

    old_stdout = sys.stdout
    old_stdin = sys.stdin
    sys.stdout = buf

    class StdinWithEcho:
        def __init__(self, echo_source, out_buf):
            self.echo_source = echo_source
            self.out_buf = out_buf
        def readline(self, *args):
            line = self.echo_source.readline(*args)
            if line:
                self.out_buf.write(line)
            return line

    sys.stdin = StdinWithEcho(echo_stdin, buf)
    stmt_error = None
    timeout_loop_line = None
    has_timer = hasattr(signal, "SIGALRM")
    if has_timer:
        old_handler = signal.signal(signal.SIGALRM, _timeout_handler)
        signal.alarm(1)

    sys.settrace(tracer)
    try:
        compiled = compile(clean_code, "main.py", "exec")
        exec(compiled, scope)
    except InfiniteLoopTimeout as te:
        stmt_error = TimeoutError(str(te))
        timeout_loop_line = te.loop_line
    except Exception as e:
        stmt_error = e
    finally:
        sys.settrace(None)
        if has_timer:
            signal.alarm(0)
            signal.signal(signal.SIGALRM, old_handler)
        sys.stdout = old_stdout
        sys.stdin = old_stdin

        cur_val = buf.getvalue()
        if steps:
            steps[-1]["outputSoFar"] = [l for l in cur_val.split("\n") if l]
            steps[-1]["prints"] = cur_val[last_pos:].rstrip("\n") if cur_val[last_pos:] else None
            steps[-1]["variables"] = snapshot_variables(scope)

    has_runtime_error = False
    error_line = None
    error_type = None

    if stmt_error:
        has_runtime_error = True
        error_type = type(stmt_error).__name__
        tb = stmt_error.__traceback__
        while tb and tb.tb_next:
            tb = tb.tb_next
        if timeout_loop_line is not None:
            error_line = timeout_loop_line
        elif tb and tb.tb_frame.f_code.co_filename == "main.py":
            error_line = max(0, min(tb.tb_lineno - 1, len(lines) - 1))
        elif steps:
            error_line = steps[-1]["line"]
        else:
            error_line = 0

        code_line_str = lines[error_line].strip() if 0 <= error_line < len(lines) else ""
        error_msg = f"Traceback (most recent call last):\n  File \"main.py\", line {error_line + 1}, in <module>\n    {code_line_str}\n{error_type}: {stmt_error}"

        buf_lines = [l for l in buf.getvalue().split("\n") if l]
        if len(buf_lines) > 8:
            buf_lines = buf_lines[:8] + [f"... ({len(buf_lines) - 8} salidas repetidas omitidas)"]
        stdout_buffer = "\n".join(buf_lines)
        if stdout_buffer:
            stdout_buffer = stdout_buffer + "\n" + error_msg
        else:
            stdout_buffer = error_msg

        if timeout_loop_line is not None:
            steps.append({
                "line": error_line,
                "prints": error_msg,
                "outputSoFar": stdout_buffer.split("\n"),
                "hasError": True,
                "errorType": error_type,
                "errorLine": error_line,
                "variables": snapshot_variables(scope)
            })
        elif steps:
            steps[-1]["hasError"] = True
            steps[-1]["errorType"] = error_type
            steps[-1]["errorLine"] = error_line
            steps[-1]["prints"] = error_msg
            steps[-1]["outputSoFar"] = stdout_buffer.split("\n")
        else:
            steps.append({
                "line": error_line,
                "prints": error_msg,
                "outputSoFar": stdout_buffer.split("\n"),
                "hasError": True,
                "errorType": error_type,
                "errorLine": error_line,
                "variables": snapshot_variables(scope)
            })
    else:
        stdout_buffer = buf.getvalue()

    if not steps:
        for idx in range(len(lines)):
            steps.append({
                "line": idx,
                "prints": None,
                "outputSoFar": [],
                "hasError": False,
                "variables": {}
            })

    return {
        "lines": lines,
        "lineTrace": steps,
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

                    # 3. Código en pasos sandbox: todas las combinaciones de ranuras.
                    if s.get("type") == "code_sandbox" and s.get("starterCode"):
                        starter = s["starterCode"].strip()
                        marker = s.get("slotMarker", "___")
                        slot_count = starter.count(marker)
                        if slot_count > 1:
                            if s.get("slots"):
                                choices = [
                                    list(dict.fromkeys(opt.get("code") for opt in slot.get("options", []) if opt.get("code") is not None))
                                    for slot in s["slots"]
                                ]
                            else:
                                choices = [
                                    list(dict.fromkeys(opt["slots"][idx] for opt in s.get("options", []) if len(opt.get("slots", [])) > idx))
                                    for idx in range(slot_count)
                                ]
                            combinations = itertools.product(*choices) if len(choices) == slot_count and all(choices) else []
                        else:
                            combinations = [
                                tuple(opt.get("slots") or [opt["code"]])
                                for opt in s.get("options", [])
                                if opt.get("slots") or opt.get("code") is not None
                            ]

                        correct = next((opt for opt in s.get("options", []) if opt.get("isCorrect")), None)
                        solution = tuple(s["solution"]) if isinstance(s.get("solution"), list) else None
                        if solution is None and correct:
                            solution = tuple(correct.get("slots") or [correct.get("code", "")])

                        for slot_values in combinations:
                            filled = starter
                            for slot_val in slot_values:
                                filled = filled.replace(marker, slot_val, 1)
                            code_val = " / ".join(slot_values)
                            exp_out = s.get("expectedOutput", "") if tuple(slot_values) == solution else ""
                            trace = trace_python_code(filled, expected_output=exp_out)
                            if trace:
                                baked[filled] = trace
                                success_count += 1
                                err_status = f" ({trace['errorType']})" if trace.get("hasError") else ""
                                print(f"    [SANDBOX] {l.get('id', '')} fichas '{code_val}'{err_status}: {len(trace['lineTrace'])} líneas")
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
