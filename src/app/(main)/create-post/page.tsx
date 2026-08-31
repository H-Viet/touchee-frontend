"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CreatePost } from "@/components/posts/CreatePost";

export default function CreatePostPage() {
  const router = useRouter();

  const handleCreate = (
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
  ) => {
    console.log("new post", { content, mediaUrl, mediaType });
    router.push("/");
  };

  return (
    <div>
      <button
        onClick={() => router.back()}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--color-text-secondary)",
          fontSize: "13px",
          fontWeight: 600,
          padding: 0,
          marginBottom: "16px",
        }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1
        style={{
          margin: "0 0 16px",
          fontSize: "20px",
          fontWeight: 700,
          color: "var(--color-text-primary)",
        }}
      >
        Create post
      </h1>

      <CreatePost onSubmit={handleCreate} />
    </div>
  );
}
