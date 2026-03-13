import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

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

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  setAuthCookies(res, accessToken, refreshToken);

  const safeUser = await User.findById(user._id).select(
    "-passwordHash -refreshTokenHash"
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

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  setAuthCookies(res, accessToken, refreshToken);

  const safeUser = await User.findById(user._id).select(
    "-passwordHash -refreshTokenHash"
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
    .json(new ApiResponse(200, req.user, "User fetched successfully"))
})