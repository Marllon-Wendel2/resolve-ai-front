export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt?: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


export type NavItemId = "dashboard" | "solicitacoes";

export interface NavItem {
  id: NavItemId;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Dashboard KPI types
export interface DashboardStats {
  totalSolicitations: number;
  openSolicitations: number;
  inProgressSolicitations: number;
  closedSolicitations: number;
}