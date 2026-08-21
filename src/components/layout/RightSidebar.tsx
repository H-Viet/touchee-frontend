"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  mockJoinedCommunities,
  mockSuggestedCommunities,
} from "@/lib/mock/data";

const sectionTitleStyle = {
  margin: "0 0 12px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-muted)",
};

export const RightSidebar = () => {
  // Local-only join state — resets on refresh. Real persistence comes later.
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());

  const toggleJoin = (id: string) => {
    setJoinedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <aside
      style={{
        width: "320px",
        flexShrink: 0,
        padding: "20px 16px",
        boxSizing: "border-box",
        position: "sticky",
        top: "60px",
        height: "calc(100vh - 60px)",
        overflowY: "auto",
      }}
    >
      {/* Your communities */}
      <Card style={{ marginBottom: "16px" }}>
        <p style={sectionTitleStyle}>Your communities</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {mockJoinedCommunities.map((c) => (
            <Link
              key={c.id}
              href={`/communities/${c.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 0",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  height: "28px",
                  width: "28px",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "white",
                  background: "linear-gradient(135deg, #ff6b6b, #8b5cf6)",
                }}
              >
                {c.name[0]}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {c.name}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "11px",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {c._count?.members.toLocaleString()} members
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Suggested communities */}
      <Card>
        <p style={sectionTitleStyle}>Suggested for you</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {mockSuggestedCommunities.map((c) => {
            const joined = joinedIds.has(c.id);
            return (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <Link
                  href={`/communities/${c.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      height: "28px",
                      width: "28px",
                      borderRadius: "8px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "white",
                      background: "linear-gradient(135deg, #8b5cf6, #ff3d8b)",
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {c.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        color: "var(--color-text-muted)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c._count?.members.toLocaleString()} members
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => toggleJoin(c.id)}
                  style={{
                    flexShrink: 0,
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    color: joined ? "var(--color-text-secondary)" : "white",
                    background: joined
                      ? "rgba(255,255,255,0.08)"
                      : "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
                  }}
                >
                  {joined ? "Joined" : "Join"}
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </aside>
  );
};
