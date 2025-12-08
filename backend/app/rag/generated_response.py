from openai import OpenAI
import os
import json

MODEL_NAME = "gpt-4o-mini"
_client = None

def get_client():
    """Lazy initialization of OpenAI client"""
    global _client
    if _client is None:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        _client = OpenAI(api_key=api_key)
    return _client

def generate_explanation(is_scam: bool, user_message: str, rag_evidence: str) -> str:

    if is_scam:
        prompt = f"""
        User message: {user_message}

        Similar Scam Patterns: {rag_evidence}

        Explain briefly (1–2 sentences) why this message is suspicious 
        and likely a scam. Focus on scam tactics (e.g. OTP, urgency, reward).

        BE STIRCT AND POINT OUT ON THE SPECIFIC USER MESSAGE. DO NOT HALLUCINATE. 
        """
    else:
        prompt = f"""
        User message:
        {user_message}

        Explain briefly (1–2 sentences) why this message appears safe 
        and not a scam. Avoid giving warnings. Focus on legit signals 
        (e.g. no sensitive requests, no threats, no rewards).
        """

    try:
        client = get_client()
        res = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2
        )
        return res.choices[0].message.content.strip()
    except ValueError:
        return "Explanation unavailable: OpenAI API key not configured."
    except Exception as e:
        return f"No Explanation Available: {str(e)}"
    



def generate_insights(final_label: str, user_message: str) -> list[dict]:
    """Generate 3 short insightful follow-up questions with answers after scam verdict."""

    if final_label.lower() != "scam":
        return []

    

    prompt = f"""
    The following message was identified as a scam:

    Message: "{user_message}"
   


    Create exactly 3 short, clear, and helpful follow-up questions with answers.
    They should be relevant, educational, and based on the message content.
    Review the text to identify what type of scam. Make your own scam theme for the 3 questions.

    Requirements:
    - RETURN JSON ARRAY ONLY → e.g.: [{{"question": "Question 1 here", "answer": "Answer 1 here"}}, {{"question": "Question 2 here", "answer": "Answer 2 here"}}, {{"question": "Question 3 here", "answer": "Answer 3 here"}}]
    - WITH MEDIUM LENGTH ANSWERS (2-4 sentences per answer).
    - Each question 6–12 words
    - Avoid duplicating meaning
    - English, keep it friendly-tech
    - Return ONLY valid JSON, no markdown, no code blocks, no explanations
    """

    try:
        client = get_client()
        res = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[{"role": "user", "content": prompt}],
            temperature = 0.4
        )

        raw_content = res.choices[0].message.content.strip()
        
        # Remove markdown code blocks if present
        if raw_content.startswith("```"):
            raw_content = raw_content.split("```")[1]
            if raw_content.startswith("json"):
                raw_content = raw_content[4:]
        
        # Try to parse as JSON object first (in case it's wrapped)
        try:
            parsed = json.loads(raw_content)
            if isinstance(parsed, dict) and "questions" in parsed:
                questions = parsed["questions"]
            elif isinstance(parsed, list):
                questions = parsed
            else:
                questions = []
        except:
            # If parsing as object fails, try as array directly
            questions = json.loads(raw_content)

        # Validate structure
        if isinstance(questions, list) and all(
            isinstance(q, dict) and "question" in q and "answer" in q 
            for q in questions
        ):
            return questions

        return []

    except Exception as e:
        print(f"Error generating insights: {str(e)}")
        return []