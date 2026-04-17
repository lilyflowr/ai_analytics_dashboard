import os
import pandas as pd


def load_data():
    csv_path = os.path.join(os.path.dirname(__file__), "sales_data.csv")
    df = pd.read_csv(csv_path)
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df = df.dropna(subset=["revenue", "profit"])
    return df
