import Router from "express";
import { adminAuth, verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  addSkill,
  deleteSkill,
  getSkills,
} from "../controllers/skills.controller.js";

const router = Router();

//unsecured routes
router.route("/").get(getSkills);

//secured routes
router.route("/").post(verifyUserJWT, addSkill);
router.route("/:id").delete(adminAuth, deleteSkill);

export default router;
