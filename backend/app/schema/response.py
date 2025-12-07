from pydantic import BaseModel

class ScamResponse(BaseModel):
    label: str
    scam_prob: float
    lang_used: str
