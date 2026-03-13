// AFTER
import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/logout", verifyJWT, logoutUserController);

export default router;
