import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import PosthogProvider from "@/components/PosthogProvider";

export const metadata: Metadata = {
  title: "DevPocket — AI Tools for Developers",
  description: "The AI workspace for developers. Error explainer, README generator, commit message AI and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PosthogProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
              {children}
            </main>
          </div>
        </PosthogProvider>
      </body>
    </html>
  );
}