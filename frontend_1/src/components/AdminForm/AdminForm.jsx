import React from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const AdminForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
}) => (
  <Paper elevation={3} style={{ padding: "2em", maxWidth: "800px", margin: "2em auto" }}>
    <Typography variant="h4" gutterBottom>
      {isEditing ? "Edit Content" : "Add Content"}
    </Typography>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
          <TextField
            fullWidth
            variant="outlined"
            label="Text"
            name="text"
            multiline
            rows={4}
            onChange={handleChange}
            value={formData.text}
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
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
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

export default AdminForm;
