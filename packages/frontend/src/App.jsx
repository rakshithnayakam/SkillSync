import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SkillsWantedPage from "./pages/SkillWantedPage.jsx";
import SkillsOfferedPage from "./pages/SkillOfferedPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import MySkillsPage from "./pages/MySkillsPage.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
import SessionsPage from "./pages/SessionsPage.jsx";
import WalletPage from "./pages/WalletPage.jsx";

import { useIsLoggedIn } from "./utils/auth";

import BadgesPage      from "./pages/BadgesPage";
import MatchmakingPage from "./pages/MatchmakingPage";
import NotFoundPage    from "./pages/NotFoundPage";

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
          path="/my-skills"
          element={loggedIn ? <MySkillsPage /> : <Navigate to="/login" />}
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

        <Route
          path="/profile"
          element={loggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/requests"
          element={loggedIn ? <RequestsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/sessions"
          element={loggedIn ? <SessionsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/wallet"
          element={loggedIn ? <WalletPage /> : <Navigate to="/login" />}
        />

        <Route 
        path="/badges"      
        element={loggedIn ? <BadgesPage />      : <Navigate to="/login" />} 
        />

        <Route 
        path="/matchmaking" 
        element={loggedIn ? <MatchmakingPage /> : <Navigate to="/login" />} 
        />
        
        <Route 
        path="*"            
        element={<NotFoundPage />} 
        />

        {/* Catch-all */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
};

export default App;
