import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentsSchema);


// // Indexes
// commentSchema.index({ post: 1, createdAt: -1 });
// commentSchema.index({ author: 1 });
// commentSchema.index({ parentComment: 1 });  // If using nested comments

// export default mongoose.model("Comment", commentSchema);