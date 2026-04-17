import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

const BAR_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#14b8a6"];

function CategoryBreakdown({ data }) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
      <div className="mb-4 text-lg font-semibold text-slate-900">Revenue by Category</div>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="category" tick={{ fill: "#64748b" }} />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} tick={{ fill: "#64748b" }} />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
            <Bar dataKey="revenue" radius={[10, 10, 0, 0]}>
              {data.map((item, index) => (
                <Cell key={item.category} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryBreakdown;
