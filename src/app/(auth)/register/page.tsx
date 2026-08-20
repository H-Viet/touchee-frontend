"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRegister } from "@/lib/hooks/useAuth";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types";

const registerSchema = z.object({
  email: z.string().email("Enter a valid email"),
  username: z
    .string()
    .min(3, "At least 3 characters")
    .max(20, "Max 20 characters")
    .regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers, underscores only"),
  displayName: z
    .string()
    .min(2, "At least 2 characters")
    .max(50, "Max 50 characters"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "One uppercase letter required")
    .regex(/[0-9]/, "One number required"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { mutate: register, isPending, error } = useRegister();

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const apiError = error as AxiosError<ApiError> | null;
  const errorMessage = apiError?.response?.data?.message;
  const displayError = Array.isArray(errorMessage)
    ? errorMessage[0]
    : errorMessage;

  const onSubmit = (data: RegisterForm) => register(data);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-var(--color-text-primary) mb-1">
          Join Touchee
        </h1>
        <p className="text-sm text-var(--color-text-secondary)">
          Find people who match your vibe
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...field("email")}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Username"
            placeholder="your_handle"
            hint="Lowercase, no spaces"
            error={errors.username?.message}
            {...field("username")}
          />
          <Input
            label="Display name"
            placeholder="Your Name"
            error={errors.displayName?.message}
            {...field("displayName")}
          />
        </div>

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          hint="8+ chars, one uppercase, one number"
          error={errors.password?.message}
          {...field("password")}
        />

        {displayError && (
          <div className="rounded-var(--radius-md) bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] px-4 py-3 text-sm text-var(--color-error)">
            {displayError}
          </div>
        )}

        <Button type="submit" loading={isPending} className="mt-2 w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-var(--color-text-muted)">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-var(--color-accent) hover:text-var(--color-primary) transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
