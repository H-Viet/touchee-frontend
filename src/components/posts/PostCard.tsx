"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Ellipsis, MessageCircle, Share2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { VoteControl } from "@/components/posts/VoteControl";
import type { Post } from "@/types";

interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onDelete?: (id: string) => void;
}

const actionButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  border: "none",
  borderRadius: "9999px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.06)",
  color: "var(--color-text-secondary)",
  fontSize: "13px",
  fontWeight: 600,
} as const;

const getPlainText = (content: string) =>
  content
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const PostCard = ({ post, currentUserId, onDelete }: PostCardProps) => {
  const router = useRouter();
  const [timeAgo, setTimeAgo] = useState("");
  const [shareLabel, setShareLabel] = useState("Share");

  const isOwner = currentUserId === post.authorId;
  const communityName = post.community?.name ?? "Touchee";
  const communitySlug = post.community?.slug ?? "touchee";
  const body = getPlainText(post.content);

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
    );
  }, [post.createdAt]);

  const stopCardNavigation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleShare = async (event: React.MouseEvent) => {
    event.stopPropagation();

    const url = `${window.location.origin}/post/${post.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: body,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareLabel("Copied!");

      window.setTimeout(() => setShareLabel("Share"), 1600);
    } catch {
      // The user may cancel the native share dialog. No error UI is needed.
    }
  };

  return (
    <Card
      hover
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/post/${post.id}`)}
      onKeyDown={(event) => {
        if (
          event.currentTarget === event.target &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          router.push(`/post/${post.id}`);
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar fallback={communityName} size="sm" />

          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            /{communitySlug}
          </span>

          <span style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>
            •
          </span>

          <span style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>
            {timeAgo}
          </span>
        </div>

        {isOwner && onDelete ? (
          <button
            type="button"
            aria-label="Delete post"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(post.id);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: "6px",
              display: "flex",
            }}
          >
            <Trash2 size={16} />
          </button>
        ) : (
          <button
            type="button"
            aria-label="More post options"
            onClick={stopCardNavigation}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: "6px",
              display: "flex",
            }}
          >
            <Ellipsis size={18} />
          </button>
        )}
      </div>

      <h2
        style={{
          margin: "0 0 8px",
          color: "var(--color-text-primary)",
          fontSize: "18px",
          lineHeight: 1.35,
          fontWeight: 750,
        }}
      >
        {post.title}
      </h2>

      {body && (
        <p
          style={{
            margin: 0,
            color: "var(--color-text-secondary)",
            fontSize: "14px",
            lineHeight: 1.65,
          }}
        >
          {body}
        </p>
      )}

      {post.mediaUrl && (
        <div
          onClick={stopCardNavigation}
          style={{
            marginTop: "14px",
            borderRadius: "12px",
            overflow: "hidden",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          {post.mediaType === "video" ? (
            <video
              src={post.mediaUrl}
              controls
              style={{
                width: "100%",
                maxHeight: "520px",
                display: "block",
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.mediaUrl}
              alt=""
              style={{
                width: "100%",
                maxHeight: "520px",
                objectFit: "cover",
                display: "block",
              }}
            />
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        <VoteControl
          score={post.upvotes - post.downvotes}
          size="sm"
          orientation="horizontal"
        />

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/post/${post.id}#comments`);
          }}
          style={actionButtonStyle}
        >
          <MessageCircle size={16} />
          {post.commentCount}
        </button>

        <button type="button" onClick={handleShare} style={actionButtonStyle}>
          <Share2 size={16} />
          {shareLabel}
        </button>
      </div>
    </Card>
  );
};
