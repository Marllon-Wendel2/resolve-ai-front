import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { LoginResponse, RegisterResponse, User, DashboardStats } from "@/app/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", { userName: username, password });
  return response.data;
}

export async function register(data: {
  name: string;
  username: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", data);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function getMe(userId: string): Promise<User> {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>("/dashboard");
  return response.data;
}

export function setAuthToken(token: string): void {
  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1] || null
  );
}

export function clearAuthToken(): void {
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}