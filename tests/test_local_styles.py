"""Evita que la interfaz vuelva a depender del CDN de Tailwind."""

import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class LocalStylesTests(unittest.TestCase):
    def test_tailwind_is_served_from_the_project(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        runtime = ROOT / "assets" / "vendor" / "tailwind.min.js"

        self.assertIn('src="assets/vendor/tailwind.min.js?v=', html)
        self.assertNotIn('src="https://cdn.tailwindcss.com"', html)
        self.assertTrue(runtime.is_file())
        self.assertGreater(runtime.stat().st_size, 100_000)

    def test_hidden_panels_have_a_local_fallback(self):
        css = (ROOT / "styles.css").read_text(encoding="utf-8")
        self.assertIn(".hidden {\n  display: none;\n}", css)


if __name__ == "__main__":
    unittest.main()
