"""La auditoría detecta soluciones y salidas incorrectas en ranuras independientes."""
import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from verify_curriculum import CurriculumAuditor, load_curriculum


class GuidedSlotAuditTests(unittest.TestCase):
    def setUp(self):
        week = next(w for w in load_curriculum()['weeks'] if w['id'] == 'semana-4')
        self.step = copy.deepcopy(week['lessons'][0]['steps'][5])

    def audit(self):
        auditor = CurriculumAuditor()
        auditor.audit_code_sandbox_step(self.step, 'prueba')
        return auditor.errors

    def test_accepts_independent_slots_and_exact_stdout(self):
        self.assertEqual(self.audit(), [])

    def test_rejects_stdout_missing_final_newline(self):
        self.step['expectedOutput'] = self.step['expectedOutput'].rstrip('\n')
        self.assertTrue(any('salida' in e for e in self.audit()))

    def test_rejects_solution_that_disagrees_with_marked_option(self):
        self.step['solution'][0] = '1'
        self.assertTrue(any('solución y opción' in e for e in self.audit()))

    def test_rejects_missing_slot_feedback(self):
        wrong = next(o for o in self.step['slots'][0]['options'] if not o['isCorrect'])
        wrong.pop('whyIncorrect')
        self.assertTrue(any('feedback' in e for e in self.audit()))


if __name__ == '__main__':
    unittest.main()
