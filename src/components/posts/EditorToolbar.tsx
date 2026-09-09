"use client";

import type { MouseEvent } from "react";
import { type Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Superscript as SuperscriptIcon,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  Image as ImageIcon,
  Video,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
  mediaType: "image" | "video" | null;
  onPickMedia: (type: "image" | "video") => void;
}

const iconButtonStyle = (isActive: boolean) => ({
  width: "38px",
  height: "38px",
  padding: 0,
  display: "grid",
  placeItems: "center",
  border: "none",
  borderRadius: "9999px",
  cursor: "pointer",
  background: isActive ? "rgba(192, 132, 252, 0.28)" : "transparent",
  color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
  boxShadow: isActive ? "inset 0 0 0 1px rgba(192, 132, 252, 0.24)" : "none",
  transition: "background 0.15s ease, color 0.15s ease",
});

const Divider = () => (
  <div
    aria-hidden="true"
    style={{
      width: "1px",
      height: "18px",
      flexShrink: 0,
      background: "rgba(255,255,255,0.08)",
      margin: "0 4px",
    }}
  />
);

export const EditorToolbar = ({
  editor,
  mediaType,
  onPickMedia,
}: EditorToolbarProps) => {
  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      link: editor?.isActive("link") ?? false,
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      strike: editor?.isActive("strike") ?? false,
      superscript: editor?.isActive("superscript") ?? false,
      heading: editor?.isActive("heading", { level: 2 }) ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
      blockquote: editor?.isActive("blockquote") ?? false,
      codeBlock: editor?.isActive("codeBlock") ?? false,
    }),
  });

  if (!editor) return null;

  const preserveSelection = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const setLink = () => {
    const url = window.prompt("Enter a URL");
    if (!url) return;

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div
      role="toolbar"
      aria-label="Text formatting"
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: "2px",
        width: "max-content",
        minWidth: "100%",
        padding: "6px",
        background: "rgba(15, 13, 15, 0.42)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "10px",
      }}
    >
      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => onPickMedia("image")}
        title="Add image"
        aria-label="Add image"
        aria-pressed={mediaType === "image"}
        style={iconButtonStyle(mediaType === "image")}
      >
        <ImageIcon size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => onPickMedia("video")}
        title="Add video"
        aria-label="Add video"
        aria-pressed={mediaType === "video"}
        style={iconButtonStyle(mediaType === "video")}
      >
        <Video size={16} />
      </button>

      <Divider />

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={setLink}
        title="Link"
        aria-label="Link"
        aria-pressed={active?.link ?? false}
        style={iconButtonStyle(active?.link ?? false)}
      >
        <Link2 size={16} />
      </button>

      <Divider />

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
        aria-label="Bold"
        aria-pressed={active?.bold ?? false}
        style={iconButtonStyle(active?.bold ?? false)}
      >
        <Bold size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
        aria-label="Italic"
        aria-pressed={active?.italic ?? false}
        style={iconButtonStyle(active?.italic ?? false)}
      >
        <Italic size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
        aria-label="Strikethrough"
        aria-pressed={active?.strike ?? false}
        style={iconButtonStyle(active?.strike ?? false)}
      >
        <Strikethrough size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        title="Superscript"
        aria-label="Superscript"
        aria-pressed={active?.superscript ?? false}
        style={iconButtonStyle(active?.superscript ?? false)}
      >
        <SuperscriptIcon size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading"
        aria-label="Heading"
        aria-pressed={active?.heading ?? false}
        style={iconButtonStyle(active?.heading ?? false)}
      >
        <Heading2 size={16} />
      </button>

      <Divider />

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet list"
        aria-label="Bullet list"
        aria-pressed={active?.bulletList ?? false}
        style={iconButtonStyle(active?.bulletList ?? false)}
      >
        <List size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered list"
        aria-label="Numbered list"
        aria-pressed={active?.orderedList ?? false}
        style={iconButtonStyle(active?.orderedList ?? false)}
      >
        <ListOrdered size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Quote"
        aria-label="Quote"
        aria-pressed={active?.blockquote ?? false}
        style={iconButtonStyle(active?.blockquote ?? false)}
      >
        <Quote size={16} />
      </button>

      <button
        type="button"
        onMouseDown={preserveSelection}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Code block"
        aria-label="Code block"
        aria-pressed={active?.codeBlock ?? false}
        style={iconButtonStyle(active?.codeBlock ?? false)}
      >
        <Code size={16} />
      </button>
    </div>
  );
};
