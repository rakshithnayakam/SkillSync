import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userSkillRoute from "./routes/userSkill.route.js";




const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


import userRoute from "./routes/auth.route.js";

// routes declaration
app.use("/api/v1/auth", userRoute);

// User Skills routes
app.use("/api/v1/skills", userSkillRoute);


export default app;
