import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./assets/images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "./actions/posts";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch an action
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar
        sx={{
          borderRadius: "15px",
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        position="static"
        color="inherit"
      >
        <Typography color="rgba(0,183,255, 1)" variant="h2">
          Memories
        </Typography>
        <img sx={{ ml: "16px" }} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
