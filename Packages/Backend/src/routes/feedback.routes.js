import Router from "express";
import { verifyUserJWT, adminAuth  } from "../middlewares/auth.middleware.js";
import { createFeedback, getAllFeedback, deleteFeedback } from "../controllers/feedback.controller.js";

const router = Router();

// **Feedback Routes** (`/api/v1/feedback/`)

// - `POST /` – Submit feedback
// - `GET /:userId` – View feedback for a user
// - `DELETE /:id` – Remove feedback (Admin only).

router.route("/").post(verifyUserJWT,createFeedback);

router.route("/:id").get(verifyUserJWT, getAllFeedback);

router.route("/:id").delete(adminAuth, deleteFeedback);

export default router;