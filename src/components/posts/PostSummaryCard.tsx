"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Trash2 } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { VoteControl } from "@/components/posts/VoteControl";
import type { Post } from "@/types";

interface PostSummaryCardProps {
  post: Post;
  commentCount: number;
  isOwner: boolean;
  onDelete?: () => void;
}

export const PostSummaryCard = ({
  post,
  commentCount,
  isOwner,
  onDelete,
}: PostSummaryCardProps) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    );
  }, [post.createdAt]);

  const authorName = post.author?.displayName ?? "Unknown";
  const authorHandle = post.author?.username ?? "unknown";

  return (
    <Card>
      <div style={{ display: "flex", gap: "12px" }}>
        <VoteControl score={post.upvotes - post.downvotes} size="md" />

        <div style={{ flex: 1, minWidth: 0 }}>
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
                onClick={onDelete}
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
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--color-text-primary)",
                whiteSpace: "pre-wrap",
              }}
            >
              {post.content}
            </p>

            {post.mediaUrl && (
              <div
                style={{
                  marginTop: "14px",
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
                marginTop: "14px",
                color: "var(--color-text-muted)",
              }}
            >
              <MessageCircle size={15} />
              <span style={{ fontSize: "13px" }}>{commentCount} comments</span>
            </div>
          </CardBody>
        </div>
      </div>
    </Card>
  );
};
