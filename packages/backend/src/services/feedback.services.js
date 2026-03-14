import Feedback from "../models/feedback.models.js";
import ApiError from "../utils/ApiError.js";

export const createFeedbackService = async (fromUser, { toUser, rating, comment }) => {
  if (fromUser.toString() === toUser.toString()) {
    throw new ApiError(400, "You cannot leave feedback for yourself");
  }
  const feedback = await Feedback.create({ fromUser, toUser, rating, comment });
  return feedback;
};

export const getFeedbackForUserService = async (userId) => {
  const feedbacks = await Feedback.find({ toUser: userId })
    .populate("fromUser", "fullName username")
    .sort({ createdAt: -1 });

  const totalRatings = feedbacks.length;
  const averageRating =
    totalRatings > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalRatings).toFixed(1)
      : null;

  return { feedbacks, totalRatings, averageRating };
};

export const deleteFeedbackService = async (feedbackId) => {
  const feedback = await Feedback.findById(feedbackId);
  if (!feedback) {
    throw new ApiError(404, "Feedback not found");
  }
  await Feedback.findByIdAndDelete(feedbackId);
  return true;
};