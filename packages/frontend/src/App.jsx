import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SkillsWantedPage from "./pages/SkillWantedPage";
import SkillsOfferedPage from "./pages/skillofferedPage";

import { isLoggedIn } from "./utils/auth";

const App = () => {
  const loggedIn = isLoggedIn();

  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
        />

        {/* Onboarding (protected) */}
        <Route
          path="/skills-wanted"
          element={
            loggedIn ? <SkillsWantedPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/skills-offered"
          element={
            loggedIn ? <SkillsOfferedPage /> : <Navigate to="/login" />
          }
        />

        {/* Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
