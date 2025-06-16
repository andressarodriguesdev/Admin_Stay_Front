import axios from "axios";

// Cria uma instância do axios com a baseURL vinda do .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
