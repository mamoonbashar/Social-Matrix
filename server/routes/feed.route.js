import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { personalFeed } from "../controllers/feed.controller.js";
const router = express.Router();

router.get("/feed", isLoggedIn, personalFeed);

export default router;
