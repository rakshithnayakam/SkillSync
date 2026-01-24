import { Router } from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(registerUserController);
router;

export default router;
