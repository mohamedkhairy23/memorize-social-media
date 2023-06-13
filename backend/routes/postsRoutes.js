import express from "express";
import {
  getPosts,
  createNewPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postsControllers.js";
const router = express.Router();

// http://localhost:8888/posts
router.get("/", getPosts);
router.post("/", createNewPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
