import { Router } from "express";
import { register, login, logout } from "../../controllers/authController.js";
import rateLimiter from "express-rate-limit";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../../middlewares/validationMiddleware.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes" },
});

const router = Router();

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

export default router;
