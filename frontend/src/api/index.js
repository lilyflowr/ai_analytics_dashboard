import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export const getSummary = async () => {
  const response = await api.get("/summary");
  return response.data;
};

export const getData = async () => {
  const response = await api.get("/data");
  return response.data;
};

export const getPrediction = async (formData) => {
  const response = await api.post("/predict", formData);
  return response.data;
};
