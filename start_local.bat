
@echo off
echo 🔧 Instalando dependencias...

echo 📦 Instalando pacotes Node.js...
call npm install

echo 🐍 Instalando pacotes Python...
call pip install -r requirements.txt

echo 🔴 Iniciando Redis...
start /B redis-server

timeout /t 2

echo ✅ Dependencias instaladas!
echo 🚀 Iniciando sistema completo...
echo.
echo Frontend: http://localhost:5000
echo Backend API: http://localhost:8000
echo Credenciais: admin@sistema.com / admin123
echo.

start /B npm run dev
start /B cmd /c "python backend/seed.py && uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload"
start /B celery -A backend.worker.celery_app worker --loglevel=info

echo Sistema iniciado! Pressione Ctrl+C para parar.
pause
