import { Router } from "express";
import { getUsers } from "../../controllers/userController.js";
import { updateUser } from "../controllers/userController.js";

import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/", getUsers);
router.patch("/update-user", upload.single("avatar"), updateUser);

export default router;
