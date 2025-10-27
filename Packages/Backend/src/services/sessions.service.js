import { Session } from "../models/sessions.models.js";
import { ApiError } from "../utils/api-error.js";

const getSessions = async (user) => {
  const sessions = await Session.find({
    $or: [{ mentorId: user._id }, { learnerId: user._id }],
  })
    .populate("mentorId", "username email")
    .populate("learnerId", "username email");

  if (sessions.length === 0) {
    throw new ApiError(408, "You have no sessions!!");
  }
  return sessions;
};

export { getSessions };
