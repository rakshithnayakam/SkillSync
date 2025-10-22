import { ApiResponse } from "../utils/api-response.js";
import { asyncHandlers } from "../utils/async-handlers.js";

const healthcheck = asyncHandlers(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is running " }));
});

export { healthcheck };
