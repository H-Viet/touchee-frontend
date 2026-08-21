"use client";

import { useState } from "react";
import { CreatePost } from "@/components/posts/CreatePost";
import { PostCard } from "@/components/posts/PostCard";
import { mockPosts, mockCurrentUser } from "@/lib/mock/data";
import type { Post } from "@/types";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleCreate = (content: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      content,
      authorId: mockCurrentUser.id,
      communityId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: mockCurrentUser,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDelete = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          Feed
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "14px",
            color: "var(--color-text-muted)",
          }}
        >
          What&apos;s everyone vibing with
        </p>
      </div>

      <CreatePost onSubmit={handleCreate} />

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId={mockCurrentUser.id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
