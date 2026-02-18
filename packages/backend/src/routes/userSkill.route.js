import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addUserSkillController,
  getCurrentUserSkillsController,
  updateUserSkillController,
} from "../controllers/userSkill.controller.js";

const router = Router();

// Define your user skill routes here
router.route("/").post(verifyJWT, addUserSkillController);
router.route("/me").get(verifyJWT, getCurrentUserSkillsController);
router.route("/:id").patch(verifyJWT, updateUserSkillController);
router.route("/:id").delete(verifyJWT);

export default router;
