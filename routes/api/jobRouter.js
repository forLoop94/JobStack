import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../../controllers/jobController.js";
import { checkForTestUser } from "../../middlewares/authenticateUser.js";

router.route("/").get(getAllJobs).post(checkForTestUser, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(getJob)
  .patch(checkForTestUser, updateJob)
  .delete(checkForTestUser, deleteJob);

export default router;
