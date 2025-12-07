from fastapi import APIRouter
from app.schema.request import ScamRequest
from app.agents.graph import run_scam_agent


router = APIRouter()

@router.post("/analyze")
def analyze(req: ScamRequest):
    result = run_scam_agent(req.message)
    return result