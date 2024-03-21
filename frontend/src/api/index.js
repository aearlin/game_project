import axios from "axios";

const backendPort = process.env.REACT_APP_BACKEND_PORT || 4000;
const API = axios.create({ baseURL: `http://localhost:${backendPort}` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const fetchLetters = () => API.get("/api/letters");
