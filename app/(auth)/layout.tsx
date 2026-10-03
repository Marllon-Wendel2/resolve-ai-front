import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layers } from "lucide-react";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Resolve AI",
  description: "Plataforma de IA para Resolução",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} min-h-full flex flex-col bg-page`}>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {/* Background glows */}
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute -top-60 -left-60 h-190 w-190 rounded-full opacity-35"
            style={{
              background: "radial-gradient(circle, #b45309 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-60 right-60 h-155 w-155 rounded-full opacity-18"
            style={{
              background: "radial-gradient(circle, #d97706 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -top-40 right-60 h-130 w-130 rounded-full border border-amber-700/35 opacity-35"
          />
          <div
            className="absolute -top-20 right-40 h-80 w-[320px] rounded-full border border-amber-700/25 opacity-25"
          />
        </div>

        {/* Top brand */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="grid h-8.5 w-8.5 place-items-center rounded-[10px] bg-linear-to-br from-amber-300 via-amber-400 to-amber-700">
            <Layers className="h-4.25 w-4.25 text-zinc-900" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14.5px] font-bold text-white">Resolve AI</span>
            <span className="text-[10.5px] text-zinc-500">Plataforma de IA para Resolução</span>
          </div>
        </div>

        <main className="w-full max-w-108">{children}</main>

        {/* Footer note */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-500">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 15a2 2 0 012-2h4a2 2 0 012 2" />
          </svg>
          <span className="text-[11.5px]">Sessão cifrada · Acesso restrito a colaboradores Resolve AI</span>
        </div>
      </div>
    </div>
  );
}