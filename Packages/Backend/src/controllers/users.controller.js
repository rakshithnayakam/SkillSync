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

const getUserById = asyncHandlers(async (req, res) => {});

const updateUserById = asyncHandlers(async (req, res) => {});

const deleteUserById = asyncHandlers(async (req, res) => {});

export { getAllUsers, getUserById, updateUserById, deleteUserById };
