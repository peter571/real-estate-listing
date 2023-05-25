import axios, { AxiosInstance } from "axios";


//For Endpoints that require user authentication
const APIWithToken = (token: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: "https://realtors-backend-api-6utrins7sa-uc.a.run.app",
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
    baseURL: "https://realtors-backend-api-6utrins7sa-uc.a.run.app",
  });

  return axiosInstance;
};

export { API, APIWithToken }
