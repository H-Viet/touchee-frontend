"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CreateCommunityForm } from "@/components/communities/CreateCommunityForm";
import type { CreateCommunityDto } from "@/types";

export default function CreateCommunityPage() {
  const router = useRouter();

  const handleCreate = (data: CreateCommunityDto) => {
    console.log("new community", data);
    router.push("/communities");
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
        Create a community
      </h1>

      <CreateCommunityForm onSubmit={handleCreate} />
    </div>
  );
}
