from pydantic import BaseModel

class ScamRequest(BaseModel):
    message: str

class InsightRequest(BaseModel):
    question: str
    message: str