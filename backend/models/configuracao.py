from sqlalchemy import Column, String, CLOB, DateTime
from sqlalchemy.sql import func
from backend.core.database import Base
import uuid

class Configuracao(Base):
    __tablename__ = "CONFIGURACOES"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    chave = Column(String(255), nullable=False, unique=True)
    valor = Column(CLOB, nullable=False)
    updated_at = Column(DateTime, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), nullable=False)