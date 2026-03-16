import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const scoreColor = (score) => {
  if (score >= 80) return { color: "#34d399", bg: "rgba(52,211,153,0.12)" };
  if (score >= 50) return { color: "#fbbf24", bg: "rgba(251,191,36,0.12)" };
  return { color: "#818cf8", bg: "rgba(129,140,248,0.12)" };
};

const RecommendedMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/matchmaking")
      .then((r) => setMatches((r.data.matches || r.data.data || []).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-primary">Recommended Matches</h2>
        <button onClick={() => navigate("/matchmaking")}
          className="text-xs font-medium" style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
          View all →
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="h-16 rounded-xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-sm text-secondary">No matches yet.</p>
          <button onClick={() => navigate("/my-skills")}
            className="mt-2 text-xs" style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
            Add skills to get matched →
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {matches.map((m) => {
            const { color, bg } = scoreColor(m.matchScore);
            return (
              <div key={m.user._id}
                className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                style={{ backgroundColor: "var(--bg-secondary)" }}
                onClick={() => navigate("/matchmaking")}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--border)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--bg-secondary)"}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
                    {m.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">{m.user.name}</p>
                    <p className="text-xs text-muted truncate max-w-[200px]">
                      {m.commonSkills?.slice(0,3).join(", ") || "Skill match"}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: bg, color }}>
                  {m.matchScore}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommendedMatches;
