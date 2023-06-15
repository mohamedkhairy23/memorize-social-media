import React, { useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";

const Auth = () => {
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

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          mt: 8,
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
            sx={{ mt: 3, mb: 2, ml: 0.5 }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
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
