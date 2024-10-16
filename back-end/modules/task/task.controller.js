import mongoose from "mongoose";
import { taskModel } from "../../DB/model/task.model.js";

let allTasks = async (req, res) => {
  let tasks = await taskModel.find();
  res.status(200).json({ data: tasks });
};

let addTask = async (req, res) => {
  let task = req.body;
  let newTask = new taskModel(task);

  await newTask.save();
  res.status(200).json({ message: "task created successfully", data: newTask });
};

let updateStatus = async (req, res) => {
  let { id } = req.params;
  let task = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid id" });
  }

  await taskModel.findByIdAndUpdate(id, { status: "completed" });

  return res.status(200).json({ message: "status updated successfully" });
};

let updateTask = async (req, res) => {
  let { id } = req.params;
  let { body } = req;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "invalid id" });
  }
  let task = await taskModel.findByIdAndUpdate(id, body);
  return res.status(200).json({ message: "task updated successfully" });
};
export { allTasks, addTask, updateStatus, updateTask };
