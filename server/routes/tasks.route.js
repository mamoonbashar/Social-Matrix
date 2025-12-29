import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { allTasksUser, createTask, deleteTask, singleTask, updateTask } from "../controllers/task.controller.js";
const router = express.Router();

// validation is requires
router.post("/tasks", isLoggedIn, createTask);

// filters middleware is also needed
router.get("/tasks", isLoggedIn, allTasksUser);

router.get("/tasks/:id", isLoggedIn, singleTask);

router.patch("/tasks/:id", isLoggedIn, updateTask);

router.delete("/tasks/:id", isLoggedIn, deleteTask);

export default router;
