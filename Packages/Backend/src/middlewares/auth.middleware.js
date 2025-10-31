import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandlers } from "../utils/async-handlers.js";

export const verifyUserJWT = asyncHandlers(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

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
  } catch (error) {
    console.log(error.msg);
    next(new ApiError(401, "Invalid tokens"));
  }

});

export const adminAuth = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized error: No token provided",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -EmailVerificationToken -EmailVerificationExpiry"
    );

    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access. Admins only!!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};
