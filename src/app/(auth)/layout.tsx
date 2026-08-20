import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: `
          radial-gradient(ellipse at 70% 10%, rgba(255,107,107,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 30% 90%, rgba(139,92,246,0.15) 0%, transparent 50%),
          #0f0d0f
        `,
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Touchee logo */}
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            className="mood-pulse"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
              boxShadow: "0 0 24px rgba(255, 61, 139, 0.4)",
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
              T
            </span>
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Touchee
          </span>
        </div>

        {/* Gradient border wrapper */}
        <div
          style={{
            width: "100%",
            borderRadius: "24px",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(255,107,107,0.4), rgba(255,61,139,0.4), rgba(139,92,246,0.4))",
            boxSizing: "border-box",
          }}
        >
          {/* Actual card */}
          <div
            style={{
              width: "100%",
              borderRadius: "24px",
              padding: "32px",
              background: "rgba(22, 17, 30, 0.95)",
              backdropFilter: "blur(20px)",
              boxSizing: "border-box",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
