"use client";

import { useState, useEffect, Fragment } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { VoteControl } from "@/components/posts/VoteControl";
import type { Comment } from "@/types";
import Link from "next/link";

const MAX_DEPTH = 4;

interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
  depth?: number;
  // If a parent renders this CommentItem as one of its replies, it passes
  // these two down and "controls" the collapse state from outside. If
  // they're omitted (top-level comments), this component manages its own
  // collapse state internally instead. Same pattern as a controlled <input>.
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const CommentItem = ({
  comment,
  onReply,
  depth = 0,
  collapsed: collapsedProp,
  onToggleCollapse,
}: CommentItemProps) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  // Tracks which of THIS comment's replies are collapsed, by id — this is
  // the state that used to live inside each child's own `collapsed` state.
  const [collapsedReplies, setCollapsedReplies] = useState<Set<string>>(
    new Set(),
  );

  const isCollapsed = collapsedProp ?? internalCollapsed;
  const toggleCollapse =
    onToggleCollapse ?? (() => setInternalCollapsed((v) => !v));

  useEffect(() => {
    setTimeAgo(
      formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }),
    );
  }, [comment.createdAt]);

  const authorName = comment.author?.displayName ?? "Unknown";
  const authorHandle = comment.author?.username ?? "unknown";
  const hasReplies = !!comment.replies && comment.replies.length > 0;
  const isAtMaxDepth = depth >= MAX_DEPTH;
  const replyCount = comment.replies?.length ?? 0;

  const toggleReplyCollapse = (replyId: string) => {
    setCollapsedReplies((prev) => {
      const next = new Set(prev);
      if (next.has(replyId)) next.delete(replyId);
      else next.add(replyId);
      return next;
    });
  };

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

        {hasReplies && !isAtMaxDepth && (
          <button
            onClick={toggleCollapse}
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
            {isCollapsed
              ? `${replyCount} ${replyCount === 1 ? "reply" : "replies"}`
              : "Hide replies"}
          </button>
        )}
        {hasReplies && isAtMaxDepth && (
          <Link
            href={`/post/${comment.postId}/comment/${comment.id}`}
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--color-primary)",
              textDecoration: "none",
            }}
          >
            Continue this thread →
          </Link>
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

      {hasReplies && !isCollapsed && !isAtMaxDepth && (
        <div
          style={{
            marginTop: "14px",
            display: "grid",
            gridTemplateColumns: "32px 1fr",
          }}
        >
          {comment.replies!.map((reply, index) => {
            const isLast = index === comment.replies!.length - 1;
            const replyHasReplies = !!reply.replies && reply.replies.length > 0;
            const replyCollapsed = collapsedReplies.has(reply.id);

            return (
              <Fragment key={reply.id}>
                <div style={{ position: "relative" }}>
                  <div
                    // Only a real control when there's something to collapse
                    // — a leaf reply's curve stays purely decorative, same
                    // as Reddit never showing a "[-]" on comments with no
                    // children of their own.
                    aria-hidden={!replyHasReplies}
                    role={replyHasReplies ? "button" : undefined}
                    tabIndex={replyHasReplies ? 0 : undefined}
                    onClick={
                      replyHasReplies
                        ? () => toggleReplyCollapse(reply.id)
                        : undefined
                    }
                    onKeyDown={
                      replyHasReplies
                        ? (e) =>
                            e.key === "Enter" && toggleReplyCollapse(reply.id)
                        : undefined
                    }
                    title={
                      replyHasReplies
                        ? replyCollapsed
                          ? "Expand replies"
                          : "Collapse replies"
                        : undefined
                    }
                    className="comment-thread-curve"
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: 0,
                      width: "17px",
                      height: "16px",
                      borderBottomLeftRadius: "12px",
                      cursor: replyHasReplies ? "pointer" : "default",
                    }}
                  />
                  {!isLast && (
                    <div
                      aria-hidden
                      className="comment-thread-line"
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: 0,
                        bottom: 0,
                        width: "2px",
                      }}
                    />
                  )}
                </div>

                <div style={{ paddingBottom: isLast ? 0 : "16px" }}>
                  <CommentItem
                    comment={reply}
                    onReply={onReply}
                    depth={depth + 1}
                    collapsed={replyCollapsed}
                    onToggleCollapse={() => toggleReplyCollapse(reply.id)}
                  />
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
