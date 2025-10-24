// src/controllers/users.controller.js

import {
  generateAccessAndRefreshTokens,
  createUser,
  authenticateUser,
  invalidateTokens,
  verifyEmailToken,
  resendVerification,
  refreshAuthToken,
  handleForgotPassword,
  resetForgotPassword,
  changePassword,
} from "../services/auth.service.js";
import { asyncHandlers } from "../utils/async-handlers.js";
import { ApiResponse } from "../utils/api-response.js";

const registerUser = asyncHandlers(async (req, res) => {
  const user = await createUser(req.body, req);
  res
    .status(201)
    .json(new ApiResponse(true, "User created successfully", { user }));
});

const loginUser = asyncHandlers(async (req, res) => {
  const { identifier, password } = req.body;
  const user = await authenticateUser(identifier, password);
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );
  const loggedInUser = await user.constructor
    .findById(user._id)
    .select(
      "-password -refreshTokens -EmailVerificationToken -EmailVerificationExpiry",
    );
  const options = { httpOnly: true, secure: true };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(true, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      }),
    );
});

const logoutUser = asyncHandlers(async (req, res) => {
  await invalidateTokens(req.user._id);
  const options = { httpOnly: true, secure: true };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(true, "User logged out successfully"));
});

const getCurrentUser = asyncHandlers(async (req, res) => {
  res.status(200).json(new ApiResponse(true, "Current user fetched", req.user));
});

const verifyEmail = asyncHandlers(async (req, res) => {
  const user = await verifyEmailToken(req.params.token);
  res
    .status(200)
    .json(new ApiResponse(true, "Email verified successfully", { user }));
});

const resendEmailVerification = asyncHandlers(async (req, res) => {
  await resendVerification(req.user, req);
  res
    .status(200)
    .json(new ApiResponse(true, "Verification email sent successfully"));
});

const refreshAccessToken = asyncHandlers(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  const tokens = await refreshAuthToken(incomingRefreshToken);
  const options = { httpOnly: true, secure: true };
  res
    .status(200)
    .cookie("accessToken", tokens.accessToken, options)
    .cookie("refreshToken", tokens.refreshToken, options)
    .json(new ApiResponse(true, "Access token refreshed", tokens));
});

const forgotPassword = asyncHandlers(async (req, res) => {
  await handleForgotPassword(req.body.email);
  res
    .status(200)
    .json(new ApiResponse(true, "Password reset email sent successfully"));
});

const resetPassword = asyncHandlers(async (req, res) => {
  const { token, newPassword } = req.body;
  await resetForgotPassword(token, newPassword);
  res.status(200).json(new ApiResponse(true, "Password reset successfully"));
});

const updatePassword = asyncHandlers(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  await changePassword(req.user._id, oldPassword, newPassword);
  res.status(200).json(new ApiResponse(true, "Password changed successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  updatePassword,
};
