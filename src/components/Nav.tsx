"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Services",   href: "#services"   },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [overDark, setOverDark]   = useState(true);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hero outer section is 400vh; sticky video is visible for the first ~3 viewports of scroll
      const heroVideoEnd = window.innerHeight * 3;
      setScrolled(y > 60);
      setOverDark(y < heroVideoEnd);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overDark;   // shorthand — true while over dark video

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
              src="https://res.cloudinary.com/de4pazo51/image/upload/v1781195359/HATCH_DARK_LOGO-01_1_1_osknv0.png"
              alt="Hatch Group"
              fill
              className={clsx(
                "object-contain object-left transition-all duration-500",
                light ? "brightness-0 invert" : "brightness-0"
              )}
              priority
              unoptimized
            />
          </a>

          {/* Desktop links — centred */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  data-cursor-interact
                  className={clsx(
                    "group relative text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300",
                    light ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {label}
                  <span
                    className={clsx(
                      "absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-in-out",
                      light ? "bg-white/60" : "bg-accent"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            data-cursor-interact
            className={clsx(
              "hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-medium px-5 py-2.5 border transition-all duration-500",
              light
                ? "border-white/30 text-white hover:bg-white hover:text-foreground"
                : "border-foreground/25 text-foreground hover:bg-foreground hover:text-background"
            )}
          >
            Enquire
          </a>

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
          "fixed inset-0 z-40 flex flex-col justify-center items-center gap-10 bg-background transition-all duration-500 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-5xl text-foreground hover:text-accent transition-colors duration-300"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-4 text-[10px] tracking-[0.3em] uppercase border border-foreground/30 px-8 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Enquire
        </a>
      </div>
    </>
  );
}
