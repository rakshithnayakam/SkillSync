import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/axios";
import toast from "react-hot-toast";

const BellIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.857 17.082a23.848 23.848 0 005.424-1.921M5.429 9.75a20.863 20.863 0 012.402-5.231m0 0a20.844 20.844 0 014.882-2.001A6.44 6.44 0 0112 2.75c1.397 0 2.749.356 3.887 1.018a20.844 20.844 0 014.882 2.001m0 0A21.064 21.064 0 0123.75 12c0 5.684-4.316 10.5-10 10.5S3.75 17.684 3.75 12c0-1.935.495-3.759 1.372-5.25m19.874 0c.083.715.11 1.447.11 2.25 0 5.684-4.316 10.5-10 10.5S2.75 17.684 2.75 12c0-.803.027-1.535.11-2.25m19.874 0a24.614 24.614 0 00-1.902-3.846m-2.893-1.421a9.042 9.042 0 00-5.824-1.884c-3.956 0-7.298 2.016-9.25 5.084m16.294 6.744a9.042 9.042 0 01-9.25 5.084c-3.956 0-7.298-2.016-9.25-5.084m16.294-6.744l-2.893 1.421"
    />
  </svg>
);

const MessageIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0v-.243a2.25 2.25 0 00-1.07-1.916l-7.007-4.471a2.25 2.25 0 00-2.36 0l-7.007 4.472a2.25 2.25 0 00-1.07 1.916v.243"
    />
  </svg>
);

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500">
      <div className="w-4 h-4 rounded-full border-2 border-white bg-red-400"></div>
    </div>
    <span className="text-xl font-semibold text-gray-800">SkillSync</span>
  </div>
);

const DashboardNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore
    } finally {
      localStorage.clear();
      window.location.href = "/login";
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-40">
      <div className="flex items-center justify-between h-full px-6">
        <Logo />

        <div className="flex items-center space-x-5 text-gray-500">
          {/* Bell */}
          <div className="relative cursor-pointer">
            <BellIcon className="w-6 h-6" />
          </div>

          {/* Message */}
          <div className="relative cursor-pointer">
            <MessageIcon className="w-6 h-6" />
          </div>

          {/* User Avatar + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-9 h-9 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center hover:bg-indigo-600"
            >
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-800">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  👤 Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
