import axios, { AxiosInstance } from "axios";
import config from "@/config";

const BASE_URL = config.BASE_URL;
const LOCALHOST_URL = config.LOCALHOST_URL;

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

export { API, APIWithToken };
