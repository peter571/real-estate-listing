import axios, { AxiosInstance } from "axios";

const api_url = "http://127.0.0.1:5000";

//For Endpoints that require user authentication
const APIWithToken = (token: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

//Public api endpoints
const API = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });

  return axiosInstance;
};

export { API, APIWithToken }
