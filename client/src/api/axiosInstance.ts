import axios, { AxiosInstance } from "axios";


//For Endpoints that require user authentication
const APIWithToken = (token: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: "https://real-estate-api-kdwj.onrender.com",
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
    baseURL: "https://real-estate-api-kdwj.onrender.com",
  });

  return axiosInstance;
};

export { API, APIWithToken }
