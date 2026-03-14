import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  createFeedbackController,
  getFeedbackForUserController,
  deleteFeedbackController,
} from "../controllers/feedback.controller.js";

const router = Router();

router.route("/").post(verifyJWT, createFeedbackController);
router.route("/:userId").get(verifyJWT, getFeedbackForUserController);
router.route("/:id").delete(verifyJWT, deleteFeedbackController);

export default router;