from sqlalchemy import Column, String
from backend.core.database import Base
import uuid

class Usuario(Base):
    __tablename__ = "USERS"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    nome = Column(String(255), nullable=False)
    perfil = Column(String(20), default="ADM", nullable=False)