import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  getMyBadgesController,
  getUserBadgesController,
  syncBadgesController,
} from "../controllers/badges.controller.js";

const router = Router();

router.get("/me",       verifyJWT, getMyBadgesController);
router.get("/user/:id", verifyJWT, getUserBadgesController);
router.post("/sync",    verifyJWT, syncBadgesController);

export default router;