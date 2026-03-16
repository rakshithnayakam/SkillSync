import React from "react";

const ProgressBar = ({ label, current, total, color = "bg-indigo-600" }) => {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm font-medium">
        <span className="text-primary">{label}</span>
        <span className="text-indigo-400 font-semibold">{current}/{total}</span>
      </div>
      <div className="w-full rounded-full h-2.5" style={{ backgroundColor: "var(--border)" }}>
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
