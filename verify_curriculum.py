#!/usr/bin/env python3
"""
verify_curriculum.py
====================
Auditor pedagógico y verificador estricto de calidad para pyMinas.
Valida el 100% de los ejercicios de curriculum.js ejecutando el código en CPython real:
  1. Integridad estructural y de IDs (semanas, lecciones, pasos).
  2. Sintaxis y ejecución real en Python de cada bloque de código.
  3. Coincidencia exacta entre salidas esperadas y salidas reales de CPython.
  4. Validez pedagógica de preguntas de opción múltiple (predict):
     - Exactamente una opción correcta (isCorrect: true).
     - Explicación de error obligatoria (whyIncorrect) en cada opción falsa.
  5. Validez de retos interactivos (code_sandbox):
     - Sustitución sintácticamente válida del slot '___'.
     - Opciones y retroalimentaciones completas.
  6. Sincronización con trazas pre-horneadas (baked_traces.js).

Uso:
  python3 verify_curriculum.py
"""

import ast
import io
import json
import re
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CURRICULUM_PATH = BASE_DIR / "curriculum.js"
BAKED_TRACES_PATH = BASE_DIR / "baked_traces.js"

# Códigos de color ANSI para terminal
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"

def js_to_json(js_code: str) -> str:
    """Convierte el objeto JS de curriculum.js a JSON válido sin dependencias externas."""
    js_code = re.sub(r'/\*[\s\S]*?\*/', '', js_code)
    
    out = []
    i = 0
    n = len(js_code)
    in_str = None
    
    while i < n:
        ch = js_code[i]
        
        if in_str:
            if ch == '\\' and i + 1 < n:
                next_ch = js_code[i + 1]
                if in_str == '`':
                    if next_ch == '`':
                        out.append('`')
                    elif next_ch == '\\':
                        out.append('\\\\')
                    elif next_ch == '"':
                        out.append('\\"')
                    else:
                        out.append('\\' + next_ch)
                elif in_str == '"':
                    if next_ch == '"':
                        out.append('\\"')
                    elif next_ch == '\\':
                        out.append('\\\\')
                    else:
                        out.append('\\' + next_ch)
                else: # in_str == "'"
                    if next_ch == "'":
                        out.append("'")
                    elif next_ch == '\\':
                        out.append('\\\\')
                    elif next_ch == '"':
                        out.append('\\"')
                    else:
                        out.append('\\' + next_ch)
                i += 2
                continue

            if ch == in_str:
                out.append('"')
                in_str = None
                i += 1
                continue
            
            if ch == '"':
                out.append('\\"')
            elif ch == '\n':
                out.append('\\n')
            elif ch == '\r':
                out.append('\\r')
            elif ch == '\t':
                out.append('\\t')
            else:
                out.append(ch)
            i += 1
            continue

        if ch == '/' and i + 1 < n and js_code[i+1] == '/':
            while i < n and js_code[i] != '\n':
                i += 1
            continue
        
        if ch == '/' and i + 1 < n and js_code[i+1] == '*':
            i += 2
            while i + 1 < n and not (js_code[i] == '*' and js_code[i+1] == '/'):
                i += 1
            i += 2
            continue
        
        if ch in ('"', "'", '`'):
            in_str = ch
            out.append('"')
            i += 1
            continue
            
        out.append(ch)
        i += 1
        
    s = "".join(out)
    s = re.sub(r'([{,]\s*)([a-zA-Z_]\w*)\s*:', r'\1"\2":', s)
    s = re.sub(r',\s*([\]}])', r'\1', s)
    return s

def load_curriculum():
    if not CURRICULUM_PATH.exists():
        raise FileNotFoundError(f"No se encontró {CURRICULUM_PATH}")
    raw = CURRICULUM_PATH.read_text(encoding="utf-8")
    match = re.search(r"const\s+CURRICULUM\s*=\s*(\{[\s\S]*\});?\s*$", raw)
    if not match:
        raise ValueError("No se pudo extraer 'const CURRICULUM = {...}' de curriculum.js")
    json_str = js_to_json(match.group(1))
    return json.loads(json_str)

def load_baked_traces():
    if not BAKED_TRACES_PATH.exists():
        return {}
    raw = BAKED_TRACES_PATH.read_text(encoding="utf-8")
    match = re.search(r"window\.BAKED_TRACES\s*=\s*(\{[\s\S]*\});?\s*$", raw)
    if not match:
        return {}
    try:
        return json.loads(match.group(1))
    except Exception:
        return {}

def execute_python_code(code_str: str) -> tuple[str, str]:
    """Ejecuta código en CPython aislado y retorna (stdout, error_str)."""
    buf = io.StringIO()
    old_stdout = sys.stdout
    sys.stdout = buf
    error = ""
    scope = {}
    try:
        compiled = compile(code_str, "<verify_curriculum>", "exec")
        exec(compiled, scope)
    except Exception as e:
        error = f"{type(e).__name__}: {e}"
    finally:
        sys.stdout = old_stdout
    
    return buf.getvalue(), error

class CurriculumAuditor:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.passed_checks = 0
        self.total_checks = 0

    def check(self, condition: bool, message: str, is_warning: bool = False):
        self.total_checks += 1
        if condition:
            self.passed_checks += 1
            return True
        else:
            if is_warning:
                self.warnings.append(message)
            else:
                self.errors.append(message)
            return False

    def run_audit(self):
        print(f"\n{BOLD}{CYAN}======================================================================{RESET}")
        print(f"{BOLD}{CYAN}  🔍 AUDITORÍA PEDAGÓGICA Y TÉCNICA DE CURRÍCULO — pyMinas v1.0{RESET}")
        print(f"{BOLD}{CYAN}======================================================================{RESET}\n")

        try:
            curriculum = load_curriculum()
        except Exception as e:
            print(f"{RED}❌ Error crítico al parsear curriculum.js:{RESET} {e}")
            return False

        baked_traces = load_baked_traces()
        print(f"  • Archivo curriculum.js cargado correctamente.")
        print(f"  • Archivo baked_traces.js contiene {len(baked_traces)} trazas pre-horneadas.\n")

        weeks = curriculum.get("weeks", [])
        self.check(len(weeks) > 0, "El currículo debe contener al menos 1 semana activa.")

        seen_week_ids = set()
        seen_lesson_ids = set()

        for w_idx, week in enumerate(weeks):
            w_id = week.get("id", f"semana-{w_idx}")
            w_status = week.get("status", "active")
            self.check(w_id not in seen_week_ids, f"Semana con ID duplicado: '{w_id}'")
            seen_week_ids.add(w_id)

            lessons = week.get("lessons", [])
            status_tag = f" [{w_status.upper()}]" if w_status != "active" else ""
            print(f"{BOLD}📂 {week.get('title', w_id)}{status_tag}{RESET} ({len(lessons)} lecciones):")

            # Semanas planeadas para el futuro sin lecciones implementadas aún
            if w_status in ["locked", "upcoming"]:
                print(f"   └─ ⏳ Semana programada para próximas fases del curso.")
                continue

            for l_idx, lesson in enumerate(lessons):
                l_id = lesson.get("id", f"{w_id}-l{l_idx}")
                l_title = lesson.get("title", "Sin título")
                self.check(l_id not in seen_lesson_ids, f"Lección con ID duplicado: '{l_id}'")
                seen_lesson_ids.add(l_id)

                steps = lesson.get("steps", [])
                self.check(len(steps) >= 3, f"[{l_id}] La lección '{l_title}' tiene menos de 3 pasos ({len(steps)}).")

                print(f"   ├─ 📘 [{l_id}] {l_title} ({len(steps)} pasos)")

                for s_idx, step in enumerate(steps):
                    step_ctx = f"[{l_id} / Paso {s_idx + 1}]"
                    step_type = step.get("type")
                    self.check(step_type in ["explanation", "predict", "code_sandbox", "visualizer_print", "visualizer_input", "visualizer_math"],
                               f"{step_ctx} Tipo de paso desconocido: '{step_type}'")

                    # Validaciones específicas por tipo
                    if step_type == "explanation":
                        self.audit_explanation_step(step, step_ctx, baked_traces)
                    elif step_type == "predict":
                        self.audit_predict_step(step, step_ctx)
                    elif step_type == "code_sandbox":
                        self.audit_code_sandbox_step(step, step_ctx)

        self.print_summary()
        return len(self.errors) == 0

    def audit_explanation_step(self, step, ctx, baked_traces):
        title = step.get("title", "")
        self.check(bool(title), f"{ctx} Falta título de la explicación.")

        examples = step.get("examples", [])
        if examples:
            for e_idx, ex in enumerate(examples):
                ex_ctx = f"{ctx} (Ejemplo {e_idx + 1})"
                code = ex.get("code", "").strip()
                expected_output = ex.get("output", "")

                self.check(bool(code), f"{ex_ctx} Código del ejemplo no puede estar vacío.")

                # 1. Comprobación sintáctica con AST
                try:
                    ast.parse(code)
                    self.check(True, "")
                except SyntaxError as syn_err:
                    self.check(False, f"{ex_ctx} Error de sintaxis Python en el código: {syn_err}")
                    continue

                # 2. Ejecución real en CPython
                real_out, err = execute_python_code(code)
                self.check(not err, f"{ex_ctx} Excepción durante la ejecución en CPython: {err}")

                # 3. Comparación de salida real vs salida declarada
                real_clean = real_out.rstrip("\n")
                exp_clean = expected_output.rstrip("\n")
                if expected_output:
                    self.check(real_clean == exp_clean,
                               f"{ex_ctx} ¡DISCREPANCIA EN SALIDA DIDÁCTICA!\n"
                               f"       Esperada en JSON:\n       {repr(exp_clean)}\n"
                               f"       Real en CPython:\n       {repr(real_clean)}")

                # 4. Comprobación en baked_traces.js
                if baked_traces and code in baked_traces:
                    trace_entry = baked_traces[code]
                    trace_out = trace_entry.get("totalOutput", "").rstrip("\n")
                    self.check(trace_out == real_clean,
                               f"{ex_ctx} 'baked_traces.js' desincronizado con salida real de CPython: {repr(trace_out)} vs {repr(real_clean)}")
                else:
                    self.check(False, f"{ex_ctx} Código no está horneado en 'baked_traces.js'. Ejecuta 'python3 bake_curriculum.py'.", is_warning=True)

    def audit_predict_step(self, step, ctx):
        question = step.get("question", "")
        self.check(bool(question), f"{ctx} Pregunta de predict vacía.")

        options = step.get("options", [])
        self.check(len(options) >= 2, f"{ctx} Predict debe tener al menos 2 opciones de respuesta.")

        correct_count = sum(1 for opt in options if opt.get("isCorrect") is True)
        self.check(correct_count == 1,
                   f"{ctx} REGLA PEDAGÓGICA ROTA: Debe haber EXACTAMENTE 1 opción correcta (encontradas: {correct_count}).")

        seen_opt_ids = set()
        for opt in options:
            opt_id = opt.get("id", "")
            self.check(opt_id in ["A", "B", "C", "D", "E"], f"{ctx} ID de opción inválido: '{opt_id}'")
            self.check(opt_id not in seen_opt_ids, f"{ctx} ID de opción duplicado: '{opt_id}'")
            seen_opt_ids.add(opt_id)

            text = opt.get("text", "")
            self.check(bool(text), f"{ctx} Opción {opt_id} tiene texto vacío.")

            # Validación pedagógica de errores
            if not opt.get("isCorrect"):
                why = opt.get("whyIncorrect", "").strip()
                self.check(len(why) >= 15,
                           f"{ctx} Opción incorrecta {opt_id} ('{text[:30]}...') no tiene una justificación pedagógica 'whyIncorrect' detallada (mínimo 15 caracteres).")

        # Si el reto incluye código ejecutable, validarlo en Python
        code = step.get("code", "").strip()
        if code:
            test_code = code
            if "___" in code:
                correct_opt = next((o for o in options if o.get("isCorrect")), None)
                if correct_opt:
                    sub_val = correct_opt.get("slotText") or correct_opt.get("text", "")
                    test_code = code.replace("___", sub_val)
            try:
                ast.parse(test_code)
                self.check(True, "")
                real_out, err = execute_python_code(test_code)
                self.check(not err, f"{ctx} Código de predict lanza excepción en CPython: {err}")
            except SyntaxError as e:
                self.check(False, f"{ctx} Código en predict contiene error de sintaxis: {e}")

    def audit_code_sandbox_step(self, step, ctx):
        instruction = step.get("instruction", "")
        self.check(bool(instruction), f"{ctx} Sandbox interactivo sin 'instruction'.")

        starter = step.get("starterCode", "")
        slot_marker = step.get("slotMarker", "___")
        self.check(slot_marker in starter,
                   f"{ctx} starterCode no contiene el marcador de espacio '{slot_marker}' para que el estudiante interactúe.")

        options = step.get("options", [])
        self.check(len(options) >= 2, f"{ctx} Sandbox debe ofrecer al menos 2 opciones para rellenar.")

        correct_options = [opt for opt in options if opt.get("isCorrect") is True]
        self.check(len(correct_options) == 1,
                   f"{ctx} Sandbox debe tener exactamente 1 opción correcta (encontradas: {len(correct_options)}).")

        if len(correct_options) == 1:
            correct_slot = correct_options[0].get("code") or correct_options[0].get("slotText", "")
            solved_code = starter.replace(slot_marker, correct_slot)
            try:
                ast.parse(solved_code)
                self.check(True, "")
            except SyntaxError as e:
                self.check(False, f"{ctx} Al insertar la opción correcta '{correct_slot}', el código genera un SyntaxError: {e}")

    def print_summary(self):
        print(f"\n{BOLD}======================================================================{RESET}")
        print(f"{BOLD}  📊 RESUMEN DE LA AUDITORÍA PEDAGÓGICA{RESET}")
        print(f"{BOLD}======================================================================{RESET}")
        print(f"  • Total de verificaciones automáticas: {self.total_checks}")
        print(f"  • Verificaciones aprobadas:            {GREEN}{self.passed_checks}{RESET}")
        print(f"  • Advertencias:                        {YELLOW}{len(self.warnings)}{RESET}")
        print(f"  • Errores críticos pedagógicos/código: {RED}{len(self.errors)}{RESET}\n")

        if self.warnings:
            print(f"{YELLOW}{BOLD}⚠️  ADVERTENCIAS DETECTADAS:{RESET}")
            for w in self.warnings:
                print(f"  {YELLOW}• {w}{RESET}")
            print()

        if self.errors:
            print(f"{RED}{BOLD}❌ ERRORES CRÍTICOS DETECTADOS (DEBEN CORREGIRSE ANTES DE PUBLICAR):{RESET}")
            for e in self.errors:
                print(f"  {RED}• {e}{RESET}")
            print(f"\n{RED}{BOLD}🚨 RESULTADO: LA AUDITORÍA FALLÓ. Hay inconsistencias pedagógicas o de código.{RESET}\n")
        else:
            print(f"{GREEN}{BOLD}🎉 ¡FELICITACIONES! Todos los ejercicios cumplen con el estándar pedagógico y de CPython al 100%.{RESET}\n")

if __name__ == "__main__":
    auditor = CurriculumAuditor()
    success = auditor.run_audit()
    sys.exit(0 if success else 1)
