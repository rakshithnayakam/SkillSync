import Router from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/users.controller.js";
import { adminAuth, verifyUserJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecured routes
router.route("/").get(adminAuth, getAllUsers);
router.route("/:id").get(getUserById);
router.route("/:id").delete(adminAuth, deleteUserById);

//secured routes
router.route("/:id").put(verifyUserJWT, updateUserById);

export default router;
