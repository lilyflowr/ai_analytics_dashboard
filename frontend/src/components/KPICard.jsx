function formatValue(value, type) {
  if (type === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (type === "percent") {
    return `${Number(value).toFixed(2)}%`;
  }
  return value;
}

function KPICard({ title, value, subtitle, color, type = "text" }) {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
      <div className="h-1" style={{ backgroundColor: color }} />
      <div className="p-6">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="mt-3 text-3xl font-semibold text-slate-900">
          {formatValue(value, type)}
        </div>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default KPICard;
