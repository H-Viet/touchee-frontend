import type { ReactNode } from "react";
import { Topbar } from "@/components/layout/Topbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Topbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            boxSizing: "border-box",
            background: `
              radial-gradient(ellipse at 80% 0%, rgba(255,107,107,0.06) 0%, transparent 50%),
              #0f0d0f
            `,
          }}
        >
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              padding: "24px 16px",
            }}
          >
            {children}
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
