import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SkillsWantedPage from "./pages/SkillWantedPage.jsx";
import SkillsOfferedPage from "./pages/SkillOfferedPage.jsx";

import { useIsLoggedIn } from "./utils/auth";

const App = () => {
  const { loggedIn, loading } = useIsLoggedIn();

  if (loading) return <div>Loading...</div>;

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
          element={loggedIn ? <SkillsWantedPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/skills-offered"
          element={loggedIn ? <SkillsOfferedPage /> : <Navigate to="/login" />}
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
