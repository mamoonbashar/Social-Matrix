import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      minlength: 1,
      maxlength: 1000,
    },
    category: {
      type: String,
      enum: ["social", "promotion", "scheduled"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "posted", "completed"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
