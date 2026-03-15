import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  refreshTokenController,
  changePasswordController,
  logoutUserController,
  forgotPasswordController,
  resetPasswordController,
  sendVerificationEmailController,
  verifyEmailController,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/current-user", verifyJWT, getCurrentUserController);
router.post("/refresh-token", refreshTokenController);
router.post("/change-password", verifyJWT, changePasswordController);
router.post("/logout", verifyJWT, logoutUserController);
router.post("/forgot-password",            forgotPasswordController);
router.post("/reset-password",             resetPasswordController);
router.post("/resend-email-verification",  verifyJWT, sendVerificationEmailController);
router.get("/verify-email/:token",         verifyEmailController);

export default router;
