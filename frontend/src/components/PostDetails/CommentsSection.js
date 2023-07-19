import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import "./PostDetails.css";
import { commentPost } from "../../actions/posts";

const CommentsSection = ({ post }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleSubmitComment = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));

    setComments(newComment);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="commentsOuterContainer">
        <div className="commentsInnerContainer">
          <Typography gutterBottom varient="h6">
            Comments
          </Typography>
          {comments?.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              {comment}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleSubmitComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
