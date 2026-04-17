import os
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline

from data_loader import load_data


NUMERIC_FEATURES = ["month", "quarter", "units_sold", "unit_price", "discount_pct"]
CATEGORICAL_FEATURES = ["region", "category"]


def _build_pipeline():
    numeric_transformer = Pipeline(
        steps=[("scaler", StandardScaler())]
    )
    categorical_transformer = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, NUMERIC_FEATURES),
            ("cat", categorical_transformer, CATEGORICAL_FEATURES),
        ]
    )
    return preprocessor


def _prepare_training_data(df: pd.DataFrame):
    X = df[NUMERIC_FEATURES + CATEGORICAL_FEATURES].copy()
    return X


raw_data = load_data()
training_features = _prepare_training_data(raw_data)

revenue_pipeline = Pipeline(
    steps=[("preprocessor", _build_pipeline()), ("model", RandomForestRegressor(n_estimators=100, random_state=42))]
)
profit_pipeline = Pipeline(
    steps=[("preprocessor", _build_pipeline()), ("model", RandomForestRegressor(n_estimators=100, random_state=42))]
)

revenue_pipeline.fit(training_features, raw_data["revenue"])
profit_pipeline.fit(training_features, raw_data["profit"])

confidence_score = round(r2_score(raw_data["revenue"], revenue_pipeline.predict(training_features)), 4)


def predict(input_dict):
    model_input = pd.DataFrame([{
        "month": int(input_dict["month"]),
        "quarter": int(input_dict["quarter"]),
        "units_sold": float(input_dict["units_sold"]),
        "unit_price": float(input_dict["unit_price"]),
        "discount_pct": float(input_dict["discount_pct"]),
        "region": input_dict["region"],
        "category": input_dict["category"],
    }])

    predicted_revenue = float(revenue_pipeline.predict(model_input)[0])
    predicted_profit = float(profit_pipeline.predict(model_input)[0])
    return {
        "predicted_revenue": round(predicted_revenue, 2),
        "predicted_profit": round(predicted_profit, 2),
        "confidence_score": confidence_score,
    }
