import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Constant from "./Constant.js";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        lvq00001@gmail.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [isAuthenticated, setAuth] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const login = () => {
    fetch(Constant.SERVER_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        const jwtToken = res.headers.get("Authorization");
        if (jwtToken !== null) {
          localStorage.setItem("jwt", jwtToken);
          setAuth(true);
        } else {
          return alert("Username and password are not match.");
        }
      })
      .then(() => {
        fetch(Constant.SERVER_URL + "customer/username/" + user.username, {
          headers: { Authorization: localStorage.getItem("jwt") },
        })
          .then((res) => res.json())
          .then((res) => {
            localStorage.setItem("user", res.customerId);
            localStorage.setItem("name", res.username);
            localStorage.setItem("phone", res.phone);
            localStorage.setItem("address", res.address);
          })
          .then(() => window.location.reload())
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };
  if (isAuthenticated === true) {
    navigate("/search-bar");
  } else {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="username"
                autoFocus
                name="username"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}>
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    );
  }
}
