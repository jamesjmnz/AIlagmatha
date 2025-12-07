from fastapi import APIRouter
from schema.request import ScamRequest


router = APIRouter()

@router.post("/analyze")
def analyze(req: ScamRequest):
    pass