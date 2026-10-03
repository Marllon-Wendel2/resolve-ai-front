"use client";

import { useState, useEffect } from "react";
import { getAuthToken } from "@/app/lib/api";
import { User } from "@/app/types";


function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const name = (payload.name as string) || (payload.username as string) || "Utilizador";
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial user load from token
        setUser({
          name,
          username: (payload.username as string) || "",
          email: (payload.email as string) || "",
          id: (payload.sub as string) || "",
        });
      }
    } else {
      setUser(null);
    }
  }, []);

  return user;
}