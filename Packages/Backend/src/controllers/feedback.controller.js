// feedback.controller.js
import { body } from "express-validator";
import {
  createFeedbackService,
  getUserFeedbacksService,
  deleteFeedbackService,
} from "../services/feedbacks.services.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandlers } from "../utils/async-handlers.js";

/**
 * Create new feedback
 */

const createFeedback = asyncHandlers(async (req, res) => {
  const { toUser, rating, comment } = req.body;
  const fromUser = req.user?._id;

  const feedback = await createFeedbackService(fromUser, toUser, rating, comment);

  res
    .status(201)
    .json(new ApiResponse(201, feedback, "Feedback submitted successfully"));
});

/**
 * Get feedbacks (sent + received) by user
 */

const getAllFeedback = asyncHandlers(async (req, res) => {
  const {id} = req.params;
  

  const { sentFeedbacks, receivedFeedbacks } =
    await getUserFeedbacksService(id);

  res.status(200).json(
    new ApiResponse(200, { sentFeedbacks, receivedFeedbacks }, "Feedbacks fetched successfully")
  );
});

/**
 * Delete feedback (Admin only)
 */

const deleteFeedback = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  const user = req.user;


  await deleteFeedbackService(id, user);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Feedback deleted successfully"));
});

export { createFeedback, getAllFeedback, deleteFeedback };
