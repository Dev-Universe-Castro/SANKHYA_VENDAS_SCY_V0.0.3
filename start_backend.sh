
#!/bin/bash
cd backend
python seed.py
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
