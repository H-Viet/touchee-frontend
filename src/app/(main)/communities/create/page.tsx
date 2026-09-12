"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CreateCommunityForm } from "@/components/communities/CreateCommunityForm";
import { mockJoinedCommunities } from "@/lib/mock/data";
import type { Community, CreateCommunityDto } from "@/types";

export default function CreateCommunityPage() {
  const router = useRouter();
  const [justCreated, setJustCreated] = useState(false);

  const handleCreate = (data: CreateCommunityDto): Community => {
    const community: Community = {
      id: `comm-${Date.now()}`,
      name: data.name,
      slug: data.slug,
      description: data.description ?? null,
      type: data.type,
      topic: data.topic,
      isMature: data.isMature,
      createdAt: new Date().toISOString(),
      _count: { members: 1, posts: 0 },
    };

    // Direct mutation is deliberate: every consumer of mockJoinedCommunities
    // (Sidebar, RightSidebar, CreatePostFlow, the home feed) reads the
    // imported array live rather than copying it into local state, so this
    // shows up everywhere on next render with no extra wiring.
    mockJoinedCommunities.push(community);
    setJustCreated(true);

    return community;
  };

  return (
    <div>
      {!justCreated && (
        <>
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
            Create a community
          </h1>
        </>
      )}

      <CreateCommunityForm onSubmit={handleCreate} />
    </div>
  );
}
