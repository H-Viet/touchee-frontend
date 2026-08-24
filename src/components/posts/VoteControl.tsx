"use client";

import { useState } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

interface VoteControlProps {
  score: number;
  size?: "sm" | "md";
}

export const VoteControl = ({
  score: baseScore,
  size = "md",
}: VoteControlProps) => {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const displayScore =
    baseScore + (vote === "up" ? 1 : vote === "down" ? -1 : 0);
  const iconSize = size === "sm" ? 16 : 20;
  const fontSize = size === "sm" ? "12px" : "13px";

  const handleVote = (dir: "up" | "down", e: React.MouseEvent) => {
    // Prevents clicks here from also triggering a parent <Link> navigation
    e.preventDefault();
    e.stopPropagation();
    setVote((prev) => (prev === dir ? null : dir));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
      }}
    >
      <button
        onClick={(e) => handleVote("up", e)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
          display: "flex",
          color: vote === "up" ? "#ff3d8b" : "var(--color-text-muted)",
        }}
      >
        <ArrowBigUp size={iconSize} strokeWidth={vote === "up" ? 3 : 2} />
      </button>

      <span
        style={{
          fontSize,
          fontWeight: 700,
          color:
            vote === "up"
              ? "#ff3d8b"
              : vote === "down"
                ? "#8b5cf6"
                : "var(--color-text-secondary)",
        }}
      >
        {displayScore}
      </span>

      <button
        onClick={(e) => handleVote("down", e)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
          display: "flex",
          color: vote === "down" ? "#8b5cf6" : "var(--color-text-muted)",
        }}
      >
        <ArrowBigDown size={iconSize} strokeWidth={vote === "down" ? 3 : 2} />
      </button>
    </div>
  );
};
