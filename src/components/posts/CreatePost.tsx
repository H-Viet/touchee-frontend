"use client";

import { useState, useRef, useEffect } from "react";
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
import {
  clearCurrentDraft,
  getCurrentDraft,
  saveCurrentDraft,
} from "@/lib/draft";
import { mockCurrentUser } from "@/lib/mock/data";
import type { Community } from "@/types";

interface CreatePostProps {
  communities: Community[];
  selectedCommunityId: string | null;
  onCommunityChange: (communityId: string) => void;
  onSubmit: (
    title: string,
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

const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    link: { openOnClick: false, autolink: true },
  }),
  Superscript,
  Placeholder.configure({ placeholder: "What's your vibe right now?" }),
];

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
  const [textLength, setTextLength] = useState(0);
  const [title, setTitle] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const restoredDraftRef = useRef(false);

  const [showCommunityWarning, setShowCommunityWarning] = useState(false);

  const editor = useEditor({
    extensions: editorExtensions,
    content: "",
    // Next.js renders once on the server, then again on the client — if
    // TipTap tried to render immediately on both, the two could disagree
    // and React would throw a hydration mismatch. Same category of bug as
    // the formatDistanceToNow issue you've hit before — the fix is telling
    // TipTap to wait and only render once the client has actually mounted.
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        class: "post-editor",
        style:
          "outline: none; font-size: 14px; line-height: 1.6; color: var(--color-text-primary); min-height: 72px;",
      },
    },
  });

  // Add useEffect - redenring input text
  useEffect(() => {
    if (!editor) return;

    const updateTextLength = () => {
      setTextLength(editor.getText().length);
    };

    editor.on("update", updateTextLength);

    return () => {
      editor.off("update", updateTextLength);
    };
  }, [editor]);

  // Save draft -> restored title state, selected community, TipTap body text
  useEffect(() => {
    if (!editor || restoredDraftRef.current) return;

    restoredDraftRef.current = true;

    const draft = getCurrentDraft();
    if (!draft) return;

    setTitle(draft.title);

    if (draft.communityId) {
      onCommunityChange(draft.communityId);
    }

    editor.commands.setContent(draft.content, {
      emitUpdate: true,
    });
  }, [editor, onCommunityChange]);

  // const textLength = editor?.getText().length ?? 0;
  const remaining = 500 - textLength;
  const hasContent = textLength > 0;

  const hasTitle = title.trim().length > 0;
  const hasDraftContent = hasTitle || hasContent;
  const canSubmit = hasTitle && hasContent && remaining >= 0;

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
    if (!selectedCommunityId) {
      setShowCommunityWarning(true);
      return;
    }
    onSubmit(title.trim(), editor.getHTML(), mediaPreview, mediaType);

    // Update save draft -> persist locally even after close modal -> draft saved still remained -> reopen modal -> draft restores -> after posted -> drafts cleared
    clearCurrentDraft();
    setTitle("");
    editor.commands.clearContent();
    removeMedia();

    setTitle("");
    editor.commands.clearContent();
    removeMedia();
  };

  const handleSaveDraft = () => {
    if (!editor || !hasDraftContent) return;

    saveCurrentDraft({
      title: title.trim(),
      communityId: selectedCommunityId,
      content: editor.getHTML(),
    });

    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const formContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <CommunitySelectDropdown
          communities={communities}
          value={selectedCommunityId}
          onChange={onCommunityChange}
        />
        {showCommunityWarning && !selectedCommunityId && (
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

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "7px",
          }}
        >
          <label
            htmlFor="post-title"
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Title
            <span
              aria-hidden="true"
              style={{
                marginLeft: "4px",
                color: "var(--color-error)",
              }}
            >
              *
            </span>
            <span className="sr-only">required</span>
          </label>
          <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
            {title.length}/300
          </span>
        </div>

        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={300}
          placeholder="e.g. The little things that made today better"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid var(--color-border)",
            background: "rgba(15, 13, 15, 0.45)",
            color: "var(--color-text-primary)",
            fontSize: "16px",
            fontWeight: 650,
            outline: "none",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          }}
        />
      </div>

      <label
        htmlFor="post-title"
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        Body content
        <span className="sr-only">required</span>
      </label>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(15, 13, 15, 0.28)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "14px 16px 8px",
            }}
          >
            {!hasContent && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "16px",
                  color: "var(--color-text-muted)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  pointerEvents: "none",
                }}
              >
                Share your vibe, story, or thought...
              </span>
            )}

            <EditorContent editor={editor} />
          </div>
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
          ></div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
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

          {/* Editor tool bar */}
          <div style={{ padding: "0 12px", overflowX: "auto" }}>
            <EditorToolbar
              editor={editor}
              mediaType={mediaType}
              onPickMedia={handleFilePick}
            />
          </div>

          {/* Buttons section */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "14px 16px 16px",
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveDraft}
              disabled={!hasDraftContent}
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
              Save Draft
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              size="sm"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                padding: "7px 16px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
                color: "white",
              }}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return bare ? (
    formContent
  ) : (
    <Card
      style={{
        marginBottom: "24px",
        padding: "24px",
        background:
          "linear-gradient(145deg, rgba(35, 27, 44, 0.82), rgba(24, 19, 30, 0.72))",
        border: "1px solid rgba(192, 132, 252, 0.16)",
        boxShadow: "0 18px 50px rgba(0, 0, 0, 0.2)",
      }}
    >
      {formContent}
    </Card>
  );
};
