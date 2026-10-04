"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { User, KeyRound, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Checkbox, FormLayout, FormField } from "@/app/components/ui";
import { loginSchema } from "@/app/lib/validations/auth";
import { LoginInput } from "@/app/types";
import { login } from "@/app/lib/api";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    setIsSubmitting(true);

    try {
      await login(data.username, data.password);
      toast.success("Bem-vindo de volta!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Credenciais inválidas. Tente novamente.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      eyebrow="ACESSO AO PORTAL"
      title="Iniciar sessão"
      subtitle="Introduza as suas credenciais para aceder à plataforma."
      submitLabel="Entrar"
      submitIcon={<ArrowRight className="h-4 w-4" />}
      loading={isSubmitting}
      demoHint="utilizador: admin · palavra-passe: admin123"
      footerAction={
        <span>
          Não tem conta?{" "}
          <a href="/cadastro" className="text-accent hover:underline font-medium">
            Criar conta
          </a>
        </span>
      }
      onSubmit={handleSubmitForm(onSubmit)}
    >
      <FormField
        label="User name ou email"
        placeholder="marta.cardoso"
        error={errors.username?.message}
        required
        {...register("username")}
        leftIcon={<User className="h-4 w-4" />}
      />

      <FormField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        error={errors.password?.message}
        required
        {...register("password")}
        leftIcon={<KeyRound className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-zinc-500 hover:text-zinc-300"
            aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <Checkbox
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          label="Manter sessão"
        />
        <a
          href="#"
          className="text-[12.5px] font-semibold text-accent hover:underline"
        >
          Recuperar palavra-passe
        </a>
      </div>

      {error && (
        <div
          className="bg-red-900/20 border border-red-800 rounded-[10px] p-3 flex items-center gap-3"
          role="alert"
        >
          <svg className="h-4 w-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-[12.5px] text-red-300">{error}</p>
        </div>
      )}
    </FormLayout>
  );
}