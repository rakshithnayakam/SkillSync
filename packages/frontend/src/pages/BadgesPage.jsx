import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const BADGE_DEFS = [
  {
    id: "first_session",
    emoji: "🎯",
    name: "First Step",
    desc: "Complete your first session",
    threshold: 1,
  },
  {
    id: "five_sessions",
    emoji: "🔥",
    name: "On Fire",
    desc: "Complete 5 sessions",
    threshold: 5,
  },
  {
    id: "ten_sessions",
    emoji: "💎",
    name: "Diamond Learner",
    desc: "Complete 10 sessions",
    threshold: 10,
  },
  {
    id: "first_teach",
    emoji: "🧑‍🏫",
    name: "First Teacher",
    desc: "Teach your first skill session",
    threshold: 1,
  },
  {
    id: "five_teach",
    emoji: "🏫",
    name: "Mentor",
    desc: "Teach 5 sessions",
    threshold: 5,
  },
  {
    id: "skill_diverse",
    emoji: "🌈",
    name: "Polymath",
    desc: "Exchange 3 different skills",
    threshold: 3,
  },
  {
    id: "wallet_100",
    emoji: "💰",
    name: "Credit Hoarder",
    desc: "Earn 100 credits total",
    threshold: 100,
  },
  {
    id: "top_rated",
    emoji: "⭐",
    name: "Top Rated",
    desc: "Receive 5 five-star ratings",
    threshold: 5,
  },
  {
    id: "early_adopter",
    emoji: "🚀",
    name: "Early Adopter",
    desc: "Joined SkillSync in the first month",
    threshold: 1,
  },
  {
    id: "profile_complete",
    emoji: "✅",
    name: "Complete Profile",
    desc: "Fill out your full profile",
    threshold: 1,
  },
  {
    id: "request_sent_5",
    emoji: "📨",
    name: "Go-Getter",
    desc: "Send 5 skill requests",
    threshold: 5,
  },
];

function BadgeCard({ def, earned, progress }) {
  const pct = Math.min(
    100,
    Math.round(((progress || 0) / def.threshold) * 100),
  );

  return (
    <div
      className={`relative rounded-2xl border p-4 transition-all duration-200 ${
        earned
          ? "bg-white dark:bg-gray-800 border-indigo-200 shadow-sm hover:shadow-md"
          : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto ${
          earned ? "bg-indigo-100" : "bg-gray-200 grayscale opacity-50"
        }`}
      >
        {def.emoji}
      </div>

      {!earned && (
        <span className="absolute top-3 right-3 text-gray-400 text-xs">🔒</span>
      )}

      <p
        className={`text-center text-sm font-semibold ${earned ? "text-primary" : "text-gray-400"}`}
      >
        {def.name}
      </p>
      <p
        className={`text-center text-xs mt-1 leading-snug ${earned ? "text-muted" : "text-gray-400"}`}
      >
        {def.desc}
      </p>

      {!earned ? (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{progress ?? 0}</span>
            <span>{def.threshold}</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-2 mx-auto w-fit px-2.5 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-600 font-medium">
          ✓ Earned
        </div>
      )}
    </div>
  );
}

const BadgesPage = () => {
  const [user, setUser] = useState(null);
  const [userBadges, setUserBadges] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    Promise.all([API.get("/auth/current-user"), API.get("/badges/me")])
      .then(([userRes, badgesRes]) => {
        setUser(userRes.data.data);
        const map = {};
        (badgesRes.data.badges || []).forEach((b) => {
          map[b.badgeId] = b;
        });
        setUserBadges(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const earnedCount = BADGE_DEFS.filter((b) => userBadges[b.id]?.earned).length;

  const displayed = BADGE_DEFS.filter((b) => {
    if (filter === "earned") return !!userBadges[b.id]?.earned;
    if (filter === "locked") return !userBadges[b.id]?.earned;
    return true;
  });

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-primary">Badges</h1>
            <p className="text-muted text-sm mt-1">
              You've earned{" "}
              <span className="text-indigo-600 font-semibold">
                {earnedCount}
              </span>{" "}
              of{" "}
              <span className="text-gray-700 font-semibold">
                {BADGE_DEFS.length}
              </span>{" "}
              badges
            </p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden max-w-sm">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                style={{ width: `${(earnedCount / BADGE_DEFS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2">
            {["all", "earned", "locked"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-secondary hover:bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Badge grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-44 rounded-2xl bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayed.map((def) => (
                <BadgeCard
                  key={def.id}
                  def={def}
                  earned={!!userBadges[def.id]?.earned}
                  progress={userBadges[def.id]?.progress ?? 0}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BadgesPage;
