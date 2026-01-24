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
  const user = await User.create(userData);
  return user;
};
/**
 * Login User
 */
export const loginUser = async (identifier, password) => {
  // Find user by email or username
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier.toLowerCase() }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  return user;
};
