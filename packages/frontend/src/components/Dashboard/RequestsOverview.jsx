import React from "react";
import { useNavigate } from "react-router-dom";

const RequestsOverview = ({ requests }) => {
  const navigate = useNavigate();
  const pending   = requests?.filter((r) => r.status === "pending").length   || 0;
  const accepted  = requests?.filter((r) => r.status === "accepted").length  || 0;
  const completed = requests?.filter((r) => r.status === "completed").length || 0;

  const stats = [
    { label: "Pending",   count: pending,   color: "#fb923c", bg: "rgba(251,146,60,0.12)",   icon: "⏳" },
    { label: "Accepted",  count: accepted,  color: "#34d399", bg: "rgba(52,211,153,0.12)",   icon: "✅" },
    { label: "Completed", count: completed, color: "#818cf8", bg: "rgba(129,140,248,0.12)",  icon: "🎓" },
  ];

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-primary">Requests Overview</h2>
        <button onClick={() => navigate("/requests")}
          className="text-xs font-medium" style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
          View all →
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, count, color, bg, icon }) => (
          <div key={label} onClick={() => navigate("/requests")}
            className="rounded-xl p-4 text-center cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: bg }}>
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-2xl font-extrabold" style={{ color }}>{count}</p>
            <p className="text-xs text-secondary mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsOverview;
