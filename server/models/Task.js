import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 1, maxlength: 80 },
    done: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export default mongoose.model("Task", TaskSchema);
