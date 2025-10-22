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
  resetForgotPassword,
  changeCurrentPassword,
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
  .get(userForgotPasswordValidator(), validate, forgotPassowordRequest);

router
  .route("/reset-password/:token")
  .post(userForgotPasswordValidator(), validate, resetForgotPassword);

//secured routes
router.route("/logout").post(verifyUserJWT, logoutUser);
router.route("/current-user").get(verifyUserJWT, getCurrentUser);
router
  .route("/resend-email-verfication")
  .post(verifyUserJWT, resendVerficationEmail);
router.route("/refresh-token").post(refreshAccesstoken);
router
  .route("/change-password")
  .post(
    verifyUserJWT,
    userForgotPasswordValidator(),
    validate,
    changeCurrentPassword,
  );

export default router;
