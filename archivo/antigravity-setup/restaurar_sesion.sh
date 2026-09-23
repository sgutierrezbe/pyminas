#!/usr/bin/env bash
# ==============================================================================
# Script para restaurar la sesión de pyMinas en un nuevo PC con Antigravity
# ==============================================================================

set -e

CONV_ID="a432e1da-a067-4f16-904a-ba941e814b4e"
AGY_DIR="$HOME/.gemini/antigravity-cli"
TAR_FILE="sesion_pyminas.tar.gz"

echo "=========================================="
echo "  Restaurador de Sesión Antigravity      "
echo "=========================================="

if [ ! -f "$TAR_FILE" ] && [ -f "$HOME/antigravity_setup/$TAR_FILE" ]; then
    TAR_FILE="$HOME/antigravity_setup/$TAR_FILE"
fi

if [ ! -f "$TAR_FILE" ]; then
    echo "❌ Error: No se encontró el archivo '$TAR_FILE'."
    echo "Asegúrate de colocar 'sesion_pyminas.tar.gz' en este mismo directorio."
    exit 1
fi

echo "📁 Creando directorios de destino en $AGY_DIR..."
mkdir -p "$AGY_DIR/conversations" "$AGY_DIR/brain"

echo "📦 Extrayendo sesión..."
tar -xzvf "$TAR_FILE" -C "$AGY_DIR/"

echo ""
echo "✅ ¡Sesión restaurada correctamente!"
echo "Para reanudar esta conversación, ejecuta:"
echo "  agy --conversation $CONV_ID"
