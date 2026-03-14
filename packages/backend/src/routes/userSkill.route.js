import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addUserSkillController,
  getCurrentUserSkillsController,
  updateUserSkillController,
  deleteUserSkillController,
} from "../controllers/userSkill.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addUserSkillController);
router.route("/me").get(verifyJWT, getCurrentUserSkillsController);
router.route("/:id")
  .patch(verifyJWT, updateUserSkillController)
  .delete(verifyJWT, deleteUserSkillController);

export default router;