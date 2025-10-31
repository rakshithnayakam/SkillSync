import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";
import {
  sendMail,
  verificationMailContent,
  forgotPasswordMailContent,
} from "../utils/mail.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Wallet } from "../models/wallet.models.js";
import { createWallet } from "./wallet.service.js";

/* ---------------------- TOKEN MANAGEMENT ---------------------- */

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshTokens = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating access and refresh tokens");
  }
};

/* ---------------------- USER REGISTRATION ---------------------- */

const createUser = async (payload, req) => {
  const { email, username } = payload;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) throw new ApiError(409, "User already exists");

  const user = await User.create(payload);

  const wallet = await createWallet(user._id);
  user.walletId = wallet._id;

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.EmailVerificationToken = hashedToken;
  user.EmailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Please verify your email",
    mailgenContent: verificationMailContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unhashedToken}`,
    ),
  });

  return await User.findById(user._id).select(
    "-password -refreshTokens -EmailVerificationToken -EmailVerificationExpiry",
  );
};

/* ---------------------- LOGIN ---------------------- */

const authenticateUser = async (identifier, password) => {
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) throw new ApiError(404, "User not found. Please sign up.");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(400, "Invalid credentials");

  return user;
};

/* ---------------------- LOGOUT ---------------------- */

const invalidateTokens = async (userId) => {
  await User.findByIdAndUpdate(
    userId,
    { $set: { refreshTokens: "" } },
    { new: true },
  );
};

/* ---------------------- EMAIL VERIFICATION ---------------------- */

const verifyEmailToken = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    EmailVerificationToken: hashedToken,
    EmailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Token invalid or expired");

  user.EmailVerificationToken = undefined;
  user.EmailVerificationExpiry = undefined;
  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return user;
};

/* ---------------------- RESEND VERIFICATION ---------------------- */

const resendVerification = async (user, req) => {
  if (user.isEmailVerified) throw new ApiError(409, "User already verified");

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.EmailVerificationToken = hashedToken;
  user.EmailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Please verify your email again",
    mailgenContent: verificationMailContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email/${unhashedToken}`,
    ),
  });
};

/* ---------------------- REFRESH TOKEN ---------------------- */

const refreshAuthToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

  const decoded = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );
  const user = await User.findById(decoded?._id);

  if (!user) throw new ApiError(404, "User not found");
  if (incomingRefreshToken !== user.refreshTokens)
    throw new ApiError(403, "Refresh token expired or invalid");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );
  user.refreshTokens = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

/* ---------------------- FORGOT PASSWORD ---------------------- */

const handleForgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Reset your password",
    mailgenContent: forgotPasswordMailContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unhashedToken}`,
    ),
  });
};

/* ---------------------- RESET PASSWORD ---------------------- */

const resetForgotPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Invalid or expired token");

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save({ validateBeforeSave: false });
};

/* ---------------------- CHANGE PASSWORD ---------------------- */

const changePassword = async (userId, oldPass, newPass) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.isPasswordCorrect(oldPass);
  if (!isPasswordValid) throw new ApiError(403, "Incorrect old password");

  if (oldPass === newPass) throw new ApiError(400, "New password must differ");

  user.password = newPass;
  await user.save({ validateBeforeSave: false });
};
export {
  authenticateUser,
  createUser,
  resetForgotPassword,
  changePassword,
  invalidateTokens,
  verifyEmailToken,
  resendVerification,
  refreshAuthToken,
  handleForgotPassword,
  generateAccessAndRefreshTokens,
};
