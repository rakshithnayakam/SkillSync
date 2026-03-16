import React from "react";

const WelcomeBanner = ({ user }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative overflow-hidden rounded-2xl p-7 text-white"
      style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)" }}>
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: "white" }} />
      <div className="absolute -bottom-10 right-20 w-28 h-28 rounded-full opacity-10"
        style={{ backgroundColor: "white" }} />
      <div className="absolute top-4 right-40 w-16 h-16 rounded-full opacity-10"
        style={{ backgroundColor: "white" }} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-indigo-200 text-sm font-medium mb-1">{greeting} 👋</p>
          <h1 className="text-3xl font-extrabold mb-2">{user?.fullName || "User"}</h1>
          <p className="text-indigo-200 text-sm max-w-md">
            You're on track! Keep up the great work learning and sharing skills.
          </p>
          <div className="flex gap-3 mt-4">
            <div className="px-3 py-1.5 rounded-lg text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <p className="text-lg font-bold">{user?.xp || 0}</p>
              <p className="text-xs" style={{ color: "rgba(199,210,254,0.8)" }}>Total XP</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <p className="text-lg font-bold">{user?.role || "—"}</p>
              <p className="text-xs" style={{ color: "rgba(199,210,254,0.8)" }}>Role</p>
            </div>
          </div>
        </div>
        {/* Big initial avatar */}
        <div className="hidden md:flex w-20 h-20 rounded-2xl items-center justify-center text-4xl font-black flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
          {user?.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
