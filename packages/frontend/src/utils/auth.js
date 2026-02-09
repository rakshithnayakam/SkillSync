import { useState, useEffect } from "react";

export const isLoggedIn = () => {
  return Boolean(localStorage.getItem("accessToken"));
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  // Force a storage event for other listeners
  window.dispatchEvent(new Event("storage"));
};

// Hook for reactive login state (re-renders when localStorage changes)
export const useIsLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    // Listen for storage changes (from same tab or others)
    const handleStorageChange = () => {
      setLoggedIn(isLoggedIn());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return loggedIn;
};
