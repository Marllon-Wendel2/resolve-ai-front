import { z } from "zod";
import { LoginInput, RegisterInput } from "@/app/types";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Utilizador é obrigatório")
    .max(50, "Utilizador deve ter no máximo 50 caracteres"),
  password: z
    .string()
    .min(1, "Palavra-passe é obrigatória")
    .min(8, "Palavra-passe deve ter no mínimo 8 caracteres"),
}) satisfies z.ZodType<LoginInput>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome completo é obrigatório")
      .min(2, "Nome deve ter no mínimo 2 caracteres")
      .max(100, "Nome deve ter no máximo 100 caracteres"),
    username: z
      .string()
      .min(1, "Utilizador é obrigatório")
      .min(3, "Utilizador deve ter no mínimo 3 caracteres")
      .max(50, "Utilizador deve ter no máximo 50 caracteres")
      .regex(/^[a-zA-Z0-9._-]+$/, "Utilizador só pode conter letras, números, ponto, underscore e hífen"),
    email: z
      .string()
      .min(1, "Email é obrigatório")
      .email("Email inválido")
      .max(100, "Email deve ter no máximo 100 caracteres"),
    password: z
      .string()
      .min(1, "Palavra-passe é obrigatória")
      .min(8, "Palavra-passe deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Palavra-passe deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Palavra-passe deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Palavra-passe deve conter pelo menos um número"),
    confirmPassword: z.string().min(1, "Confirmação de palavra-passe é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As palavras-passe não coincidem",
    path: ["confirmPassword"],
  }) satisfies z.ZodType<RegisterInput>;