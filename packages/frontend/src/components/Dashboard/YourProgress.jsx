import React from "react";

const YourProgress = ({ progress }) => {
  const xp              = progress?.xp || 0;
  const level           = progress?.level || Math.floor(xp / 100) + 1;
  const progressPercent = xp % 100;

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 text-white"
      style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}>
      {/* Decorative */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10" style={{ backgroundColor: "white" }} />
      <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: "white" }} />

      <div className="relative z-10">
        <h2 className="text-sm font-medium mb-4" style={{ color: "rgba(199,210,254,0.9)" }}>Your Progress</h2>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-4xl font-extrabold">Level {level}</p>
            <p className="text-sm mt-1" style={{ color: "rgba(199,210,254,0.8)" }}>{xp} XP total</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{progressPercent}%</p>
            <p className="text-xs" style={{ color: "rgba(199,210,254,0.7)" }}>to Level {level + 1}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full mb-5" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%`, backgroundColor: "white" }} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { val: progress?.totalSessions ?? 0, label: "Sessions" },
            { val: progress?.streak ?? 0,        label: "Day Streak 🔥" },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-xl p-3 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              <p className="text-xl font-bold">{val}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(199,210,254,0.8)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourProgress;
