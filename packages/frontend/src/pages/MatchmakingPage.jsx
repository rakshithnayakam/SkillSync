import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const getScoreStyle = (score) => {
  if (score >= 80) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
};

function MatchCard({ match, onRequest }) {
  const [expanded, setExpanded] = useState(false);
  const { user, matchScore, commonSkills, theyTeach, theyLearn } = match;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg flex items-center justify-center flex-shrink-0">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.bio || "SkillSync member"}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${getScoreStyle(matchScore)}`}>
          {matchScore}% match
        </span>
      </div>

      {/* Common skills */}
      {commonSkills?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-400 mb-1.5">Matching skills</p>
          <div className="flex flex-wrap gap-1.5">
            {commonSkills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
      >
        {expanded ? "▲ Less" : "▼ All skills"}
      </button>

      {expanded && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-400 mb-1.5">They can teach</p>
            <div className="flex flex-wrap gap-1.5">
              {(theyTeach || []).map((s) => (
                <span key={s} className="px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1.5">They want to learn</p>
            <div className="flex flex-wrap gap-1.5">
              {(theyLearn || []).map((s) => (
                <span key={s} className="px-2 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700">{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => onRequest(user)}
        className="mt-4 w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
      >
        Send Request
      </button>
    </div>
  );
}

const MatchmakingPage = () => {
  const [user, setUser]       = useState(null);
  const [matches, setMatches] = useState([]);
  const [skills, setSkills]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery]     = useState("");
  const [sortBy, setSortBy]   = useState("score");
  const [modal, setModal]     = useState(null);
  const [formData, setFormData] = useState({ skillId: "", message: "" });

  useEffect(() => {
    Promise.all([
      API.get("/auth/current-user"),
      API.get("/matchmaking"),
      API.get("/skills"),
    ])
      .then(([userRes, matchRes, skillRes]) => {
        setUser(userRes.data.data);
        setMatches(matchRes.data.matches || matchRes.data.data || []);
        setSkills(skillRes.data.data || []);
      })
      .catch(() => toast.error("Failed to load matches"))
      .finally(() => setLoading(false));
  }, []);

  const handleRequest = async () => {
    if (!formData.skillId) { toast.error("Please select a skill"); return; }
    try {
      await API.post("/requests/add-request", {
        toUserId: modal._id,
        skillId:  formData.skillId,
        message:  formData.message,
      });
      toast.success(`Request sent to ${modal.name}!`);
      setModal(null);
      setFormData({ skillId: "", message: "" });
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to send request");
    }
  };

  const filtered = matches
    .filter((m) =>
      !query ||
      m.user.name?.toLowerCase().includes(query.toLowerCase()) ||
      m.commonSkills?.some((s) => s.toLowerCase().includes(query.toLowerCase()))
    )
    .sort((a, b) =>
      sortBy === "score"
        ? b.matchScore - a.matchScore
        : a.user.name?.localeCompare(b.user.name)
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Matchmaking</h1>
              <p className="text-gray-500 text-sm mt-1">
                People whose skills complement yours
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
              <p className="text-sm text-gray-500">Total Matches</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-green-600">
                {matches.filter((m) => m.matchScore >= 80).length}
              </p>
              <p className="text-sm text-gray-500">Strong Matches</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-indigo-600">
                {matches.length > 0
                  ? Math.round(matches.reduce((a, m) => a + m.matchScore, 0) / matches.length)
                  : 0}%
              </p>
              <p className="text-sm text-gray-500">Avg Match Score</p>
            </div>
          </div>

          {/* Search + sort */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="m21 21-4.35-4.35" strokeWidth="2"/>
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or skill…"
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            >
              <option value="score">Best match</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          {/* Results */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-lg font-medium text-gray-500">No matches found</p>
              <p className="text-sm text-gray-400 mt-1">
                Add skills to your profile from My Skills page.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-gray-400">
                {filtered.length} match{filtered.length !== 1 ? "es" : ""}
              </p>
              {filtered.map((m) => (
                <MatchCard key={m.user._id} match={m} onRequest={setModal} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Send Request Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Request</h2>

            <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">
                {modal.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{modal.name}</p>
                <p className="text-xs text-gray-400">{modal.bio || "SkillSync member"}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Skill</label>
                <select
                  value={formData.skillId}
                  onChange={(e) => setFormData({ ...formData, skillId: e.target.value })}
                  className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select a skill…</option>
                  {skills.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message (optional)</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi! I'd love to exchange skills with you…"
                  className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setModal(null); setFormData({ skillId: "", message: "" }); }}
                className="flex-1 py-3 border rounded-xl hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchmakingPage;