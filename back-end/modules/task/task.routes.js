import express from "express";
import {
  addTask,
  allTasks,
  updateStatus,
  updateTask,
} from "./task.controller.js";

let taskRoutes = express.Router();

taskRoutes.get("/tasks", allTasks);
taskRoutes.post("/tasks", addTask);
taskRoutes.put("/tasks/:id", updateStatus);
taskRoutes.put("/update-task/:id", updateTask);

export default taskRoutes;
