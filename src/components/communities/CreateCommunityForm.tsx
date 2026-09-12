"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { COMMUNITY_TOPICS } from "@/lib/communityTopics";
import type { Community, CommunityType, CreateCommunityDto } from "@/types";

interface CreateCommunityFormProps {
  onSubmit: (data: CreateCommunityDto) => Community;
}

const TYPE_OPTIONS: { value: CommunityType; label: string; blurb: string }[] = [
  { value: "PUBLIC", label: "Public", blurb: "Anyone can view and post." },
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

const TOTAL_STEPS = 3;

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-text-secondary)",
  marginBottom: "6px",
} as const;

const inputStyle = {
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
} as const;

export const CreateCommunityForm = ({ onSubmit }: CreateCommunityFormProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [topic, setTopic] = useState<string | null>(null);
  const [type, setType] = useState<CommunityType>("PUBLIC");
  const [isMature, setIsMature] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [createdCommunity, setCreatedCommunity] = useState<Community | null>(
    null,
  );

  const handleNameChange = (value: string) => {
    setName(value);
    // Same auto-derive-until-touched pattern as before.
    if (!slugTouched) setSlug(slugify(value));
  };

  const isDetailsValid = name.trim().length > 0 && slug.trim().length > 0;

  const handleCreate = () => {
    if (!isDetailsValid || !topic) return;
    const created = onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      type,
      topic,
      isMature,
    });
    setCreatedCommunity(created);
  };

  if (createdCommunity) {
    return <CommunityLaunchSuccess community={createdCommunity} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <StepDots current={step} total={TOTAL_STEPS} />

      {step === 1 && (
        <TopicStep
          selected={topic}
          onSelect={setTopic}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <TypeStep
          type={type}
          onTypeChange={setType}
          isMature={isMature}
          onMatureChange={setIsMature}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <DetailsStep
          name={name}
          slug={slug}
          description={description}
          onNameChange={handleNameChange}
          onSlugChange={(value) => {
            setSlugTouched(true);
            setSlug(slugify(value));
          }}
          onDescriptionChange={setDescription}
          isValid={isDetailsValid}
          onBack={() => setStep(2)}
          onSubmit={handleCreate}
        />
      )}
    </div>
  );
};

// ─── Step 1: Topic ──────────────────────────────────────────────────────────

const TopicStep = ({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div>
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--color-text-primary)",
        }}
      >
        What will your community be about?
      </h2>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: "13px",
          color: "var(--color-text-muted)",
        }}
      >
        Choose a mood or interest to help people discover your community.
      </p>
    </div>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {COMMUNITY_TOPICS.map(({ id, label, icon: Icon }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 14px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              color: "var(--color-text-primary)",
              background: isSelected
                ? "rgba(255, 61, 139, 0.14)"
                : "rgba(34, 26, 44, 0.6)",
              border: isSelected
                ? "1px solid var(--color-primary)"
                : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Icon size={15} />
            {label}
            {isSelected && <Check size={14} />}
          </button>
        );
      })}
    </div>

    <div
      style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}
    >
      <Button
        onClick={onNext}
        disabled={!selected}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          padding: "7px 16px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
          color: "white",
        }}
      >
        Next
      </Button>
    </div>
  </div>
);

// ─── Step 2: Type + Mature ──────────────────────────────────────────────────

const TypeStep = ({
  type,
  onTypeChange,
  isMature,
  onMatureChange,
  onBack,
  onNext,
}: {
  type: CommunityType;
  onTypeChange: (value: CommunityType) => void;
  isMature: boolean;
  onMatureChange: (value: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div>
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--color-text-primary)",
        }}
      >
        What kind of community is this?
      </h2>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: "13px",
          color: "var(--color-text-muted)",
        }}
      >
        Decide who can view and contribute.
      </p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {TYPE_OPTIONS.map((option) => (
        <Card
          key={option.value}
          hover
          onClick={() => onTypeChange(option.value)}
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

    <Card
      style={{
        padding: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--color-text-primary)",
          }}
        >
          Mature (18+)
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "12px",
            color: "var(--color-text-muted)",
          }}
        >
          Members must be over 18 to view and contribute.
        </p>
      </div>
      <Switch checked={isMature} onChange={onMatureChange} />
    </Card>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "8px",
      }}
    >
      <Button
        variant="secondary"
        onClick={onBack}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          padding: "7px 16px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "rgba(255,255,255,0.06)",
          color: "var(--color-text-secondary)",
        }}
      >
        Back
      </Button>
      <Button
        onClick={onNext}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          padding: "7px 16px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
          color: "white",
        }}
      >
        Next
      </Button>
    </div>
  </div>
);

// Only used here, so it isn't promoted to components/ui until a second
// caller needs a toggle switch.
const Switch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    style={{
      width: "40px",
      height: "24px",
      borderRadius: "9999px",
      border: "none",
      cursor: "pointer",
      padding: "3px",
      flexShrink: 0,
      background: checked ? "var(--color-primary)" : "rgba(255,255,255,0.15)",
      transition: "background 0.2s ease",
    }}
  >
    <span
      style={{
        display: "block",
        width: "18px",
        height: "18px",
        borderRadius: "9999px",
        background: "white",
        transition: "transform 0.2s ease",
        transform: checked ? "translateX(16px)" : "translateX(0)",
      }}
    />
  </button>
);

// ─── Step 3: Name / Slug / Description + preview ───────────────────────────

const DetailsStep = ({
  name,
  slug,
  description,
  onNameChange,
  onSlugChange,
  onDescriptionChange,
  isValid,
  onBack,
  onSubmit,
}: {
  name: string;
  slug: string;
  description: string;
  onNameChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  isValid: boolean;
  onBack: () => void;
  onSubmit: () => void;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <div>
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: 700,
          color: "var(--color-text-primary)",
        }}
      >
        Tell us about your community
      </h2>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: "13px",
          color: "var(--color-text-muted)",
        }}
      >
        A name and description help people understand what it&apos;s about.
      </p>
    </div>

    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <div
        style={{
          flex: "1 1 260px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <label style={labelStyle}>Name</label>
          <input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Cozy Corner"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Community URL</label>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{ fontSize: "13px", color: "var(--color-text-muted)" }}
            >
              touchee.app/c/
            </span>
            <input
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="cozy-corner"
              style={{
                ...inputStyle,
                flex: 1,
                height: "36px",
                fontSize: "13px",
              }}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
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
      </div>

      {/* Live preview — new; nothing else in the app does this yet */}
      <Card
        style={{ flex: "1 1 200px", padding: "16px", alignSelf: "flex-start" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar fallback={name || "?"} size="md" />
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              c/{slug || "your-community"}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "var(--color-text-muted)",
              }}
            >
              0 members
            </p>
          </div>
        </div>
        <p
          style={{
            margin: "12px 0 0",
            fontSize: "12px",
            color: "var(--color-text-secondary)",
          }}
        >
          {description || "Your description will show up here."}
        </p>
      </Card>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "8px",
      }}
    >
      <Button
        variant="secondary"
        onClick={onBack}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          padding: "7px 16px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "rgba(255,255,255,0.06)",
          color: "var(--color-text-secondary)",
        }}
      >
        Back
      </Button>
      <Button
        onClick={onSubmit}
        disabled={!isValid}
        style={{
          fontSize: "13px",
          fontWeight: 600,
          padding: "7px 16px",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
          color: "white",
        }}
      >
        Create Community
      </Button>
    </div>
  </div>
);

// ─── Progress dots ──────────────────────────────────────────────────────────

const StepDots = ({ current, total }: { current: number; total: number }) => (
  <div style={{ display: "flex", gap: "6px" }}>
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "9999px",
          background:
            i + 1 === current
              ? "var(--color-primary)"
              : "rgba(255,255,255,0.2)",
        }}
      />
    ))}
  </div>
);

// ─── Launch success screen ──────────────────────────────────────────────────

const CommunityLaunchSuccess = ({ community }: { community: Community }) => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        flexWrap: "wrap",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          flex: "1 1 240px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          You launched a new community!
        </h2>

        <div>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--color-text-secondary)",
            }}
          >
            Here&apos;s what you should know
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "var(--color-text-muted)",
            }}
          >
            We&apos;ve applied some defaults to help you get started.
            You&apos;ll be able to edit these anytime.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <LaunchBadge label="Rules" />
          <LaunchBadge label="Welcome guide" />
        </div>
      </div>

      <Card style={{ flex: "1 1 260px", padding: 0, overflow: "hidden" }}>
        <div
          style={{
            height: "80px",
            position: "relative",
            background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
          }}
        >
          <button
            type="button"
            disabled
            title="Banner editing coming soon"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "28px",
              height: "28px",
              borderRadius: "9999px",
              border: "none",
              background: "rgba(0,0,0,0.4)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "not-allowed",
            }}
          >
            <Pencil size={13} />
          </button>
        </div>

        <div style={{ padding: "0 16px 16px", marginTop: "-24px" }}>
          <div style={{ position: "relative", width: "48px" }}>
            <div
              style={{
                border: "3px solid var(--color-surface)",
                borderRadius: "9999px",
                display: "inline-block",
              }}
            >
              <Avatar fallback={community.name} size="lg" />
            </div>
            <button
              type="button"
              disabled
              title="Avatar editing coming soon"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                border: "none",
                background: "rgba(0,0,0,0.6)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "not-allowed",
              }}
            >
              <Pencil size={10} />
            </button>
          </div>

          <p
            style={{
              margin: "10px 0 0",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
            }}
          >
            c/{community.slug}
          </p>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "12px",
              color: "var(--color-text-muted)",
            }}
          >
            {community._count?.members ?? 1} member ·{" "}
            {community._count?.posts ?? 0} posts
          </p>
          {community.description && (
            <p
              style={{
                margin: "10px 0 0",
                fontSize: "13px",
                color: "var(--color-text-secondary)",
              }}
            >
              {community.description}
            </p>
          )}

          <button
            type="button"
            disabled
            title="Color editing coming soon"
            style={{
              marginTop: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "not-allowed",
              width: "100%",
            }}
          >
            <Pencil size={12} />
            Base Color
            <span
              style={{
                marginLeft: "auto",
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #ff6b6b, #8b5cf6)",
              }}
            />
          </button>
        </div>
      </Card>

      <div
        style={{
          flexBasis: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={() => router.push(`/communities/${community.slug}`)}>
          Go To Community Page
        </Button>
      </div>
    </div>
  );
};

const LaunchBadge = ({ label }: { label: string }) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "9999px",
      fontSize: "12px",
      fontWeight: 600,
      color: "var(--color-text-primary)",
      background: "rgba(52, 211, 153, 0.12)",
      border: "1px solid rgba(52, 211, 153, 0.3)",
    }}
  >
    <Check size={13} color="var(--color-success)" />
    {label}
  </span>
);
