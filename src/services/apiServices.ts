import axios from "axios";
import { Horse } from "../types/definitions";

const API_BASE = "http://localhost:3016/horse";

const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.method === 'put' || config.method === 'post') {
      config.headers['Content-Type'] = 'application/json';
      if (config.data && typeof config.data === 'object') {
        config.data = JSON.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API error:", error.response.data);
      if (error.response.status === 401) {
        alert("Unauthorized! Redirecting to login...");
        // window.location.href = '/login';
      }
      //...
    }
    return Promise.reject(error);
  }
);

// Generic GET method
const getRequest = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};

// Generic PUT method
const putRequest = async (url: string, data: any) => {
  const response = await apiClient.put(url, data);
  return response.data;
};

// Exported API functions
export const getHorses = () => getRequest("");
export const getHorseById = (id: string) => getRequest(`/${id}`);
export const addHorse = (horse: Omit<Horse, "id">) => putRequest("", horse);
export const updateHorseById = (id: string, horse: Omit<Horse, "id">) => putRequest(`/${id}`, horse);
