import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addUserSkillController,
  getCurrentUserSkillsController,
  updateUserSkillController,
} from "../controllers/userSkillController.js";

const router = Router();

// Define your user skill routes here
router.route("/user-skills").post(verifyJWT, addUserSkillController);
router.route("/user-skills/me").get(verifyJWT, getCurrentUserSkillsController);
router.route("/user-skills/:id").patch(verifyJWT, updateUserSkillController);
router.route("/user-skills/:id").delete(verifyJWT);

export default router;
