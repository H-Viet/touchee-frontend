"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { CreatePost } from "@/components/posts/CreatePost";

export default function CreatePostModal() {
  const router = useRouter();

  const handleCreate = (
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
  ) => {
    // Mock only — see note below about why this can't push into the
    // feed's own post list yet.
    console.log("new post", { content, mediaUrl, mediaType });
    router.back();
  };

  return (
    <Modal title="Create post">
      <CreatePost onSubmit={handleCreate} bare />
    </Modal>
  );
}
