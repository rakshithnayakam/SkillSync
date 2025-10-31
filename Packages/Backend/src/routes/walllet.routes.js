import { Router } from "express";
import { adminAuth, verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  getUserWalletDetails,
  giveRewards,
  transferTokens,
} from "../controllers/walllet.controller.js";

const router = Router();

//secured routes
router.route("/").get(verifyUserJWT, getUserWalletDetails);
router.route("/transfer").post(verifyUserJWT, transferTokens);
router.route("/reward").post(adminAuth, giveRewards);

export default router;
