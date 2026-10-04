"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Inbox, Layers, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/app/lib/cn";
import { clearAuthTokens } from "@/app/lib/api";
import { useUser } from "@/app/hooks/useUser";
import { NavItem, NavItemId } from "@/app/types";

const NAV_ITEMS: readonly NavItem[] = [
  { id: "dashboard", href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "solicitacoes", href: "/solicitacoes", label: "Solicitações", icon: Inbox },
];

function resolveActiveItem(pathname: string | null): NavItemId | undefined {
  if (!pathname) return undefined;
  return NAV_ITEMS.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  )?.id;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();

  const active = resolveActiveItem(pathname);

  const handleLogout = () => {
    clearAuthTokens();
    router.push("/login");
    router.refresh();
  };

   return (
    <aside className="flex h-full w-full flex-col font-ui">

      <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
        <span
          aria-hidden="true"
          className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(-135deg,#f5ab52_14.6%,#b45309_85.4%)]"
        >
          <Layers className="h-4.25 w-4.25 text-on-accent" />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[14.5px] font-bold text-primary">
            Resolve AI
          </span>
          <span className="truncate text-[10.5px] text-muted">
            Plataforma de IA
          </span>
        </span>
      </div>

      <nav aria-label="Navegação principal" className="px-4">
        <p className="px-3 pt-3.5 pb-2 text-[9.5px] font-bold tracking-[0.12em] text-muted">
          NAVEGAÇÃO
        </p>
        <ul className="flex flex-col gap-0.75">
          {NAV_ITEMS.map(({ id, href, label, icon: Icon }) => {
            const isActive = id === active;
            return (
              <li key={id}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-[13.5px] transition-colors",
                    isActive
                      ? "bg-accent-tint font-semibold text-primary"
                      : "font-medium text-secondary hover:bg-surface-2 hover:text-primary",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn("h-4.25 w-4.25 shrink-0", isActive && "text-accent")}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(-135deg,#3f3f46_14.6%,#27272a_85.4%)] text-[11px] font-bold text-accent"
          >
            {user?.name?.charAt(0) || "U"}
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[12.5px] font-semibold text-primary">
              {user?.name || "Utilizador"}
            </span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Terminar sessão"
            title="Terminar sessão"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-secondary transition-colors hover:bg-surface-2 hover:text-primary"
          >
            <LogOut aria-hidden="true" className="h-3.75 w-3.75" />
          </button>
        </div>
      </div>
    </aside>
  );
}