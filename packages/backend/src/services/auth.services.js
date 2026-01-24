import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";

/**
 * Generate Access + Refresh Tokens
 */
export const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate authentication tokens");
  }
};

/**
 * Register New User
 */
export const registerUser = async (userData) => {
  try {
    const user = await User.create(userData);

    return user;
  } catch (error) {
    throw new ApiError(500, "User registration failed");
  }
};
