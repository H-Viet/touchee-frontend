// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

// ─── Account / User ──────────────────────────────────────────────────────────

export interface Account {
  id: string;
  email: string;
  createdAt: string;
}

export interface User {
  id: string;
  accountId: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  accScore: number;
  createdAt: string;
}

export interface Me {
  account: Account;
  user: User;
}

// ─── Posts ───────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  content: string;
  authorId: string;
  communityId: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  createdAt: string;
  updatedAt: string;
  author?: User;
}

export interface CreatePostDto {
  content: string;
  mediaUrl: string | null;
  mediaType: "image" | "video" | null;
  communityId?: string;
}

// ─── Communities ─────────────────────────────────────────────────────────────

export type CommunityType = "PUBLIC" | "RESTRICTED" | "PRIVATE";
export type MemberRole = "OWNER" | "MODERATOR" | "MEMBER";
export type MemberStatus = "ACTIVE" | "BANNED" | "PENDING";

export interface Community {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: CommunityType;
  createdAt: string;
  _count?: {
    members: number;
    posts: number;
  };
}

export interface CreateCommunityDto {
  name: string;
  slug: string;
  description?: string;
  type: CommunityType;
}

// ─── Shared ──────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
