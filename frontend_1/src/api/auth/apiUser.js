import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const apiUser = axios.create({
  baseURL: baseURL,
});

export const sendUser = (data) => {
  return apiUser.post("/auth/login", data);
};
