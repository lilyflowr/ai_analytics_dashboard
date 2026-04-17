import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"];

function RegionChart({ data }) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
      <div className="mb-4 text-lg font-semibold text-slate-900">Revenue by Region</div>
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="revenue"
              nameKey="region"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={entry.region} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RegionChart;
