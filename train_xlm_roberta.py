from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score


MODEL_NAME = "xlm-roberta-base"

data_files = {
    "train": "scam_dataset_train.csv",
    "test": "scam_dataset_test.csv"
}

dataset = load_dataset("csv", data_files = data_files)



tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize(batch):
    return tokenizer(batch["text"], truncation=True, padding=True)

dataset = dataset.map(tokenize, batched=True)

model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = np.argmax(logits, axis=-1)

    return {
        "accuracy": accuracy_score(labels, preds),
        "precision": precision_score(labels, preds),
        "recall": recall_score(labels, preds),
        "f1": f1_score(labels, preds),
    }

training_args = TrainingArguments(
    output_dir="./model",
    eval_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    num_train_epochs=5,
    weight_decay=0.01,
    save_strategy="epoch",
    logging_steps=20,
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    compute_metrics = compute_metrics
)

trainer.train()

print("📊 Final evaluation:")
print(trainer.evaluate())


trainer.save_model("./model")
tokenizer.save_pretrained("./model")

print("✔ Model saved in ./model")