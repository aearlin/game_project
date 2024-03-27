import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
const API = axios.create({ baseURL: backendURL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const fetchLetters = () => API.get("/api/letters");
export const signup = (formData) => API.post("/api/auth/signup", formData);
export const login = (formData) => API.post("/api/auth/login", formData);
export const changePassword = (formData) => API.post("/api/auth/change-password", formData);
