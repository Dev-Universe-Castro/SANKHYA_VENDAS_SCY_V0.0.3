
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.core.database import get_db
from backend.core.security import verify_token
from backend.models.configuracao import Configuracao

router = APIRouter()

class ConfigUpdate(BaseModel):
    chave: str
    valor: str

@router.get("")
def get_configs(db: Session = Depends(get_db), _auth = Depends(verify_token)):
    configs = db.query(Configuracao).all()
    return {c.chave: c.valor for c in configs}

@router.post("")
def set_config(data: ConfigUpdate, db: Session = Depends(get_db), _auth = Depends(verify_token)):
    config = db.query(Configuracao).filter(Configuracao.chave == data.chave).first()
    if config:
        config.valor = data.valor
    else:
        config = Configuracao(chave=data.chave, valor=data.valor)
        db.add(config)
    db.commit()
    return {"message": "Configuração salva"}
