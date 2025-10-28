import { asyncHandlers } from "../utils/async-handlers.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  createSessions,
  getSessionFromId,
  getSessions,
  sessionDeletion,
  sessionUpdateStatus,
} from "../services/sessions.service.js";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";

const getAllSessions = asyncHandlers(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User doesn't exsist");
  }

  const allSessions = await getSessions(user);

  res
    .status(200)
    .json(
      new ApiResponse(200, allSessions, "All sessions fetched successfully"),
    );
});

const createNewSessions = asyncHandlers(async (req, res) => {
  const newSession = await createSessions(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, newSession, "Session created successfully"));
});

const getSessionById = asyncHandlers(async (req, res) => {
  const { id } = req.params;

  const getSession = await getSessionFromId(id);

  res
    .status(200)
    .json(new ApiResponse(200, getSession, "Sessions fetched succesfully"));
});

const updateSessionStatus = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  const { sessionStatus } = req.body;

  const updatedSession = await sessionUpdateStatus(id, sessionStatus);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedSession,
        "Session status updated successfully",
      ),
    );
});

const deleteSession = asyncHandlers(async (req, res) => {
  const { id } = req.params;

  const cancelledSession = await sessionDeletion(id);

  if (cancelledSession !== null) {
    throw new ApiError(
      500,
      "There was an issue in deleting the session. Please try again later",
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Session deleted successfully"));
});

export {
  getAllSessions,
  createNewSessions,
  getSessionById,
  updateSessionStatus,
  deleteSession,
};
