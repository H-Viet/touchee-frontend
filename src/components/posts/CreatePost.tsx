"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, Video, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { mockCurrentUser } from "@/lib/mock/data";

interface CreatePostProps {
  onSubmit: (
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
  ) => void;
  bare?: boolean;
}

export const CreatePost = ({ onSubmit, bare = false }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remaining = 500 - content.length;

  const handleFilePick = (type: "image" | "video") => {
    if (!fileInputRef.current) return;
    fileInputRef.current.accept = type === "image" ? "image/*" : "video/*";
    fileInputRef.current.dataset.type = type;
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 🚧 Mock only — this creates a temporary local preview URL.
    // Real upload (backend storage) gets wired in later.
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
    setMediaType(e.target.dataset.type as "image" | "video");
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim(), mediaPreview, mediaType);
    setContent("");
    removeMedia();
  };

  const formContent = (
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

        {mediaPreview && (
          <div
            style={{
              position: "relative",
              marginTop: "8px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={removeMedia}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "9999px",
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                color: "white",
                zIndex: 1,
              }}
            >
              <X size={14} />
            </button>
            {mediaType === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaPreview}
                alt="Upload preview"
                style={{
                  width: "100%",
                  maxHeight: "320px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <video
                src={mediaPreview}
                controls
                style={{
                  width: "100%",
                  maxHeight: "320px",
                  display: "block",
                }}
              />
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
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
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => handleFilePick("image")}
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
              <ImageIcon size={18} />
            </button>
            <button
              onClick={() => handleFilePick("video")}
              title="Add video"
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
              <Video size={18} />
            </button>
            <span
              style={{
                fontSize: "12px",
                color: "var(--color-text-muted)",
                alignSelf: "center",
                marginLeft: "8px",
              }}
            >
              {remaining} left
            </span>
          </div>
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
  );

  return bare ? (
    formContent
  ) : (
    <Card style={{ marginBottom: "24px" }}>{formContent}</Card>
  );
};
