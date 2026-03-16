import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const StatCard = ({ label, value, color, bg }) => (
  <div className="card p-5">
    <p className="text-3xl font-bold" style={{ color }}>{value}</p>
    <p className="text-sm text-secondary mt-1">{label}</p>
    <div className="h-1 rounded-full mt-3" style={{ backgroundColor: bg, width: "40%" }} />
  </div>
);

const AdminPage = () => {
  const [user, setUser]         = useState(null);
  const [users, setUsers]       = useState([]);
  const [skills, setSkills]     = useState([]);
  const [sessions, setSessions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [newSkill, setNewSkill] = useState({ name: "", category: "" });
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, usersRes, skillsRes, sessionsRes, requestsRes] = await Promise.all([
          API.get("/auth/current-user"),
          API.get("/users"),
          API.get("/skills"),
          API.get("/sessions"),
          API.get("/requests"),
        ]);
        const me = userRes.data.data;
        setUser(me);
        if (me.role !== "Admin") {
          toast.error("Admin access required");
          window.location.href = "/dashboard";
          return;
        }
        setUsers(usersRes.data.data || []);
        setSkills(skillsRes.data.data || []);
        setSessions(sessionsRes.data.data || []);
        setRequests(requestsRes.data.data || []);
      } catch {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await API.delete(`/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) { toast.error("Skill name required"); return; }
    try {
      const res = await API.post("/skills/add-skill", newSkill);
      setSkills([...skills, res.data.data]);
      setNewSkill({ name: "", category: "" });
      toast.success("Skill added!");
    } catch {
      toast.error("Failed to add skill");
    }
  };

  const handleRewardTokens = async (userId, amount) => {
    try {
      await API.post("/wallet/reward", { toUserId: userId, amount: Number(amount) });
      toast.success(`${amount} tokens rewarded!`);
    } catch {
      toast.error("Failed to reward tokens");
    }
  };

  const inp = {
    padding: "0.6rem 0.875rem", borderRadius: "0.625rem",
    border: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)", fontSize: "0.875rem", outline: "none",
  };

  const tabs = ["overview", "users", "skills", "sessions", "requests"];

  const roleColor = (role) => ({
    Admin:   { color: "#f87171", bg: "rgba(248,113,113,0.1)"  },
    Mentor:  { color: "#818cf8", bg: "rgba(129,140,248,0.1)"  },
    Learner: { color: "#34d399", bg: "rgba(52,211,153,0.1)"   },
    Hybrid:  { color: "#fbbf24", bg: "rgba(251,191,36,0.1)"   },
  }[role] || { color: "var(--text-muted)", bg: "var(--bg-secondary)" });

  const statusColor = (s) => ({
    pending:   { color:"#fb923c", bg:"rgba(251,146,60,0.1)"  },
    accepted:  { color:"#34d399", bg:"rgba(52,211,153,0.1)"  },
    rejected:  { color:"#f87171", bg:"rgba(248,113,113,0.1)" },
    completed: { color:"#60a5fa", bg:"rgba(96,165,250,0.1)"  },
    scheduled: { color:"#818cf8", bg:"rgba(129,140,248,0.1)" },
    cancelled: { color:"#f87171", bg:"rgba(248,113,113,0.1)" },
  }[s] || { color: "var(--text-muted)", bg: "var(--bg-secondary)" });

  const filteredUsers = users.filter((u) =>
    !searchUser ||
    u.fullName?.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.username?.toLowerCase().includes(searchUser.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-primary)" }}>
      <p className="text-secondary">Loading admin panel...</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-60 p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              <span style={{ fontSize: "18px" }}>🛡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
              <p className="text-sm text-secondary">Platform management & oversight</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors"
                style={activeTab === tab
                  ? { background: "linear-gradient(135deg,#ef4444,#dc2626)", color: "white", border: "none", cursor: "pointer" }
                  : { backgroundColor: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)", cursor: "pointer" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Users"    value={users.length}    color="#818cf8" bg="rgba(129,140,248,0.3)" />
                <StatCard label="Skills"         value={skills.length}   color="#34d399" bg="rgba(52,211,153,0.3)"  />
                <StatCard label="Sessions"       value={sessions.length} color="#60a5fa" bg="rgba(96,165,250,0.3)"  />
                <StatCard label="Requests"       value={requests.length} color="#fbbf24" bg="rgba(251,191,36,0.3)"  />
              </div>

              {/* Role breakdown */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Users by Role</h2>
                <div className="grid grid-cols-4 gap-4">
                  {["Admin","Mentor","Learner","Hybrid"].map((role) => {
                    const count = users.filter((u) => u.role === role).length;
                    const { color, bg } = roleColor(role);
                    const pct = users.length ? Math.round((count / users.length) * 100) : 0;
                    return (
                      <div key={role} className="p-4 rounded-xl text-center" style={{ backgroundColor: bg }}>
                        <p className="text-2xl font-bold" style={{ color }}>{count}</p>
                        <p className="text-xs text-secondary mt-1">{role}</p>
                        <div className="h-1 rounded-full mt-2" style={{ backgroundColor: "var(--border)" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Session status breakdown */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Session Status</h2>
                <div className="grid grid-cols-3 gap-4">
                  {["scheduled","completed","cancelled"].map((s) => {
                    const count = sessions.filter((x) => x.status === s).length;
                    const { color, bg } = statusColor(s);
                    return (
                      <div key={s} className="p-4 rounded-xl text-center" style={{ backgroundColor: bg }}>
                        <p className="text-2xl font-bold" style={{ color }}>{count}</p>
                        <p className="text-xs text-secondary mt-1 capitalize">{s}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent users */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Recently Joined</h2>
                <div className="space-y-3">
                  {[...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5).map((u) => {
                    const { color, bg } = roleColor(u.role);
                    return (
                      <div key={u._id} className="flex items-center justify-between p-3 rounded-xl"
                        style={{ backgroundColor: "var(--bg-secondary)" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
                            {u.fullName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-primary">{u.fullName}</p>
                            <p className="text-xs text-secondary">{u.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: bg, color }}>{u.role}</span>
                          <span className="text-xs text-muted">{new Date(u.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Search users by name, email, username..."
                  style={{ ...inp, flex: 1 }} />
                <span className="text-sm text-secondary">{filteredUsers.length} users</span>
              </div>
              <div className="card p-0 overflow-hidden">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}>
                      {["User","Email","Role","XP","Joined","Actions"].map((h) => (
                        <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => {
                      const { color, bg } = roleColor(u.role);
                      return (
                        <tr key={u._id} style={{ borderBottom: "1px solid var(--border)" }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-secondary)"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                          <td style={{ padding: "0.75rem 1rem" }}>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
                                {u.fullName?.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 500 }}>{u.fullName}</span>
                            </div>
                          </td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", color: "var(--text-secondary)" }}>{u.email}</td>
                          <td style={{ padding: "0.75rem 1rem" }}>
                            <span style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "9999px", backgroundColor: bg, color }}>{u.role}</span>
                          </td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "#818cf8", fontWeight: 600 }}>{u.xp || 0}</td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: "0.75rem 1rem" }}>
                            <div className="flex gap-2">
                              <button onClick={() => {
                                const amt = prompt(`Reward tokens to ${u.fullName}:`);
                                if (amt && !isNaN(amt)) handleRewardTokens(u._id, amt);
                              }}
                                style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.3)", cursor: "pointer" }}>
                                🎁 Reward
                              </button>
                              {u._id !== user?._id && (
                                <button onClick={() => handleDeleteUser(u._id)}
                                  style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)", cursor: "pointer" }}>
                                  🗑 Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SKILLS ── */}
          {activeTab === "skills" && (
            <div className="space-y-4">
              {/* Add skill */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Add New Skill</h2>
                <div className="flex gap-3">
                  <input value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="Skill name (e.g. TypeScript)" style={{ ...inp, flex: 1 }} />
                  <input value={newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                    placeholder="Category (e.g. Programming)" style={{ ...inp, flex: 1 }} />
                  <button onClick={handleAddSkill}
                    style={{ padding: "0.6rem 1.25rem", borderRadius: "0.625rem", background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem", whiteSpace: "nowrap" }}>
                    + Add Skill
                  </button>
                </div>
              </div>
              {/* Skills grid */}
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">
                  All Skills <span className="text-sm font-normal text-secondary">({skills.length})</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s._id} className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: "rgba(129,140,248,0.1)", color: "#818cf8", border: "1px solid rgba(129,140,248,0.2)" }}>
                      {s.name}
                      {s.category && <span style={{ color: "var(--text-muted)", marginLeft: "6px", fontSize: "11px" }}>· {s.category}</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SESSIONS ── */}
          {activeTab === "sessions" && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-primary mb-4">
                All Sessions <span className="text-sm font-normal text-secondary">({sessions.length})</span>
              </h2>
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <p className="text-secondary text-sm text-center py-8">No sessions yet</p>
                ) : sessions.map((s) => {
                  const { color, bg } = statusColor(s.status);
                  return (
                    <div key={s._id} className="flex items-center justify-between p-4 rounded-xl"
                      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                      <div>
                        <p className="font-medium text-primary text-sm">{s.skillId?.name || "Unknown Skill"}</p>
                        <p className="text-xs text-secondary mt-0.5">
                          {s.teacherId?.fullName || "?"} → {s.learnerId?.fullName || "?"}
                        </p>
                        <p className="text-xs text-muted mt-0.5">{new Date(s.startTime).toLocaleString()}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full capitalize font-medium"
                        style={{ backgroundColor: bg, color }}>{s.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── REQUESTS ── */}
          {activeTab === "requests" && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-primary mb-4">
                All Requests <span className="text-sm font-normal text-secondary">({requests.length})</span>
              </h2>
              <div className="space-y-3">
                {requests.length === 0 ? (
                  <p className="text-secondary text-sm text-center py-8">No requests yet</p>
                ) : requests.map((r) => {
                  const { color, bg } = statusColor(r.status);
                  return (
                    <div key={r._id} className="flex items-center justify-between p-4 rounded-xl"
                      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                      <div>
                        <p className="font-medium text-primary text-sm">
                          {r.fromUserId?.fullName || "?"} → {r.toUserId?.fullName || "?"}
                        </p>
                        {r.message && <p className="text-xs text-secondary mt-0.5 truncate max-w-sm">{r.message}</p>}
                        <p className="text-xs text-muted mt-0.5">{new Date(r.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full capitalize font-medium"
                        style={{ backgroundColor: bg, color }}>{r.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminPage;
