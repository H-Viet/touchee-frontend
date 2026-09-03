"use client";

import type { Editor } from "@tiptap/react";
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
  Table,
  MoreHorizontal,
} from "lucide-react";

interface EditorToolbarProps {
  editor: Editor | null;
}

const iconButtonStyle = (active: boolean) => ({
  background: active ? "rgba(255, 61, 139, 0.15)" : "none",
  border: "none",
  cursor: "pointer",
  color: active ? "var(--color-primary)" : "var(--color-text-muted)",
  padding: "6px",
  borderRadius: "6px",
  display: "flex",
});

const disabledStyle = {
  ...iconButtonStyle(false),
  opacity: 0.4,
  cursor: "not-allowed",
};

const Divider = () => (
  <div
    style={{
      width: "1px",
      height: "18px",
      background: "rgba(255,255,255,0.08)",
      margin: "0 4px",
    }}
  />
);

export const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter a URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "2px",
        paddingBottom: "8px",
        marginBottom: "8px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        onClick={setLink}
        title="Link"
        style={iconButtonStyle(editor.isActive("link"))}
      >
        <Link2 size={16} />
      </button>
      <button disabled title="Image (coming soon)" style={disabledStyle}>
        <ImageIcon size={16} />
      </button>

      <Divider />

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold"
        style={iconButtonStyle(editor.isActive("bold"))}
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic"
        style={iconButtonStyle(editor.isActive("italic"))}
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
        style={iconButtonStyle(editor.isActive("strike"))}
      >
        <Strikethrough size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        title="Superscript"
        style={iconButtonStyle(editor.isActive("superscript"))}
      >
        <SuperscriptIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        title="Heading"
        style={iconButtonStyle(editor.isActive("heading", { level: 2 }))}
      >
        <Heading2 size={16} />
      </button>

      <Divider />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet list"
        style={iconButtonStyle(editor.isActive("bulletList"))}
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Numbered list"
        style={iconButtonStyle(editor.isActive("orderedList"))}
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        title="Quote"
        style={iconButtonStyle(editor.isActive("blockquote"))}
      >
        <Quote size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        title="Code block"
        style={iconButtonStyle(editor.isActive("codeBlock"))}
      >
        <Code size={16} />
      </button>

      <Divider />

      <button disabled title="Table (coming soon)" style={disabledStyle}>
        <Table size={16} />
      </button>
      <button disabled title="More (coming soon)" style={disabledStyle}>
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};
