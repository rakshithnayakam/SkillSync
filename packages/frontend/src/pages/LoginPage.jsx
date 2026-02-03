import React from "react";
import { useLocation, Link, useNavigate, redirect } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const navigate = useNavigate();

  const initialFormState = {
    fullName: "",
    username: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    role: "Learner",
    identifier: "",
  };

  const [formData, setFormData] = React.useState(initialFormState);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (isSignup) {
        // 🔐 SIGNUP
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        const res = await axios.post("/auth/register", formData);

        if (res.status === 201 || res.status === 200) {
          toast.success("Signup successful");
          setFormData(initialFormState);
          navigate("/skills-wanted");
        }
      } else {
        // 🔐 LOGIN
        const res = await axios.post("/auth/login", {
          identifier: formData.identifier,
          password: formData.password,
        });
        console.log(res.status);
        
        // ✅ ONLY SUCCESS PATH
        if (res.status === 200) {
          toast.success("Login successful");
          setFormData(initialFormState);
          redirect("/dashboard");
        }
      }
    } catch (error) {
      // ❌ FAILURE PATH (401, 400, 500 etc)
      console.error("Auth error:", error.response);

      toast.error(
        error.response?.data?.message ||
          (isSignup ? "Signup failed" : "Invalid credentials")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="w-full h-full flex">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/2 flex-col justify-center px-24 text-white bg-linear-to-br from-teal-600 to-cyan-600">
          <h1 className="text-4xl font-bold mb-4">SkillSync</h1>
          <p className="text-lg opacity-90 mb-10">
            Learn by Teaching, Teach by Learning
          </p>

          <h2 className="text-5xl font-extrabold leading-tight">
            Exchange Skills. <br />
            <span className="text-yellow-300">Build Your Future.</span>
          </h2>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white/70 backdrop-blur-2xl">
          <div className="w-105 rounded-3xl shadow-2xl p-10 bg-white/90">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignup ? "Create Account 🚀" : "Welcome Back 👋"}
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignup && (
                <>
                  <input id="fullName" placeholder="Full Name" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
                  <input id="username" placeholder="Username" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
                  <input id="email" type="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
                  <input id="age" type="number" placeholder="Age" onChange={handleChange} className="w-full px-4 py-3 rounded-xl border" />
                </>
              )}

              {!isSignup && (
                <input
                  id="identifier"
                  placeholder="Email or Username"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border"
                />
              )}

              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border"
              />

              {isSignup && (
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border"
                />
              )}

              {isSignup && (
                <select
                  id="role"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border bg-white"
                >
                  <option value="Learner">Learner</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              )}

              <button
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              {isSignup ? "Already have an account?" : "Don’t have an account?"}
              <Link
                to={isSignup ? "/login" : "/signup"}
                className="text-teal-600 font-semibold ml-1 hover:underline"
              >
                {isSignup ? "Login" : "Sign up"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
