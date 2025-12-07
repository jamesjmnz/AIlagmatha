from fastapi import FastAPI
from dotenv import load_dotenv
from pathlib import Path
from app.api.v1.scam import router as scam_router

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="AI Scam Detector API")

app.include_router(scam_router, prefix="/api/v1")