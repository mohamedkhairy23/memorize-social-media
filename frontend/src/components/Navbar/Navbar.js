import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memories from "../../assets/images/memories.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
export const Navbar = () => {
  const user = false;
  return (
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
      <div className="brandContainer">
        <Typography
          component={Link}
          to="/"
          color="rgba(0,183,255, 1)"
          variant="h2"
        >
          Memories
        </Typography>
        <img sx={{ ml: "16px" }} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "400px",
        }}
      >
        {user ? (
          <div className="profile">
            <Avatar
              color="#c2185b"
              sx={{ backgroundColor: "#ad1457" }}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
