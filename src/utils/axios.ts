import axios from "axios";

//
const defaultApiUrl = "https://the-voice.onrender.com";

//
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? defaultApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//
export default axiosInstance;
