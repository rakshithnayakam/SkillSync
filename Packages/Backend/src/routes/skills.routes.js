import Router from "express";
import { adminAuth, verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  addSkill,
  deleteSkill,
  getSkills,
} from "../controllers/skills.controller.js";
import {
  addSkillValidator,
  deleteSkillsValidator,
} from "../validators/index.js";

const router = Router();

//unsecured routes
router.route("/").get(getSkills);

//secured routes
router.route("/").post(verifyUserJWT, addSkillValidator(), addSkill);
router.route("/").delete(verifyUserJWT, deleteSkillsValidator(), deleteSkill);

export default router;
