import { asyncHandlers } from "../utils/async-handlers.js";
import {ApiResponse} from "../utils/api-response.js";
import {
  requestMatchMakingService,
  acceptMatchRequestService,
  deleteMatchRequestService,
} from "../services/matchMaking.service.js";

const requestMatchMaking = asyncHandlers(async (req, res) => {
  const { toId, skill, message } = req.body;
  const fromId = req.user.id;

  const matchRequest = await requestMatchMakingService(
    fromId,
    toId,
    skill,
    message,
  );

  res
    .status(201)
    .json(
      new ApiResponse(201, matchRequest, "Match request sent successfully"),
    );
});

const acceptMatchRequest = asyncHandlers(async (req, res) => {
  const matchRequestId = req.params.id;

  const matchRequest = await acceptMatchRequestService(matchRequestId);

  res
    .status(200)
    .json(
      new ApiResponse(200, matchRequest, "Match request accepted successfully"),
    );
});

const deleteMatchRequest = asyncHandlers(async (req, res) => {
  const matchRequestId = req.params.id;

  await deleteMatchRequestService(matchRequestId);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Match request deleted successfully"));
});

export { requestMatchMaking, acceptMatchRequest, deleteMatchRequest };
