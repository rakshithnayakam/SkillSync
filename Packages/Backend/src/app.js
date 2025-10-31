import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Basic configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// Import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/users.routes.js";
import skillsRouter from "./routes/skills.routes.js";
import sessionsRoutes from "./routes/sessions.routes.js";
import walletRoutes from "./routes/walllet.routes.js";
import matchMakingRoutes from "./routes/matchMaking.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/skills", skillsRouter);
app.use("/api/v1/match", matchMakingRoutes);
app.use("/api/v1/sessions", sessionsRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
