
from sqlalchemy import Column, String, Integer, DateTime, CLOB
from sqlalchemy.sql import func
from backend.core.database import Base
import uuid

class Empresa(Base):
    __tablename__ = "EMPRESAS"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    nome = Column(String(255), nullable=False)
    ativo = Column(Integer, default=1, nullable=False)
    ultima_sync = Column(DateTime, nullable=True)
    
    # Credenciais Sankhya
    sankhya_endpoint = Column(String(500), nullable=True)
    sankhya_app_key = Column(String(255), nullable=True)
    sankhya_username = Column(String(100), nullable=True)
    sankhya_password_encrypted = Column(CLOB, nullable=True)
    
    created_at = Column(DateTime, server_default=func.current_timestamp(), nullable=False)
