"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Sparkles,
  TrendingUp,
  Clock,
  Flame,
  Archive,
  HelpCircle,
} from "lucide-react";

export type CommentSortOption =
  | "best"
  | "top"
  | "new"
  | "controversial"
  | "old"
  | "qa";

const sortOptions: {
  value: CommentSortOption;
  label: string;
  icon: typeof Sparkles;
}[] = [
  { value: "best", label: "Best", icon: Sparkles },
  { value: "top", label: "Top", icon: TrendingUp },
  { value: "new", label: "New", icon: Clock },
  { value: "controversial", label: "Controversial", icon: Flame },
  { value: "old", label: "Old", icon: Archive },
  { value: "qa", label: "Q&A", icon: HelpCircle },
];

interface CommentSortDropdownProps {
  value: CommentSortOption;
  onChange: (value: CommentSortOption) => void;
}

export const CommentSortDropdown = ({
  value,
  onChange,
}: CommentSortDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking anywhere outside of it
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = sortOptions.find((o) => o.value === value) ?? sortOptions[0];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          padding: 0,
        }}
      >
        <span style={{ color: "var(--color-text-muted)" }}>Sort by:</span>
        <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
          {current.label}
        </span>
        <ChevronDown
          size={14}
          style={{
            color: "var(--color-text-secondary)",
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
            width: "190px",
            borderRadius: "12px",
            padding: "6px",
            boxSizing: "border-box",
            background: "#1a1520",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            zIndex: 10,
          }}
        >
          {sortOptions.map(({ value: v, label, icon: Icon }) => (
            <button
              key={v}
              onClick={() => {
                onChange(v);
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
                fontWeight: v === value ? 700 : 500,
                background:
                  v === value ? "rgba(255, 61, 139, 0.1)" : "transparent",
                color: v === value ? "#ff6b9d" : "var(--color-text-secondary)",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
