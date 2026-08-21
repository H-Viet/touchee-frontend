"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { mockCurrentUser } from "@/lib/mock/data";

interface CreatePostProps {
  onSubmit: (content: string) => void;
}

export const CreatePost = ({ onSubmit }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const remaining = 500 - content.length;

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <Card style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <Avatar fallback={mockCurrentUser.displayName} size="md" pulse />
        <div style={{ flex: 1 }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's your vibe right now?"
            rows={3}
            style={{
              width: "100%",
              resize: "none",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: "var(--color-text-primary)",
              fontFamily: "inherit",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color:
                  remaining < 0
                    ? "var(--color-error)"
                    : "var(--color-text-muted)",
              }}
            >
              {remaining} left
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || remaining < 0}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
