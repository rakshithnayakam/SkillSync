import { User } from "../models/user.models.js";

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
