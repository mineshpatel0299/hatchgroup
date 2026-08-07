"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Plus, Menu, X, ExternalLink, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const LOGO_URL =
  "https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6125,x_908,y_1653/HATCH_LOGO_GOLD-02_1_arrhel.png";

const links = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────────────── */}
      <header
        className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 shadow-md"
        style={{ background: "#00251f" }}
      >
        <Link href="/admin" className="relative w-28 h-8">
          <Image src={LOGO_URL} alt="Hatch Group" fill unoptimized className="object-contain object-left" />
        </Link>
        <Link
          href="/admin/projects/new"
          aria-label="Add project"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 text-white/80 hover:text-white hover:bg-white/15 transition-colors"
        >
          <Plus className="w-4.5 h-4.5" />
        </Link>
      </header>

      {/* ── Mobile drawer overlay ──────────────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer panel ────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 flex flex-col lg:hidden shadow-2xl transition-transform duration-300 ease-in-out",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "#00251f" }}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="relative w-32 h-9">
            <Image src={LOGO_URL} alt="Hatch Group" fill unoptimized className="object-contain object-left" />
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-6 h-px bg-white/10 mb-2" />

        <nav className="flex-1 px-4 pt-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] tracking-wide transition-colors",
                  active ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 pt-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 text-left rounded-lg px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Desktop sidebar ────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 flex-col text-white"
        style={{ background: "#00251f" }}
      >
        <div className="px-6 py-8">
          <div className="relative w-36 h-10">
            <Image src={LOGO_URL} alt="Hatch Group" fill unoptimized className="object-contain object-left" />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] tracking-wide transition-colors",
                  active ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-6 pt-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 text-left rounded-lg px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Mobile bottom nav ──────────────────────────────────────── */}
      <nav
        className="fixed bottom-4 left-4 right-4 z-40 lg:hidden flex items-center justify-around rounded-2xl py-2.5 px-2 shadow-xl shadow-black/30 backdrop-blur-md border border-white/10"
        style={{ background: "rgba(0,37,31,0.92)" }}
      >
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-colors",
                active ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform duration-150", active && "scale-110")} />
              <span className="text-[10px] font-semibold tracking-wide">{link.label}</span>
            </Link>
          );
        })}
        <Link
          href="/admin/projects/new"
          className="flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-white/45 hover:text-white/80 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Add</span>
        </Link>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-white/45 hover:text-white/80 transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">More</span>
        </button>
      </nav>
    </>
  );
}
