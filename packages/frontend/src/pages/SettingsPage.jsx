import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar.jsx";
import Sidebar from "../components/Dashboard/SideBar.jsx";

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    API.get("/auth/current-user")
      .then((res) => setUser(res.data.data))
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleChangePassword = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setChangingPassword(true);
    try {
      await API.post("/auth/change-password", {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone!")) return;
    try {
      await API.delete(`/users/${user._id}`);
      localStorage.removeItem("accessToken");
      toast.success("Account deleted");
      window.location.href = "/";
    } catch {
      toast.error("Failed to delete account");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <DashboardNavbar user={user} />
      <Sidebar />
      <main className="pt-16 pl-64 p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <h1 className="text-2xl font-bold text-primary">Settings</h1>

          {/* Tabs */}
          <div className="flex gap-2">
            {["account", "security", "danger"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-secondary hover:bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {tab === "danger"
                  ? "⚠️ Danger Zone"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-primary">
                Account Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-secondary">Full Name</span>
                  <span className="font-medium text-primary">
                    {user?.fullName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-secondary">Username</span>
                  <span className="font-medium text-primary">
                    @{user?.username}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-secondary">Email</span>
                  <span className="font-medium text-primary">
                    {user?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-secondary">Role</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {user?.role}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-secondary">Member Since</span>
                  <span className="font-medium text-primary">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                To update your profile info, go to the{" "}
                <a href="/profile" className="text-indigo-600 hover:underline">
                  Profile page
                </a>
              </p>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-primary mb-6">
                Change Password
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full mt-1 p-3 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  disabled={changingPassword}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold disabled:opacity-50"
                >
                  {changingPassword ? "Changing..." : "Change Password"}
                </button>
              </div>
            </div>
          )}

          {/* Danger Zone Tab */}
          {activeTab === "danger" && (
            <div className="card p-6 border-2 border-red-100">
              <h2 className="text-lg font-semibold text-red-600 mb-2">
                Danger Zone
              </h2>
              <p className="text-muted text-sm mb-6">
                These actions are permanent and cannot be undone.
              </p>
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl bg-red-50">
                <div>
                  <p className="font-medium text-primary">Delete Account</p>
                  <p className="text-sm text-muted">
                    Permanently delete your account and all your data
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 font-medium"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
