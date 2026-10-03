"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { User, Mail, KeyRound, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FormLayout, FormField } from "@/app/components/ui";
import { registerSchema, type RegisterInput } from "@/app/lib/validations/auth";
import { register, setAuthToken } from "@/app/lib/api";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: registerField,
    handleSubmit: handleSubmitForm,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      void _confirmPassword;
      const response = await register(registerData);
      setAuthToken(response.token);
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      eyebrow="CRIAR CONTA"
      title="Registar utilizador"
      subtitle="Preencha os dados abaixo para criar a sua conta na plataforma."
      submitLabel="Criar conta"
      submitIcon={<ArrowRight className="h-4 w-4" />}
      loading={isSubmitting}
      footerAction={
        <span>
          Já tem conta?{" "}
          <a href="/login" className="text-accent hover:underline font-medium">
            Iniciar sessão
          </a>
        </span>
      }
      onSubmit={handleSubmitForm(onSubmit)}
    >
      <FormField
        label="Nome completo"
        placeholder="Marta Cardoso"
        error={errors.name?.message}
        required
        {...registerField("name")}
        leftIcon={<User className="h-4 w-4" />}
      />

      <FormField
        label="Utilizador"
        placeholder="marta.cardoso"
        error={errors.username?.message}
        required
        {...registerField("username")}
        leftIcon={<User className="h-4 w-4" />}
        helperText="Apenas letras, números, ponto, underscore e hífen"
      />

      <FormField
        label="Email"
        type="email"
        placeholder="marta@empresa.com"
        error={errors.email?.message}
        required
        {...registerField("email")}
        leftIcon={<Mail className="h-4 w-4" />}
      />

      <FormField
        label="Palavra-passe"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        error={errors.password?.message}
        required
        {...registerField("password")}
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
        helperText="Mín. 8 caracteres, 1 maiúscula, 1 minúscula, 1 número"
      />

      <FormField
        label="Confirmar palavra-passe"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        required
        {...registerField("confirmPassword")}
        leftIcon={<KeyRound className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-zinc-500 hover:text-zinc-300"
            aria-label={showConfirmPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

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