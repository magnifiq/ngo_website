import React, { useState, useEffect } from "react";
import { Typography, Paper, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminForm from "../AdminForm";
import Grid from "@mui/material/Grid";

import { categories } from "../../../pages/Blog/constants/categories";

import {
  fetchNews,
  editNewsArticle,
  createNewsArticle,
  deleteNewsArticle,
} from "../../../api/news/apiNews";

import {
  fetchProjects,
  editProjectsArticle,
  createProjectsArticle,
  deleteProjectsArticle,
} from "../../../api/projects/apiProjects";

import {
  fetchEvents,
  editEventsArticle,
  createEventsArticle,
  deleteEventsArticle,
} from "../../../api/events/apiEvents";

import {
  fetchBlogs,
  editBlogsArticle,
  createBlogsArticle,
  deleteBlogsArticle,
} from "../../../api/blog/apiBlog";

const AdminFormContent = ({ contentType }) => {
  const [content, setContent] = useState([]);
  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    text: "",
    creation_date: new Date().toISOString().split("T")[0],
    category: contentType === "blog" ? categories[0] : "Загальне",
  });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const chooseCategory = (category) => {
    if (category === "news") {
      return {
        fetchData: fetchNews,
        editFunc: editNewsArticle,
        createFunc: createNewsArticle,
        deleteFunc: deleteNewsArticle,
      };
    }
    if (category === "projects") {
      return {
        fetchData: fetchProjects,
        editFunc: editProjectsArticle,
        createFunc: createProjectsArticle,
        deleteFunc: deleteProjectsArticle,
      };
    }
    if (category === "events") {
      return {
        fetchData: fetchEvents,
        editFunc: editEventsArticle,
        createFunc: createEventsArticle,
        deleteFunc: deleteEventsArticle,
      };
    }
    if (category === "blog") {
      return {
        fetchData: fetchBlogs,
        editFunc: editBlogsArticle,
        createFunc: createBlogsArticle,
        deleteFunc: deleteBlogsArticle,
      };
    }
  };

  useEffect(() => {
    const { fetchData } = chooseCategory(contentType);
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

    if (imageFile) {
      if (imageFile.size > 1024 * 1024) {
        alert("Розмір фото має бути меншим за 1MB.");
        return;
      }

      const fileExtension = imageFile.name.split(".").pop().toLowerCase();

      if (
        fileExtension !== "jpg" &&
        fileExtension !== "jpeg" &&
        fileExtension !== "png" &&
        fileExtension !== "gif"
      ) {
        alert("Формат зображення має бути jpg, jpeg, png або gif.");
        return;
      }
    }
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

    const { editFunc, createFunc } = chooseCategory(contentType);
    const submitData = editId ? editFunc : createFunc;

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
          category: contentType === "blog" ? categories[0] : "Загальне",
        });
        setEditId(null);
        setImageFile(null);
      })
      .catch((error) => console.error("Error submitting content:", error));
  };

  const handleEdit = (item) => {
    setFormData({
      image_url: item.image_url || "",
      title: item.title || "",
      text: item.text || "",
      creation_date:
        item.creation_date.split("T")[0] ||
        new Date().toISOString().split("T")[0],
      category:
        item.category || contentType === "blog" ? categories[0] : "Загальне",
    });
    setEditId(item._id);
    setImageFile(null);
  };

  const handleDelete = (id) => {
    const { deleteFunc } = chooseCategory(contentType);
    if (deleteFunc) {
      deleteFunc(id)
        .then(() => setContent(content.filter((item) => item._id !== id)))
        .catch((error) => console.error("Error deleting content:", error));
    }
  };

  const handleImageName = (image) => {
    if (image) {
      if (!(image instanceof File)) {
        return image.split("/")[2];
      }
      return image.name || image.img_url;
    }
    return "Any image";
  };
  return (
    <div>
      <AdminForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={Boolean(editId)}
        handleDescriptionChange={handleDescriptionChange}
        image={imageFile || formData.image_url}
        handleImageName={handleImageName}
        contentType={contentType}
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
