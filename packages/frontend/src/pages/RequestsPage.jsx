import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const RequestsPage = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    toUserId: "",
    skillId: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, requestsRes, usersRes, skillsRes] = await Promise.all([
          API.get("/auth/current-user"),
          API.get("/requests"),
          API.get("/users"),
          API.get("/skills"),
        ]);
        setUser(userRes.data.data);
        setRequests(requestsRes.data.data);
        setUsers(usersRes.data.data);
        setSkills(skillsRes.data.data);
      } catch {
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSendRequest = async () => {
    if (!formData.toUserId || !formData.skillId) {
      toast.error("Please select a user and skill");
      return;
    }
    try {
      const res = await API.post("/requests/add-request", formData);
      setRequests([...requests, res.data.data]);
      setShowModal(false);
      setFormData({ toUserId: "", skillId: "", message: "" });
      toast.success("Request sent!");
    } catch {
      toast.error("Failed to send request");
    }
  };

  const handleUpdateRequest = async (requestId, status) => {
    try {
      await API.patch(`/requests/update-request/${requestId}`, { status });
      setRequests(
        requests.map((r) => (r._id === requestId ? { ...r, status } : r)),
      );
      toast.success(`Request ${status}!`);
    } catch {
      toast.error("Failed to update request");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-900">Requests</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
            >
              + Send Request
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {["pending", "accepted", "completed", "rejected"].map((status) => (
              <div
                key={status}
                className="bg-white rounded-xl p-4 shadow-sm text-center"
              >
                <p className="text-2xl font-bold text-gray-900">
                  {requests.filter((r) => r.status === status).length}
                </p>
                <p className="text-sm text-gray-500 capitalize">{status}</p>
              </div>
            ))}
          </div>

          {/* Requests List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              All Requests
            </h2>
            {requests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No requests yet</p>
                <p className="text-gray-300 text-sm mt-1">
                  Send a request to start learning!
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
                >
                  Send First Request
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        To: {request.toUserId?.fullName || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {request.message || "No message"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}
                      >
                        {request.status}
                      </span>
                      {request.status === "pending" &&
                        request.toUserId?._id === user?._id && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleUpdateRequest(request._id, "accepted")
                              }
                              className="text-xs bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleUpdateRequest(request._id, "rejected")
                              }
                              className="text-xs bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Send Request Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Send Request
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Select User
                  </label>
                  <select
                    value={formData.toUserId}
                    onChange={(e) =>
                      setFormData({ ...formData, toUserId: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Choose a user...</option>
                    {users
                      .filter((u) => u._id !== user?._id)
                      .map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.fullName} (@{u.username})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Select Skill
                  </label>
                  <select
                    value={formData.skillId}
                    onChange={(e) =>
                      setFormData({ ...formData, skillId: e.target.value })
                    }
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Choose a skill...</option>
                    {skills.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Message (optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={3}
                    placeholder="Hi! I'd love to learn from you..."
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
                  onClick={handleSendRequest}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RequestsPage;
