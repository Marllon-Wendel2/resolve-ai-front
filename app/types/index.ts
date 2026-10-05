export interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
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
  userName: string;
  createdAt: string;
}

export interface LoginInput {
  userName: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  userName: string;
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

export interface DashboardStats {
  totalSolicitations: number;
  openSolicitations: number;
  inProgressSolicitations: number;
  closedSolicitations: number;
  categories: Record<string, number>;
  totalDeltaPct: number | null;
  openDeltaPct: number | null;
  inProgressDelta: number;
  closedDeltaPct: number | null;
  resolutionRate: number;
}

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
  description: string;
  category: string;
  status: SolicitationStatus;
  author: string;
  authorInitials: string;
  timeAgo: string;
  formattedDate: string;
  categoryIcon: string;
  categoryBgColor: string;
  iconColor: string;
  statusDotColor: string;
  statusLabelColor: string;
}

export interface SolicitacoesParams {
  limit?: number;
  offset?: number;
  orderBy?: "asc" | "desc";
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface SolicitacoesFilters {
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  search: string;
  orderBy: "asc" | "desc";
}

export interface SolicitacoesResponse {
  data: Solicitation[];
  total: number;
}

export interface DataTableColumn<T> {
  key: string;
  title: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  render?: (item: T, index: number) => React.ReactNode;
}

export interface CreateSolicitacaoInput {
  title: string;
  description: string;
  category: string;
}

export interface UpdateSolicitacaoInput extends CreateSolicitacaoInput {
  id: string;
  status: "Open" | "InProgress" | "Closed";
}