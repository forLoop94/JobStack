import { Router } from "express";
import { register, login, logout } from "../../controllers/authController.js";
import { authenticateUser } from "../../middlewares/authenticateUser.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes" },
});

const router = Router();

router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, authenticateUser, login);
router.get("/logout", logout);

export default router;
