from ..models.english_classifier import classify_english
from ..models.tagalog_classifier import classify_tagalog

TAGALOG_HINT_WORDS = [
    "ng", "sa", "ka", "ako", "mo", "po", "opo",
    "naman", "diba", "lang", "eh", "pa"
]

def is_tl(text: str):

    lowered = text.lower()

    return sum(w in lowered.split() for w in TAGALOG_HINT_WORDS) >= 2


def classify_message(text: str):
    return classify_tagalog(text) if is_tl(text) else classify_english(text)