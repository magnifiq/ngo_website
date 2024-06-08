import React, { useState, useEffect } from "react";
import { Typography, Paper, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminForm from "../AdminForm";
import Grid from "@mui/material/Grid";

import {
  fetchNews,
  editNewsArticle,
  createNewsArticle,
  deleteNewsArticle,
} from "../../../api/news/apiNews";

const AdminFormContent = ({ contentType }) => {
  const [content, setContent] = useState([]);
  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    text: "",
    creation_date: new Date().toISOString().split("T")[0],
    category: "Загальне",
  });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = contentType === "news" ? fetchNews : null;
    if (fetchData) {
      fetchData()
        .then((response) => setContent(response.data))
        .catch((error) => console.error("Error fetching content:", error));
    }
  }, [contentType]);

  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({ ...prevState, text: value }));
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("text", formData.text);
    data.append("creation_date", formData.creation_date);

    if (imageFile) {
      data.append("image", imageFile);
    } else {
      data.append("image_url", formData.image_url);
    }

    const submitData = editId ? editNewsArticle : createNewsArticle;

    submitData(editId || data, data)
      .then((response) => {
        setContent(
          editId
            ? content.map((item) =>
                item._id === editId ? response.data : item
              )
            : [...content, response.data]
        );

        setFormData({
          image_url: "",
          title: "",
          text: "",
          creation_date: new Date().toISOString().split("T")[0],
          category: "Загальне",
        });
        setEditId(null);
        setImageFile(null);
      })
      .catch((error) => console.error("Error submitting content:", error));
  };

  const handleEdit = (item) => {
    console.log("Editing item:", item);
    setFormData({
      image_url: item.image_url || "",
      title: item.title || "",
      text: item.text || "",
      creation_date:
        item.creation_date || new Date().toISOString().split("T")[0],
      category: item.category || "Загальне",
    });
    setEditId(item._id);
    setImageFile(null);
  };

  const handleDelete = (id) => {
    const deleteData = contentType === "news" ? deleteNewsArticle : null;
    if (deleteData) {
      deleteData(id)
        .then(() => setContent(content.filter((item) => item._id !== id)))
        .catch((error) => console.error("Error deleting content:", error));
    }
  };

  return (
    <div>
      <AdminForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={Boolean(editId)}
        handleDescriptionChange={handleDescriptionChange}
      />
      <Box m={5}>
        <Typography variant="h5" gutterBottom>
          {contentType.charAt(0).toUpperCase() + contentType.slice(1)} list
        </Typography>
        <Grid container spacing={2}>
          {content.map((item) => (
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
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AdminFormContent;
