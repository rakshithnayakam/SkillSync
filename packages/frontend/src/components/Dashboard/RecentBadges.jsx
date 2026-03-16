import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "./Icons";
import API from "../../api/axios";

const BADGE_META = {
  first_session:    { emoji: "🎯", label: "First Step",       color: "text-yellow-600 bg-yellow-100" },
  five_sessions:    { emoji: "🔥", label: "On Fire",          color: "text-orange-600 bg-orange-100" },
  ten_sessions:     { emoji: "💎", label: "Diamond Learner",  color: "text-blue-600 bg-blue-100"     },
  first_teach:      { emoji: "🧑‍🏫", label: "First Teacher",   color: "text-purple-600 bg-purple-100" },
  five_teach:       { emoji: "🏫", label: "Mentor",           color: "text-indigo-600 bg-indigo-100" },
  skill_diverse:    { emoji: "🌈", label: "Polymath",         color: "text-pink-600 bg-pink-100"     },
  wallet_100:       { emoji: "💰", label: "Credit Hoarder",   color: "text-yellow-600 bg-yellow-100" },
  top_rated:        { emoji: "⭐", label: "Top Rated",        color: "text-blue-600 bg-blue-100"     },
  early_adopter:    { emoji: "🚀", label: "Early Adopter",    color: "text-purple-600 bg-purple-100" },
  profile_complete: { emoji: "✅", label: "Complete Profile", color: "text-green-600 bg-green-100"   },
  request_sent_5:   { emoji: "📨", label: "Go-Getter",        color: "text-orange-600 bg-orange-100" },
};

const RecentBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/badges/me")
      .then((r) => {
        const earned = (r.data.badges || [])
          .filter((b) => b.earned)
          .slice(0, 4);
        setBadges(earned);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-primary">Recent Badges</h2>
        <button
          onClick={() => navigate("/badges")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          View All <ArrowRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
          ))}
        </div>
      ) : badges.length === 0 ? (
        <div className="text-center py-6 text-gray-400">
          <p className="text-3xl mb-2">🏅</p>
          <p className="text-sm">Complete sessions to earn badges!</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {badges.map((b) => {
            const meta = BADGE_META[b.badgeId] || { emoji: "🏅", label: b.badgeId, color: "text-secondary bg-gray-100 dark:bg-gray-700" };
            return (
              <div key={b.badgeId} className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-xl ${meta.color}`}>
                  <span className="text-xl">{meta.emoji}</span>
                </div>
                <p className="text-xs text-secondary font-medium text-center leading-tight">
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