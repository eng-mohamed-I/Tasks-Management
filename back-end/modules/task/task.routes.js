import express from "express";
import { addTask, allTasks, updateStatus } from "./task.controller.js";

let taskRoutes = express.Router();

taskRoutes.get("/tasks", allTasks);
taskRoutes.post("/tasks", addTask);
taskRoutes.put("/tasks/:id", updateStatus);

export default taskRoutes;
