import axios, { AxiosError } from "axios";

export const nextClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;
