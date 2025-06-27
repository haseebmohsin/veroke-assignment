import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!baseURL) throw new Error("NEXT_PUBLIC_BASE_API_URL is not set");

export const apiClient = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
