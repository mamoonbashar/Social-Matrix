import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
// // Virtual property to get like count (if not using likesCount field)
// postSchema.virtual('likeCount').get(function() {
//   return this.likes.length;
// });

// // Index for better performance
// postSchema.index({ author: 1, createdAt: -1 });
// postSchema.index({ createdAt: -1 });  // For feed sorting

// export default mongoose.model("Post", postSchema);