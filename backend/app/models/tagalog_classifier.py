from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

TAGALOG_MODEL = "jcblaise/roberta-tagalog-base"

device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer_tl = AutoTokenizer.from_pretrained(TAGALOG_MODEL)
model_tl = AutoModelForSequenceClassification.from_pretrained(TAGALOG_MODEL).to(device)
model_tl.eval()

@torch.inference_mode()
def classify_tagalog(text: str):
    enc = tokenizer_tl(text, return_tensors="pt", truncation=True, padding=True, max_length=256).to(device)

    logits = model_tl(**enc).logits
    probs = torch.softmax(logits, dim=-1)[0]

    scam_prob = float(probs[1].cpu())

    return {
        "label": "scam" if scam_prob >= 0.5 else "legit",
        "scam_prob": scam_prob,
        "lang_used": "tl"
    }