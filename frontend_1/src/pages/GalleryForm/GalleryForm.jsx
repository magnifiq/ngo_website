import React from "react";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const GalleryForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  handleDescriptionChange,
  handleFileChange,
  images,
  handleImageName,
}) => {
  return (
    <Paper
      elevation={3}
      style={{ padding: "2em", maxWidth: "800px", margin: "2em auto" }}
    >
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Редагування вмісту" : "Додавання вмісту"}
      </Typography>
      <form onSubmit={(e) => handleSubmit(e, images)}>
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
            <TextField
              fullWidth
              variant="outlined"
              label="Google Drive Link"
              type="text"
              name="drive_link"
              onChange={handleChange}
              value={formData.drive_link}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label" fullWidth>
              Upload Images
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {images.length > 0 && (
              <ul>
                {images.map((image, index) => (
                  <li key={index}>{handleImageName(image)}</li>
                ))}
              </ul>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isEditing ? "Редагування вмісту" : "Додавання вмісту"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default GalleryForm;
