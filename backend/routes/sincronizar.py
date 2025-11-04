
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from backend.core.security import verify_token
from backend.worker.tasks import sync_empresa

router = APIRouter()

class SyncRequest(BaseModel):
    empresa_id: str | None = None

@router.post("")
def trigger_sync(data: SyncRequest, _auth = Depends(verify_token)):
    if data.empresa_id:
        # Disparar sincronização para empresa específica
        sync_empresa.delay(data.empresa_id)
        return {"message": f"Sincronização iniciada para empresa {data.empresa_id}"}
    else:
        # Disparar sincronização global
        return {"message": "Sincronização global iniciada"}
