
import re

PATTERNS = [
    r"otp", r"one[- ]time password",
    r"gcash", r"reward", r"prize", r"congratulations",
    r"click", r"link", r"within 24", r"claim"
]

def rule_check(text: str):
    matches = [p for p in PATTERNS if re.search(p, text.lower())]
    score = 0.3 if matches else 0.0
    return {"matches": matches, "rule_score": score}