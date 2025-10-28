import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  createNewSessions,
  deleteSession,
  getAllSessions,
  getSessionById,
  updateSessionStatus,
} from "../controllers/sessions.controller.js";

const router = Router();

//secured routes
router.route("/").get(verifyUserJWT, getAllSessions);
router.route("/").post(verifyUserJWT, createNewSessions);
router.route("/:id").get(verifyUserJWT, getSessionById);
router.route("/:id").put(verifyUserJWT, updateSessionStatus);
router.route("/:id").delete(verifyUserJWT, deleteSession);

export default router;
