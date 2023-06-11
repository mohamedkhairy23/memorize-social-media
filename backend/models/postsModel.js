import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  creator: { type: String },
  tags: [String],
  selectedFile: { type: String },
  likeCount: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
