import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL ??'https://stork-backend.onrender.com',
  withCredentials: true,
});
