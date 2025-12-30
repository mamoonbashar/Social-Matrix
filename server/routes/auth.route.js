import express from "express";
const router = express.Router();
import {
  LoginUser,
  logout,
  registerUser,
} from "../controllers/auth.controller.js";

router.post("/register", registerUser);

router.post("/login", LoginUser);

router.get("/logout", logout);

export default router;
