"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import type { Community } from "@/types";

interface CommunitySelectDropdownProps {
  communities: Community[];
  value: string | null;
  onChange: (communityId: string) => void;
}

export const CommunitySelectDropdown = ({
  communities,
  value,
  onChange,
}: CommunitySelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = communities.find((c) => c.id === value) ?? null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "40px",
          padding: "0 12px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(34, 26, 44, 0.8)",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        {current ? (
          <>
            <Avatar fallback={current.name} size="sm" />
            <span
              style={{ fontWeight: 600, color: "var(--color-text-primary)" }}
            >
              r/{current.slug}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--color-text-muted)" }}>
            Select community
          </span>
        )}
        <ChevronDown
          size={14}
          style={{
            color: "var(--color-text-secondary)",
            marginLeft: "4px",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.15s ease",
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            width: "260px",
            maxHeight: "280px",
            overflowY: "auto",
            borderRadius: "12px",
            padding: "6px",
            boxSizing: "border-box",
            background: "#1a1520",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            zIndex: 10,
          }}
        >
          {communities.length === 0 && (
            <p
              style={{
                margin: 0,
                padding: "10px",
                fontSize: "13px",
                color: "var(--color-text-muted)",
              }}
            >
              Join a community to post.
            </p>
          )}
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => {
                onChange(community.id);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "8px 10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: community.id === value ? 700 : 500,
                background:
                  community.id === value
                    ? "rgba(255, 61, 139, 0.1)"
                    : "transparent",
                color:
                  community.id === value
                    ? "#ff6b9d"
                    : "var(--color-text-secondary)",
                textAlign: "left",
              }}
            >
              <Avatar fallback={community.name} size="sm" />
              <span>r/{community.slug}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
