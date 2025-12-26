import express from "express";
const router = express.Router();
import { LoginUser, registerUser } from "../controllers/auth.controller.js";

router.post("/register", registerUser);

router.post("/login", LoginUser);

export default router;
