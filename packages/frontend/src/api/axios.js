import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default API;

// Skills
export const saveSkills = (skills, type) =>
  API.post("/user-skills", { skills, type });
