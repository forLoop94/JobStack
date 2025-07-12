import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  getUsers,
  updateUser,
} from "../../controllers/userController.js";

import upload from "../middleware/multerMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../../middlewares/authenticateUser.js";

const router = Router();

router.get("/", getUsers);
router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  updateUser
);

export default router;
