import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["complete", "not completed"],
      default: "not completed",
    },
    startDate: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const taskModel = mongoose.model("Tasks", taskSchema);
