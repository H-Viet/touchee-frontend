"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Trash2 } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { VoteControl } from "@/components/posts/VoteControl";
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
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    );
  }, [post.createdAt]);

  return (
    <Link
      href={`/post/${post.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card hover>
        <div style={{ display: "flex", gap: "12px" }}>
          <VoteControl score={post.upvotes - post.downvotes} size="sm" />

          <div style={{ flex: 1, minWidth: 0 }}>
            <CardHeader>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(post.id);
                  }}
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

              {post.mediaUrl && (
                <div
                  style={{
                    marginTop: "12px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {post.mediaType === "video" ? (
                    <video
                      src={post.mediaUrl}
                      controls
                      style={{ width: "100%", display: "block" }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.mediaUrl}
                      alt="Post media"
                      style={{ width: "100%", display: "block" }}
                    />
                  )}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                <MessageCircle size={15} />
                <span style={{ fontSize: "13px" }}>
                  {post.commentCount} comments
                </span>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
    </Link>
  );
};
