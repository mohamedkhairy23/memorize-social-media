import express from "express";
import {
  getPosts,
  createNewPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postsControllers.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// http://localhost:8888/posts
router.get("/", getPosts);
router.post("/", auth, createNewPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
