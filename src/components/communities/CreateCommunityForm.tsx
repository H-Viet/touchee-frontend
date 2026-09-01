"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { CommunityType, CreateCommunityDto } from "@/types";

interface CreateCommunityFormProps {
  onSubmit: (data: CreateCommunityDto) => void;
}

const TYPE_OPTIONS: { value: CommunityType; label: string; blurb: string }[] = [
  {
    value: "PUBLIC",
    label: "Public",
    blurb: "Anyone can view and post.",
  },
  {
    value: "RESTRICTED",
    label: "Restricted",
    blurb: "Anyone can view, only approved members can post.",
  },
  {
    value: "PRIVATE",
    label: "Private",
    blurb: "Only approved members can view or post.",
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const CreateCommunityForm = ({ onSubmit }: CreateCommunityFormProps) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [type, setType] = useState<CommunityType>("PUBLIC");

  const handleNameChange = (value: string) => {
    setName(value);
    // Keep auto-deriving the slug from the name UNTIL the user has directly
    // edited the slug field themselves — after that, respect their choice.
    if (!slugTouched) setSlug(slugify(value));
  };

  const handleSubmit = () => {
    if (!name.trim() || !slug.trim()) return;
    onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      type,
    });
  };

  const isValid = name.trim().length > 0 && slug.trim().length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            marginBottom: "6px",
          }}
        >
          Name
        </label>
        <input
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="Cozy Corner"
          style={{
            width: "100%",
            height: "40px",
            borderRadius: "10px",
            padding: "0 12px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            background: "rgba(34, 26, 44, 0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            marginBottom: "6px",
          }}
        >
          Community URL
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            touchee.app/c/
          </span>
          <input
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            placeholder="cozy-corner"
            style={{
              flex: 1,
              height: "36px",
              borderRadius: "10px",
              padding: "0 12px",
              fontSize: "13px",
              outline: "none",
              boxSizing: "border-box",
              background: "rgba(34, 26, 44, 0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--color-text-primary)",
            }}
          />
        </div>
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            marginBottom: "6px",
          }}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this community about?"
          rows={3}
          style={{
            width: "100%",
            resize: "none",
            borderRadius: "10px",
            padding: "10px 12px",
            fontSize: "14px",
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
            background: "rgba(34, 26, 44, 0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      <div>
        <label
          style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
            marginBottom: "8px",
          }}
        >
          Type
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {TYPE_OPTIONS.map((option) => (
            <Card
              key={option.value}
              hover
              onClick={() => setType(option.value)}
              style={{
                padding: "12px 14px",
                cursor: "pointer",
                border:
                  type === option.value
                    ? "1px solid var(--color-primary)"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                {option.label}
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "12px",
                  color: "var(--color-text-muted)",
                }}
              >
                {option.blurb}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <Button onClick={handleSubmit} disabled={!isValid}>
        Create community
      </Button>
    </div>
  );
};
