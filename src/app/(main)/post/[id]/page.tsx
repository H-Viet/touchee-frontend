"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Search } from "lucide-react";
import { CommentComposer } from "@/components/posts/CommentComposer";
import {
  CommentSortDropdown,
  type CommentSortOption,
} from "@/components/posts/CommentSortDropdown";
import { addReplyToTree } from "@/lib/comment";
import { PostSummaryCard } from "@/components/posts/PostSummaryCard";
import { CommentItem } from "@/components/posts/CommentItem";
import { mockPosts, mockComments, mockCurrentUser } from "@/lib/mock/data";
import type { Comment } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
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
    <div style={{ position: "relative" }}>
      <button
        onClick={() => router.back()}
        className="post-detail-back"
        title="Back"
        style={{
          height: "40px",
          width: "40px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(34, 26, 44, 0.8)",
          color: "var(--color-text-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={18} />
      </button>

      <PostSummaryCard
        post={post}
        commentCount={countAllComments(comments)}
        isOwner={isOwner}
        onDelete={() => router.push("/")}
      />

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
