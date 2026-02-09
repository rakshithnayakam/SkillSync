import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/auth.route.js";
import userSkillRoute from "./routes/userSkill.route.js";

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files
app.use(express.static("public"));

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/skills", userSkillRoute);

export default app;
