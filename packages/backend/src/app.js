import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import userSkillRoute from "./routes/userSkill.route.js";
import skillRoute from "./routes/skills.route.js";
import requestRoute from "./routes/request.routes.js";
import sessionRoute from "./routes/session.routes.js";
import walletRoute from "./routes/wallet.route.js";
import healthCheckRoute from "./routes/healthcheck.route.js";
import feedbackRouter from "./routes/feedback.routes.js";
import progressRoute from "./routes/progress.route.js";

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/user-skills", userSkillRoute);
app.use("/api/v1/skills", skillRoute);
app.use("/api/v1/requests", requestRoute);
app.use("/api/v1/sessions",sessionRoute);
app.use("/api/v1/wallet", walletRoute);
app.use("/api/v1/healthcheck", healthCheckRoute);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/progress", progressRoute);

export default app;
