import postModel from "../models/post.model.js";

export async function createPost(req, res) {
  const { content, image } = req.body;
  const author = req.user._id;
  try {
    const post = await postModel.create({
      content: content,
      image: image || null,
      author: author,
    });
    await post.populate("author", "fullname");
    res.status(200).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).send("Can't create post");
  }
}

export async function getAllPosts(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const skip = (page - 1) * limit;
    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "fullname");
    const totalPost = await postModel.countDocuments();

    res.status(200).json({
      success: true,
      totalPages: Math.ceil(totalPost / limit),
      totalPost,
      posts,
    });
  } catch (error) {
    res.status(200).send("Can't get all posts");
  }
}

export async function getPost(req, res) {
  const postId = req.params.id;

  try {
    const Post = await postModel
      .findById(postId)
      .populate("author", "fullname");

    if (!Post) {
      return res.status(400).json({ message: "Post not found" });
    }
    const postData = {
      id: Post._id,
      content: Post.content,
      image: Post.image,
      author: {
        authorId: Post.author._id,
        fullname: Post.author.fullname,
      },
      publishDate: Post.createdAt,
      updatedPostDate: Post.updatedAt,
    };

    res.status(200).json({ postData });
  } catch (error) {
    res.status(400).send("get post not working ");
  }
}
