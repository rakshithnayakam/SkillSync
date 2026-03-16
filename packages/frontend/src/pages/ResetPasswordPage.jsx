import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [searchParams]          = useSearchParams();
  const token                   = searchParams.get("token");
  const [newPassword, setNew]   = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) { toast.error("Enter a new password"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (newPassword !== confirm) { toast.error("Passwords do not match"); return; }
    if (!token) { toast.error("Invalid reset link"); return; }

    setLoading(true);
    try {
      await API.post("/auth/reset-password", { token, newPassword });
      setDone(true);
      toast.success("Password reset successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed. Link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-4xl mb-3">❌</p>
          <p className="text-lg font-semibold text-gray-700">Invalid reset link</p>
          <Link to="/forgot-password" className="text-teal-600 hover:underline text-sm mt-2 block">
            Request a new one
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="w-full h-full flex">
        {/* LEFT */}
        <div className="hidden md:flex w-1/2 flex-col justify-center px-24 text-white bg-gradient-to-br from-teal-600 to-cyan-600">
          <h1 className="text-4xl font-bold mb-4">SkillSync</h1>
          <p className="text-lg opacity-90 mb-10">Learn by Teaching, Teach by Learning</p>
          <h2 className="text-5xl font-extrabold leading-tight">
            Set a new <br />
            <span className="text-yellow-300">password.</span>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-2xl">
          <div className="w-full max-w-md rounded-3xl shadow-2xl p-10 bg-white dark:bg-gray-900/90">
            {done ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Password Reset!</h3>
                <p className="text-muted text-sm mb-6">
                  Your password has been updated. You can now log in.
                </p>
                <Link
                  to="/login"
                  className="inline-block py-3 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-primary mb-2">New Password 🔑</h3>
                <p className="text-muted text-sm mb-6">
                  Choose a strong password for your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNew(e.target.value)}
                    placeholder="New password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition disabled:opacity-50"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;