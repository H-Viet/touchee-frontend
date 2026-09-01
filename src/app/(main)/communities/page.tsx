import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CommunitiesPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
          }}
        >
          Communities
        </h1>
        <Link href="/communities/create" style={{ textDecoration: "none" }}>
          <Button
            size="sm"
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
            <Plus size={14} style={{ marginRight: "4px" }} />
            Create
          </Button>
        </Link>
      </div>
      <p
        style={{
          marginTop: "12px",
          fontSize: "14px",
          color: "var(--color-text-muted)",
        }}
      >
        Coming soon — browse communities.
      </p>
    </div>
  );
}
