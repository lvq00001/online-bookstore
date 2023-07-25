import React, { useState } from "react";
import * as Constant from "./Constant.js";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";

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

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    address: "",
    phone: "",
    role: "USER",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const signUp = () => {
    let regexp1 = /[^a-zA-Z0-9]/;

    if (regexp1.test(user.username)) {
      alert("Username contains invalid characters.");
    } else if (
      user.password.length < 6 ||
      user.password.search(/[a-z]/i) < 0 ||
      user.password.search(/[0-9]/) < 0
    ) {
      alert(
        "Password at least 6 characters and contains at least one letter and one digit."
      );
    } else {
      fetch(Constant.SERVER_URL + "customer/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.fail === "Sign up failed! User already exists!") {
            setMessage("fail");
          } else {
            setMessage("success");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  function toast() {
    if (message === "fail") {
      return (
        <Alert variant="filled" severity="error">
          Sign up failed! User already exists!
        </Alert>
      );
    }
    if (message === "success") {
      return (
        <Alert variant="filled" severity="success">
          Sign up successfully!
        </Alert>
      );
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div>{toast()}</div>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signUp}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
