import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  refreshTokenController,
  changePasswordController
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/current-user", verifyJWT, getCurrentUserController)
router.post("/refresh-token", refreshTokenController)
router.post("/change-password", verifyJWT, changePasswordController)

export default router;
