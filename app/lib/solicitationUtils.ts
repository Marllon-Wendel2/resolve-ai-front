import { Solicitation, SolicitationDisplay, SolicitationStatus } from "@/app/types";
import { Monitor, ShoppingCart, Users, Building2, Wallet, LucideIcon } from "lucide-react";

export interface CategoryStyle {
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

export interface StatusStyle {
  dotColor: string;
  labelColor: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  Infra: { icon: Monitor, bgColor: "#16233a", iconColor: "#93c5fd" },
  TI: { icon: Monitor, bgColor: "#16233a", iconColor: "#93c5fd" },
  Materiais: { icon: ShoppingCart, bgColor: "#2a1c0b", iconColor: "#fbbf24" },
  Acesso: { icon: Users, bgColor: "#241631", iconColor: "#d8b4fe" },
  RH: { icon: Users, bgColor: "#241631", iconColor: "#d8b4fe" },
  Facilities: { icon: Building2, bgColor: "#10241a", iconColor: "#86efac" },
  Financeiro: { icon: Wallet, bgColor: "#2b1624", iconColor: "#f9a8d4" },
};

const statusStyles: Record<SolicitationStatus, StatusStyle> = {
  Aberto: { dotColor: "#60a5fa", labelColor: "#93c5fd" },
  "Em Atendimento": { dotColor: "#d97706", labelColor: "#fbbf24" },
  Concluído: { dotColor: "#4ade80", labelColor: "#86efac" },
};

export function mapBackendStatusToDisplay(status: string): SolicitationStatus {
  switch (status) {
    case "Open":
      return "Aberto";
    case "InProgress":
      return "Em Atendimento";
    case "Closed":
      return "Concluído";
    default:
      return "Aberto";
  }
}

export function getCategoryStyle(category: string): CategoryStyle {
  return categoryStyles[category] || { icon: Monitor, bgColor: "#16233a", iconColor: "#93c5fd" };
}

export function getStatusStyle(status: SolicitationStatus): StatusStyle {
  return statusStyles[status] || statusStyles.Aberto;
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "agora mesmo";
  if (diffMins < 60) return `há ${diffMins} min`;
  if (diffHours < 24) return `há ${diffHours} h`;
  if (diffDays === 1) return "ontem";
  if (diffDays < 7) return `há ${diffDays} dias`;

  return date.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit" });
}

export function generateShortId(id: string): string {
  const num = parseInt(id.slice(-6), 36) || Math.floor(Math.random() * 10000);
  return `SOL-${num.toString().padStart(4, "0")}`;
}

export function transformSolicitation(solicitation: Solicitation): SolicitationDisplay {
  const displayStatus = mapBackendStatusToDisplay(solicitation.status);
  const categoryStyle = getCategoryStyle(solicitation.category);
  const statusStyle = getStatusStyle(displayStatus);

  return {
    id: solicitation.id,
    shortId: generateShortId(solicitation.id),
    title: solicitation.title,
    category: solicitation.category,
    status: displayStatus,
    author: solicitation.user?.name || "Utilizador",
    timeAgo: formatTimeAgo(solicitation.createdAt),
    categoryIcon: categoryStyle.icon.displayName || "Monitor",
    categoryBgColor: categoryStyle.bgColor,
    iconColor: categoryStyle.iconColor,
    statusDotColor: statusStyle.dotColor,
    statusLabelColor: statusStyle.labelColor,
  };
}

export function transformSolicitations(solicitations: Solicitation[]): SolicitationDisplay[] {
  return solicitations.map(transformSolicitation);
}