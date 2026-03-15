import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getMatchesController } from "../controllers/matchmaking.controller.js";

const router = Router();

router.get("/", verifyJWT, getMatchesController);

export default router;