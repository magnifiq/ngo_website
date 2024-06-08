import React from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  handleDescriptionChange,
}) => {
  return (
    <Paper
      elevation={3}
      style={{ padding: "2em", maxWidth: "800px", margin: "2em auto" }}
    >
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Edit Content" : "Add Content"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Title"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Category"
              name="category"
              onChange={handleChange}
              value={formData.category}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              value={formData.text}
              onChange={handleDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Creation Date"
              type="date"
              name="creation_date"
              onChange={handleChange}
              value={formData.creation_date}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                name="image"
                accept="image/*"
                hidden
                onChange={handleChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isEditing ? "Update Content" : "Add Content"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AdminForm;
