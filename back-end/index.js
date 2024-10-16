import express from "express";
import dbConnection from "./DB/connection.js";
import taskRoutes from "./modules/task/task.routes.js";
import cors from "cors";
const port = 3000;
const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/v1", taskRoutes);

dbConnection;

server.listen(port, () => {
  console.log("server connected successfully");
});
