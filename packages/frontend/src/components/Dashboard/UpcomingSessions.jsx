import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const skillColors = [
  { color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
  { color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  { color: "#fb923c", bg: "rgba(251,146,60,0.12)"  },
  { color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
];

const UpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/sessions")
      .then((r) => {
        const all = r.data.data || r.data.sessions || [];
        setSessions(
          all.filter((s) => s.status === "scheduled")
             .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
             .slice(0, 3)
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-primary">Upcoming Sessions</h2>
        <button onClick={() => navigate("/sessions")}
          className="text-xs font-medium" style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
          View all →
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2].map((i) => (
            <div key={i} className="h-14 rounded-xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-3xl mb-2">📅</p>
          <p className="text-xs text-secondary mb-2">No upcoming sessions</p>
          <button onClick={() => navigate("/sessions")}
            className="text-xs" style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
            Schedule one →
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s, i) => {
            const { color, bg } = skillColors[i % skillColors.length];
            const peer  = s.teacherId?.fullName || s.learnerId?.fullName || "Peer";
            const skill = s.skillId?.name || "Session";
            const start = new Date(s.startTime);
            return (
              <div key={s._id}
                className="flex items-center justify-between p-3 rounded-xl cursor-pointer"
                style={{ backgroundColor: "var(--bg-secondary)" }}
                onClick={() => navigate("/sessions")}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--border)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--bg-secondary)"}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: bg }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{skill}</p>
                    <p className="text-xs text-muted">with {peer}</p>
                  </div>
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color }}>
                  {start.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;
