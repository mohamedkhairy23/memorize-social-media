import Post from "../models/postsModel.js";

export const getPosts = async (req, res) => {
  try {
    const existedPosts = await Post.find();
    console.log(existedPosts);
    res.status(200).json(existedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createNewPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
