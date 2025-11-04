
#!/bin/bash
celery -A backend.worker.celery_app worker --loglevel=info
