import express from "express";
import { getPosts, createNewPost } from "../controllers/postsControllers.js";
const router = express.Router();

// http://localhost:8888/posts
router.get("/", getPosts);
router.post("/", createNewPost);

export default router;
