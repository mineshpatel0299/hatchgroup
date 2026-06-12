import type { Metadata } from "next";
import { Marcellus, Jost } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

const jost = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Hatch Group | Premium Indian Interior Design Studio",
  description: "We architect experiences. Architectural Digest India meets a luxury hotel brand film.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable}`}>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes into <body> before hydration, causing false mismatches */}
      <body suppressHydrationWarning className="antialiased font-sans text-foreground bg-background cursor-none">
        <LenisProvider>
          <CustomCursor />
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
