import os
from flask import Flask, jsonify, request
from flask_cors import CORS

from data_loader import load_data
from model import predict as model_predict


app = Flask(__name__)
CORS(app)

PORT = int(os.getenv("PORT", 5000))


@app.route("/data", methods=["GET"])
def get_data():
    try:
        df = load_data()
        payload = df.to_dict(orient="records")
        return jsonify(payload)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/summary", methods=["GET"])
def get_summary():
    try:
        df = load_data()
        total_revenue = float(df["revenue"].sum())
        total_profit = float(df["profit"].sum())
        total_orders = int(df["order_id"].nunique())
        avg_order_value = float(df["revenue"].mean())
        avg_profit_margin = float(df["profit_margin"].mean())
        avg_customer_rating = float(df["customer_rating"].mean())

        revenue_by_month = [
            {"month": int(month), "revenue": float(value)}
            for month, value in sorted(df.groupby("month")["revenue"].sum().items())
        ]

        revenue_by_category = [
            {"category": category, "revenue": float(value)}
            for category, value in df.groupby("category")["revenue"].sum().sort_values(ascending=False).items()
        ]

        revenue_by_region = [
            {"region": region, "revenue": float(value)}
            for region, value in df.groupby("region")["revenue"].sum().sort_values(ascending=False).items()
        ]

        top_products = [
            {"product": product, "revenue": float(value)}
            for product, value in df.groupby("product")["revenue"].sum().sort_values(ascending=False).head(5).items()
        ]

        summary = {
            "total_revenue": total_revenue,
            "total_profit": total_profit,
            "total_orders": total_orders,
            "avg_order_value": avg_order_value,
            "avg_profit_margin": avg_profit_margin,
            "avg_customer_rating": avg_customer_rating,
            "revenue_by_month": revenue_by_month,
            "revenue_by_category": revenue_by_category,
            "revenue_by_region": revenue_by_region,
            "top_products": top_products,
        }
        return jsonify(summary)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/predict", methods=["POST"])
def post_predict():
    try:
        payload = request.get_json(force=True)
        required_fields = ["region", "category", "units_sold", "unit_price", "discount_pct", "month", "quarter"]
        missing = [field for field in required_fields if field not in payload]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        prediction = model_predict(payload)
        return jsonify(prediction)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
