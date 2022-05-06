import axios from "axios";
import constants from "./Constants";

const api = axios.create({
  baseURL: constants.url,
  timeout: 1000,
  withCredentials: true
});

api.interceptors.response.use((res) => res, (err) => console.error(err));

export default api;