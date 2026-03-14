import { Router } from "express"
import {
  getWalletController,
  transferTokensController,
  rewardTokensController,
} from "../controllers/wallet.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.get("/", verifyJWT, getWalletController)
router.post("/transfer", verifyJWT, transferTokensController)
router.post("/reward", verifyJWT, rewardTokensController)

export default router;