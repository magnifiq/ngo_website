import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Admin = () => {
  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigator("/auth/login");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <List component="nav">
        <ListItem component={Link} to="/admin/news">
          <ListItemText primary="Новини" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/admin/projects">
          <ListItemText primary="Проєкти" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/admin/events">
          <ListItemText primary="Події" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/admin/gallery">
          <ListItemText primary="Галереї" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/admin/blog">
          <ListItemText primary="Блог" />
        </ListItem>
      </List>
    </div>
  );
};

export default Admin;
