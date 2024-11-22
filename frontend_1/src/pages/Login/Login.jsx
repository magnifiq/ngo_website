// Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { sendUser } from "../../api/auth/apiUser";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await sendUser({ username, password });
      localStorage.setItem("token", response.data.token);
      navigator("/admin");
    } catch (error) {
      alert("Неправильні дані (спробуйте інше ім'я користувача або пароль)");
      console.error("Login failed:", error);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form className={styles.form} onSubmit={handleLogin}>
          <TextField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            variant="outlined"
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.submitButton}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
