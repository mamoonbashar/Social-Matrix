import express from "express";
const router = express.Router();
import {
  LoginUser,
  logout,
  registerUser,
} from "../controllers/auth.controller.js";
import userValidation from "../middlewares/validation.js";
import handleValidation from "../middlewares/handleValidation.js";

router.post("/register", userValidation, handleValidation, registerUser);

router.post("/login", LoginUser);

router.get("/logout", logout);

export default router;
