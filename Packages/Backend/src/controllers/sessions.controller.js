import { asyncHandlers } from "../utils/async-handlers.js";
import { ApiResponse } from "../utils/api-response.js";
import { getSessions } from "../services/sessions.service.js";
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

export { getAllSessions };
