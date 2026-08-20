"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/lib/api/posts";
import type { CreatePostDto } from "@/types";

export const usePosts = (page = 1) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => postsApi.getAll(page),
    staleTime: 1000 * 30,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePostDto) => postsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
