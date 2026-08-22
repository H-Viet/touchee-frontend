import type { User, Post, Community } from "@/types";

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
    mediaUrl: null,
    mediaType: null,
    createdAt: "2026-08-22T09:15:00.000Z",
    updatedAt: "2026-08-22T09:15:00.000Z",
    author: mockUsers[1],
  },
  {
    id: "post-2",
    content:
      "Sunset from my rooftop today. Autumn hits different this year!!! 🍂",
    authorId: "user-3",
    communityId: null,
    mediaUrl: "/mock/sunset.svg",
    mediaType: "image",
    createdAt: "2026-08-22T07:30:00.000Z",
    updatedAt: "2026-08-22T07:30:00.000Z",
    author: mockUsers[2],
  },
  {
    id: "post-3",
    content:
      "Finally finished setting up my little reading corner. Golden lamp, cold coffee, warm playlist. This is peace.",
    authorId: "user-1",
    communityId: null,
    mediaUrl: null,
    mediaType: null,
    createdAt: "2026-08-22T04:45:00.000Z",
    updatedAt: "2026-08-22T04:45:00.000Z",
    author: mockUsers[0],
  },
];

export const mockJoinedCommunities: Community[] = [
  {
    id: "comm-1",
    name: "Rainy Day Vibes",
    slug: "rainy-day-vibes",
    description: "For people who love the sound of rain",
    type: "PUBLIC",
    createdAt: new Date().toISOString(),
    _count: { members: 1240, posts: 89 },
  },
  {
    id: "comm-2",
    name: "Night Owls",
    slug: "night-owls",
    description: "3am thoughts and late night energy",
    type: "PUBLIC",
    createdAt: new Date().toISOString(),
    _count: { members: 682, posts: 45 },
  },
  {
    id: "comm-3",
    name: "Cozy Corner",
    slug: "cozy-corner",
    description: "Reading nooks, warm drinks, soft blankets",
    type: "RESTRICTED",
    createdAt: new Date().toISOString(),
    _count: { members: 331, posts: 22 },
  },
];

export const mockSuggestedCommunities: Community[] = [
  {
    id: "comm-4",
    name: "Golden Hour",
    slug: "golden-hour",
    description: "Sunset chasers and photography lovers",
    type: "PUBLIC",
    createdAt: new Date().toISOString(),
    _count: { members: 2103, posts: 156 },
  },
  {
    id: "comm-5",
    name: "Late Night Thoughts",
    slug: "late-night-thoughts",
    description: "For when the world is asleep and your mind isn't",
    type: "PUBLIC",
    createdAt: new Date().toISOString(),
    _count: { members: 890, posts: 67 },
  },
  {
    id: "comm-6",
    name: "Slow Mornings",
    slug: "slow-mornings",
    description: "Coffee, journaling, and taking it easy",
    type: "PUBLIC",
    createdAt: new Date().toISOString(),
    _count: { members: 1567, posts: 98 },
  },
];
