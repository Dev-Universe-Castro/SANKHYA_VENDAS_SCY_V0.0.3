
#!/bin/bash

echo "🔧 Instalando dependências..."

# Instalar dependências do Node.js
echo "📦 Instalando pacotes Node.js..."
npm install

# Instalar dependências do Python
echo "🐍 Instalando pacotes Python..."
pip install -r requirements.txt

# Iniciar Redis em background
echo "🔴 Iniciando Redis..."
redis-server --daemonize yes

# Aguardar Redis iniciar
sleep 2

echo "✅ Dependências instaladas!"
echo "🚀 Iniciando sistema completo..."
echo ""
echo "Frontend: http://0.0.0.0:5000"
echo "Backend API: http://0.0.0.0:8000"
echo "Credenciais: admin@sistema.com / admin123"
echo ""

# Iniciar todos os serviços em paralelo
npm run dev &
python backend/seed.py && uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload &
celery -A backend.worker.celery_app worker --loglevel=info &

# Aguardar todos os processos
wait
