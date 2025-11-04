
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.core.database import get_db
from backend.core.security import verify_token
from backend.models.sync_log import SyncLog

router = APIRouter()

@router.get("")
def get_logs(
    empresa_id: str | None = Query(None),
    tipo: str | None = Query(None),
    status: str | None = Query(None),
    db: Session = Depends(get_db),
    _auth = Depends(verify_token)
):
    query = db.query(SyncLog)
    if empresa_id:
        query = query.filter(SyncLog.empresa_id == empresa_id)
    if tipo:
        query = query.filter(SyncLog.tipo == tipo)
    if status:
        query = query.filter(SyncLog.status == status)
    
    logs = query.order_by(SyncLog.timestamp.desc()).all()
    return logs
