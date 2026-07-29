import axios from "axios";

const api = axios.create({
  baseURL: "https://grocery-delivery-38jv.onrender.com/api",
});

export default api;