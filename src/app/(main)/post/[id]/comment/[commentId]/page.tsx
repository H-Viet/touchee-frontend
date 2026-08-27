"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommentItem } from "@/components/posts/CommentItem";
import { findCommentById } from "@/lib/comment";
import { mockComments, mockCurrentUser } from "@/lib/mock/data";
import type { Comment } from "@/types";

interface Props {
  params: Promise<{ id: string; commentId: string }>;
}

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

export default function CommentThreadPage({ params }: Props) {
  const { id, commentId } = use(params);

  const rootComment = findCommentById(mockComments, commentId);
  const [comment, setComment] = useState<Comment | null>(rootComment);

  if (!comment) {
    return (
      <p style={{ color: "var(--color-text-muted)" }}>Comment not found.</p>
    );
  }

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
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Link
          href={`/post/${id}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-primary)",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} />
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
          See full discussion
        </Link>
      </div>

      {/* depth resets to 0 here — this comment is the new "root" */}
      <CommentItem comment={comment} onReply={handleReply} depth={0} />
    </div>
  );
}
