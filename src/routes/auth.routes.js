import { Router } from "express";
import {
  forgotPassowordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccesstoken,
  registerUser,
  resendVerficationEmail,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecured routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verify-email/:token").get(verifyEmail);
router
  .route("/forgot-password")
  .get(userForgotPasswordValidator(), [], forgotPassowordRequest);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router
  .route("/resend-email-verfication")
  .post(verifyJWT, resendVerficationEmail);
router.route("/refresh-token").post(refreshAccesstoken);

export default router;
