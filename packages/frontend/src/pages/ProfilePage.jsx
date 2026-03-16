import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API, { getUserSkills } from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={`text-base ${s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}>
        ★
      </span>
    ))}
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser]           = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [feedback, setFeedback]   = useState({ feedbacks: [], totalRatings: 0, averageRating: null });
  const [loading, setLoading]     = useState(true);
  const [editing, setEditing]     = useState(false);
  const [formData, setFormData]   = useState({ fullName: "", bio: "", age: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, skillsRes] = await Promise.all([
          API.get("/auth/current-user"),
          getUserSkills(),
        ]);
        setUser(userRes.data.data);
        setUserSkills(skillsRes.data.data || []);
        setFormData({
          fullName: userRes.data.data.fullName || "",
          bio:      userRes.data.data.bio      || "",
          age:      userRes.data.data.age      || "",
        });

        // Fetch feedback separately — don't block profile load
        API.get(`/feedback/${userRes.data.data._id}`)
          .then((r) => setFeedback(r.data.data))
          .catch(() => {});
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/users/${user._id}`, formData);
      setUser(res.data.data);
      setEditing(false);
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const offeredSkills = userSkills.filter((s) => s.type === "offer");
  const wantedSkills  = userSkills.filter((s) => s.type === "want");

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500 text-white text-2xl font-bold flex items-center justify-center">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
                  <p className="text-gray-500">@{user?.username}</p>
                  {/* Rating under name */}
                  {feedback.averageRating && (
                    <div className="flex items-center gap-2 mt-1">
                      <StarDisplay rating={feedback.averageRating} />
                      <span className="text-sm text-gray-500">
                        {feedback.averageRating} ({feedback.totalRatings} review{feedback.totalRatings !== 1 ? "s" : ""})
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setEditing(!editing)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Tell others about yourself..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full mt-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <button
                  onClick={handleUpdate}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-6 text-sm text-gray-600">
                  <span>📧 {user?.email}</span>
                  <span>🎭 {user?.role}</span>
                  {user?.age && <span>🎂 {user?.age} years</span>}
                </div>
                <p className="text-gray-700">
                  {user?.bio || "No bio yet. Click Edit Profile to add one!"}
                </p>
                <div className="flex gap-4 mt-4">
                  <div className="bg-indigo-50 px-4 py-2 rounded-lg text-center">
                    <p className="text-xl font-bold text-indigo-600">{user?.xp || 0}</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                  <div className="bg-emerald-50 px-4 py-2 rounded-lg text-center">
                    <p className="text-xl font-bold text-emerald-600">{offeredSkills.length}</p>
                    <p className="text-xs text-gray-500">Skills Offered</p>
                  </div>
                  <div className="bg-orange-50 px-4 py-2 rounded-lg text-center">
                    <p className="text-xl font-bold text-orange-600">{wantedSkills.length}</p>
                    <p className="text-xs text-gray-500">Skills Wanted</p>
                  </div>
                  <div className="bg-yellow-50 px-4 py-2 rounded-lg text-center">
                    <p className="text-xl font-bold text-yellow-600">
                      {feedback.averageRating ?? "—"}
                    </p>
                    <p className="text-xs text-gray-500">Avg Rating</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Skills Offered */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Skills I Can Teach</h2>
              <button
                onClick={() => navigate("/skills-offered")}
                className="text-sm text-indigo-600 hover:underline"
              >
                + Add more
              </button>
            </div>
            {offeredSkills.length === 0 ? (
              <p className="text-gray-400 text-sm">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {offeredSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Skills Wanted */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Skills I Want to Learn</h2>
              <button
                onClick={() => navigate("/skills-wanted")}
                className="text-sm text-indigo-600 hover:underline"
              >
                + Add more
              </button>
            </div>
            {wantedSkills.length === 0 ? (
              <p className="text-gray-400 text-sm">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {wantedSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Feedback & Ratings */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Feedback & Ratings
                {feedback.averageRating && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({feedback.averageRating} ★ · {feedback.totalRatings} reviews)
                  </span>
                )}
              </h2>
              <button
                onClick={() => navigate(`/feedback/${user._id}`)}
                className="text-sm text-indigo-600 hover:underline"
              >
                View all →
              </button>
            </div>

            {feedback.feedbacks.length === 0 ? (
              <p className="text-gray-400 text-sm">No feedback received yet.</p>
            ) : (
              <div className="space-y-3">
                {feedback.feedbacks.slice(0, 3).map((f) => (
                  <div key={f._id} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {f.fromUser?.fullName || "Anonymous"}
                      </p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-sm ${s <= f.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{f.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;