#!/bin/bash
# deploy.sh - script sencillo para subir a GitHub (Git debe estar configurado)
set -e
BRANCH=${1:-main}
echo "🚀 Iniciando deploy a GitHub (branch: $BRANCH)..."
git add .
git commit -m "✨ Deploy: actualización del sitio (Aguapanela)" || echo "No hay cambios para commitear"
git push origin $BRANCH
echo "✅ Push realizado. Si tu repo es <usuario>.github.io, el sitio estará disponible en unos minutos."
