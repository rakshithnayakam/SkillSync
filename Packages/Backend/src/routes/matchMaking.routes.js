import { Router } from "express";
import { verifyUserJWT } from "../middlewares/auth.middleware.js";
import {
  acceptMatchRequest,
  deleteMatchRequest,
  requestMatchMaking,
} from "../controllers/matchMaking.controller.js";

const router = Router();

router.route("/suggested").get(verifyUserJWT); // To be implemented: getSuggestedMatches controller
router.route("/request").post(verifyUserJWT, requestMatchMaking);
router.route("/accept/:id").put(verifyUserJWT, acceptMatchRequest);
router.route("/delete/:id").delete(verifyUserJWT, deleteMatchRequest);

export default router;
