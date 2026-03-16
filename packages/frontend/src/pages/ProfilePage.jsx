import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API, { getUserSkills } from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const StarDisplay = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <span key={s} style={{ color: s <= Math.round(rating) ? "#fbbf24" : "var(--border)", fontSize:"14px" }}>★</span>
    ))}
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileRef  = useRef(null);
  const [user, setUser]             = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [feedback, setFeedback]     = useState({ feedbacks:[], totalRatings:0, averageRating:null });
  const [loading, setLoading]       = useState(true);
  const [editing, setEditing]       = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData]     = useState({ fullName:"", bio:"", age:"" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, skillsRes] = await Promise.all([
          API.get("/auth/current-user"),
          getUserSkills(),
        ]);
        setUser(userRes.data.data);
        setUserSkills(skillsRes.data.data || []);
        setFormData({ fullName:userRes.data.data.fullName||"", bio:userRes.data.data.bio||"", age:userRes.data.data.age||"" });
        API.get(`/feedback/${userRes.data.data._id}`).then((r) => setFeedback(r.data.data)).catch(() => {});
      } catch { toast.error("Failed to load profile"); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Image must be under 2MB"); return; }
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("Avatar preview updated — save changes to apply");
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/users/${user._id}`, formData);
      setUser(res.data.data);
      setEditing(false);
      setAvatarPreview(null);
      toast.success("Profile updated!");
    } catch { toast.error("Failed to update profile"); }
  };

  const inp = { width:"100%", marginTop:"0.25rem", padding:"0.75rem 1rem", borderRadius:"0.75rem", border:"1px solid var(--border)", backgroundColor:"var(--bg-secondary)", color:"var(--text-primary)", fontSize:"0.875rem", outline:"none", boxSizing:"border-box" };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor:"var(--bg-primary)" }}>
      <p className="text-secondary">Loading...</p>
    </div>
  );

  const offeredSkills = userSkills.filter((s) => s.type === "offer");
  const wantedSkills  = userSkills.filter((s) => s.type === "want");

  return (
    <div className="min-h-screen" style={{ backgroundColor:"var(--bg-primary)" }}>
      <DashboardNavbar user={user} />
      <Sidebar />
      <main style={{paddingTop:"4rem",paddingLeft:"15rem",minHeight:"100vh"}}>
        <div style={{background:"linear-gradient(135deg,rgba(79,70,229,0.15) 0%,rgba(124,58,237,0.08) 100%)",borderBottom:"1px solid var(--border)",padding:"2rem 2.5rem 1.5rem"}}>
          <h1 className="text-3xl font-extrabold text-primary">Profile</h1>
          <p className="text-secondary mt-1 text-sm">Your public profile and skills</p>
        </div>
        <div className="p-6 max-w-3xl space-y-6">

          {/* Profile Card */}
          <div className="card p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-18 h-18 rounded-full flex items-center justify-center text-2xl font-bold text-white overflow-hidden"
                    style={{ width:"72px", height:"72px", background:"linear-gradient(135deg,#4f46e5,#7c3aed)", flexShrink:0 }}>
                    {avatarPreview
                      ? <img src={avatarPreview} alt="avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : (user?.avatar
                          ? <img src={user.avatar} alt="avatar" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                          : user?.fullName?.charAt(0).toUpperCase())}
                  </div>
                  {editing && (
                    <button onClick={() => fileRef.current?.click()}
                      className="absolute inset-0 rounded-full flex items-center justify-center text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor:"rgba(0,0,0,0.5)", border:"none", cursor:"pointer" }}>
                      Upload
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleAvatarChange} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-primary">{user?.fullName}</h1>
                  <p className="text-secondary">@{user?.username}</p>
                  {feedback.averageRating && (
                    <div className="flex items-center gap-2 mt-1">
                      <StarDisplay rating={feedback.averageRating} />
                      <span className="text-xs text-secondary">{feedback.averageRating} ({feedback.totalRatings} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => setEditing(!editing)}
                className="px-4 py-2 rounded-xl text-white text-sm font-semibold"
                style={{ background: editing ? "var(--bg-secondary)" : "linear-gradient(135deg,#4f46e5,#7c3aed)", color: editing ? "var(--text-secondary)" : "white", border: editing ? "1px solid var(--border)" : "none", cursor:"pointer" }}>
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label style={{ fontSize:"0.875rem", color:"var(--text-secondary)", display:"block" }}>Full Name</label>
                  <input value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName:e.target.value })} style={inp} />
                </div>
                <div>
                  <label style={{ fontSize:"0.875rem", color:"var(--text-secondary)", display:"block" }}>Bio</label>
                  <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio:e.target.value })} rows={3}
                    placeholder="Tell others about yourself..." style={{ ...inp, resize:"none" }} />
                </div>
                <div>
                  <label style={{ fontSize:"0.875rem", color:"var(--text-secondary)", display:"block" }}>Age</label>
                  <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age:e.target.value })} style={inp} />
                </div>
                {editing && <p className="text-xs text-secondary">Hover over avatar to upload a photo</p>}
                <button onClick={handleUpdate}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", cursor:"pointer" }}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <span>📧 {user?.email}</span>
                  <span>🎭 {user?.role}</span>
                  {user?.age && <span>🎂 {user?.age} years</span>}
                </div>
                <p className="text-primary text-sm">{user?.bio || "No bio yet. Click Edit Profile to add one!"}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    { val:user?.xp||0,            label:"XP",             color:"#818cf8", bg:"rgba(129,140,248,0.1)" },
                    { val:offeredSkills.length,    label:"Skills Offered", color:"#34d399", bg:"rgba(52,211,153,0.1)"  },
                    { val:wantedSkills.length,     label:"Skills Wanted",  color:"#fb923c", bg:"rgba(251,146,60,0.1)"  },
                    { val:feedback.averageRating??"—", label:"Avg Rating", color:"#fbbf24", bg:"rgba(251,191,36,0.1)"  },
                  ].map(({ val, label, color, bg }) => (
                    <div key={label} className="px-4 py-2 rounded-lg text-center" style={{ backgroundColor:bg }}>
                      <p className="text-xl font-bold" style={{ color }}>{val}</p>
                      <p className="text-xs text-secondary">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Skills Offered */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">Skills I Can Teach</h2>
              <button onClick={() => navigate("/skills-offered")} style={{ color:"#818cf8", background:"none", border:"none", cursor:"pointer", fontSize:"0.875rem" }}>+ Add more</button>
            </div>
            {offeredSkills.length === 0 ? <p className="text-secondary text-sm">No skills added yet</p> : (
              <div className="flex flex-wrap gap-2">
                {offeredSkills.map((s) => (
                  <span key={s._id} className="px-3 py-1 rounded-lg text-sm font-medium"
                    style={{ backgroundColor:"rgba(96,165,250,0.1)", color:"#60a5fa", border:"1px solid rgba(96,165,250,0.2)" }}>{s.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Skills Wanted */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">Skills I Want to Learn</h2>
              <button onClick={() => navigate("/skills-wanted")} style={{ color:"#818cf8", background:"none", border:"none", cursor:"pointer", fontSize:"0.875rem" }}>+ Add more</button>
            </div>
            {wantedSkills.length === 0 ? <p className="text-secondary text-sm">No skills added yet</p> : (
              <div className="flex flex-wrap gap-2">
                {wantedSkills.map((s) => (
                  <span key={s._id} className="px-3 py-1 rounded-lg text-sm font-medium"
                    style={{ backgroundColor:"rgba(52,211,153,0.1)", color:"#34d399", border:"1px solid rgba(52,211,153,0.2)" }}>{s.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Feedback */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">
                Feedback & Ratings
                {feedback.averageRating && <span className="ml-2 text-sm font-normal text-secondary">({feedback.averageRating} ★ · {feedback.totalRatings} reviews)</span>}
              </h2>
              <button onClick={() => navigate(`/feedback/${user._id}`)} style={{ color:"#818cf8", background:"none", border:"none", cursor:"pointer", fontSize:"0.875rem" }}>View all →</button>
            </div>
            {feedback.feedbacks.length === 0 ? <p className="text-secondary text-sm">No feedback received yet.</p> : (
              <div className="space-y-3">
                {feedback.feedbacks.slice(0, 3).map((f) => (
                  <div key={f._id} className="p-3 rounded-xl" style={{ backgroundColor:"var(--bg-secondary)" }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-primary">{f.fromUser?.fullName || "Anonymous"}</p>
                      <StarDisplay rating={f.rating} />
                    </div>
                    <p className="text-xs text-secondary line-clamp-2">{f.comment}</p>
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
