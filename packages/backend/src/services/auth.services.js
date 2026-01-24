import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
// generate new access token and refresh token
export const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    console.log(user.refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};

// register new user

export const registerUser = async ({
  fullName,
  username,
  email,
  password,
  age,
  role,
  skillsOffered,
  skillsWanted,
}) => {
  const register_user = await User.create({
    fullName,
    username,
    email,
    password,
    age,
    role,
    skillsOffered,
    skillsWanted,
  });
  return register_user;
};
