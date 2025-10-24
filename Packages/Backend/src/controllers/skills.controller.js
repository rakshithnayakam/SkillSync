import {
  addSkillsToUser,
  deleteUserById,
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
  const updatedSkills = await addSkillsToUser(req.params._id, req.body.skills);
  res
    .status(200)
    .json(new ApiResponse(200, updatedSkills, "Added new skills successfully"));
});

const deleteSkill = asyncHandlers(async (req, res) => {
  await deleteUserById(req.params._id);
  res.status(202).json(new ApiResponse(202, {}, "User deleted successfully"));
});

export { getSkills, addSkill, deleteSkill };
