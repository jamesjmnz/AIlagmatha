from fastapi import APIRouter
from app.schema.request import ScamRequest
from app.schema.response import ScamResponse
from app.models.english_classifier import classify_english
from app.models.tagalog_classifier import classify_tagalog
import re

router = APIRouter(prefix="/api/v1", tags=["scam"])

def detect_language(text: str) -> str:
    """Simple language detection based on common Tagalog words/patterns"""
    tagalog_patterns = [
        r'\b(ako|ikaw|siya|kami|kayo|sila|natin|ninyo|nila)\b',
        r'\b(ng|sa|ang|mga|na|pa|din|rin|lang|po|opo|salamat|maganda|kumusta)\b',
        r'\b(ka|mo|ko|niya|namin|ninyo|nila|natin)\b'
    ]
    
    text_lower = text.lower()
    tagalog_score = sum(1 for pattern in tagalog_patterns if re.search(pattern, text_lower, re.IGNORECASE))
    
    # If we find Tagalog patterns, use Tagalog classifier, otherwise English
    return "tl" if tagalog_score > 0 else "en"

@router.post("/analyze", response_model=ScamResponse)
def analyze(req: ScamRequest):
    """Analyze a message for scam detection"""
    lang = detect_language(req.message)
    
    if lang == "tl":
        result = classify_tagalog(req.message)
    else:
        result = classify_english(req.message)
    
    return ScamResponse(**result)