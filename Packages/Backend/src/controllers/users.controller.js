import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandlers } from "../utils/async-handlers.js";
import { User } from "../models/users.models.js";

const getAllUsers = asyncHandlers(async (req, res) => {
  try {
    const users = await User.find(
      {},
      "-password -forgotPasswordToken -forgotPasswordExpiry -EmailVerificationToken -EmailVerificationExpiry",
    );

    res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched Succesfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, error.message));
  }
});

const getUserById = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(201).json(new ApiResponse(201, user, "User fetched successfully"));
});

const updateUserById = asyncHandlers(async (req, res) => {
  const updates = req.body;
  const userId = req.user?._id;

  const allowedFields = [
    "avatar",
    "username",
    "age",
    "fullName",
    "skillsOffered",
    "skillsWanted",
    "bio",
  ];
  const filteredFields = {};

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      filteredFields[key] = updates[key];
    }
  }
  const updatedUser = await User.findByIdAndUpdate(userId, filteredFields, {
    new: true,
    runValidators: true,
  }).select(
    "-password -refreshToken -EmailVerificationToken -EmailVerificationExpiry -forgotPasswordExpiry -forgotPasswordToken",
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not Found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User Updation successfull"));
});

const deleteUserById = asyncHandlers(async (req, res) => {
  const id = req.params;

  const deletedUser = User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
});

export { getAllUsers, getUserById, updateUserById, deleteUserById };
