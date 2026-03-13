import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  getAllSessionsService,
  createSessionService,
  getSessionByIdService,
  updateSessionService,
  deleteSessionService,
} from "../services/session.services.js";

/**
 * GET /api/v1/sessions/
 * Get all sessions for the logged-in user
 */
export const getAllSessionsController = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const sessions = await getAllSessionsService(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "Sessions retrieved successfully"));
});

/**
 * POST /api/v1/sessions/
 * Create a new session
 */
export const createSessionController = asyncHandler(async (req, res) => {
  const { teacherId, learnerId, skillId, startTime, endTime } = req.body;

  if (!teacherId || !learnerId || !skillId || !startTime || !endTime) {
    throw new ApiError(
      400,
      "teacherId, learnerId, skillId, startTime and endTime are all required"
    );
  }

  const session = await createSessionService({
    teacherId,
    learnerId,
    skillId,
    startTime,
    endTime,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, session, "Session created successfully"));
});

/**
 * GET /api/v1/sessions/:id
 * Get a single session by ID
 */
export const getSessionByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!id) {
    throw new ApiError(400, "Session ID is required");
  }

  const session = await getSessionByIdService(id, userId);

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session retrieved successfully"));
});

/**
 * PUT /api/v1/sessions/:id
 * Update session status
 */
export const updateSessionController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { status } = req.body;

  if (!id) {
    throw new ApiError(400, "Session ID is required");
  }

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const session = await updateSessionService(id, userId, status);

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session updated successfully"));
});

/**
 * DELETE /api/v1/sessions/:id
 * Cancel/delete a session
 */
export const deleteSessionController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!id) {
    throw new ApiError(400, "Session ID is required");
  }

  await deleteSessionService(id, userId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Session cancelled successfully"));
});