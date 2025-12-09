import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("scam_dataset.csv", encoding="utf-8")

train_df, test_df = train_test_split(df, test_size = 0.2, random_state=42, stratify=df["label"])


train_df.to_csv("scam_dataset_train.csv", index=False, encoding="utf-8")
test_df.to_csv("scam_dataset_test.csv", index=False, encoding="utf-8")

print("Train Shape", train_df.shape)
print("Test Shape", test_df.shape)
print("Train Label Counts: ")
print(train_df["label"].value_counts())
print("Test Label Counts: ")
print(test_df["label"].value_counts())