"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { label: "Home",     href: "/"      },
  { label: "About Us", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light treatment on dark-background pages (e.g. /about hero) until the user scrolls
  const light = pathname === "/about" && !scrolled;

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="relative flex-shrink-0 w-40 md:w-55 h-12 md:h-14" data-cursor-interact>
            <Image
              src="https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6125,x_908,y_1653/HATCH_LOGO_GOLD-02_1_arrhel.png"
              alt="Hatch Group"
              fill
              className="object-contain object-left transition-all duration-500"
              priority
              unoptimized
            />
          </a>

          {/* Desktop links — centred */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map(({ label, href }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : href.startsWith("/") && !href.includes("#")
                  ? pathname === href
                  : false;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    data-cursor-interact
                    className={clsx(
                      "group relative text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300",
                      scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
                      isActive && (scrolled ? "text-foreground" : "text-white")
                    )}
                  >
                    {label}
                    <span
                      className={clsx(
                        "absolute -bottom-0.5 left-0 h-px transition-all duration-500 ease-in-out",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                        scrolled ? "bg-accent" : "bg-white/60"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            data-cursor-interact
            className={clsx(
              "hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-medium px-5 py-2.5 border transition-all duration-500",
              scrolled
                ? "border-foreground/25 text-foreground hover:bg-foreground hover:text-background"
                : "border-white/30 text-white hover:bg-white hover:text-foreground"
            )}
          >
            Enquire
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            data-cursor-interact
            aria-label="Toggle menu"
            className={clsx(
              "md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 transition-colors duration-300",
              light ? "text-white" : "text-foreground"
            )}
          >
            <span
              className={clsx(
                "block h-px w-6 bg-current transition-all duration-300 origin-center",
                menuOpen && "rotate-45 translate-y-[7px]"
              )}
            />
            <span
              className={clsx(
                "block h-px w-4 bg-current transition-all duration-300",
                menuOpen && "opacity-0 w-0"
              )}
            />
            <span
              className={clsx(
                "block h-px w-6 bg-current transition-all duration-300 origin-center",
                menuOpen && "-rotate-45 -translate-y-[7px]"
              )}
            />
          </button>

        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex flex-col justify-center items-center bg-background transition-all duration-500 md:hidden overflow-hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Subtle warm gradient wash */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 30%, rgba(223,155,77,0.07) 0%, transparent 65%)" }} />

        {/* Gold horizontal rule top */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-px bg-accent/40" />

        <nav className="flex flex-col items-center gap-8">
          {links.map(({ label, href }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="relative group flex flex-col items-center"
            >
              <span className="font-display text-[2.8rem] text-foreground group-hover:text-accent transition-colors duration-300 leading-none">
                {label}
              </span>
              <span className="mt-1.5 block text-[8px] tracking-[0.55em] uppercase text-accent/40 font-sans">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>

        {/* Gold divider */}
        <div className="my-10 flex items-center gap-4 w-28">
          <div className="flex-1 h-px bg-accent/20" />
          <div className="w-1 h-1 rounded-full bg-accent/40" />
          <div className="flex-1 h-px bg-accent/20" />
        </div>

        <Link
          href="/#contact"
          onClick={() => setMenuOpen(false)}
          className="text-[9px] tracking-[0.38em] uppercase border border-foreground/20 px-10 py-3.5 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-sans"
        >
          Enquire
        </Link>

        {/* Bottom signature */}
        <div className="absolute bottom-10 flex flex-col items-center gap-1.5">
          <div className="w-5 h-px bg-accent/30" />
          <span className="text-[8px] tracking-[0.5em] uppercase text-foreground/25 font-sans mt-1">Hatch Group</span>
        </div>
      </div>
    </>
  );
}
