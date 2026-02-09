import { Router } from "express";
import { addSkillsAppController, getAllSkillsAppController } from "../controllers/skills.controller.js";

const router = Router();

// Define your skill routes here

// all the skills in the application
router.route("/").get(getAllSkillsAppController);
router.route("/add-skill").post(addSkillsAppController);


export default router;