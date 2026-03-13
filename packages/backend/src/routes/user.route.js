import { Router } from "express";
import {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", verifyJWT, getAllUsersController);
router.get("/:id", verifyJWT, getUserByIdController);
router.put("/:id", verifyJWT, updateUserController);
router.delete("/:id", verifyJWT, deleteUserController);

export default router;
