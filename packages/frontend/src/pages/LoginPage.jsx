import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
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

    skillsOffered: "",
    skillsWanted: "",

    identifier: "", // login only
  };

  const [formData, setFormData] = React.useState(initialFormState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          return toast.error("Passwords do not match");
        }

        const payload = {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,

          age: Number(formData.age),

          password: formData.password,

          role: formData.role,

          skillsOffered: formData.skillsOffered.split(",").map((s) => s.trim()),

          skillsWanted: formData.skillsWanted.split(",").map((s) => s.trim()),
        };
        const res = await axios.post("/auth/register", payload, {
          withCredentials: true,
        });
        toast.success("Signup successful. Redirecting...");
        setFormData(initialFormState);
        navigate("/login");
        console.log("Signup success:", res.data);
      } else {
        // Login logic

        const res = await axios.post(
          "/auth/login",
          {
            identifier: formData.identifier,
            password: formData.password,
          },
          {
            withCredentials: true,
          },
        );
        toast.success("Login successful. Redirecting to Home page...");
        setFormData(initialFormState);
        navigate("/");
        console.log("Login data successfully sent:", res.data);
      }
    } catch (error) {
      if (isSignup) {
        console.error(
          "Error during signup:",
          error.response?.data || error.message,
        );
        alert(error.response?.data?.message || "Signup failed");
      } else {
        console.error(
          "Error during login:",
          error.response?.data || error.message,
        );
        alert(error.response?.data?.message || "Login failed");
      }
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

          <p className="mt-6 max-w-md opacity-90">
            {isSignup
              ? "Create your account and start connecting with learners and mentors worldwide."
              : "Login and continue your journey of learning and collaboration."}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white/70 backdrop-blur-2xl">
          <div className="w-105 rounded-3xl shadow-2xl p-10 bg-white/90">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignup ? "Create Account 🚀" : "Welcome Back 👋"}
            </h3>

            <p className="text-sm text-gray-500 mb-8">
              {isSignup
                ? "Join SkillSync in less than a minute"
                : "Login to your SkillSync account"}
            </p>
            {/* SignUp or Login Page Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Fullname for Signup only */}
              {isSignup && (
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  transition-all"
                />
              )}
              {/* Username only for signup */}
              {isSignup && (
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  transition-all"
                />
              )}
              {/* Email or Username for login */}
              {!isSignup && (
                <input
                  id="identifier"
                  type="text"
                  placeholder="Email or Username"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  transition-all"
                />
              )}
              {/* Email for signup only */}
              {isSignup && (
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
                />
              )}
              {/* Age for signup only */}
              {isSignup && (
                <input
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
                />
              )}
              {/* Password */}
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
              />
              {/* Confirm Password for signup only */}
              {isSignup && (
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  transition-all"
                />
              )}
              {/* Role selection for signup only */}
              {isSignup && (
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Select Role
                  </label>

                  <select
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
      focus:outline-none focus:ring-2 focus:ring-teal-500
      transition-all bg-white"
                  >
                    <option value="">Select role</option>

                    <option value="Learner">Learner</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              )}
              {/* Email for signup only */}
              {isSignup && (
                <input
                  id="skillsWanted"
                  type="text"
                  placeholder="Skills Wanted (comma separated)"
                  value={formData.skillsWanted}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
                />
              )}
              {/* Email for signup only */}
              {isSignup && (
                <input
                  id="skillsOffered"
                  type="text"
                  placeholder="Skills Offered (comma separated)"
                  value={formData.skillsOffered}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
                />
              )}
              <button
                className="w-full py-3 rounded-xl bg-linear-to-r from-teal-500 to-cyan-500
                text-white font-semibold tracking-wide
                hover:scale-[1.02] active:scale-[0.98]
                transition-transform duration-200"
              >
                {isSignup ? "Create Account" : "Login"}
              </button>
            </form>

            <div className="my-6 text-center text-gray-400 text-sm">or</div>
            {/* SignUp or Login Page redirect */}
            <p className="text-center text-sm text-gray-600">
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
