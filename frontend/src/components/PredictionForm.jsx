import { useMemo, useState } from "react";

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Food & Beverage"];
const regions = ["North", "South", "East", "West"];
const discounts = [0, 5, 10, 15, 20];
const monthOptions = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function PredictionForm({ onPredict, loading }) {
  const [form, setForm] = useState({
    region: "",
    category: "",
    units_sold: "",
    unit_price: "",
    discount_pct: "",
    month: "",
  });
  const [error, setError] = useState("");

  const quarter = useMemo(() => {
    const monthNumber = Number(form.month);
    if (monthNumber >= 1 && monthNumber <= 3) return 1;
    if (monthNumber <= 6) return 2;
    if (monthNumber <= 9) return 3;
    if (monthNumber <= 12) return 4;
    return "";
  }, [form.month]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const requiredFields = ["region", "category", "units_sold", "unit_price", "discount_pct", "month"];
    const missing = requiredFields.filter((field) => !form[field]);
    if (missing.length) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    onPredict({
      region: form.region,
      category: form.category,
      units_sold: Number(form.units_sold),
      unit_price: Number(form.unit_price),
      discount_pct: Number(form.discount_pct),
      month: Number(form.month),
      quarter,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Region</label>
          <select value={form.region} onChange={handleChange("region")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none">
            <option value="">Select region</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
          <select value={form.category} onChange={handleChange("category")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none">
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Units Sold</label>
            <input type="number" min="1" value={form.units_sold} onChange={handleChange("units_sold")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Unit Price</label>
            <input type="number" min="0.01" step="0.01" value={form.unit_price} onChange={handleChange("unit_price")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Discount %</label>
            <select value={form.discount_pct} onChange={handleChange("discount_pct")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none">
              <option value="">Select discount</option>
              {discounts.map((discount) => (
                <option key={discount} value={discount}>{discount}%</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Month</label>
            <select value={form.month} onChange={handleChange("month")} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none">
              <option value="">Select month</option>
              {monthOptions.map((label, index) => (
                <option key={index + 1} value={index + 1}>{`${label} (${index + 1})`}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Quarter</label>
          <input value={quarter || ""} readOnly className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm" />
        </div>
      </div>
      {error && <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>}
      <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#6366f1] px-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Predicting..." : "Run Prediction"}
      </button>
    </form>
  );
}

export default PredictionForm;
