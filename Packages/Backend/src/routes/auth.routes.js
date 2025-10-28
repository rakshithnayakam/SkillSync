import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verify-email/:token").get(verifyEmail);
router
  .route("/forgot-password")
  .get(userForgotPasswordValidator(), validate, forgotPassword);

router
  .route("/reset-password/:token")
  .post(userForgotPasswordValidator(), validate, resetPassword);

//secured routes
router.route("/logout").post(verifyUserJWT, logoutUser);
router.route("/current-user").get(verifyUserJWT, getCurrentUser);
router
  .route("/resend-email-verfication")
  .post(verifyUserJWT, resendEmailVerification);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/change-password")
  .post(verifyUserJWT, userForgotPasswordValidator(), validate, updatePassword);

export default router;
