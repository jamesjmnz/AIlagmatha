import pandas as pd


df = pd.read_csv("ph_scam_detector_dataset_v1_batch1.csv", encoding="utf-8")
print(df.head())
print(df.shape)
print(df['label'].value_counts())