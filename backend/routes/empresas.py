
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from backend.core.database import get_db
from backend.core.security import verify_token
from backend.core.crypto import encrypt, decrypt
from backend.models.empresa import Empresa

router = APIRouter()

class EmpresaCreate(BaseModel):
    nome: str
    ativo: bool = True
    sankhya_endpoint: str | None = None
    sankhya_app_key: str | None = None
    sankhya_username: str | None = None
    sankhya_password: str | None = None

@router.get("")
def list_empresas(db: Session = Depends(get_db), _auth = Depends(verify_token)):
    empresas = db.query(Empresa).all()
    return [
        {
            **empresa.__dict__,
            "ativo": bool(empresa.ativo),
            "sankhya_password": "********" if empresa.sankhya_password_encrypted else None,
            "sankhya_password_encrypted": None
        }
        for empresa in empresas
    ]

@router.post("")
def create_empresa(data: EmpresaCreate, db: Session = Depends(get_db), _auth = Depends(verify_token)):
    empresa = Empresa(
        nome=data.nome,
        ativo=1 if data.ativo else 0,
        sankhya_endpoint=data.sankhya_endpoint,
        sankhya_app_key=data.sankhya_app_key,
        sankhya_username=data.sankhya_username,
        sankhya_password_encrypted=encrypt(data.sankhya_password) if data.sankhya_password else None
    )
    db.add(empresa)
    db.commit()
    db.refresh(empresa)
    return {"id": empresa.id, "nome": empresa.nome}

@router.get("/{empresa_id}")
def get_empresa(empresa_id: str, db: Session = Depends(get_db), _auth = Depends(verify_token)):
    empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    return empresa

@router.patch("/{empresa_id}")
def update_empresa(empresa_id: str, data: EmpresaCreate, db: Session = Depends(get_db), _auth = Depends(verify_token)):
    empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    
    for key, value in data.dict(exclude_unset=True).items():
        if key == "sankhya_password" and value and value != "********":
            empresa.sankhya_password_encrypted = encrypt(value)
        elif key != "sankhya_password":
            setattr(empresa, key, value)
    
    db.commit()
    return {"message": "Empresa atualizada"}

@router.delete("/{empresa_id}")
def delete_empresa(empresa_id: str, db: Session = Depends(get_db), _auth = Depends(verify_token)):
    empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")
    db.delete(empresa)
    db.commit()
    return {"message": "Empresa deletada"}
