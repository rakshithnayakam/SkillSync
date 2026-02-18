import Request from "../models/request.models.js";
import ApiError from "../utils/ApiError.js";
/**
 * Get all requests for the authenticated user Service
 */
export const getAllRequestsService = async (userId) => {
  const requests = await Request.find({fromUserId: userId}).populate("toUserId", "status");
  return requests;
};
/**
 * Add a new request Service
 */
export const addRequestService = async (fromUserId, toUserId, message, skillId) => {
  const newRequest = new Request({
    fromUserId,
    toUserId,
    message,
    skillId,
    status: "pending",
  });
  await newRequest.save();
  return newRequest;
}
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
  return request;
};