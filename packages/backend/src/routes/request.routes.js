import Router from 'express';
import { getAllRequestsController,addRequestController, updateRequestController } from '../controllers/request.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route("/").get(verifyJWT,getAllRequestsController);
router.route("/add-request").post(verifyJWT,addRequestController);
router.route("/update-request/:requestId").patch(verifyJWT,updateRequestController);

export default router;
