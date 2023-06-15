import React, { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import GoogleLogin from "@leecheuk/react-google-login";
import Icon from "./Icon";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  // const isSignUp = false;
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchAuthMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    console.log("Successful Google Login");
    console.log(res);

    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log("Failure Google Login");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "584846199646-mdlsh442iglv27i35spvb91ant82sk7a.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
        elevation={3}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="584846199646-mdlsh442iglv27i35spvb91ant82sk7a.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                sx={{ mb: 1 }}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Button onClick={switchAuthMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
