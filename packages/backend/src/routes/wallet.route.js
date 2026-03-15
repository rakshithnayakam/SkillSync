import { Router } from "express";
import {
  getWalletController,
  transferTokensController,
  rewardTokensController,
  getTransactionsController,
} from "../controllers/wallet.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/",             verifyJWT, getWalletController);
router.post("/transfer",    verifyJWT, transferTokensController);
router.post("/reward",      verifyJWT, rewardTokensController);
router.get("/transactions", verifyJWT, getTransactionsController);

export default router;