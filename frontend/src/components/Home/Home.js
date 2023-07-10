import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  AppBar,
} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Paginate from "../Pagination/Paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";
import { Link } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = React.useState([]);

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  useEffect(() => {
    // dispatch an action
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch ==> fetch search post
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else if (!searchQuery && !tags.length) {
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              sx={{
                borderRadius: "4",
                mb: "1rem",
                display: "flex",
                padding: "16px",
              }}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <MuiChipsInput
                sx={{ mt: 2, mb: 1 }}
                value={tags}
                onAddChip={(tag) => handleAdd(tag)}
                onDeleteChip={(tag) => handleDelete(tag)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                sx={{ my: 1 }}
                variant="contained"
                color="primary"
                size="large"
                onClick={searchPost}
                fullWidth
              >
                Search
              </Button>
              <Link to={`/`}>
                <Button
                  disabled={!searchQuery && !tags.length}
                  sx={{ my: 1 }}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={searchPost}
                  fullWidth
                >
                  Back
                </Button>
              </Link>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper
                sx={{ borderRadius: "4", mt: "1rem", p: "16px" }}
                elevation={6}
              >
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
