import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.BACKEND_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
});

export default API;



export const saveSkills = (skills, type) =>
  API.post("/skills/save", { skills, type });
