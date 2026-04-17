import axios from "axios";

const api = axios.create({
  baseURL: "/api",
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
