import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateAccessAndRefereshTokens,
  registerUser,
} from "../services/auth.services.js";

const registerUserController = asyncHandler(async (req, res) => {
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

  if (
    [fullName, email, username, password].some(
      (field) => !field || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with given email or username already exists");
  }

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

  if (!user) {
    throw new ApiError(500, "Registration failed");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id,
  );

  const createdUser = await User.findByIdAndUpdate(user._id).select(
    "- password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUserController };
