import React from "react";
import Navbar from "../components/LandingPage/Navbar";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../utils/auth";

const LandingPage = () => {
  const navigate = useNavigate();
  const loggedIn = useIsLoggedIn();

  const handleGetStarted = () => {
    if (loggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        onGetStarted={handleGetStarted}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default LandingPage;
