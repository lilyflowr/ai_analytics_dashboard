import { useState } from "react";
import { getPrediction } from "../api";
import PredictionForm from "../components/PredictionForm";

function Predictions() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const data = await getPrediction(formData);
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Prediction failed.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Revenue Predictor</h1>
        <p className="mt-2 text-slate-600">Estimate revenue and profit for a sales scenario</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PredictionForm onPredict={handlePredict} loading={loading} />

        <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="mb-4 text-lg font-semibold text-slate-900">Prediction Results</div>
          {loading ? (
            <div className="rounded-xl bg-slate-50 p-6 text-slate-600">Running model prediction...</div>
          ) : error ? (
            <div className="rounded-xl bg-red-50 border border-red-200 p-6 text-red-700">{error}</div>
          ) : result ? (
            <div className="space-y-6">
              <div className="rounded-3xl bg-emerald-50 p-6">
                <p className="text-sm uppercase tracking-wide text-slate-500">Predicted Revenue</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-700">${result.predicted_revenue.toLocaleString()}</p>
              </div>
              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm uppercase tracking-wide text-slate-500">Predicted Profit</p>
                <p className="mt-3 text-3xl font-semibold text-sky-700">${result.predicted_profit.toLocaleString()}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm uppercase tracking-wide text-slate-500">Model Confidence</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{(result.confidence_score * 100).toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-slate-50 p-6 text-slate-600">Complete the form to generate a prediction.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Predictions;
