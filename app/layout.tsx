import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Resolve AI",
  description: "Plataforma de IA para Resolução",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-page">
        {children}
        <ToastContainer
          position="top-right"
          toastStyle={{
            background: "#1f1f1f",
            color: "#fff",
            border: "1px solid #3f3f46",
          }}
          closeButton={false}
          autoClose={4000}
          pauseOnHover={true}
          hideProgressBar={false}
        />
      </body>
    </html>
  );
}
