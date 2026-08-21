"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mockJoinedCommunities } from "@/lib/mock/data";
import {
  Home,
  Flame,
  Newspaper,
  Compass,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const mainNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/popular", icon: Flame, label: "Popular" },
  { href: "/news", icon: Newspaper, label: "News" },
  { href: "/explore", icon: Compass, label: "Explore" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [feedsOpen, setFeedsOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(true);

  return (
    <aside
      style={{
        width: "260px",
        flexShrink: 0,
        padding: "20px 12px",
        boxSizing: "border-box",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(20, 16, 26, 0.6)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: "60px",
        height: "calc(100vh - 60px)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {mainNavItems.map(({ href, icon: Icon, label }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "10px",
                padding: "10px 12px",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                color: active ? "#ff6b9d" : "var(--color-text-secondary)",
                background: active ? "rgba(255, 61, 139, 0.1)" : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Start a community */}
      <Link
        href="/communities"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderRadius: "10px",
          padding: "10px 12px",
          marginTop: "8px",
          fontSize: "14px",
          fontWeight: 500,
          textDecoration: "none",
          color: "var(--color-text-secondary)",
        }}
      >
        <Plus size={18} />
        Start a community
      </Link>

      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          margin: "16px 8px",
        }}
      />

      {/* Custom Feeds */}
      <div>
        <button
          onClick={() => setFeedsOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
          }}
        >
          {feedsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          Custom Feeds
        </button>
        {feedsOpen && (
          <p
            style={{
              padding: "4px 12px 12px 32px",
              fontSize: "13px",
              color: "var(--color-text-muted)",
            }}
          >
            No custom feeds yet
          </p>
        )}
      </div>

      {/* Communities */}
      <div>
        <button
          onClick={() => setCommunitiesOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "var(--color-text-muted)",
            textTransform: "uppercase",
          }}
        >
          {communitiesOpen ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
          Communities
        </button>
        {communitiesOpen && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {mockJoinedCommunities.map((c) => (
              <Link
                key={c.id}
                href={`/communities/${c.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px 8px 32px",
                  fontSize: "13px",
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "6px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "white",
                    background: "linear-gradient(135deg, #ff6b6b, #8b5cf6)",
                  }}
                >
                  {c.name[0]}
                </div>
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
