import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentsSection from "./CommentsSection";
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [dispatch, post]);

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper sx={{ p: "20px", borderRadius: "15px" }} elevation={6}>
      <div
        style={{
          display: "flex",
          width: "100%",
          md: { flexWrap: "wrap", flexDirection: "column" },
        }}
      >
        <Paper sx={{ borderRadius: "20px", m: "10px", p: "12px", flex: 1 }}>
          <Typography variant="h3" component="h2">
            {post?.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">Created by: {post?.name}</Typography>
          <Typography variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>
              <CommentsSection post={post} />
            </strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </Paper>
        <div sx={{ ml: "20px", sm: { ml: 0 } }}>
          <img
            className="media"
            src={
              post?.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post?.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className="section">
          <Typography gutterBottom varient="h2">
            You might also like
          </Typography>
          <Divider />
          <Paper sx={{ display: "flex", sm: { flexDirection: "column" } }}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ width: 200, textOverflow: "ellipsis" }}
                    variant="subtitle2"
                  >
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} alt="img" width="200px" />
                </div>
              )
            )}
          </Paper>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
