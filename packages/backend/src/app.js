import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
import userSkillRoute from "./routes/userSkill.route.js";
import skillRoute from "./routes/skills.route.js";
import requestRoute from "./routes/request.routes.js";

// routes declaration
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/user-skills", userSkillRoute);
app.use("/api/v1/skills", skillRoute);
app.use("/api/v1/requests", requestRoute);
app.use("/api/v1/skills", skillRoute);

export default app;
