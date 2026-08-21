"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, User } from "lucide-react";
import { mockCurrentUser } from "@/lib/mock/data";
import { Avatar } from "../ui/Avatar";

const navItems = [
  { href: "/feed", icon: Home, label: "Feed" },
  { href: "/communities", icon: Users, label: "Communities" },
  { href: "/profile", icon: User, label: "Profile" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "24px 16px",
        boxSizing: "border-box",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(20, 16, 26, 0.6)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "32px",
          padding: "0 8px",
        }}
      >
        <div
          className="mood-pulse"
          style={{
            height: "34px",
            width: "34px",
            borderRadius: "10px",
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
            fontSize: "18px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Touchee
        </span>
      </div>

      {/* Nav links */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flex: 1,
        }}
      >
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
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

      {/* Mock user footer */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "16px",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 8px",
          }}
        >
          <Avatar fallback={mockCurrentUser.displayName} size="sm" pulse />
          <div style={{ overflow: "hidden" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {mockCurrentUser.displayName}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              @{mockCurrentUser.username}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
