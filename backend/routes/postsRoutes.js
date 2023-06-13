import express from "express";
import {
  getPosts,
  createNewPost,
  updatePost,
  deletePost,
} from "../controllers/postsControllers.js";
const router = express.Router();

// http://localhost:8888/posts
router.get("/", getPosts);
router.post("/", createNewPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
