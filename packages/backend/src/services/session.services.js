import { syncBadges } from "../controllers/badges.controller.js";
import Session from "../models/session.models.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get all sessions for the logged-in user
 * Returns sessions where the user is either the teacher or the learner
 */
export const getAllSessionsService = async (userId) => {
  const sessions = await Session.find({
    $or: [{ teacherId: userId }, { learnerId: userId }],
  })
    .populate("teacherId", "fullName username email")
    .populate("learnerId", "fullName username email")
    .populate("skillId", "name category")
    .sort({ startTime: 1 });

  return sessions;
};

/**
 * Create a new session
 */
export const createSessionService = async ({
  teacherId,
  learnerId,
  skillId,
  startTime,
  endTime,
}) => {
  // Prevent a user from being both teacher and learner
  if (teacherId.toString() === learnerId.toString()) {
    throw new ApiError(400, "Teacher and learner cannot be the same user");
  }

  const session = await Session.create({
    teacherId,
    learnerId,
    skillId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    status: "scheduled",
  });

  return session;
};

/**
 * Get a single session by ID
 * Only the teacher or learner of that session can view it
 */
export const getSessionByIdService = async (sessionId, userId) => {
  const session = await Session.findById(sessionId)
    .populate("teacherId", "fullName username email")
    .populate("learnerId", "fullName username email")
    .populate("skillId", "name category");

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  const isParticipant =
    session.teacherId._id.toString() === userId.toString() ||
    session.learnerId._id.toString() === userId.toString();

  if (!isParticipant) {
    throw new ApiError(403, "You are not authorized to view this session");
  }

  return session;
};

/**
 * Update session status
 * Only the teacher or learner of that session can update it
 * Valid transitions: scheduled → completed, scheduled → cancelled
 */
export const updateSessionService = async (sessionId, userId, status) => {
  const validStatuses = ["scheduled", "completed", "cancelled"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(
      400,
      "Invalid status. Must be: scheduled, completed, or cancelled"
    );
  }

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  const isParticipant =
    session.teacherId.toString() === userId.toString() ||
    session.learnerId.toString() === userId.toString();

  if (!isParticipant) {
    throw new ApiError(403, "You are not authorized to update this session");
  }

  session.status = status;
  await session.save(); // triggers pre-save hook (endTime > startTime check)

  if (session.status === "completed") {
    await Promise.allSettled([
      syncBadges(session.teacherId.toString()),
      syncBadges(session.learnerId.toString()),
    ]);
  }
  
  return session;
};

/**
 * Cancel (delete) a session
 * Only the teacher or learner of that session can cancel it
 */
export const deleteSessionService = async (sessionId, userId) => {
  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  const isParticipant =
    session.teacherId.toString() === userId.toString() ||
    session.learnerId.toString() === userId.toString();

  if (!isParticipant) {
    throw new ApiError(403, "You are not authorized to cancel this session");
  }

  await Session.findByIdAndDelete(sessionId);

  return true;
};
