import { User } from "../models/users.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandlers } from "../utils/async-handlers.js";
import { sendMail } from "../utils/mail.js";

const generateAccessAndRandomTokens = async (userId) => {
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

  const user = User.create({
    email,
    username,
    age,
    password,
    role,
    fullName,
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

export { registerUser };
