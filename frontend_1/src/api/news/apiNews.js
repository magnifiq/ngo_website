import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiNews = axios.create({
  baseURL: baseURL,
});

export const fetchNews = () => {
  return apiNews.get("/news");
};

export const fetchLatestNews = () => {
  return apiNews.get("/news/latestNews");
};

export const fetchLatestThreeNews = () => {
  return apiNews.get("/news/latestThreeNews");
};

export const fetchNewsArticle = (id) => {
  return apiNews.get(`/news/${id}`);
};

export const editNewsArticle = (editId, data) => {
  return apiNews.put(`/news/${editId}`, data);
};

export const createNewsArticle = (data) => {
  return apiNews.post("/news", data);
};

export const deleteNewsArticle = (id) => {
  return apiNews.delete(`/news/${id}`);
};

export default apiNews;
