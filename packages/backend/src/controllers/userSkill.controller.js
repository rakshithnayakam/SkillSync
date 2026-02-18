import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {
  addUserSkillService,
  deleteUserSkillService,
  getCurrentUserSkillsService,
  updateUserProficiencyService,
} from "../services/userSkill.services.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * Add Skill to User
 */
export const addUserSkillController = asyncHandler(async (req, res) => {
  const userId  = req.user._id;
  const { skill, type } = req.body;

  if (!skill || !type) {
    throw new ApiError(400, "Skill and type are required");
  }
  const userSkill = addUserSkillService(userId, skill, type);

  if (!userSkill) {
    throw new ApiError(500, "Failed to add skill to user. Please try again.");
  }

  res
    .status(201)
    .json(new ApiResponse(201, userSkill, "Skill added to user successfully"));
});

/**
 * Get Current User Skills
 */
export const getCurrentUserSkillsController = asyncHandler(async (req, res) => {
  const { userId } = req.user._id;

  const userSkills = await getCurrentUserSkillsService(userId);

  res
    .status(200)
    .json(
      new ApiResponse(200, "User skills retrieved successfully", userSkills),
    );
});

/**
 * Update User proficiency
 */
export const updateUserSkillController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user._id;
  const { proficiency } = req.body;

  if (!proficiency) {
    throw new ApiError(400, "Proficiency is required");
  }
  if (proficiency < 1 || proficiency > 5) {
    throw new ApiError(400, "Proficiency must be between 1 and 5");
  }

  const userSkill = await updateUserProficiencyService(id, proficiency, userId);

  if (!userSkill) {
    throw new ApiError(404, "User skill not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User skill updated successfully", userSkill));
});

/**
 * Delete User Skill
 */
export const deleteUserSkillController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user._id;
  const userSkill = await deleteUserSkillService(id, userId);

  if (!userSkill) {
    throw new ApiError(404, "User skill not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User skill deleted successfully", userSkill));
});
