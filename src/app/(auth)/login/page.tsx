"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLogin } from "@/lib/hooks/useAuth";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  // Extract readable error message from backend ApiError shape
  const apiError = error as AxiosError<ApiError> | null;
  const errorMessage = apiError?.response?.data?.message;
  const displayError = Array.isArray(errorMessage)
    ? errorMessage[0]
    : errorMessage;

  const onSubmit = (data: LoginForm) => login(data);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Sign in to find your vibe
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Backend error (wrong password, user not found, etc.) */}
        {displayError && (
          <div className="rounded-[var(--radius-md)] bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] px-4 py-3 text-sm text-[var(--color-error)]">
            {displayError}
          </div>
        )}

        <Button type="submit" loading={isPending} className="mt-2 w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
        No account?{" "}
        <Link
          href="/register"
          className="text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
