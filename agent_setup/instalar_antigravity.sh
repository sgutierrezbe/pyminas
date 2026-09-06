#!/usr/bin/env bash
# ==============================================================================
# Script de instalación desatendida de Google Antigravity CLI (agy)
# Compatible con Linux y macOS
# ==============================================================================

set -e

echo "=========================================="
echo "  Instalador de Antigravity CLI (agy)     "
echo "=========================================="

# 1. Comprobar curl
if ! command -v curl &> /dev/null; then
    echo "❌ Error: 'curl' no está instalado en este sistema. Instálalo primero."
    exit 1
fi

# 2. Descargar e instalar agy mediante el script oficial
echo "⬇️  Descargando e instalando Antigravity CLI desde https://antigravity.google/cli/install.sh..."
curl -fsSL https://antigravity.google/cli/install.sh | bash

# 3. Configurar PATH si no está presente
LOCAL_BIN="$HOME/.local/bin"
if [[ ":$PATH:" != *":$LOCAL_BIN:"* ]]; then
    echo "⚙️  Agregando $LOCAL_BIN a tu variable PATH..."
    SHELL_RC=""
    if [ -n "$BASH_VERSION" ]; then
        SHELL_RC="$HOME/.bashrc"
    elif [ -n "$ZSH_VERSION" ]; then
        SHELL_RC="$HOME/.zshrc"
    else
        SHELL_RC="$HOME/.profile"
    fi

    if [ -f "$SHELL_RC" ]; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$SHELL_RC"
        echo "✅ Se agregó al archivo $SHELL_RC."
    fi
    export PATH="$LOCAL_BIN:$PATH"
fi

# 4. Verificar instalación
if command -v agy &> /dev/null; then
    echo ""
    echo "🎉 ¡Antigravity CLI se instaló correctamente!"
    echo "Versión instalada: $(agy --version 2>/dev/null || echo 'OK')"
    echo ""
    echo "Para comenzar a usarlo, escribe en tu terminal:"
    echo "  agy"
else
    echo "⚠️  El binario se instaló en ~/.local/bin/agy pero requiere reiniciar la terminal para actualizar el PATH."
    echo "Puedes ejecutarlo directamente con: ~/.local/bin/agy"
fi
