import mongoose from "mongoose";
import Post from "../models/postsModel.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // Get the starting index of every page
    const total = await Post.countDocuments({});

    const existedPosts = await Post.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    console.log(existedPosts);
    res.status(200).json({
      data: existedPosts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// QUERY ==> /posts?page=1 ==> page=1
// PARAMS ==> /posts/:id ==> id=123
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createNewPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  // extract id from params request and rename it to _id
  const { id: _id } = req.params;
  const existedPost = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  // make {new:true} to receive updated version of that post
  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...existedPost, _id },
    {
      new: true,
    }
  );

  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  // This (req.userId) come from authorization middleware (auth middleware) that coming from auth token
  if (!req.userId) {
    return res.json({ message: "Not authenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  const foundedPost = await Post.findById(id);

  const index = foundedPost.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // Like a post
    foundedPost.likes.push(req.userId);
  } else {
    // Dislike a post
    foundedPost.likes = foundedPost.likes.filter(
      (id) => id !== String(req.userId)
    );
  }

  const updatedPost = await Post.findByIdAndUpdate(id, foundedPost, {
    new: true,
  });

  res.json(updatedPost);
};
