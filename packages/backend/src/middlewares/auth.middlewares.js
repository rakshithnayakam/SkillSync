import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

// Verify Access Token Middleware
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken);

    const user = await User.findById(decodedToken.id).select(
      "-passwordHash -refreshTokenHash",
    );
    // console.log(user);

    if (!user) {
      throw new ApiError(401, "Unauthorized request || User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message);
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "Admin") {
    throw new ApiError(403, "Access denied: Admins only")
  }
  next()
});
