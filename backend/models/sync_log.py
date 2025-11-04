from sqlalchemy import Column, String, DateTime, CLOB
from sqlalchemy.sql import func
from backend.core.database import Base
import uuid

class SyncLog(Base):
    __tablename__ = "SYNC_LOGS"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    empresa_id = Column(String(36), nullable=False)
    tipo = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False)
    duracao = Column(String(50), nullable=True)
    detalhes = Column(CLOB, nullable=True)
    erro = Column(CLOB, nullable=True)
    timestamp = Column(DateTime, server_default=func.current_timestamp(), nullable=False)