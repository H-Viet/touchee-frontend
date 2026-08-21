import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          background: `
            radial-gradient(ellipse at 80% 0%, rgba(255,107,107,0.06) 0%, transparent 50%),
            #0f0d0f
          `,
        }}
      >
        <div
          style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 16px" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
