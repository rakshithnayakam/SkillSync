import Request from "../models/request.models.js";
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