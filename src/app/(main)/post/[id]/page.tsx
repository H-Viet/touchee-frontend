"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MessageCircle, Trash2, Search } from "lucide-react";
import { CommentComposer } from "@/components/posts/CommentComposer";
import {
  CommentSortDropdown,
  type CommentSortOption,
} from "@/components/posts/CommentSortDropdown";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { VoteControl } from "@/components/posts/VoteControl";
import { CommentItem } from "@/components/posts/CommonItem";
import { mockPosts, mockComments, mockCurrentUser } from "@/lib/mock/data";
import type { Comment } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

// Immutably walks the nested tree to find the right parent and insert a reply
function addReplyToTree(
  comments: Comment[],
  parentId: string,
  reply: Comment,
): Comment[] {
  return comments.map((c) => {
    if (c.id === parentId) {
      return { ...c, replies: [...(c.replies ?? []), reply] };
    }
    if (c.replies && c.replies.length > 0) {
      return { ...c, replies: addReplyToTree(c.replies, parentId, reply) };
    }
    return c;
  });
}

function countAllComments(comments: Comment[]): number {
  return comments.reduce(
    (acc, c) => acc + 1 + countAllComments(c.replies ?? []),
    0,
  );
}

export default function PostDetailPage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const post = mockPosts.find((p) => p.id === id);
  const [comments, setComments] = useState<Comment[]>(
    mockComments.filter((c) => c.postId === id),
  );
  const [sortBy, setSortBy] = useState<CommentSortOption>("best");
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (post) {
      setTimeAgo(
        formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }),
      );
    }
  }, [post]);

  if (!post) {
    return <p style={{ color: "var(--color-text-muted)" }}>Post not found.</p>;
  }

  const authorName = post.author?.displayName ?? "Unknown";
  const authorHandle = post.author?.username ?? "unknown";
  const isOwner = mockCurrentUser.id === post.authorId;

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      postId: post.id,
      parentId: null,
      authorId: mockCurrentUser.id,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      author: mockCurrentUser,
      replies: [],
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleReply = (parentId: string, content: string) => {
    const reply: Comment = {
      id: `c-${Date.now()}`,
      postId: post.id,
      parentId,
      authorId: mockCurrentUser.id,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      author: mockCurrentUser,
      replies: [],
    };
    setComments((prev) => addReplyToTree(prev, parentId, reply));
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-text-secondary)",
          fontSize: "14px",
          fontWeight: 500,
          marginBottom: "16px",
          padding: 0,
        }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <Card>
        <div style={{ display: "flex", gap: "12px" }}>
          <VoteControl score={post.upvotes - post.downvotes} size="md" />

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

              {isOwner && (
                <button
                  onClick={() => router.push("/")}
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
                <span style={{ fontSize: "13px" }}>
                  {countAllComments(comments)} comments
                </span>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>

      <div style={{ marginTop: "16px" }}>
        <CommentComposer onSubmit={handleAddComment} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <CommentSortDropdown value={sortBy} onChange={setSortBy} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flex: 1,
              maxWidth: "260px",
              padding: "6px 12px",
              borderRadius: "9999px",
              background: "rgba(34, 26, 44, 0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Search
              size={14}
              style={{ color: "var(--color-text-muted)", flexShrink: 0 }}
            />
            <input
              type="text"
              placeholder="Search comments"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "13px",
                color: "var(--color-text-primary)",
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {comments.length === 0 ? (
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </div>
  );
}
