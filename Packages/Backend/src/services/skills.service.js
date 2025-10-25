import { User } from "../models/users.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

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

const deleteSkillsById = async (userId, type, skill) => {
  if (!type || !skill) {
    throw new ApiError(400, "Both type and skill are required");
  }

  if (!["offered", "wanted"].includes(type)) {
    throw new ApiError(400, "You can choose only offered or wanted type");
  }

  const field = type === "offered" ? "skillsOffered" : "skillsWanted";

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User doesn't exsist ");
  }

  const updatedSkills = user[field].filter(
    (s) => s.toLowerCase() !== skill.toLowerCase(),
  );

  if (updatedSkills.length === user[field].length) {
    throw new ApiError(404, "Skill not found");
  }

  user[field] = updatedSkills;
  await user.save();

  return user[field];
};

export { getAllSkills, addSkillsToUser, deleteSkillsById };
