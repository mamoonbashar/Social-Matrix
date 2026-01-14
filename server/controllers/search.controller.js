import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

export async function searchUser(req, res) {
  const q = req.query.users || "";
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  try {
    //userName.trim().toLowerCase();
    const query = q ? { fullname: { $regex: q.trim(), $options: "i" } } : {};

    const skip = (page - 1) * limit;
    const findUser = await userModel
      .find(query)
      .skip(skip)
      .select("-password")
      .limit(limit)
      .sort({});
    if (findUser.length === 0) {
      return res
        .status(400)
        .json({ message: "User not Found", success: false });
    }
    res.status(200).json({
      message: "User Found",
      success: true,
      count: findUser.length,
      page,
      data: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      Error: error.message,
    });
  }
}
export async function searchPost(req, res) {
  const p = req.query.post || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const postQuery = p ? { content: { $regex: p.trim(), $options: "i" } } : {};
    const skip = (page - 1) * limit;
    const findPost = await postModel
      .find(postQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (findPost.length === 0) {
      return res
        .status(404)
        .json({ message: "Post not Found", success: false });
    }
    res.status(200).json({
      success: true,
      page,
      count: findPost.length,
      data: findPost,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
