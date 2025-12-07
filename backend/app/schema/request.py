from pydantic import BaseModel

class ScamRequest(BaseModel):
    message: str
    