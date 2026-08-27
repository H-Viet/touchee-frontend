"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommentItem } from "@/components/posts/CommentItem";
import { PostSummaryCard } from "@/components/posts/PostSummaryCard";
import { findCommentById, addReplyToTree } from "@/lib/comment";
import { mockPosts, mockComments, mockCurrentUser } from "@/lib/mock/data";
import type { Comment } from "@/types";

interface Props {
  params: Promise<{ id: string; commentId: string }>;
}

export default function CommentThreadPage({ params }: Props) {
  const { id, commentId } = use(params);
  const router = useRouter();

  const post = mockPosts.find((p) => p.id === id);
  const rootComment = findCommentById(mockComments, commentId);
  const [comment, setComment] = useState<Comment | null>(rootComment);

  if (!post) {
    return <p style={{ color: "var(--color-text-muted)" }}>Post not found.</p>;
  }

  if (!comment) {
    return (
      <p style={{ color: "var(--color-text-muted)" }}>Comment not found.</p>
    );
  }

  const isOwner = mockCurrentUser.id === post.authorId;

  const handleReply = (parentId: string, content: string) => {
    const reply: Comment = {
      id: `c-${Date.now()}`,
      postId: id,
      parentId,
      authorId: mockCurrentUser.id,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      author: mockCurrentUser,
      replies: [],
    };
    setComment((prev) =>
      prev ? addReplyToTree([prev], parentId, reply)[0] : prev,
    );
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
        commentCount={post.commentCount}
        isOwner={isOwner}
        onDelete={() => router.push("/")}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <Link
          href={`/post/${id}`}
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-primary)",
            textDecoration: "none",
          }}
        >
          Single comment thread
        </Link>
        <Link
          href={`/post/${id}`}
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-primary)",
            textDecoration: "none",
          }}
        >
          See full discussion →
        </Link>
      </div>

      {/* depth resets to 0 here — this comment is the new "root" */}
      <CommentItem comment={comment} onReply={handleReply} depth={0} />
    </div>
  );
}
