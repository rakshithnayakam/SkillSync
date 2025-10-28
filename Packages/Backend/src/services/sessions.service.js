import { Session } from "../models/sessions.models.js";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

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

const createSessions = async (payload) => {
  const { mentorId, learnerId, skill, scheduledAt } = payload;

  const date = dayjs(scheduledAt, "DD-MM-YYYY HH:mm", true);

  if (!date.isValid()) {
    throw new ApiError(
      401,
      "The date format is invalid. Please send the format in DD-MM-YYYY HH:mm format",
    );
  }

  if (date.isBefore(dayjs())) {
    throw new ApiError(401, "Invalid date. Sessions need to be in the future");
  }

  const exsistingSession = await Session.findOne({
    mentorId,
    learnerId,
    skill,
    scheduledAt: {
      $gte: date.startOf("minute").toDate(),
      $lt: date.endOf("minute").toDate(),
    },
  });

  if (exsistingSession) {
    throw new ApiError(409, "Session already exists");
  }

  const session = await Session.create({
    mentorId,
    learnerId,
    skill,
    status: "requested",
    scheduledAt: date.toDate(),
  });

  await Promise.all([
    User.findByIdAndUpdate(mentorId, {
      $push: { mentorSessions: session._id },
    }),
    User.findByIdAndUpdate(learnerId, {
      $push: { learnerSessions: session._id },
    }),
  ]);

  return session;
};

const getSessionFromId = async (id) => {
  console.log(id);

  const session = await Session.findById(id);

  if (!session) {
    throw new ApiError(404, "Session doesn't exist");
  }

  return session;
};

const sessionUpdateStatus = async (id, sessionStatus) => {
  const session = await Session.findByIdAndUpdate(id, {
    status: sessionStatus,
  });

  if (!session) {
    throw new ApiError(409, "Session doesn't exist");
  }

  return session;
};

const sessionDeletion = async (id) => {
  const session = Session.findByIdAndDelete(id);

  return session;
};

export {
  getSessions,
  createSessions,
  getSessionFromId,
  sessionUpdateStatus,
  sessionDeletion,
};
