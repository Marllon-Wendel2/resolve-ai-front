import type { ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import SidebarDrawer from "../components/SidebarDrawer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-page">

      <div className="sticky top-0 hidden h-dvh w-[248px] shrink-0 lg:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-line bg-side px-4 lg:hidden">
          <SidebarDrawer />
          <span className="text-sm font-semibold text-primary">Resolve AI</span>
          <span className="ml-auto text-[11px] text-muted">Plataforma de IA</span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
