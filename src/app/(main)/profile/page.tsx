"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/posts/PostCard";
import { mockCurrentUser, mockPosts } from "@/lib/mock/data";
import type { Post } from "@/types";

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>(
    mockPosts.filter((p) => p.authorId === mockCurrentUser.id),
  );

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const joinedDate = format(new Date(mockCurrentUser.createdAt), "MMMM yyyy");

  return (
    <div>
      {/* Gradient banner */}
      <div
        style={{
          height: "140px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
        }}
      />

      {/* Avatar + edit button row, pulled up over the banner */}
      <div
        style={{
          padding: "0 20px",
          marginTop: "-32px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ borderRadius: "9999px", boxShadow: "0 0 0 4px #0f0d0f" }}>
          <Avatar fallback={mockCurrentUser.displayName} size="lg" />
        </div>
        <Button variant="secondary" size="sm" style={{ marginBottom: "8px" }}>
          Edit profile
        </Button>
      </div>

      {/* Info */}
      <div style={{ padding: "16px 20px 24px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          {mockCurrentUser.displayName}
        </h1>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "14px",
            color: "var(--color-text-muted)",
          }}
        >
          @{mockCurrentUser.username}
        </p>

        {mockCurrentUser.bio && (
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--color-text-secondary)",
            }}
          >
            {mockCurrentUser.bio}
          </p>
        )}

        <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {posts.length}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              Posts
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {mockCurrentUser.accScore}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              Score
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              {joinedDate}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              Joined
            </p>
          </div>
        </div>
      </div>

      {/* User's posts */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "20px",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--color-text-secondary)",
          }}
        >
          Posts
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {posts.length === 0 ? (
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
              No posts yet.
            </p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={mockCurrentUser.id}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
