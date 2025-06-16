import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // URL base da API
  withCredentials: true // importante para cookies/sessões
});

export default api;