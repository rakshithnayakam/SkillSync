import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  registerUser,
  generateAccessAndRefreshTokens,
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
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  //  Create user
  const user = await registerUser({
    fullName,
    username: username.toLowerCase(),
    email,
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
