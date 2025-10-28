import { body } from "express-validator";
import {
  addSkillsToUser,
  deleteSkillsById,
  getAllSkills,
} from "../services/skills.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandlers } from "../utils/async-handlers.js";

const getSkills = asyncHandlers(async (req, res) => {
  const skills = await getAllSkills();
  res
    .status(200)
    .json(new ApiResponse(200, skills, "All the skills are fetched"));
});

const addSkill = asyncHandlers(async (req, res) => {
  const updatedSkills = await addSkillsToUser(req.user._id, req.body.skills);

  res
    .status(200)
    .json(new ApiResponse(200, updatedSkills, "Added new skills successfully"));
});

const deleteSkill = asyncHandlers(async (req, res) => {
  const userId = req.user._id;
  const { type, skill } = req.body;
  const { updatedSkillsArray } = await deleteSkillsById(userId, type, skill);

  res
    .status(202)
    .json(
      new ApiResponse(
        202,
        { updatedSkillsArray },
        `${skill} skill deleted successfully`,
      ),
    );
});

export { getSkills, addSkill, deleteSkill };
