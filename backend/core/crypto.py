
from cryptography.fernet import Fernet
import os
import base64

# Gerar ou usar chave de criptografia
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
if not ENCRYPTION_KEY:
    ENCRYPTION_KEY = Fernet.generate_key().decode()

cipher_suite = Fernet(ENCRYPTION_KEY.encode())

def encrypt(data: str) -> str:
    """Criptografa uma string"""
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt(encrypted_data: str) -> str:
    """Descriptografa uma string"""
    return cipher_suite.decrypt(encrypted_data.encode()).decode()
