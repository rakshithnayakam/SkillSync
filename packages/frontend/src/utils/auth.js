import { useState, useEffect } from "react";
import API from "../api/axios";

export const isLoggedIn = () => {
  return Boolean(localStorage.getItem("accessToken"));
};

export const logout = async () => {
  await API.post("/auth/logout");
  localStorage.removeItem("accessToken");
  window.dispatchEvent(new Event("storage"));
};

export const useIsLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(isLoggedIn());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { loggedIn, loading };
};
