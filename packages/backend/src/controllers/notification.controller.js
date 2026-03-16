import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  getNotificationsService,
  markAsReadService,
  markAllAsReadService,
  deleteNotificationService,
} from "../services/notification.service.js";

/**
 * GET /api/v1/notifications
 */
export const getNotificationsController = asyncHandler(async (req, res) => {
  const result = await getNotificationsService(req.user._id);
  return res.status(200).json(new ApiResponse(200, result, "Notifications fetched"));
});

/**
 * PATCH /api/v1/notifications/:id/read
 */
export const markAsReadController = asyncHandler(async (req, res) => {
  await markAsReadService(req.params.id, req.user._id);
  return res.status(200).json(new ApiResponse(200, {}, "Marked as read"));
});

/**
 * PATCH /api/v1/notifications/read-all
 */
export const markAllAsReadController = asyncHandler(async (req, res) => {
  await markAllAsReadService(req.user._id);
  return res.status(200).json(new ApiResponse(200, {}, "All marked as read"));
});

/**
 * DELETE /api/v1/notifications/:id
 */
export const deleteNotificationController = asyncHandler(async (req, res) => {
  await deleteNotificationService(req.params.id, req.user._id);
  return res.status(200).json(new ApiResponse(200, {}, "Notification deleted"));
});