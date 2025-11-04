
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.core.database import engine, Base
from backend.routes import auth, empresas, usuarios, configuracoes, logs, sincronizar

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Tabelas já devem existir no Oracle
    # Execute os scripts SQL manualmente antes de iniciar o backend
    yield

app = FastAPI(
    title="Central de Gerenciamento Sankhya-Oracle",
    description="Sistema de sincronização bidirecional ERP Sankhya e Oracle",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://0.0.0.0:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rotas
app.include_router(auth.router, prefix="/api/auth", tags=["Autenticação"])
app.include_router(empresas.router, prefix="/api/empresas", tags=["Empresas"])
app.include_router(usuarios.router, prefix="/api/usuarios", tags=["Usuários"])
app.include_router(configuracoes.router, prefix="/api/configuracoes", tags=["Configurações"])
app.include_router(logs.router, prefix="/api/logs", tags=["Logs"])
app.include_router(sincronizar.router, prefix="/api/sincronizar", tags=["Sincronização"])

@app.get("/")
def read_root():
    return {"message": "Central de Gerenciamento Sankhya-Oracle API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
