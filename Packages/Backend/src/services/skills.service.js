import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";

const getAllSkills = async () => {
  const result = await User.aggregate([
    { $unwind: "$skillsOffered" },
    { $group: { _id: { $toLower: "$skillsOffered" } } },
    { $sort: { _id: 1 } },
  ]);

  const uniqueSkills = result.map((item) => item._id);

  if (!uniqueSkills || uniqueSkills.length === 0) {
    throw new ApiError(404, "No unique skills present");
  }

  return uniqueSkills;
};

const addSkillsToUser = async (userId, skills) => {
  if (!skills || (Array.isArray(skills) && skills.length === 0)) {
    throw new ApiError(400, "No skills provided!!");
  }

  const skillsArray = Array.isArray(skills)
    ? skills.map((s) => s.toLowerCase())
    : [skills.toLowerCase()];

  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { skillsOffered: { $each: skillsArray } } },
    { new: true },
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user.skillsOffered;
};

const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return true;
};

export { getAllSkills, addSkillsToUser, deleteUserById };
