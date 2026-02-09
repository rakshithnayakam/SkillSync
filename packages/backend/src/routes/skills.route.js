import { Router } from "express";
import { getAllSkillsAppController } from "../controllers/skills.controller.js";

const router = Router();

// Define your skill routes here

// all the skills in the application
router.route("/").get(getAllSkillsAppController);


export default router;