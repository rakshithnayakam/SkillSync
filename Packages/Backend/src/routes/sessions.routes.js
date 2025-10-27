import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import { getAllSessions } from "../controllers/sessions.controller.js";

const router = Router();

//secured routes
router.route("/").get(verifyUserJWT, getAllSessions);
// router.route("/").post();
// router.route("/:id").get();
// router.route("/:id").put();
// router.route("/:id").delete();

export default router;
