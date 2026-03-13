import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

import {
  registerUser,
  loginUser,
  generateAccessAndRefreshTokens,
} from "../services/auth.services.js";

import { setAuthCookies } from "../utils/cookie.js";
import { User } from "../models/user.models.js";

/**
 * REGISTER
 */
export const registerUserController = asyncHandler(async (req, res) => {
  const { fullName, username, email, password, age, role } = req.body;

  if ([fullName, username, email, password].some((f) => !f?.trim())) {
    throw new ApiError(400, "All required fields must be filled");
  }

  const user = await registerUser({
    fullName,
    username,
    email,
    password,
    age,
    role,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  setAuthCookies(res, accessToken, refreshToken);

  const safeUser = await User.findById(user._id).select(
    "-passwordHash -refreshTokenHash",
  );

  return res
    .status(201)
    .json(new ApiResponse(201, safeUser, "User registered successfully"));
});

/**
 * LOGIN
 */
export const loginUserController = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (![identifier, password].every((f) => f?.trim())) {
    throw new ApiError(400, "All required fields must be filled");
  }

  const user = await loginUser(identifier, password);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  setAuthCookies(res, accessToken, refreshToken);

  const safeUser = await User.findById(user._id).select(
    "-passwordHash -refreshTokenHash",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, safeUser, "Login successful"));
});

/**
 * GET CURRENT USER
 */
export const getCurrentUserController = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

/**
 * REFRESH TOKEN
 */
export const refreshTokenController = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized: No refresh token");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  const user = await User.findById(decodedToken.id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user.refreshTokenHash) {
    throw new ApiError(401, "Refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  setAuthCookies(res, accessToken, refreshToken);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Token refreshed successfully",
      ),
    );
});

/**
 * CHANGE PASSWORD
 */
export const changePasswordController = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Wrong old password");
  }

  user.passwordHash = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});