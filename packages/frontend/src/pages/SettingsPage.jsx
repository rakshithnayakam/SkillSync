import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const inp = { width:"100%", marginTop:"0.25rem", padding:"0.7rem 1rem", borderRadius:"0.75rem", border:"1px solid var(--border)", backgroundColor:"var(--bg-secondary)", color:"var(--text-primary)", fontSize:"0.875rem", outline:"none", boxSizing:"border-box" };

const SettingsPage = () => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]       = useState("account");
  const [pw, setPw]         = useState({ oldPassword:"", newPassword:"", confirmPassword:"" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get("/auth/current-user")
      .then(r => setUser(r.data.data))
      .catch(() => toast.error("Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  const handleChangePw = async () => {
    if (!pw.oldPassword || !pw.newPassword) { toast.error("Fill all fields"); return; }
    if (pw.newPassword !== pw.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (pw.newPassword.length < 6) { toast.error("Min 6 characters"); return; }
    setSaving(true);
    try {
      await API.post("/auth/change-password", { oldPassword: pw.oldPassword, newPassword: pw.newPassword });
      toast.success("Password changed!");
      setPw({ oldPassword:"", newPassword:"", confirmPassword:"" });
    } catch(e) { toast.error(e.response?.data?.message || "Failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your account permanently? This cannot be undone.")) return;
    try {
      await API.delete(`/users/${user._id}`);
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch { toast.error("Failed to delete account"); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor:"var(--bg-primary)" }}>
      <p className="text-secondary">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor:"var(--bg-primary)" }}>
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-60 min-h-screen">
        <div className="p-8 max-w-3xl mx-auto space-y-6">

          {/* Page header */}
          <div>
            <h1 className="text-2xl font-bold text-primary">Settings</h1>
            <p className="text-sm text-secondary mt-1">Manage your account preferences</p>
          </div>

          {/* Tab bar */}
          <div className="flex gap-2">
            {[
              { id:"account",  label:"Account",    icon:"👤" },
              { id:"security", label:"Security",   icon:"🔐" },
              { id:"danger",   label:"Danger Zone", icon:"⚠️" },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
                style={tab === t.id
                  ? { background:"linear-gradient(135deg,#4f46e5,#7c3aed)", color:"white", border:"none", cursor:"pointer" }
                  : { backgroundColor:"var(--bg-card)", color:"var(--text-secondary)", border:"1px solid var(--border)", cursor:"pointer" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Account Tab */}
          {tab === "account" && (
            <div className="card rounded-2xl overflow-hidden">
              <div className="px-6 py-4" style={{ borderBottom:"1px solid var(--border)", background:"linear-gradient(135deg,rgba(79,70,229,0.08),rgba(124,58,237,0.05))" }}>
                <h2 className="text-base font-semibold text-primary">Account Information</h2>
              </div>
              <div className="p-6">
                {[
                  { label:"Full Name",    value: user?.fullName },
                  { label:"Username",     value: `@${user?.username}` },
                  { label:"Email",        value: user?.email },
                  { label:"Member Since", value: new Date(user?.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3.5" style={{ borderBottom:"1px solid var(--border)" }}>
                    <span className="text-secondary text-sm">{label}</span>
                    <span className="font-medium text-primary text-sm">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3.5">
                  <span className="text-secondary text-sm">Role</span>
                  <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor:"rgba(129,140,248,0.12)", color:"#818cf8" }}>
                    {user?.role}
                  </span>
                </div>
                <p className="text-xs text-muted mt-4">
                  To update profile info, go to the{" "}
                  <a href="/profile" style={{ color:"#818cf8" }}>Profile page</a>
                </p>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {tab === "security" && (
            <div className="card rounded-2xl overflow-hidden">
              <div className="px-6 py-4" style={{ borderBottom:"1px solid var(--border)", background:"linear-gradient(135deg,rgba(79,70,229,0.08),rgba(124,58,237,0.05))" }}>
                <h2 className="text-base font-semibold text-primary">Change Password</h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { key:"oldPassword",     label:"Current Password" },
                  { key:"newPassword",     label:"New Password" },
                  { key:"confirmPassword", label:"Confirm New Password" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label style={{ fontSize:"0.875rem", color:"var(--text-secondary)", display:"block", marginBottom:"0.25rem" }}>{label}</label>
                    <input type="password" value={pw[key]}
                      onChange={e => setPw({ ...pw, [key]: e.target.value })}
                      placeholder={`Enter ${label.toLowerCase()}...`} style={inp} />
                  </div>
                ))}
                <button onClick={handleChangePw} disabled={saving}
                  className="w-full py-3 rounded-xl text-white font-semibold text-sm mt-2"
                  style={{ background:"linear-gradient(135deg,#4f46e5,#7c3aed)", border:"none", cursor:"pointer", opacity: saving ? 0.6 : 1 }}>
                  {saving ? "Changing..." : "Change Password"}
                </button>
              </div>
            </div>
          )}

          {/* Danger Zone Tab */}
          {tab === "danger" && (
            <div className="card rounded-2xl overflow-hidden" style={{ borderColor:"rgba(248,113,113,0.3)" }}>
              <div className="px-6 py-4" style={{ borderBottom:"1px solid rgba(248,113,113,0.2)", backgroundColor:"rgba(248,113,113,0.05)" }}>
                <h2 className="text-base font-semibold" style={{ color:"#f87171" }}>⚠️ Danger Zone</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-secondary mb-5">These actions are permanent and cannot be undone.</p>
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor:"rgba(248,113,113,0.05)", border:"1px solid rgba(248,113,113,0.15)" }}>
                  <div>
                    <p className="font-semibold text-primary text-sm">Delete Account</p>
                    <p className="text-xs text-secondary mt-0.5">Permanently delete your account and all data</p>
                  </div>
                  <button onClick={handleDelete}
                    className="px-4 py-2 rounded-xl text-white text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor:"#ef4444", border:"none", cursor:"pointer" }}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
export default SettingsPage;
