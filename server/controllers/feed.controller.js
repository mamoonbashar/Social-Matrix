import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

export async function personalFeed(req, res) {
  const userID = req.user.id;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  try {
    const findUser = await userModel.findById(userID).select("-password");
    let skip = (page - 1) * limit;

    //   fetching id's from user model follwing array
    const followingData = findUser.following.map((following) => following._id);
    // Find all post at once
    //   Show user its following feed posts

    const totalPost = await postModel.countDocuments({
      author: { $in: followingData },
    });

    // getting post created by following list
    // getting data in chunks

    const getPostsOfFollowing = await postModel
      .find({ author: { $in: followingData } })
      .populate("author", "fullname")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const sendFeed = getPostsOfFollowing.map((feed) => ({
      id: feed._id,
      title: feed.title,
      author: feed.author?.fullname || "Unknown",
      content: feed.content,
      image: feed.image,
    }));

    res.status(200).json({
      message: "User Found",
      success: true,
      totalPagesCount: Math.ceil(totalPost / limit),
      sendFeed: sendFeed,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server creashed", error: error.message });
  }
}
