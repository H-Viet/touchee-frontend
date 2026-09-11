"use client";

import { useState } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

interface VoteControlProps {
  score: number;
  size?: "sm" | "md";
  orientation?: "vertical" | "horizontal";
}

export const VoteControl = ({
  score: baseScore,
  size = "md",
  orientation = "vertical",
}: VoteControlProps) => {
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  const displayScore =
    baseScore + (vote === "up" ? 1 : vote === "down" ? -1 : 0);

  const iconSize = size === "sm" ? 16 : 18;
  const fontSize = size === "sm" ? "13px" : "14px";
  const isHorizontal = orientation === "horizontal";

  const handleVote = (direction: "up" | "down", event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setVote((previous) => (previous === direction ? null : direction));
  };

  return (
    <div
      aria-label="Vote controls"
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        gap: isHorizontal ? "2px" : "2px",
        padding: isHorizontal ? "4px 6px" : 0,
        borderRadius: isHorizontal ? "9999px" : 0,
        background: isHorizontal ? "rgba(255,255,255,0.06)" : "transparent",
      }}
    >
      <button
        type="button"
        onClick={(event) => handleVote("up", event)}
        aria-label="Upvote"
        aria-pressed={vote === "up"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          color:
            vote === "up"
              ? "var(--color-primary)"
              : "var(--color-text-secondary)",
        }}
      >
        <ArrowBigUp size={iconSize} strokeWidth={vote === "up" ? 3 : 2} />
      </button>

      <span
        style={{
          minWidth: "24px",
          textAlign: "center",
          fontSize,
          fontWeight: 700,
          color:
            vote === "up"
              ? "var(--color-primary)"
              : vote === "down"
                ? "var(--color-accent)"
                : "var(--color-text-primary)",
        }}
      >
        {displayScore}
      </span>

      <button
        type="button"
        onClick={(event) => handleVote("down", event)}
        aria-label="Downvote"
        aria-pressed={vote === "down"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          color:
            vote === "down"
              ? "var(--color-accent)"
              : "var(--color-text-secondary)",
        }}
      >
        <ArrowBigDown size={iconSize} strokeWidth={vote === "down" ? 3 : 2} />
      </button>
    </div>
  );
};
