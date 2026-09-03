"use client";

import { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Image as ImageIcon, Video, X, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CommunitySelectDropdown } from "../communities/CommunitySelectDropdown";
import { EditorToolbar } from "@/components/posts/EditorToolbar";
import { saveDraft } from "@/lib/draft";
import { mockCurrentUser } from "@/lib/mock/data";
import type { Community } from "@/types";

interface CreatePostProps {
  communities: Community[];
  selectedCommunityId: string | null;
  onCommunityChange: (communityId: string) => void;
  onSubmit: (
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
  ) => void;
  bare?: boolean;
}

const iconBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "var(--color-text-muted)",
  padding: "6px",
  borderRadius: "8px",
  display: "flex",
} as const;

export const CreatePost = ({
  communities,
  selectedCommunityId,
  onCommunityChange,
  onSubmit,
  bare = false,
}: CreatePostProps) => {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Superscript,
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "What's your vibe right now?" }),
    ],
    content: "",
    // Next.js renders once on the server, then again on the client — if
    // TipTap tried to render immediately on both, the two could disagree
    // and React would throw a hydration mismatch. Same category of bug as
    // the formatDistanceToNow issue you've hit before — the fix is telling
    // TipTap to wait and only render once the client has actually mounted.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style:
          "outline: none; font-size: 14px; line-height: 1.6; color: var(--color-text-primary); min-height: 72px;",
      },
    },
  });

  const textLength = editor?.getText().length ?? 0;
  const remaining = 500 - textLength;
  const hasContent = textLength > 0;
  const canSubmit = !!selectedCommunityId && hasContent && remaining >= 0;

  const handleFilePick = (type: "image" | "video") => {
    if (!fileInputRef.current) return;
    fileInputRef.current.accept = type === "image" ? "image/*" : "video/*";
    fileInputRef.current.dataset.type = type;
    fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
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
    if (!canSubmit || !editor) return;
    onSubmit(editor.getHTML(), mediaPreview, mediaType);
    editor.commands.clearContent();
    removeMedia();
  };

  const handleSaveDraft = () => {
    if (!editor || !hasContent) return;
    saveDraft({
      communityId: selectedCommunityId,
      content: editor.getHTML(),
      mediaUrl: mediaPreview,
      mediaType,
    });
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const formContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <CommunitySelectDropdown
          communities={communities}
          value={selectedCommunityId}
          onChange={onCommunityChange}
        />
        {!selectedCommunityId && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "8px",
              fontSize: "13px",
              color: "var(--color-error)",
            }}
          >
            <AlertCircle size={14} />
            Please select a community before posting.
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <Avatar fallback={mockCurrentUser.displayName} size="md" pulse />
        <div style={{ flex: 1, minWidth: 0 }}>
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} />

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
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <button
                onClick={() => handleFilePick("image")}
                title="Add image"
                style={iconBtnStyle}
              >
                <ImageIcon size={18} />
              </button>
              <button
                onClick={() => handleFilePick("video")}
                title="Add video"
                style={iconBtnStyle}
              >
                <Video size={18} />
              </button>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                  marginLeft: "8px",
                }}
              >
                {remaining} left
              </span>
              {draftSaved && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-primary)",
                    marginLeft: "8px",
                  }}
                >
                  Draft saved
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSaveDraft}
                disabled={!hasContent}
              >
                Save Draft
              </Button>
              <Button onClick={handleSubmit} disabled={!canSubmit} size="sm">
                Post
              </Button>
            </div>
          </div>
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
