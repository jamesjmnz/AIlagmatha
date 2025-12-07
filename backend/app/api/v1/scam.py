from fastapi import APIRouter
from app.schema.request import ScamRequest
from app.agents.graph import run_scam_agent
from app.schema.request import InsightRequest
from app.rag.generated_response import get_client, MODEL_NAME


router = APIRouter()

@router.post("/analyze")
def analyze(req: ScamRequest):
    result = run_scam_agent(req.message)
    return result

@router.post("/insight-answer")
def insight_answer(req: InsightRequest):

    prompt = f"""
    User Message: {req.message}
    Question: {req.question}

    Provide a clear, concise answer (1–3 sentences).
    Help the user understand the scam tactic and what to do.
    IF THE USER MESSAGE IS TAGALOG LANGUAGE, ANSWER IT IN TAGALOG, IF THE USER MESSAGE IS IN ENGLISH, ANSWER IT IN ENGLISH. No hallucination. No long paragraphs.
    """



    try:
        client = get_client()
        res = client.chat.completions.create(
            model = MODEL_NAME,
            messages = [{"role": "user", "content": prompt}],
            temperature = 0.3
        )

        answer = res.choices[0].message.content.strip()
        return {"answer": answer}

    except Exception as e:
        return {"answer": f"Error generating insight answer: {str(e)}"}
