import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default API;

// Auth
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const logoutUser = () => API.post("/auth/logout");

// Skills
export const getAllSkills = () => API.get("/skills");

// User Skills
export const saveSkills = (data) => API.post("/user-skills", data);
export const getUserSkills = () => API.get("/user-skills/me");

// Progress
export const getProgress = () => API.get("/progress");

// Requests
export const getRequests = () => API.get("/requests");
