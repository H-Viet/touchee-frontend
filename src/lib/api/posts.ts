import apiClient from "./client";
import type { CreatePostDto, PaginatedResponse, Post } from "@/types";

export const postsApi = {
  getAll: async (page = 1, limit = 20): Promise<PaginatedResponse<Post>> => {
    const { data } = await apiClient.get<PaginatedResponse<Post>>("/posts", {
      params: { page, limit },
    });
    return data;
  },

  create: async (dto: CreatePostDto): Promise<Post> => {
    const { data } = await apiClient.post<Post>("/posts", dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
