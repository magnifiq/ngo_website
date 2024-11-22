import React from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { categories } from "../../pages/Blog/constants/categories";

const AdminForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  handleDescriptionChange,
  image,
  handleImageName,
  contentType,
}) => {
  return (
    <Paper
      elevation={3}
      style={{ padding: "2em", maxWidth: "800px", margin: "2em auto" }}
    >
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Редагування вмісту" : "Додавання вмісту"}
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
            {contentType === "blog" ? (
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.category}
                    label="Category"
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "category",
                          value: e.target.value,
                        },
                      })
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ) : (
              <TextField
                fullWidth
                variant="outlined"
                label="Category"
                name="category"
                onChange={handleChange}
                value={formData.category}
              />
            )}
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
            {handleImageName(image)}
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

export default AdminForm;
