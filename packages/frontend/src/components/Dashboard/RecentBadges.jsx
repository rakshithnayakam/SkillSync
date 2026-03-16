import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const BADGE_META = {
  first_session:    { emoji: "🎯", label: "First Step",       color: "#fbbf24", bg: "rgba(251,191,36,0.12)"   },
  five_sessions:    { emoji: "🔥", label: "On Fire",          color: "#fb923c", bg: "rgba(251,146,60,0.12)"   },
  ten_sessions:     { emoji: "💎", label: "Diamond",          color: "#60a5fa", bg: "rgba(96,165,250,0.12)"   },
  first_teach:      { emoji: "🧑‍🏫", label: "First Teacher",  color: "#a78bfa", bg: "rgba(167,139,250,0.12)"  },
  five_teach:       { emoji: "🏫", label: "Mentor",           color: "#818cf8", bg: "rgba(129,140,248,0.12)"  },
  skill_diverse:    { emoji: "🌈", label: "Polymath",         color: "#f472b6", bg: "rgba(244,114,182,0.12)"  },
  wallet_100:       { emoji: "💰", label: "Credit Hoarder",   color: "#fbbf24", bg: "rgba(251,191,36,0.12)"   },
  top_rated:        { emoji: "⭐", label: "Top Rated",        color: "#60a5fa", bg: "rgba(96,165,250,0.12)"   },
  early_adopter:    { emoji: "🚀", label: "Early Adopter",    color: "#a78bfa", bg: "rgba(167,139,250,0.12)"  },
  profile_complete: { emoji: "✅", label: "Complete Profile", color: "#34d399", bg: "rgba(52,211,153,0.12)"   },
  request_sent_5:   { emoji: "📨", label: "Go-Getter",        color: "#fb923c", bg: "rgba(251,146,60,0.12)"   },
};

const RecentBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/badges/me")
      .then((r) => setBadges((r.data.badges || []).filter((b) => b.earned).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-primary">Recent Badges</h2>
        <button onClick={() => navigate("/badges")}
          className="text-xs font-medium" style={{ color: "#818cf8", background: "none", border: "none", cursor: "pointer" }}>
          View all →
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-3">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-16 rounded-xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-3xl mb-2">🏅</p>
          <p className="text-xs text-secondary">Complete sessions to earn badges!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {badges.map((b) => {
            const meta = BADGE_META[b.badgeId] || { emoji: "🏅", label: b.badgeId, color: "#818cf8", bg: "rgba(129,140,248,0.12)" };
            return (
              <div key={b.badgeId} onClick={() => navigate("/badges")}
                className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-transform hover:scale-105"
                style={{ backgroundColor: meta.bg }}>
                <span style={{ fontSize: "22px" }}>{meta.emoji}</span>
                <p className="text-xs font-medium text-center leading-tight" style={{ color: meta.color }}>
                  {meta.label}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentBadges;
