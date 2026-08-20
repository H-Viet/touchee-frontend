import apiClient from "./client";
import type { AuthTokens, LoginDto, Me, RegisterDto } from "@/types";

export const authApi = {
  register: async (dto: RegisterDto): Promise<AuthTokens> => {
    const { data } = await apiClient.post<AuthTokens>("/auth/register", dto);
    return data;
  },

  login: async (dto: LoginDto): Promise<AuthTokens> => {
    const { data } = await apiClient.post<AuthTokens>("/auth/login", dto);
    return data;
  },

  me: async (): Promise<Me> => {
    const { data } = await apiClient.get<Me>("/auth/me");
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
