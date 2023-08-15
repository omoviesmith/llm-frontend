import axios from "axios";

//
const defaultApiUrl = "https://voice-osuhnty2vq-ts.a.run.app";

//
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? defaultApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//
export default axiosInstance;