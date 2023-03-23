import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-smartphone-nu.vercel.app",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
