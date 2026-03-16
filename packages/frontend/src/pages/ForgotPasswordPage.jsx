import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  useEffect(() => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark")
  }
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Enter your email"); return; }
    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email: email.trim() });
      setSent(true);
      toast.success("Reset email sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="w-full h-full flex">
        {/* LEFT */}
        <div className="hidden md:flex w-1/2 flex-col justify-center px-24 text-white bg-gradient-to-br from-teal-600 to-cyan-600">
          <h1 className="text-4xl font-bold mb-4">SkillSync</h1>
          <p className="text-lg opacity-90 mb-10">Learn by Teaching, Teach by Learning</p>
          <h2 className="text-5xl font-extrabold leading-tight">
            Forgot your <br />
            <span className="text-yellow-300">password?</span>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-2xl">
          <div className="w-full max-w-md rounded-3xl shadow-2xl p-10 bg-white dark:bg-gray-900/90">
            {sent ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📧</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Check your email</h3>
                <p className="text-muted text-sm mb-6">
                  We sent a password reset link to <strong>{email}</strong>. It expires in 1 hour.
                </p>
                <Link
                  to="/login"
                  className="text-teal-600 font-semibold hover:underline text-sm"
                >
                  ← Back to Login
                </Link>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold text-primary mb-2">Reset Password 🔐</h3>
                <p className="text-muted text-sm mb-6">
                  Enter your email and we'll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>

                <p className="text-center text-sm text-secondary mt-6">
                  Remember your password?{" "}
                  <Link to="/login" className="text-teal-600 font-semibold hover:underline">
                    Login
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;