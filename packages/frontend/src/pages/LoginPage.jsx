import React from "react";
import { useLocation, Link } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg">
      <div className="w-full h-full flex">

        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/2 flex-col justify-center px-24 text-white bg-gradient-to-br from-teal-600 to-cyan-600">
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
          <div className="w-[420px] rounded-3xl shadow-2xl p-10 bg-white/90">

            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignup ? "Create Account 🚀" : "Welcome Back 👋"}
            </h3>

            <p className="text-sm text-gray-500 mb-8">
              {isSignup
                ? "Join SkillSync in less than a minute"
                : "Login to your SkillSync account"}
            </p>

            <div className="space-y-4">

              {/* Username only for signup */}
              {isSignup && (
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  transition-all"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-all"
              />

              {isSignup && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  transition-all"
                />
              )}

              <button
                className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500
                text-white font-semibold tracking-wide
                hover:scale-[1.02] active:scale-[0.98]
                transition-transform duration-200"
              >
                {isSignup ? "Create Account" : "Login"}
              </button>
            </div>

            <div className="my-6 text-center text-gray-400 text-sm">or</div>

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
