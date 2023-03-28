import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api-smartphone-nu.vercel.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
export default axiosClient;
