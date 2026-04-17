import { useEffect, useState } from "react";
import { getSummary } from "../api";
import KPICard from "../components/KPICard";
import SalesLineChart from "../components/SalesLineChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import RegionChart from "../components/RegionChart";

const KPI_CONFIG = [
  { title: "Total Revenue", key: "total_revenue", subtitle: "Total sales value", type: "currency", color: "#6366f1" },
  { title: "Total Profit", key: "total_profit", subtitle: "Total earnings", type: "currency", color: "#22c55e" },
  { title: "Total Orders", key: "total_orders", subtitle: "Unique orders", type: "number", color: "#f59e0b" },
  { title: "Avg Profit Margin", key: "avg_profit_margin", subtitle: "Average margin", type: "percent", color: "#ec4899" },
];

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getSummary()
      .then((data) => {
        if (active) {
          setSummary(data);
          setError("");
        }
      })
      .catch((err) => {
        if (active) {
          setError(err?.response?.data?.error || err.message || "Unable to load summary data.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Sales Overview</h1>
        <p className="mt-2 text-slate-600">2022–2023 performance snapshot</p>
      </div>

      {loading ? (
        <div className="rounded-xl bg-white border border-slate-200 p-8 text-center text-slate-600 shadow-sm">Loading metrics...</div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 border border-red-200 p-8 text-center text-red-700 shadow-sm">{error}</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {KPI_CONFIG.map((item) => (
              <KPICard
                key={item.key}
                title={item.title}
                value={summary[item.key]}
                subtitle={item.subtitle}
                color={item.color}
                type={item.type}
              />
            ))}
          </div>
          <SalesLineChart data={summary.revenue_by_month} />
          <div className="grid gap-6 xl:grid-cols-2">
            <CategoryBreakdown data={summary.revenue_by_category} />
            <RegionChart data={summary.revenue_by_region} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
