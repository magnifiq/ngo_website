import React, { useState, useEffect } from "react";

import {fetchNews, editNewsArticle, createNewsArticle,deleteNewsArticle} from "../api/news/apiNews";

const Admin = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    text: "",
    creation_date: "",
  });
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null); 

  useEffect(() => {
    fetchNews()
      .then((response) => setNews(response.data))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]); 
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("text", formData.text);
    data.append("creation_date", formData.creation_date);
    if (imageFile) {
      data.append("image", imageFile); 
    }

    if (editId) {
      editNewsArticle(editId, data)
        .then((response) => {
          setNews(news.map((item) => (item._id === editId ? response.data : item)));
          setFormData({
            image_url: "",
            title: "",
            text: "",
            creation_date: "",
          });
          setEditId(null);
          setImageFile(null);
        })
        .catch((error) => console.error("Error editing news:", error));
    } else {
      createNewsArticle(data)
        .then((response) => {
          setNews([...news, response.data]);
          setFormData({
            image_url: "",
            title: "",
            text: "",
            creation_date: "",
          });
          setImageFile(null);
        })
        .catch((error) => console.error("Error adding news:", error));
    }
  };

  const handleEdit = (item) => {
    setFormData({
      image_url: item.image_url,
      title: item.title,
      text: item.text,
      creation_date: item.creation_date,
    });
    setEditId(item._id);
  };

  const handleDelete = (id) => {
    deleteNewsArticle(id)
      .then(() => setNews(news.filter((item) => item._id !== id)))
      .catch((error) => console.error("Error deleting news:", error));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
        />
        <textarea
          name="text"
          placeholder="Text"
          onChange={handleChange}
          value={formData.text}
        ></textarea>
        <input
          type="date"
          name="creation_date"
          onChange={handleChange}
          value={formData.creation_date}
        />
        <button type="submit">{editId ? "Update News" : "Add News"}</button>
      </form>
      <ul>
        {news.map((item) => (
          <li key={item._id}>
            {item.title}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
