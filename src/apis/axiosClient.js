import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://api-smartphone-nu.vercel.app",
  timeout: 1000,
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
