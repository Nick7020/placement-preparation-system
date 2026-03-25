import axios from "axios";

const API = axios.create({
  baseURL: "https://server-production-0086.up.railway.app",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
