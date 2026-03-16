import React from "react";

const Bar = ({ label, current, total, color }) => {
  const pct = Math.min(total > 0 ? Math.round((current / total) * 100) : 0, 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-secondary">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-primary">{current}</span>
          <span className="text-xs text-muted">/ {total}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}20`, color }}>{pct}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border)" }}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
      </div>
    </div>
  );
};

const WeeklyProgress = ({ progress }) => {
  const weeklyHours    = progress?.weeklyHours    || 0;
  const weeklySessions = progress?.weeklySessions || 0;

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-primary">Weekly Progress</h2>
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(52,211,153,0.15)", color: "#34d399" }}>
          This Week
        </span>
      </div>
      <div className="space-y-5">
        <Bar label="Session Hours"     current={weeklyHours}    total={15} color="#818cf8" />
        <Bar label="Sessions Completed" current={weeklySessions} total={5}  color="#34d399" />
      </div>
    </div>
  );
};

export default WeeklyProgress;
