import { Router } from "express";
import {
  registerUserController,
  loginUserController,
  getCurrentUserController,
  refreshTokenController,
  changePasswordController,
  logoutUserController
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middlewares.js"

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/current-user", verifyJWT, getCurrentUserController)
router.post("/refresh-token", refreshTokenController)
router.post("/change-password", verifyJWT, changePasswordController)
router.post("/logout", verifyJWT, logoutUserController);
router.get("/", verifyJWT, verifyAdmin, getAllUsersController);
router.delete("/:id", verifyJWT, verifyAdmin, deleteUserController);

export default router;
