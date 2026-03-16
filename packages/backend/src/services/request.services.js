import Request from "../models/request.models.js";
import ApiError from "../utils/ApiError.js";
import { createNotification } from "./notification.service.js";

/**
 * Get all requests for the authenticated user Service
 */
export const getAllRequestsService = async (userId) => {
  const requests = await Request.find({
    $or: [{ fromUserId: userId }, { toUserId: userId }],
  })
    .populate("fromUserId", "fullName username email")
    .populate("toUserId",   "fullName username email")
    .populate("skillId",    "name category")
    .sort({ createdAt: -1 });
  return requests;
};

/**
 * Add a new request Service
 */
export const addRequestService = async (fromUserId, toUserId, message, skillId) => {
  if (fromUserId.toString() === toUserId.toString()) {
    throw new ApiError(400, "Cannot send request to yourself");
  }

  const newRequest = new Request({
    fromUserId,
    toUserId,
    message,
    skillId,
    status: "pending",
  });
  await newRequest.save();

  // Notify receiver
  await createNotification({
    userId:   toUserId,
    type:     "request_received",
    message:  "You have a new skill exchange request",
    link:     "/requests",
    fromUser: fromUserId,
  });

  return newRequest;
};

/**
 * Update request status Service
 */
export const updateRequestService = async (requestId, userId, status) => {
  const request = await Request.findOne({ _id: requestId, toUserId: userId });
  if (!request) {
    throw new ApiError(404, "Request not found or you are not authorized to update it");
  }

  request.status = status;
  await request.save();

  // Notify sender of accept/reject
  if (status === "accepted") {
    await createNotification({
      userId:   request.fromUserId,
      type:     "request_accepted",
      message:  "Your skill exchange request was accepted! 🎉",
      link:     "/requests",
      fromUser: userId,
    });
  } else if (status === "rejected") {
    await createNotification({
      userId:   request.fromUserId,
      type:     "request_rejected",
      message:  "Your skill exchange request was declined.",
      link:     "/requests",
      fromUser: userId,
    });
  }

  return request;
};