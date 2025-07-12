import { Router } from "express";
const router = Router();
import { register, login, logout } from "../../controllers/authController.js";
import { authenticateUser } from "../../middlewares/authenticateUser.js";

router.post("/register", register);
router.post("/login", authenticateUser, login);
router.get("/logout", logout);

export default router;
