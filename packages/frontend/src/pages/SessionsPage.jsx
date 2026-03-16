import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";
import FeedbackModal from "../components/Dashboard/FeedbackModal.jsx";

const SessionsPage = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [feedbackSession, setFeedbackSession] = useState(null);
  const [formData, setFormData] = useState({
    teacherId: "",
    learnerId: "",
    skillId: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, sessionsRes, usersRes, skillsRes] = await Promise.all([
          API.get("/auth/current-user"),
          API.get("/sessions"),
          API.get("/users"),
          API.get("/skills"),
        ]);
        setUser(userRes.data.data);
        setSessions(sessionsRes.data.data || []);
        setUsers(usersRes.data.data || []);
        setSkills(skillsRes.data.data || []);
      } catch {
        toast.error("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateSession = async () => {
    if (
      !formData.teacherId ||
      !formData.learnerId ||
      !formData.skillId ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await API.post("/sessions", formData);
      setSessions([...sessions, res.data.data]);
      setShowModal(false);
      setFormData({
        teacherId: "",
        learnerId: "",
        skillId: "",
        startTime: "",
        endTime: "",
      });
      toast.success("Session created!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create session");
    }
  };

  const handleUpdateStatus = async (sessionId, status) => {
    try {
      await API.put(`/sessions/${sessionId}`, { status });
      setSessions(
        sessions.map((s) => (s._id === sessionId ? { ...s, status } : s)),
      );
      toast.success(`Session ${status}!`);
    } catch {
      toast.error("Failed to update session");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredSessions = sessions.filter((s) =>
    activeTab === "all" ? true : s.status === activeTab,
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
            >
              + New Session
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {["scheduled", "completed", "cancelled"].map((status) => (
              <div
                key={status}
                className="bg-white rounded-xl p-4 shadow-sm text-center"
              >
                <p className="text-2xl font-bold text-gray-900">
                  {sessions.filter((s) => s.status === status).length}
                </p>
                <p className="text-sm text-gray-500 capitalize">{status}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {["all", "scheduled", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sessions List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No sessions found</p>
                <p className="text-gray-300 text-sm mt-1">
                  Create a session to get started!
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
                >
                  Create Session
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSessions.map((session) => (
                  <div
                    key={session._id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {typeof session.skillId === "object"
                          ? session.skillId?.name
                          : "Unknown Skill"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Teacher: {session.teacherId?.fullName || "Unknown"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Learner: {session.learnerId?.fullName || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(session.startTime).toLocaleDateString()} •{" "}
                        {new Date(session.startTime).toLocaleTimeString()} →{" "}
                        {new Date(session.endTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}
                      >
                        {session.status}
                      </span>
                      {session.status === "scheduled" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus(session._id, "completed")
                            }
                            className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(session._id, "cancelled")
                            }
                            className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {session.status === "completed" && (
                        <button
                          onClick={() => setFeedbackSession(session)}
                          className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600"
                        >
                          ★ Rate Session
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Session Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Create Session
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Teacher
                  </label>
                  <select
                    value={formData.teacherId}
                    onChange={(e) =>
                      setFormData({ ...formData, teacherId: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select teacher...</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.fullName} (@{u.username})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Learner
                  </label>
                  <select
                    value={formData.learnerId}
                    onChange={(e) =>
                      setFormData({ ...formData, learnerId: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select learner...</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.fullName} (@{u.username})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Skill
                  </label>
                  <select
                    value={formData.skillId}
                    onChange={(e) =>
                      setFormData({ ...formData, skillId: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select skill...</option>
                    {skills.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border rounded-xl hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSession}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {feedbackSession && (
          <FeedbackModal
            session={feedbackSession}
            currentUserId={user?._id}
            onClose={() => setFeedbackSession(null)}
            onSubmitted={() => setFeedbackSession(null)}
          />
        )}
      </main>
    </div>
  );
};

export default SessionsPage;
