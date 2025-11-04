
from celery import shared_task
from backend.worker.celery_app import celery_app
from backend.core.database import SessionLocal
from backend.models.empresa import Empresa
from backend.models.sync_log import SyncLog
from backend.core.crypto import decrypt
import requests
from datetime import datetime

@celery_app.task
def sync_empresa(empresa_id: str):
    """Sincroniza dados de uma empresa específica"""
    db = SessionLocal()
    start_time = datetime.now()
    
    try:
        empresa = db.query(Empresa).filter(Empresa.id == empresa_id).first()
        if not empresa or not empresa.ativo:
            return {"status": "skipped", "reason": "Empresa inativa ou não encontrada"}
        
        # Executar SYNC_OUT (Oracle -> Sankhya)
        sync_out_result = sync_out(empresa_id, empresa, db)
        
        # Executar SYNC_IN (Sankhya -> Oracle)
        sync_in_result = sync_in(empresa_id, empresa, db)
        
        # Atualizar última sincronização
        empresa.ultima_sync = datetime.now()
        db.commit()
        
        duration = str(datetime.now() - start_time)
        
        # Registrar log de sucesso
        log = SyncLog(
            empresa_id=empresa_id,
            tipo="BIDIRECTIONAL",
            status="Sucesso",
            duracao=duration,
            detalhes=f"OUT: {sync_out_result}, IN: {sync_in_result}"
        )
        db.add(log)
        db.commit()
        
        return {"status": "success", "empresa_id": empresa_id}
        
    except Exception as e:
        duration = str(datetime.now() - start_time)
        log = SyncLog(
            empresa_id=empresa_id,
            tipo="BIDIRECTIONAL",
            status="Falha",
            duracao=duration,
            erro=str(e)
        )
        db.add(log)
        db.commit()
        return {"status": "error", "error": str(e)}
    finally:
        db.close()

def sync_out(empresa_id: str, empresa: Empresa, db):
    """Envia dados Oracle -> Sankhya"""
    # TODO: Implementar lógica de consulta Oracle e envio para Sankhya
    # 1. Consultar registros com STATUS_SYNC = PENDENTE_ENVIO ou FALHA_ENVIO
    # 2. Autenticar na API Sankhya
    # 3. Enviar dados
    # 4. Atualizar STATUS_SYNC e ID_SANKHYA
    return "Não implementado"

def sync_in(empresa_id: str, empresa: Empresa, db):
    """Recebe dados Sankhya -> Oracle"""
    # TODO: Implementar lógica de busca no Sankhya e atualização Oracle
    # 1. Autenticar na API Sankhya
    # 2. Buscar registros atualizados após ultima_sync
    # 3. Atualizar Oracle
    # 4. Marcar como SINCRONIZADO
    return "Não implementado"

@celery_app.task
def retry_failed():
    """Reprocessa registros com falha"""
    # TODO: Implementar lógica de retry
    pass

@celery_app.task
def rotate_token(empresa_id: str):
    """Renova token expirado do Sankhya"""
    # TODO: Implementar renovação de token
    pass
