import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiBlog = axios.create({
  baseURL: baseURL,
});

export const fetchBlogs = () => {
  return apiBlog.get("/blog");
};

export const fetchBlogsArticle = (id) => {
  return apiBlog.get(`/blog/${id}`);
};

export const fetchBlogsByCategory = (category) => {
  return apiBlog.get(`/blog/category/${category}`);
};

export const fetchCategoryCounts = () => {
  return apiBlog.get("/blog/categoryCounts");
};
export const editBlogsArticle = (editId, data) => {
  return apiBlog.put(`/blog/${editId}`, data);
};

export const createBlogsArticle = (data) => {
  return apiBlog.post("/blog", data);
};

export const deleteBlogsArticle = (id) => {
  return apiBlog.delete(`/blog/${id}`);
};

export default apiBlog;
