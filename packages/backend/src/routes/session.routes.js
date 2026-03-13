import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  getAllSessionsController,
  createSessionController,
  getSessionByIdController,
  updateSessionController,
  deleteSessionController,
} from "../controllers/session.controller.js";

const router = Router();

// All session routes are protected
router.use(verifyJWT); // applies verifyJWT to every route below in one line

router.route("/")
  .get(getAllSessionsController)   // GET  /api/v1/sessions/
  .post(createSessionController);  // POST /api/v1/sessions/

router.route("/:id")
  .get(getSessionByIdController)     // GET    /api/v1/sessions/:id
  .put(updateSessionController)      // PUT    /api/v1/sessions/:id
  .delete(deleteSessionController);  // DELETE /api/v1/sessions/:id

export default router;