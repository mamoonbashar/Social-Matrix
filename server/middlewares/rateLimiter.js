import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  legacyHeaders: false,
  standardHeaders: true,
  message: {
    success: false,
    message: "Too many request please try again later",
  },
});

export default limiter;
