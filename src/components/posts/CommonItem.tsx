"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { VoteControl } from "@/components/posts/VoteControl";
import type { Comment } from "@/types";

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
}

export const CommentItem = ({ comment, onReply }: CommentItemProps) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }),
    );
  }, [comment.createdAt]);

  const authorName = comment.author?.displayName ?? "Unknown";
  const authorHandle = comment.author?.username ?? "unknown";
  const hasReplies = !!comment.replies && comment.replies.length > 0;
  const replyCount = comment.replies?.length ?? 0;

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText.trim());
    setReplyText("");
    setReplying(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
        }}
      >
        <Avatar fallback={authorName} size="sm" />
        <p
          style={{
            margin: 0,
            fontSize: "13px",
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

      <p
        style={{
          margin: "0 0 6px",
          fontSize: "14px",
          lineHeight: 1.5,
          color: "var(--color-text-secondary)",
        }}
      >
        {comment.content}
      </p>

      {/* Actions row — ONLY vote control + reply button (+ the collapsed
          "N replies" link). Nothing tree-related belongs in here. */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <VoteControl
          score={comment.upvotes - comment.downvotes}
          size="sm"
          orientation="horizontal"
        />
        <button
          onClick={() => setReplying((v) => !v)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--color-text-muted)",
            padding: 0,
          }}
        >
          Reply
        </button>

        {hasReplies && collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--color-primary)",
              padding: 0,
            }}
          >
            {replyCount} {replyCount === 1 ? "reply" : "replies"}
          </button>
        )}
      </div>

      {replying && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={`Reply to ${authorName}...`}
            rows={2}
            style={{
              width: "100%",
              resize: "none",
              borderRadius: "10px",
              padding: "8px 12px",
              fontSize: "13px",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
              background: "rgba(34, 26, 44, 0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-text-primary)",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => setReplying(false)}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: "rgba(255,255,255,0.06)",
                color: "var(--color-text-secondary)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleReplySubmit}
              disabled={!replyText.trim()}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: replyText.trim() ? "pointer" : "not-allowed",
                opacity: replyText.trim() ? 1 : 0.5,
                color: "white",
                background:
                  "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
              }}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Replies tree — ONE copy only, as a sibling of the actions row
          above, not nested inside it. */}
      {hasReplies && !collapsed && (
        <div style={{ position: "relative", marginTop: "14px" }}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setCollapsed(true)}
            onKeyDown={(e) => e.key === "Enter" && setCollapsed(true)}
            title="Collapse replies"
            className="comment-thread-line"
            style={{
              position: "absolute",
              left: "15px",
              top: 0,
              bottom: 0,
              width: "2px",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingLeft: "32px",
            }}
          >
            {comment.replies!.map((reply) => (
              <div key={reply.id} style={{ position: "relative" }}>
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "-17px",
                    top: 0,
                    width: "17px",
                    height: "16px",
                    borderLeft: "2px solid rgba(255,255,255,0.12)",
                    borderBottom: "2px solid rgba(255,255,255,0.12)",
                    borderBottomLeftRadius: "12px",
                  }}
                />
                <CommentItem comment={reply} onReply={onReply} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
