import express from "express";

import { rateLimit as rateLimiter } from "express-rate-limit";

import { signup, login } from "../controllers/auth.js";

export const router = express.Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 60,
  max: 10,
  message: {
    msg: "최대 시도횟수를 넘었습니다,, 15분후에 다시 시도해주세요",
  },
});

router.post("/signup", signup);
router.post("/login", apiLimiter, login);
