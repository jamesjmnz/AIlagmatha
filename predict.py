from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_PATH = "./model"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)

def predict(text):
    enc = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    logits = model(**enc).logits
    probs = torch.softmax(logits, dim=-1)[0]
    scam_prob = float(probs[1])
    label = "scam" if scam_prob >= 0.5 else "legit"
    return label, scam_prob

while True:
    msg = input("\nSMS (or q to quit): ")
    if msg.lower() == "q":
        break
    label, prob = predict(msg)
    print(f"> {label} ({prob:.2f})")
