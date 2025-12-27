import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { createComment, deleteComment, editComment, getAllComments } from "../controllers/comments.controller.js";

const router = express.Router();

// validation middleware is required
router.post("/comment/:id", isLoggedIn, createComment);

router.get("/comment/:id",getAllComments);

router.patch("/comment/:id",isLoggedIn,editComment)

 router.delete("/comment/:id",isLoggedIn,deleteComment)

export default router;
