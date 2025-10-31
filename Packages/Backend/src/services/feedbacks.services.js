
import { Feedback } from "../models/feedback.models.js";
import { ApiError } from "../utils/api-error.js";

/**
 * Create new feedback
 */

const createFeedbackService = async (fromUser, toUser, rating, comment) => {
  if (!fromUser || !toUser) {
    throw new ApiError(400, "Both fromUser and toUser are required");
  }

  const numRating = Number(rating);

  if (isNaN(numRating)) {
    throw new ApiError(400, "Rating must be a number");
  }

  if (numRating < 0 || numRating > 5) {
    throw new ApiError(400, "Rating must be between 0 and 5");
  }

  const feedback = await Feedback.create({
    fromUser,
    toUser,
    rating: numRating,
    comment,
  });

  return feedback;
};

/**
 * Get feedbacks sent and received by a user
 */

const getUserFeedbacksService = async (userId) => {
  
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const sentFeedbacks = await Feedback.find({ fromUser: userId }).sort({
    createdAt: -1,
  });

  const receivedFeedbacks = await Feedback.find({ toUser: userId }).sort({
    createdAt: -1,
  });

  return { sentFeedbacks, receivedFeedbacks };
};

/**
 * Delete a feedback (Admin only)
 */

const deleteFeedbackService = async (id, user) => {
  if (!user || user.role !== "Admin") {
    throw new ApiError(403, "Access denied. Only admins can delete feedback");
  }

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    throw new ApiError(404, "Feedback not found");
  }

  await Feedback.findByIdAndDelete(id);

  return true;
};

export {
  createFeedbackService,
  getUserFeedbacksService,
  deleteFeedbackService,
};
