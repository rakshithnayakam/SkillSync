import UserSkill from "../models/userSkill.models.js";
import Skill from "../models/skill.models.js";
import ApiError from "../utils/ApiError.js";

/**
 * Add Skill to User
 */
export const addUserSkillService = async (
  userId,
  skill,
  type,
) => {
  const skillId = await Skill.findOne({ name: skill }).select("_id");
  if (!skillId) {
    throw new ApiError(404, "Skill not found");
  }
  const userSkill = await UserSkill.create({
    userId,
    skillId,
    name: skill,
    type,
    proficiency: 0,
  });
  if (!userSkill) {
    throw new ApiError(500, "Failed to add skill to user. Please try again.");
  }
  return userSkill;
};

/**
 * Get Current User Skills
 */
export const getCurrentUserSkillsService = async (userId) => {
  const userSkills = await UserSkill.find({ userId })
    .populate("skill")
    .sort({ createdAt: -1 });
  if (!userSkills) {
    throw new ApiError(404, "No skills found for the user");
  }
  return userSkills;
};

/**
 *  Update User proficiency
 */
export const updateUserProficiencyService = async (id, proficiency, userId) => {
  const userSkill = await UserSkill.findByIdAndUpdate(
    { _id: id, userId },
    { proficiency },
    { new: true },
  );
  return userSkill;
};

/**
 * Delete User Skill
 */
export const deleteUserSkillService = async (id, userId) => {
  const userSkill = await UserSkill.findByIdAndDelete({ _id: id, userId });
  return userSkill;
};
