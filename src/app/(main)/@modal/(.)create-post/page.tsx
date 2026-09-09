"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { CreatePostFlow } from "@/components/posts/CreatePostFlow";

export default function CreatePostModal() {
  const router = useRouter();

  const handleSubmitted = (
    title: string,
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
    communityId: string,
  ) => {
    console.log("new post", {
      title,
      content,
      mediaUrl,
      mediaType,
      communityId,
    });

    router.back();
  };

  return (
    <Modal title="Create post" size="wide">
      <CreatePostFlow onSubmitted={handleSubmitted} bare />
    </Modal>
  );
}
