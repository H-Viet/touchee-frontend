"use client";

import { useState } from "react";
import { CreatePost } from "@/components/posts/CreatePost";
import { CommunityRulesPanel } from "@/components/communities/CommunityRulesPanel";
import { mockJoinedCommunities } from "@/lib/mock/data";

interface CreatePostFlowProps {
  onSubmitted: (
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
    communityId: string,
  ) => void;
  bare?: boolean;
}

export const CreatePostFlow = ({ onSubmitted, bare }: CreatePostFlowProps) => {
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(
    null,
  );

  const selectedCommunity =
    mockJoinedCommunities.find((c) => c.id === selectedCommunityId) ?? null;

  const handleCreate = (
    content: string,
    mediaUrl: string | null,
    mediaType: "image" | "video" | null,
  ) => {
    onSubmitted(content, mediaUrl, mediaType, selectedCommunityId!);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <CreatePost
        communities={mockJoinedCommunities}
        selectedCommunityId={selectedCommunityId}
        onCommunityChange={setSelectedCommunityId}
        onSubmit={handleCreate}
        bare={bare}
      />
      {selectedCommunity && (
        <CommunityRulesPanel community={selectedCommunity} />
      )}
    </div>
  );
};
