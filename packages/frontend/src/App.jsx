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
import BadgesPage from "./pages/BadgesPage.jsx";
import MatchmakingPage from "./pages/MatchmakingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";

// Simple sync check — no loading state needed
const isLoggedIn = () => Boolean(localStorage.getItem("accessToken"));

const Protected = ({ children }) =>
  isLoggedIn() ? children : <Navigate to="/login" replace />;

const GuestOnly = ({ children }) =>
  isLoggedIn() ? <Navigate to="/dashboard" replace /> : children;

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth — guest only */}
        <Route
          path="/login"
          element={
            <GuestOnly>
              <LoginPage />
            </GuestOnly>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestOnly>
              <LoginPage />
            </GuestOnly>
          }
        />

        {/* Password reset — public */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Email verification — public */}
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Onboarding — protected */}
        <Route
          path="/skills-wanted"
          element={
            <Protected>
              <SkillsWantedPage />
            </Protected>
          }
        />
        <Route
          path="/skills-offered"
          element={
            <Protected>
              <SkillsOfferedPage />
            </Protected>
          }
        />
        <Route
          path="/my-skills"
          element={
            <Protected>
              <MySkillsPage />
            </Protected>
          }
        />

        {/* Dashboard — protected */}
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <ProfilePage />
            </Protected>
          }
        />
        <Route
          path="/requests"
          element={
            <Protected>
              <RequestsPage />
            </Protected>
          }
        />
        <Route
          path="/sessions"
          element={
            <Protected>
              <SessionsPage />
            </Protected>
          }
        />
        <Route
          path="/wallet"
          element={
            <Protected>
              <WalletPage />
            </Protected>
          }
        />
        <Route
          path="/badges"
          element={
            <Protected>
              <BadgesPage />
            </Protected>
          }
        />
        <Route
          path="/matchmaking"
          element={
            <Protected>
              <MatchmakingPage />
            </Protected>
          }
        />
        <Route
          path="/feedback"
          element={
            <Protected>
              <FeedbackPage />
            </Protected>
          }
        />
        <Route
          path="/feedback/:userId"
          element={
            <Protected>
              <FeedbackPage />
            </Protected>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
