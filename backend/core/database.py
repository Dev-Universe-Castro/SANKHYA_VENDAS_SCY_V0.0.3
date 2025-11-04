
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Oracle connection string
ORACLE_HOST = os.getenv("ORACLE_HOST", "crescimentoerp.nuvemdatacom.com.br")
ORACLE_PORT = os.getenv("ORACLE_PORT", "9568")
ORACLE_SERVICE = os.getenv("ORACLE_SERVICE", "FREEPDB1")
ORACLE_USER = os.getenv("ORACLE_USER", "SYSTEM")
ORACLE_PASSWORD = os.getenv("ORACLE_PASSWORD", "Castro135!")

DATABASE_URL = f"oracle+cx_oracle://{ORACLE_USER}:{ORACLE_PASSWORD}@{ORACLE_HOST}:{ORACLE_PORT}/?service_name={ORACLE_SERVICE}"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
