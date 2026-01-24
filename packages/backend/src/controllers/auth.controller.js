import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerUser,
  generateAccessAndRefreshTokens,
  loginUser,
} from "../services/auth.services.js";

import { setAuthCookies } from "../utils/cookie.js";

import { User } from "../models/user.models.js";

/**
 * REGISTER
 */
export const registerUserController = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    age,
    role,
    skillsOffered,
    skillsWanted,
  } = req.body;

  // Validate
  if ([fullName, username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All required fields must be filled");
  }

  // Check existing user
  const normalizedEmail = email.toLowerCase();
  const existingUser = await User.findOne({
    $or: [{ email: normalizedEmail }, { username: username.toLowerCase() }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  //  Create user
  const user = await registerUser({
    fullName,
    username: username.toLowerCase(),
    email: normalizedEmail,
    password,
    age,
    role,
    skillsOffered,
    skillsWanted,
  });

  //  Generate Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  // Set Cookies
  setAuthCookies(res, accessToken, refreshToken);

  // Send Safe User Data
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

/**
 * LOGIN
 */
export const loginUserController = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  // Validate
  if (![identifier, password].every((field) => field?.trim())) {
    throw new ApiError(400, "All required fields must be filled");
  }
  const user = await loginUser(identifier, password);

  //  Generate Tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  // Set Cookies
  setAuthCookies(res, accessToken, refreshToken);

  // Send Safe User Data
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!loggedInUser) {
    throw new ApiError(500, "User login failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});
