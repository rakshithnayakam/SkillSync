import React from "react";
import { HandWaveIcon } from "./Icons";

const WelcomeBanner = ({ user }) => {
  return (
    <div className="bg-indigo-700/95 text-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold mb-1 flex items-center gap-2">
        Welcome back, {user?.fullName || "User"}{" "}
        <HandWaveIcon className="w-6 h-6" />
      </h1>
      <p className="text-indigo-200 text-lg">
        You're on track! Keep up the great work learning and sharing skills.
      </p>
    </div>
  );
};

export default WelcomeBanner;
