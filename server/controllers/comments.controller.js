import { populate } from "dotenv";
import commentModel from "../models/comment.model.js";
import postModel from "../models/post.model.js";

export async function createComment(req, res) {
  const { content } = req.body;
  const userID = req.user._id;
  const postID = req.params.id;

  try {
    const findPost = await postModel.findById(postID);
    if (!findPost) {
      return res.status(401).json({ message: "Post not Found" });
    }
    //  create comment in post
    const createdComment = await commentModel.create({
      content,
      author: userID,
      post: postID,
    });

    // push the the comments in post comments array
    await postModel.findByIdAndUpdate(postID, {
      $push: { comments: createdComment._id },
    });

    await createdComment.populate("author", "fullname");

    res.status(200).json({
      message: "Comment created Successfully",
      success: true,
      commentData: createdComment,
    });
  } catch (error) {
    res.status(401).json({
      message: "Server error unable to  create comment ",
      error: error.message,
    });
  }
}

export async function getAllComments(req, res) {
  const postID = req.params.id;
  try {
    const findById = await postModel.findById(postID).populate({
      path: "comments",
      populate: { path: "author", select: "fullname" },
    });

    if (!findById) {
      return res.status(401).json({ message: "Post Not found" });
    }
    res.status(200).json({
      success: true,
      comments: findById.comments,
      commentsLength: findById.comments.length,
    });
  } catch (error) {
    res.status(401).json({
      message: "Server error unable to  retrieve comment ",
      error: error.message,
    });
  }
}

export async function editComment(req, res) {
  const commentID = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;
  try {
    const findUpdatingPost = await commentModel.findById(commentID);

    if (!findUpdatingPost) {
      return res.status(401).json({ message: "Post Not found" });
    }

    // Check ownership
    if (!findUpdatingPost.author.equals(userId)) {
      return res
        .status(401)
        .json({ message: "Your are not authrised to do the task " });
    }
    const updateComment = await commentModel.findByIdAndUpdate(
      commentID,
      { $set: { content: content } },
      { new: true, runValidator: true }
    );
    res
      .status(200)
      .json({ message: "Comment updated", success: true, data: updateComment });
  } catch (error) {
    res.status(401).json({
      message: "Server error unable to  retrieve comment ",
      error: error.message,
    });
  }
}

export async function deleteComment(req, res) {
  const commentID = req.params.id;
  const userID = req.user.id;
  try {
    const findComment = await commentModel.findById(commentID);
    if (findComment) {
      if (!findComment) {
        return res.status(401).json({ message: "Comment Not found" });
      }
      //   Check ownership
      if (!findComment.author.equals(userID)) {
        return res
          .status(400)
          .json({ message: "You are not authorised to delete" });
      }
      await postModel.findByIdAndUpdate(findComment.post, {
        $pull: { comments: commentID },
      });
    } else {
      await postModel.updateMany(
        { comments: commentID },
        { $pull: { comments: commentID } }
      );
    }
    await commentModel.findByIdAndDelete(commentID);
    res.status(200).json({ message: "comment has been deleted" });
  } catch (error) {
    res.status(401).json({
      message: "Server error unable to  retrieve comment ",
      error: error.message,
    });
  }
}
