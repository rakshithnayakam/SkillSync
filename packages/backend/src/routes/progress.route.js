import { Router } from "express"
import {
  getProgressController,
  updateProgressController,
  resetWeeklyProgressController
} from "../controllers/progress.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.get("/", verifyJWT, getProgressController)
router.patch("/update", verifyJWT, updateProgressController)
router.patch("/reset-weekly", verifyJWT, resetWeeklyProgressController)

export default router;