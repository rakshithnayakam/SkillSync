import { ApiError } from "../utils/api-error.js";
import { MatchRequest } from "../models/matchRequestSchema.js";

const requestMatchMakingService = async (fromId, toId, skill, message) => {
  const exsistingRequest = await MatchRequest.findOne({
    from: fromId,
    to: toId,
    skill: skill,
  });
  if (exsistingRequest) {
    throw new ApiError(
      400,
      "A match request for this skill already exists between these users.",
    );
  }

  const matchRequest = new MatchRequest({
    from: fromId,
    to: toId,
    skill: skill,
    status: "pending",
    message,
  });
  await matchRequest.save();
  return matchRequest;
};

const acceptMatchRequestService = async (matchRequestId) => {
  const matchRequest = await MatchRequest.findById(matchRequestId);
  if (!matchRequest) {
    throw new ApiError(404, "Match request not found.");
  }
  matchRequest.status = "accepted";
  matchRequest.updatedAt = new Date();
  await matchRequest.save();
  return matchRequest;
};

const deleteMatchRequestService = async (matchRequestId) => {
  const matchRequest = await MatchRequest.findById(matchRequestId);
  if (!matchRequest) {
    throw new ApiError(404, "Match request not found.");
  }
  await MatchRequest.findByIdAndDelete(matchRequestId);
  return;
};

export {
  requestMatchMakingService,
  acceptMatchRequestService,
  deleteMatchRequestService,
};
