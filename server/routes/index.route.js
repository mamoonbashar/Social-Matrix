import express from "express";
const router = express.Router();
import userSchema from "../models/user.model.js";
import { registerUser, LoginUser } from "../controllers/auth.controller.js";

router.get("/", (req, res) => {
  console.log("its working");
  res.render("index", { success: false, error: null });
});


router.get("/home", (req, res) => {
  res.render("Home-Page", { currentRoute: "/home" });
});
router.get("/message", (req, res) => {
  res.render("message", { currentRoute: "/message" });
});
router.get("/blog", (req, res) => {
  res.render("blog", { currentRoute: "/blog" });
});

// navbar links routes

router.get("/members", (req, res) => {
  res.render("members", { currentRoute: "/members" });
});

router.get("/groups", (req, res) => {
  res.render("Groups-Page", { currentRoute: "/groups" });
});

export default router;
