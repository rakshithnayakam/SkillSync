import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandlers } from "../utils/async-handlers.js";
import {
  forgotPasswordMailContent,
  sendMail,
  verificationMailContent,
} from "../utils/mail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshTokens = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token",
    );
  }
};

const registerUser = asyncHandlers(async (req, res) => {
  const { email, username, age, password, role } = req.body;

  const exsistingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exsistingUser) {
    throw new ApiError(409, "User is already present", []);
  }

  const user = await User.create({
    email,
    username,
    age,
    password,
    role,
  });

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  ((user.EmailVerificationToken = hashedToken),
    (user.EmailVerificationExpiry = tokenExpiry),
    await user.save({ validateBeforeSave: false }));

  await sendMail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: verificationMailContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`,
    ),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshTokens -EmailVerificationToken -EmailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(409, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User created succesfully and verification email is on the way ",
      ),
    );
});

const loginUser = asyncHandlers(async (req, res) => {
  const { identifier, email, username, password } = req.body;

  const loginIdentifier = identifier || email || username;

  const user = await User.findOne({
    $or: [{ username: loginIdentifier }, { email: loginIdentifier }],
  });

  if (!user) {
    throw new ApiError(404, "user not found. Please signup to login");
  }

  const validPassword = await user.isPasswordCorrect(password);

  if (!validPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -EmailVerificationToken -EmailVerificationExpiry ",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User is loggedIn succesfully",
      ),
    );
});

const logoutUser = asyncHandlers(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out "));
});

const getCurrentUser = asyncHandlers(async (req, res) => {
  return res
    .status(201)
    .json(new ApiResponse(201, req.user, "Current user fetched"));
});

const verifyEmail = asyncHandlers(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(403, "Email verfication token is missing");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    EmailVerificationToken: hashedToken,
    EmailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Token invalid or expired");
  }

  user.EmailVerificationToken = undefined;
  user.EmailVerificationExpiry = undefined;

  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { isEmailVerified: true }, "Email is verified "),
    );
});

const resendVerficationEmail = asyncHandlers(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (user.isEmailVerified) {
    throw new ApiError(409, "User is already verified");
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.EmailVerificationToken = hashedToken;
  user.EmailVerificationToken = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Please  verify your email",
    mailgenContent: verificationMailContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email${unhashedToken}`,
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Verification email sent. Please check your inbox!!",
      ),
    );
});

const refreshAccesstoken = asyncHandlers(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(404, "Invalid Refresh token");
    }

    if (incomingRefreshToken !== user?.refreshTokens) {
      throw new ApiError(403, "Refresh token is expired ");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    user.refreshTokens = newRefreshToken;
    await user.save({ validateBeforeSave: false });
    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Accesss token refreshed ",
        ),
      );
  } catch (error) {
    throw new ApiError(400, "Invalid Refresh Token");
  }
});

const forgotPassowordRequest = asyncHandlers(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { unhashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: forgotPasswordMailContent(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unhashedToken}`,
    ),
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Email sent to your Inbox. Please follow the remaining instructions to reset your password",
      ),
    );
});

const resetForgotPassword = asyncHandlers(async (req, res) => {
  const { token } = req.params;
  const { newPass, confirmNewPass } = req.body;

  if (newPass !== confirmNewPass) {
    throw new ApiError(403, "Passwords don't match ");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(489, "Token is invalid or expired");
  }

  user.password = newPass;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, {}, "Password reset successfull"));
});

const changeCurrentPassword = asyncHandlers(async (req, res) => {
  const { oldPass, newPass } = req.body;

  const user = await User.findOne(req.user?._id);

  const isPasswordValid = user.isPasswordCorrect(oldPass);

  if (!isPasswordValid) {
    throw new ApiError(420, "Unauthorized access");
  }

  if (oldPass === newPass) {
    throw new ApiError(421, "Try a new Password");
  }

  user.password = newPass;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resendVerficationEmail,
  refreshAccesstoken,
  forgotPassowordRequest,
  changeCurrentPassword,
  resetForgotPassword,
};
