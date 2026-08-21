"use client";

import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onDelete?: (id: string) => void;
}

export const PostCard = ({ post, currentUserId, onDelete }: PostCardProps) => {
  const authorName = post.author?.displayName ?? "Unknown";
  const authorHandle = post.author?.username ?? "unknown";
  const isOwner = currentUserId === post.authorId;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <Card hover>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar fallback={authorName} size="md" />
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {authorName}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "var(--color-text-muted)",
              }}
            >
              @{authorHandle} · {timeAgo}
            </p>
          </div>
        </div>

        {isOwner && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: "6px",
              borderRadius: "8px",
              display: "flex",
            }}
          >
            <Trash2 size={15} />
          </button>
        )}
      </CardHeader>

      <CardBody>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: 1.6,
            color: "var(--color-text-primary)",
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </p>
      </CardBody>
    </Card>
  );
};
