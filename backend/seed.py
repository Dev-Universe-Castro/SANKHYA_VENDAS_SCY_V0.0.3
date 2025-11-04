from backend.core.database import SessionLocal, engine, Base
from backend.core.security import hash_password
from backend.models.usuario import Usuario
import uuid
from backend.models.empresa import Empresa
from backend.models.configuracao import Configuracao
from backend.core.crypto import encrypt

def seed_database():
    print("🌱 Iniciando seed do banco de dados...")

    # Criar tabelas
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # Criar usuário admin
        admin = db.query(Usuario).filter(Usuario.email == "admin@sistema.com").first()
        if not admin:
            admin = Usuario(
                id=str(uuid.uuid4()),
                email="admin@sistema.com",
                password=hash_password("admin123"),
                nome="Administrador",
                perfil="ADM"
            )
            db.add(admin)
            db.commit()
            print("✅ Usuário admin criado com sucesso!")
            print("   Email: admin@sistema.com")
            print("   Senha: admin123")
        else:
            print("ℹ️  Usuário admin já existe")

        # Criar empresas de exemplo (Omitido conforme snippet editado)
        # Criar configurações padrão (Omitido conforme snippet editado)

        print("✅ Seed concluído com sucesso!")

    except Exception as e:
        print(f"❌ Erro no seed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()