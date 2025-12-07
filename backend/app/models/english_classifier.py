from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

EN_MODEL_NAME = "cybersectony/phishing-email-detection-distilbert_v2.1"


device = "cuda" if torch.cuda.is_available() else "cpu"

tokenizer_en = AutoTokenizer.from_pretrained(EN_MODEL_NAME)
model_en = AutoModelForSequenceClassification.from_pretrained(EN_MODEL_NAME).to(device)
model_en.eval()

@torch.inference_mode()
def classify_english(text: str):
    enc = tokenizer_en(text, return_tensors="pt", truncation=True, padding=True, max_lenjgth=256).to(device)

    logits = model_en(**enc).logits
    probs = torch.softmax(logits, dim=-1)[0]

    spam_prob = float(probs[1].cpu())

    return {
        "label": "scam" if spam_prob >= 0.5 else "legit",
        "scam_prob": spam_prob,
        "lang_used": "en"
    }