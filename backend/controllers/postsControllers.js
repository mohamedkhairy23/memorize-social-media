import mongoose from "mongoose";
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
