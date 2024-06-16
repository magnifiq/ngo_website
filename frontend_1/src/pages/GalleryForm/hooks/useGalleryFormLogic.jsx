import { useState, useEffect } from "react";
import {
  createGalleryArticle,
  fetchGallery,
  editGalleryArticle,
  deleteGalleryArticle,
} from "../../../api/gallery/apiGallery";
import { drawerClasses } from "@mui/material";

const useGalleryFormLogic = () => {
  const [content, setContent] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "Загальне",
    text: "",
    creation_date: new Date().toISOString().split("T")[0],
    drive_link: "",
  });

  useEffect(() => {
    fetchGallery()
      .then((res) => setContent(res.data))
      .catch((error) => console.error("Error fetching content:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };
  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({ ...prevState, text: value }));
  };

  const handleSubmit = async (e, images) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("text", formData.text);
    formDataToSend.append("creation_date", formData.creation_date);
    formDataToSend.append("drive_link", formData.drive_link);
    for (let i = 0; i < images.length; i++) {
      formDataToSend.append("images", images[i]);
    }

    const submitData = editId ? editGalleryArticle : createGalleryArticle;

    submitData(editId || formDataToSend, formDataToSend)
      .then((response) => {
        setContent(
          editId
            ? content.map((item) =>
                item._id === editId ? response.data : item
              )
            : [...content, response.data]
        );

        setFormData({
          title: "",
          category: "Загальне",
          text: "",
          creation_date: new Date().toISOString().split("T")[0],
          drive_link: "",
        });
        setEditId(null);
        setIsEditing(false);
        setImages([]);
      })
      .catch((error) => console.error("Error submitting content:", error));
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData({
      title: item.title || "",
      text: item.text || "",
      creation_date:
        item.creation_date.split("T")[0] ||
        new Date().toISOString().split("T")[0],
      category: item.category || "Загальне",
      drive_link: item.drive_link || "",
    });
    setEditId(item._id);
    setImages(item.images || []);
  };

  const handleDelete = (id) => {
    deleteGalleryArticle(id)
      .then(() => setContent(content.filter((item) => item._id !== id)))
      .catch((error) => console.error("Error deleting content:", error));
  };

  const handleImageName = (image) => {
    if (image) {
      if (!(image instanceof File)) {
        return image.split("/")[2];
      }
      return image.name;
    }
    return "Any image";
  };
  return {
    content,
    isEditing,
    editId,
    images,
    formData,
    handleChange,
    handleFileChange,
    handleDescriptionChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleImageName,
  };
};

export default useGalleryFormLogic;
