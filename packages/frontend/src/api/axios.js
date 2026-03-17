import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Attach token from localStorage as Bearer if cookie fails
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token && token !== "1") {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;

// Auth
export const loginUser = (data) => API.post("/api/v1/auth/login", data);
export const registerUser = (data) => API.post("/api/v1/auth/register", data);
export const logoutUser = () => API.post("/api/v1/auth/logout");

// Skills
export const getAllSkills = () => API.get("/skills");

// User Skills
export const saveSkills = (data) => API.post("/user-skills", data);
export const getUserSkills = () => API.get("/user-skills/me");

// Progress
export const getProgress = () => API.get("/api/v1/progress");

// Requests
export const getRequests = () => API.get("/api/v1/requests");
