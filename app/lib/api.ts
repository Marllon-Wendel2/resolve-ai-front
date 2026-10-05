import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { LoginResponse, RegisterResponse, User, DashboardStats, Solicitation, SolicitacoesParams, SolicitacoesResponse, CreateSolicitacaoInput, UpdateSolicitacaoInput } from "@/app/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("refresh_token="))
          ?.split("=")[1];

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(`${API_BASE_URL}/auth/refresh`, { refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        document.cookie = `auth_token=${accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
        document.cookie = `refresh_token=${newRefreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;

        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        if (typeof window !== "undefined") {
          document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          window.location.href = "/login";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export async function login(userName: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", { userName: userName, password });
  const { accessToken, refreshToken } = response.data;
  setAuthTokens(accessToken, refreshToken);
  return response.data;
}

export async function register(data: {
  name: string;
  userName: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/users", data);
  return response.data;
}

export async function refreshAuthTokens(): Promise<{ accessToken: string; refreshToken: string }> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const response = await axios.post<{ accessToken: string; refreshToken: string }>(
    `${API_BASE_URL}/auth/refresh`,
    { refreshToken }
  );

  const { accessToken, refreshToken: newRefreshToken } = response.data;
  setAuthTokens(accessToken, newRefreshToken);
  return { accessToken, refreshToken: newRefreshToken };
}

export async function logout(): Promise<void> {
  const refreshToken = getRefreshToken();
  try {
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
    }
  } finally {
    clearAuthTokens();
  }
}

export async function getMe(userId: string): Promise<User> {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await api.get<DashboardStats>("/dashboard");
  return response.data;
}

export async function getRecentSolicitations(): Promise<Solicitation[]> {
  const response = await api.get<Solicitation[]>("/solitacion");
  return response.data;
}

export async function getSolicitacoes(params: SolicitacoesParams = {}): Promise<SolicitacoesResponse> {
  const response = await api.get<Solicitation[]>("/solitacion", { params });
  const total = parseInt(response.headers["x-total-count"] || "0", 10);
  return { data: response.data, total };
}

export async function createSolicitacao(data: CreateSolicitacaoInput): Promise<Solicitation> {
  const response = await api.post<Solicitation>("/solitacion", data);
  return response.data;
}

export async function updateSolicitacao(data: UpdateSolicitacaoInput): Promise<Solicitation> {
  const { id, ...body } = data;
  const response = await api.patch<Solicitation>(`/solitacion/${id}`, body);
  return response.data;
}

export async function getSolicitacaoById(id: string): Promise<Solicitation> {
  const response = await api.get<Solicitation>(`/solitacion/${id}`);
  return response.data;
}

export async function deleteSolicitacao(id: string): Promise<void> {
  await api.delete(`/solitacion/${id}`);
}

export function setAuthTokens(accessToken: string, refreshToken: string): void {
  const cookieOptions = `path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
  document.cookie = `auth_token=${accessToken}; ${cookieOptions}`;
  document.cookie = `refresh_token=${refreshToken}; ${cookieOptions}`;
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

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh_token="))
      ?.split("=")[1] || null
  );
}

export function clearAuthTokens(): void {
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}