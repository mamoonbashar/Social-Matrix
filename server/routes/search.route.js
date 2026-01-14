import express from "express";
import { searchPost, searchUser } from "../controllers/search.controller.js";
const router = express.Router();

router.get("/user", searchUser);

router.get("/post", searchPost);

export default router; 

