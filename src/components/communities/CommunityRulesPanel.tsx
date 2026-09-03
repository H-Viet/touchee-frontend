"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Community } from "@/types";

interface CommunityRulesPanelProps {
  community: Community;
}

export const CommunityRulesPanel = ({
  community,
}: CommunityRulesPanelProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!community.rules || community.rules.length === 0) return null;

  return (
    <Card>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.03em",
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
        }}
      >
        r/{community.slug} rules
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {community.rules.map((rule, index) => {
          const isOpen = expandedIndex === index;
          return (
            <div
              key={rule.title}
              style={{
                borderTop:
                  index > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                padding: "10px 0",
              }}
            >
              <button
                onClick={() => setExpandedIndex(isOpen ? null : index)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {index + 1}. {rule.title}
                </span>
                <ChevronDown
                  size={14}
                  style={{
                    color: "var(--color-text-muted)",
                    flexShrink: 0,
                    marginLeft: "8px",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.15s ease",
                  }}
                />
              </button>
              {isOpen && (
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {rule.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
