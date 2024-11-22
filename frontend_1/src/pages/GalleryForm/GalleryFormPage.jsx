import { Typography, Paper, IconButton, Box, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import GalleryForm from "./GalleryForm";
import useGalleryFormLogic from "./hooks/useGalleryFormLogic";

const GalleryFormPage = () => {
  const {
    content,
    isEditing,
    images,
    formData,
    handleChange,
    handleFileChange,
    handleDescriptionChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleImageName,
  } = useGalleryFormLogic();

  return (
    <div>
      <GalleryForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        handleDescriptionChange={handleDescriptionChange}
        handleFileChange={handleFileChange}
        images={images}
        handleImageName={handleImageName}
      />
      <Box m={5}>
        <Typography variant="h5" gutterBottom>
          Gallery list
        </Typography>
        <Grid container spacing={2}>
          {content
            ? content.map((item) => (
                <Grid item xs={12} sm={6} key={item._id}>
                  <Paper style={{ padding: "1em" }}>
                    <Typography variant="h6">{item.title}</Typography>
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              ))
            : "Any galleries created"}
        </Grid>
      </Box>
    </div>
  );
};

export default GalleryFormPage;
