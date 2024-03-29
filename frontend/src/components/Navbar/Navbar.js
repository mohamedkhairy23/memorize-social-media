import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memoriesLogoImg from "../../assets/images/memories-Logo.png";
import memoriesTextImg from "../../assets/images/memories-Text.png";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

export const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // Check in case of expiry token ==> logout auto
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      sx={{
        borderRadius: "15px",
        margin: "30px 8px",
        pl: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      position="static"
      color="inherit"
    >
      <div className="brandContainer">
        <Link to="/posts">
          <img src={memoriesTextImg} alt="Memories" height="45px" />
          <img
            sx={{ ml: "16px" }}
            src={memoriesLogoImg}
            alt="Memories Logo"
            height="40px"
          />
        </Link>
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
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
