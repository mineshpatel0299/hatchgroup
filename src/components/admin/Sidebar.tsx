"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const LOGO_URL =
  "https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6125,x_908,y_1653/HATCH_LOGO_GOLD-02_1_arrhel.png";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col text-white" style={{ background: "#00251f" }}>
      <div className="px-6 py-8">
        <div className="relative w-36 h-10">
          <Image src={LOGO_URL} alt="Hatch Group" fill unoptimized className="object-contain object-left" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-lg px-4 py-2.5 text-[13px] tracking-wide transition-colors",
                active ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 pt-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="block rounded-lg px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          View Site ↗
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full text-left rounded-lg px-4 py-2.5 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            Log Out
          </button>
        </form>
      </div>
    </aside>
  );
}
