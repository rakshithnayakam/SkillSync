import Session from "../models/session.models.js";
import ApiError from "../utils/ApiError.js";
import { syncBadges } from "../controllers/badges.controller.js";
import { createNotification } from "./notification.service.js";

/**
 * Get all sessions for the logged-in user
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
  if (teacherId.toString() === learnerId.toString()) {
    throw new ApiError(400, "Teacher and learner cannot be the same user");
  }

  const session = await Session.create({
    teacherId,
    learnerId,
    skillId,
    startTime: new Date(startTime),
    endTime:   new Date(endTime),
    status:    "scheduled",
  });

  // Notify both participants
  await Promise.allSettled([
    createNotification({
      userId:   learnerId,
      type:     "session_created",
      message:  "A new learning session has been scheduled for you 📅",
      link:     "/sessions",
      fromUser: teacherId,
    }),
    createNotification({
      userId:   teacherId,
      type:     "session_created",
      message:  "A new teaching session has been scheduled 📅",
      link:     "/sessions",
      fromUser: learnerId,
    }),
  ]);

  return session;
};

/**
 * Get a single session by ID
 */
export const getSessionByIdService = async (sessionId, userId) => {
  const session = await Session.findById(sessionId)
    .populate("teacherId", "fullName username email")
    .populate("learnerId", "fullName username email")
    .populate("skillId",   "name category");

  if (!session) throw new ApiError(404, "Session not found");

  const isParticipant =
    session.teacherId._id.toString() === userId.toString() ||
    session.learnerId._id.toString() === userId.toString();

  if (!isParticipant) throw new ApiError(403, "You are not authorized to view this session");

  return session;
};

/**
 * Update session status
 */
export const updateSessionService = async (sessionId, userId, status) => {
  const validStatuses = ["scheduled", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status. Must be: scheduled, completed, or cancelled");
  }

  const session = await Session.findById(sessionId);
  if (!session) throw new ApiError(404, "Session not found");

  const isParticipant =
    session.teacherId.toString() === userId.toString() ||
    session.learnerId.toString() === userId.toString();

  if (!isParticipant) throw new ApiError(403, "You are not authorized to update this session");

  session.status = status;
  await session.save();

  // Sync badges after completion
  if (session.status === "completed") {
    await Promise.allSettled([
      syncBadges(session.teacherId.toString()),
      syncBadges(session.learnerId.toString()),
    ]);

    // Notify both to leave feedback
    await Promise.allSettled([
      createNotification({
        userId:   session.teacherId,
        type:     "session_completed",
        message:  "Session completed! Don't forget to rate your experience ⭐",
        link:     "/sessions",
        fromUser: session.learnerId,
      }),
      createNotification({
        userId:   session.learnerId,
        type:     "session_completed",
        message:  "Session completed! Don't forget to rate your experience ⭐",
        link:     "/sessions",
        fromUser: session.teacherId,
      }),
    ]);
  }

  if (session.status === "cancelled") {
    const otherId = session.teacherId.toString() === userId.toString()
      ? session.learnerId
      : session.teacherId;

    await createNotification({
      userId:   otherId,
      type:     "session_cancelled",
      message:  "A session has been cancelled 🚫",
      link:     "/sessions",
      fromUser: userId,
    });
  }

  return session;
};

/**
 * Cancel (delete) a session
 */
export const deleteSessionService = async (sessionId, userId) => {
  const session = await Session.findById(sessionId);
  if (!session) throw new ApiError(404, "Session not found");

  const isParticipant =
    session.teacherId.toString() === userId.toString() ||
    session.learnerId.toString() === userId.toString();

  if (!isParticipant) throw new ApiError(403, "You are not authorized to cancel this session");

  const otherId = session.teacherId.toString() === userId.toString()
    ? session.learnerId
    : session.teacherId;

  await Session.findByIdAndDelete(sessionId);

  await createNotification({
    userId:   otherId,
    type:     "session_cancelled",
    message:  "A session has been cancelled 🚫",
    link:     "/sessions",
    fromUser: userId,
  });

  return true;
};