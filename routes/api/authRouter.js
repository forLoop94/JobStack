import { Router } from "express";
import { register, login, logout } from "../../controllers/authController.js";
import { authenticateUser } from "../../middlewares/authenticateUser.js";

const router = Router();

router.post("/register", register);
router.post("/login", authenticateUser, login);
router.get("/logout", logout);

export default router;
