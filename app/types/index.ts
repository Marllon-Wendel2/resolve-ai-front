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

// Solicitation types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Solicitation {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  status: "Open" | "InProgress" | "Closed";
  createdAt: string;
  updatedAt: string;
  user: User;
}

export type SolicitationStatus = "Aberto" | "Em Atendimento" | "Concluído";

export interface SolicitationDisplay {
  id: string;
  shortId: string;
  title: string;
  category: string;
  status: SolicitationStatus;
  author: string;
  timeAgo: string;
  categoryIcon: string;
  categoryBgColor: string;
  iconColor: string;
  statusDotColor: string;
  statusLabelColor: string;
}