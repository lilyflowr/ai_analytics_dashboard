import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function SalesLineChart({ data }) {
  const chartData = data.map((item) => ({
    ...item,
    label: MONTH_NAMES[item.month - 1] || String(item.month),
  }));

  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
      <div className="mb-4 text-lg font-semibold text-slate-900">Monthly Revenue Trend</div>
      <div style={{ width: "100%", height: 340 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#64748b" }} />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} tick={{ fill: "#64748b" }} />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} labelFormatter={(label) => `${label}`} />
            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesLineChart;
