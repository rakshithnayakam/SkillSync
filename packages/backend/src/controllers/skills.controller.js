import Skill from "../models/skill.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Get all skills in the application
 */

export const getAllSkillsAppController = asyncHandler(async (req, res) => {
  const skills = await Skill.find({});
  if (!skills) {
    throw new ApiError(404, "No skills found");
  }
  res.status(200).json(new ApiResponse(200, "Skills retrieved successfully", skills));
});

