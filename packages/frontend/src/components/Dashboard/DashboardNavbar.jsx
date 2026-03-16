import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/axios";
import NotificationsDropdown from "./Notifications.jsx";

const DashboardNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try { await logoutUser(); } catch {}
    finally { localStorage.clear(); window.location.href = "/login"; }
  };

  return (
    <header className="navbar fixed top-0 left-0 right-0 h-16 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
            <span className="text-white font-black text-sm">S</span>
          </div>
          <span className="text-lg font-bold text-primary">SkillSync</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <NotificationsDropdown />
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)}
              className="w-9 h-9 rounded-full text-white font-bold flex items-center justify-center text-sm"
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", border: "none", cursor: "pointer" }}>
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl shadow-2xl z-50 overflow-hidden"
                style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <p className="font-semibold text-primary text-sm">{user?.fullName}</p>
                  <p className="text-xs text-secondary truncate">{user?.email}</p>
                </div>
                {[
                  { icon: "👤", label: "Profile",  path: "/profile"  },
                  { icon: "⚙️", label: "Settings", path: "/settings" },
                  { icon: "🛡️", label: "Admin",    path: "/admin"    },
                ].map(({ icon, label, path }) => (
                  <button key={path} onClick={() => { setShowDropdown(false); navigate(path); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-secondary"
                    style={{ background: "none", border: "none", cursor: "pointer", display: "block" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--bg-secondary)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                    {icon} {label}
                  </button>
                ))}
                <div style={{ borderTop: "1px solid var(--border)" }}>
                  <button onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", display: "block" }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.08)"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
