import axios from "axios";

export const apiInstance = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "http://localhost:5000",
  timeout: 5000,
});