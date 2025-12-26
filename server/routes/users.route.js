import express from "express";
const router = express.Router();
import { isLoggedIn } from "../middlewares/auth.js";
import {
  follow,
  getFollowers,
  getFollowing,
  getProfile,
  unfollow,
  updateProfile,
} from "../controllers/user.controller.js";

// Public Viewing data
router.get("/:id", getProfile);
// Get the list of followers
router.get("/:id/followers", getFollowers);

// Get the list of all followings
router.get("/:id/following", getFollowing);

// logged In User actions

// User update its profile
router.patch("/:id/updateUser", isLoggedIn, updateProfile);

// Follow the target user increase client following
router.post("/:id/follow", isLoggedIn, follow);

// Unfollow the target user and remove them from there follwing list
router.delete("/:id/unfollow", isLoggedIn, unfollow);

export default router;
