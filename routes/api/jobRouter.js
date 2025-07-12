import { Router } from "express";
const router = Router();

import { getAllJobs } from "../../controllers/jobController.js";

router.get("/", getAllJobs);

export default router;
