"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  Type,
  Bold,
  Italic,
  Strikethrough,
  Link2,
  List,
  ListOrdered,
  Quote,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CommentComposerProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

// Visual only for now — real rich-text formatting is a bigger feature for later
const toolbarButtons = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Strikethrough, label: "Strikethrough" },
  { icon: Link2, label: "Link" },
  { icon: List, label: "Bullet list" },
  { icon: ListOrdered, label: "Numbered list" },
  { icon: Quote, label: "Quote" },
  { icon: Code2, label: "Code" },
];

export const CommentComposer = ({
  onSubmit,
  placeholder = "Join the conversation",
}: CommentComposerProps) => {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
    setFocused(false);
    setToolbarOpen(false);
  };

  const handleCancel = () => {
    setContent("");
    setFocused(false);
    setToolbarOpen(false);
  };

  return (
    <div
      style={{
        borderRadius: focused ? "16px" : "9999px",
        padding: focused ? "12px 16px" : "10px 16px",
        boxSizing: "border-box",
        background: "rgba(34, 26, 44, 0.8)",
        border: focused
          ? "1px solid rgba(255, 61, 139, 0.5)"
          : "1px solid rgba(255,255,255,0.1)",
        transition: "padding 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* Formatting toolbar — toggled by the "Aa" button below */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          maxHeight: toolbarOpen ? "36px" : "0px",
          opacity: toolbarOpen ? 1 : 0,
          overflow: "hidden",
          marginBottom: toolbarOpen ? "8px" : "0px",
          paddingBottom: toolbarOpen ? "8px" : "0px",
          borderBottom: toolbarOpen
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          transition: "all 0.2s ease",
        }}
      >
        {toolbarButtons.map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: "6px",
              borderRadius: "6px",
              display: "flex",
            }}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        rows={1}
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
          height: focused ? "72px" : "22px",
          transition: "height 0.2s ease",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxHeight: focused ? "40px" : "0px",
          opacity: focused ? 1 : 0,
          overflow: "hidden",
          marginTop: focused ? "8px" : "0px",
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            title="Add image"
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
            <ImageIcon size={17} />
          </button>
          <button
            title="Add GIF"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: "6px 8px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            GIF
          </button>
          <button
            title="Formatting options"
            onClick={() => setToolbarOpen((v) => !v)}
            style={{
              background: toolbarOpen ? "rgba(255,255,255,0.08)" : "none",
              border: "none",
              cursor: "pointer",
              color: toolbarOpen
                ? "var(--color-text-primary)"
                : "var(--color-text-muted)",
              padding: "6px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Type size={17} />
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleCancel}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              background: "rgba(255,255,255,0.06)",
              color: "var(--color-text-secondary)",
            }}
          >
            Cancel
          </button>
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "7px 16px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
              color: "white",
            }}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
