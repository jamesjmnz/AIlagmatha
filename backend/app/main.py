from fastapi import FastAPI
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables from .env file in backend root
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="AI Scam Detector API")