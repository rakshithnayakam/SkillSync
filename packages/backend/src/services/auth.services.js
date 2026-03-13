import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";

/**
 * Generate Access + Refresh Tokens
 */
export const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // IMPORTANT: must match schema field
  user.refreshTokenHash = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

/**
 * Register New User
 */
export const registerUser = async (userData) => {
  const { password } = userData;

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // move plaintext password into passwordHash
  userData.passwordHash = password;
  delete userData.password;

  const user = await User.create(userData);
  return user;
};

/**
 * Login User
 * NOTE: returns null on failure (controller handles error)
 */
export const loginUser = async (identifier, password) => {
  const user = await User.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier.toLowerCase() },
    ],
  });

  if (!user) return null;

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) return null;

  return user;
};

/**
 * Logout User
 * Clears the refreshTokenHash from DB so the refresh token is invalidated
 */
export const logoutUser = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { refreshTokenHash: null } },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return true;
};