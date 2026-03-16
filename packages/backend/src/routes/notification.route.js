import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  getNotificationsController,
  markAsReadController,
  markAllAsReadController,
  deleteNotificationController,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/",               verifyJWT, getNotificationsController);
router.patch("/read-all",     verifyJWT, markAllAsReadController);
router.patch("/:id/read",     verifyJWT, markAsReadController);
router.delete("/:id",         verifyJWT, deleteNotificationController);

export default router;