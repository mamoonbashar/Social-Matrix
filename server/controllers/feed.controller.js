import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

export async function personalFeed(req, res) {
  const userID = req.user.id;

  try {
    const findUser = await userModel.findById(userID).select("-password");

    //   fetching id's from user model follwing array
    const followingData = findUser.following.map((following) => following._id);
    // Find all post at once
    //   Show user its following feed posts
    // getting post created by following list
    const getPostsOfFollowing = await postModel
      .find({ author: { $in: followingData } })
      .populate("author", "fullname")
      .sort({ createdAt: -1 });
    const sendFeed = getPostsOfFollowing.map((feed) => ({
      id: feed._id,
      title: feed.title,
      author: feed.author.fullname,
      content: feed.content,
      image: feed.image,
    }));

    res
      .status(200)
      .json({ message: "User Found", success: true, sendFeed: sendFeed });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server creashed", error: error.message });
  }
}
