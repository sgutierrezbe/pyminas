"""Regresiones del trazador de ciclos usado por los ejemplos de pyMinas."""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from bake_curriculum import trace_python_code


class LoopTraceTests(unittest.TestCase):
    def test_stalled_while_stops_after_eight_prints(self):
        code = 'segundos = 3\nwhile segundos > 0:\n    print("Contando:", segundos)\nprint("¡Tiempo!")'
        trace = trace_python_code(code)

        self.assertEqual(trace["errorType"], "TimeoutError")
        self.assertEqual(trace["errorLine"], 1)
        self.assertEqual(trace["totalOutput"].count("Contando: 3"), 8)
        self.assertNotIn("¡Tiempo!", trace["totalOutput"])
        self.assertEqual(trace["lineTrace"][-1]["line"], 1)

    def test_continue_stalls_at_same_value(self):
        code = 'i = 0\nwhile i < 4:\n    if i == 2:\n        continue\n    print(i)\n    i += 1'
        trace = trace_python_code(code)

        self.assertEqual(trace["errorType"], "TimeoutError")
        self.assertEqual(trace["errorLine"], 1)
        self.assertTrue(trace["totalOutput"].startswith("0\n1\n"))
        self.assertLess(len(trace["lineTrace"]), 60)

    def test_progressing_while_can_run_more_than_eight_times(self):
        code = 'i = 0\nwhile i < 12:\n    i += 1\nprint(i)'
        trace = trace_python_code(code)

        self.assertFalse(trace["hasError"])
        self.assertEqual(trace["totalOutput"], "12")


if __name__ == "__main__":
    unittest.main()
