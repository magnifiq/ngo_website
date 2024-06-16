import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiProjects = axios.create({
  baseURL: baseURL,
});

export const fetchProjects = () => {
  return apiProjects.get("/projectsDescription");
};

export const fetchProjectsArticle = (id) => {
  return apiProjects.get(`/projectsDescription/${id}`);
};

export const editProjectsArticle = (editId, data) => {
  return apiProjects.put(`/projectsDescription/${editId}`, data);
};

export const createProjectsArticle = (data) => {
  return apiProjects.post("/projectsDescription", data);
};

export const deleteProjectsArticle = (id) => {
  return apiProjects.delete(`/projectsDescription/${id}`);
};

export default apiProjects;
