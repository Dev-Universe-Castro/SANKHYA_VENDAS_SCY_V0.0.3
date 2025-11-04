#!/bin/bash

echo "🧹 Limpando processos anteriores..."
pkill -f "tsx server/index.ts" 2>/dev/null
sleep 2

echo "🚀 Iniciando sistema completo..."
echo ""
echo "📍 URL: http://0.0.0.0:5000"
echo "🔑 Login: admin@sistema.com / admin123"
echo ""

# Iniciar apenas o frontend/backend Node.js
npm run dev