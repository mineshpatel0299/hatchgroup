import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
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
    <html lang="en" className={poppins.variable}>
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
