# Scripts de mantenimiento

Ejecutar siempre desde la raíz del repositorio:

```bash
python3 scripts/ingest_notebook.py materiales/semana-XX/cuaderno.ipynb
python3 -B scripts/verify_curriculum.py
python3 scripts/bake_curriculum.py
```

- `ingest_notebook.py`: extrae y resume material de un notebook.
- `verify_curriculum.py`: valida estructura, sintaxis, salidas y trazas.
- `bake_curriculum.py`: regenera `baked_traces.js` con CPython.
