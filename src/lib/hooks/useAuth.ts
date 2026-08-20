"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { tokenStorage } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/authStore";
import type { LoginDto, RegisterDto } from "@/types";

export const useMe = () => {
  const { isAuthenticated, setUser } = useAuthStore();
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const me = await authApi.me();
      setUser(me);
      return me;
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: LoginDto) => {
      const tokens = await authApi.login(dto);
      tokenStorage.set(tokens);
      const me = await authApi.me();
      setUser(me);
      return me;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/feed");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (dto: RegisterDto) => {
      const tokens = await authApi.register(dto);
      tokenStorage.set(tokens);
      const me = await authApi.me();
      setUser(me);
      return me;
    },
    onSuccess: () => {
      router.push("/feed");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    router.push("/login");
  };
};
