
#!/bin/bash

echo "🧹 Limpando processos anteriores..."
pkill -f "tsx" 2>/dev/null

echo "🚀 Iniciando sistema completo..."
echo ""
echo "📍 URL: http://0.0.0.0:5000"
echo "🔑 Login: admin@sistema.com / admin123"
echo ""

# Instalar dependências se necessário
npm install

# Executar seed do banco
npm run db:push
tsx server/seed.ts

# Iniciar o servidor Node.js (frontend + backend)
npm run dev
