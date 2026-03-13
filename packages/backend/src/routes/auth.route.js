import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  getCurrentUserController,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/current-user", verifyJWT, getCurrentUserController)

export default router;
