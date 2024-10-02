import axios from "axios";
import { Horse } from "../types/definitions";

const API_BASE = "http://localhost:3016/horse";

const apiClient = axios.create({
  baseURL: API_BASE,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error("API error:", error.response.data);
      if (error.response.status === 401) {
        alert('Unauthorized! Redirecting to login...');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getHorses = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const getHorseById = async (id: string) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};
export const addHorse = async (horse: Omit<Horse, "id">) => {
  const response = await axios.put(API_BASE, horse);
  return response.data;
};

export const updateHorseById = async (id: string, horse: Omit<Horse, "id">) => {
  const response = await axios.put(`${API_BASE}/${id}`, horse);
  return response.data;
};
