import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiEvents = axios.create({
  baseURL: baseURL,
});

export const fetchEvents = () => {
  return apiEvents.get("/eventsDescription");
};

export const fetchEventsArticle = (id) => {
  return apiEvents.get(`/eventsDescription/${id}`);
};

export const editEventsArticle = (editId, data) => {
  return apiEvents.put(`/eventsDescription/${editId}`, data);
};

export const createEventsArticle = (data) => {
  return apiEvents.post("/eventsDescription", data);
};

export const deleteEventsArticle = (id) => {
  return apiEvents.delete(`/eventsDescription/${id}`);
};

export default apiEvents;
