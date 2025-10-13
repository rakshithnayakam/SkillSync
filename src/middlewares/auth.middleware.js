import jwt from "jsonwebtoken";
import { User } from "../models/users.models";
import { ApiError } from "../utils/api-error";
import { asyncHandlers } from "../utils/async-handlers";

export const verifyJWT = asyncHandlers(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized error");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -EmailVerificationToken -EmailVerificationExpiry",
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {}
});
