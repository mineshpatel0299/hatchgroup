import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Hatch Group",
  description: "Content management for Hatch Group projects.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#F4F5F7] text-[#1C2420]">{children}</div>;
}
