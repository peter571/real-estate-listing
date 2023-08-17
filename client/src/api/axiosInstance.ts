import axios, { AxiosInstance } from "axios";
const BASE_URL = "https://real-estate-api-kdwj.onrender.com"
const LOCALHOST_URL = "http://127.0.0.1:5000"

//For Endpoints that require user authentication
const APIWithToken = (token: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.DEV ? LOCALHOST_URL : BASE_URL,
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
    baseURL: import.meta.env.DEV ? LOCALHOST_URL : BASE_URL,
  });

  return axiosInstance;
};

export { API, APIWithToken }
