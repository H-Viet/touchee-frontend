import type { User, Post } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    accountId: "acc-1",
    username: "harry_dev",
    displayName: "Harry",
    bio: "Building Touchee 🚀",
    avatarUrl: null,
    accScore: 87,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-2",
    accountId: "acc-2",
    username: "luna_vibes",
    displayName: "Luna Rivera",
    bio: "Chasing golden hour and good vibes ✨",
    avatarUrl: null,
    accScore: 92,
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-3",
    accountId: "acc-3",
    username: "kai_moves",
    displayName: "Kai Tanaka",
    bio: null,
    avatarUrl: null,
    accScore: 74,
    createdAt: new Date().toISOString(),
  },
];

export const mockCurrentUser: User = mockUsers[0];

export const mockPosts: Post[] = [
  {
    id: "post-1",
    content:
      "Just matched with someone who's also obsessed with lo-fi and rainy days 🌧️ Touchee really gets me.",
    authorId: "user-2",
    communityId: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    author: mockUsers[1],
  },
  {
    id: "post-2",
    content:
      "Anyone else feel like their mood completely shifts with the seasons? Autumn hits different this year.",
    authorId: "user-3",
    communityId: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    author: mockUsers[2],
  },
  {
    id: "post-3",
    content:
      "Finally finished setting up my little reading corner. Golden lamp, cold coffee, warm playlist. This is peace.",
    authorId: "user-1",
    communityId: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: mockUsers[0],
  },
];
