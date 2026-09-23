#!/usr/bin/env bash
# ==============================================================================
# Script para empaquetar la sesión activa de pyMinas en Antigravity
# Conversación ID: a432e1da-a067-4f16-904a-ba941e814b4e
# ==============================================================================

set -e

CONV_ID="a432e1da-a067-4f16-904a-ba941e814b4e"
AGY_DIR="$HOME/.gemini/antigravity-cli"
OUTPUT_TAR="$HOME/antigravity_setup/sesion_pyminas.tar.gz"

echo "=========================================="
echo "  Empaquetando sesión de Antigravity      "
echo "  ID: $CONV_ID"
echo "=========================================="

if [ ! -d "$AGY_DIR" ]; then
    echo "❌ Error: No se encontró el directorio de Antigravity en $AGY_DIR"
    exit 1
fi

echo "📦 Comprimiendo base de datos de conversación y artefactos..."
cd "$AGY_DIR"

tar -czvf "$OUTPUT_TAR" \
    conversations/${CONV_ID}* \
    brain/${CONV_ID}

echo ""
echo "✅ ¡Sesión empaquetada con éxito!"
echo "📁 Archivo generado: $OUTPUT_TAR"
echo "Tamaño: $(du -sh "$OUTPUT_TAR" | cut -f1)"
echo ""
echo "Copia este archivo ('sesion_pyminas.tar.gz') al nuevo PC y ejecuta 'bash restaurar_sesion.sh'."
