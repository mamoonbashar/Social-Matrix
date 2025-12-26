import express from "express";
//import { isLoggedIn } from "../middlewares/auth";
import {
  createPost,
  getAllPosts,
  getPost,
} from "../controllers/post.controller.js";
import { isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();

// POSTS SYSTEM ROUTES

//router.post("/:id/posts", isLoggedIn, validation, createPost);
router.post("/:id/posts", isLoggedIn, createPost);

router.get("/:id/allPosts", getAllPosts);

router.get("/posts/:id", getPost);

// router.get("/posts/user/:userId", isLoggedIn, userPost);

// // owner check is needed
// router.patch("/posts/:id", isLoggedIn, validation, editPost);

// // owner check is needed
// router.delete("/posts/:id", isLoggedIn, deletePost);

// <<<<<<<<<<<<<<<<<<*************>>>>>>>>>>>>>>>>>

// LIKE SYSTEM ROUTES

// router.post("/posts/:id/like", isLoggedIn, likePost);

// router.delete("/posts/:id/unlike", isLoggedIn, unlikePost);

// <<<<<<<<<<<<<<<<<<*************>>>>>>>>>>>>>>>>>

// COMMENT SYSTEM ROUTES

// router.post("/posts/:id/comments", isLoggedIn, validation, commentOnPost);

// router.get("/posts/:id/comments", isLoggedIn, allComments);

// Owner check required
//router.put("/comments/:commentId", isLoggedIn, validation, editComment);

// Owner check required
//router.delete("/comments/:commentId", isLoggedIn, deleteComment);

//<<<<<<<<<<<<<<<<<<**************>>>>>>>>>>>>>>>>>>>

export default router;
