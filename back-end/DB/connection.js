import mongoose from "mongoose";
let uri = "mongodb://localhost:27017/angular-task";
let dbConnection = mongoose
  .connect(uri)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("db error connection", err);
  });

export default dbConnection;
