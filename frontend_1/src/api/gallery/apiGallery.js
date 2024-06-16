import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiGallery = axios.create({
  baseURL: baseURL,
});

export const fetchGallery = () => {
  return apiGallery.get("/gallery");
};

export const fetchlatestFivePhotos = async () => {
  return apiGallery.get("/gallery/latestFivePhotos");
};

export const fetchGalleryArticle = (id) => {
  return apiGallery.get(`/gallery/${id}`);
};

export const editGalleryArticle = (editId, data) => {
  return apiGallery.put(`/gallery/${editId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createGalleryArticle = (data) => {
  return apiGallery.post("/gallery", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteGalleryArticle = (id) => {
  return apiGallery.delete(`/gallery/${id}`);
};

export default apiGallery;
