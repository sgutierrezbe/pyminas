# Tailwind local

`tailwind.min.js` es una copia local del runtime de Tailwind usado por pyMinas.
El archivo se sirve desde el mismo origen que la aplicación para evitar que un
bloqueo de `cdn.tailwindcss.com` deje toda la interfaz sin estilos.

El runtime genera utilidades CSS en el navegador; no es una compilación estática.
No reemplazar este archivo sin probar la aplicación y
`tests/test_runner.html` con el CDN bloqueado.
