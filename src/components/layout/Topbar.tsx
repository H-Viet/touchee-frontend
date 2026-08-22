"use client";

import Link from "next/link";
import { Search, Plus, Bell } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { mockCurrentUser } from "@/lib/mock/data";

const iconButtonStyle = {
  height: "36px",
  width: "36px",
  borderRadius: "9999px",
  border: "none",
  background: "rgba(255,255,255,0.06)",
  color: "var(--color-text-secondary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export const Topbar = () => {
  return (
    <header
      style={{
        height: "60px",
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "0 20px",
        boxSizing: "border-box",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(15, 13, 15, 0.85)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <div
          className="mood-pulse"
          style={{
            height: "32px",
            width: "32px",
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
          }}
        >
          <span style={{ color: "white", fontWeight: 700, fontSize: "13px" }}>
            T
          </span>
        </div>
        <span
          style={{
            fontSize: "17px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Touchee
        </span>
      </Link>

      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: "480px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--color-text-muted)",
          }}
        />
        <input
          type="text"
          placeholder="Search Touchee"
          style={{
            width: "100%",
            height: "38px",
            borderRadius: "9999px",
            padding: "0 16px 0 36px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            background: "rgba(34, 26, 44, 0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      {/* Right icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <button style={iconButtonStyle}>
          <Plus size={18} />
        </button>
        <button style={iconButtonStyle}>
          <Bell size={18} />
        </button>
        <Link href="/profile" style={{ display: "flex" }}>
          <Avatar fallback={mockCurrentUser.displayName} size="sm" />
        </Link>
      </div>
    </header>
  );
};
