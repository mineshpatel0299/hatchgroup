"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Home", href: "/" },
    {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#our-story" },
      { label: "The Approach", href: "/about#the-approach" },
      { label: "Values", href: "/about#values" },
      { label: "Vision & Mission", href: "/about#vision-mission" },
      { label: "Our Team", href: "/about#our-team" },
    ],
  },
  { label: "Projects", href: "/project" },

];

function NavDropdown({
  label,
  href,
  items,
  isActive,
  useDarkText,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  isActive: boolean;
  useDarkText: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <li className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Link
        href={href}
        data-cursor-interact
        className={clsx(
          "group relative text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 flex items-center gap-1.5",
          useDarkText ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
          isActive && (useDarkText ? "text-foreground" : "text-white")
        )}
      >
        {label}
        <svg
          className={clsx(
            "w-2.5 h-2.5 transition-transform duration-300",
            open && "rotate-180",
            useDarkText ? "text-accent/60" : "text-white/50"
          )}
          fill="none"
          viewBox="0 0 10 10"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M2.5 4L5 6.5L7.5 4" />
        </svg>
        <span
          className={clsx(
            "absolute -bottom-0.5 left-0 h-px transition-all duration-500 ease-in-out",
            isActive ? "w-full" : "w-0 group-hover:w-full",
            useDarkText ? "bg-accent" : "bg-white/60"
          )}
        />
      </Link>

      {/* Dropdown panel */}
      <div
        className={clsx(
          "absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div
          className="relative min-w-[180px] border border-accent/20 backdrop-blur-xl py-3 px-1"
          style={{
            background: useDarkText
              ? "linear-gradient(165deg, rgba(243,232,222,0.97) 0%, rgba(239,227,204,0.97) 100%)"
              : "linear-gradient(165deg, rgba(0,37,31,0.95) 0%, rgba(0,47,34,0.95) 100%)",
          }}
        >
          {/* Gold accent line at top */}
          <div className="absolute top-0 left-4 right-4 h-px luxe-rule" />

          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor-interact
              onClick={() => setOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-5 py-2.5 text-[9px] tracking-[0.3em] uppercase font-medium transition-all duration-300 group/item",
                useDarkText
                  ? "text-foreground/55 hover:text-foreground hover:bg-accent/8"
                  : "text-white/55 hover:text-white hover:bg-white/8"
              )}
            >
              <span
                className={clsx(
                  "w-0 h-px transition-all duration-300 group-hover/item:w-4",
                  useDarkText ? "bg-accent/60" : "bg-accent/60"
                )}
              />
              {item.label}
            </Link>
          ))}

          {/* Bottom gold line */}
          <div className="absolute bottom-0 left-4 right-4 h-px luxe-rule" />
        </div>
      </div>
    </li>
  );
}

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkHero = ["/", "/project", "/enquire"].includes(pathname);
  const isAlwaysDarkPage = ["/project", "/enquire"].includes(pathname);
  
  // If we are on an always-dark page, the background is always dark, so text is always light (useDarkText = false).
  // Otherwise, use dark text if scrolled or if it's not a dark hero.
  const light = isDarkHero && !scrolled;
  const useDarkText = isAlwaysDarkPage ? false : (scrolled || !light);
  
  const isProjectDetail = pathname.startsWith("/project/") && pathname !== "/project";



  if (isProjectDetail) {
    return (
      <>
        <nav className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="flex w-full md:w-[45vw] p-8 md:p-16 justify-between items-start text-[10px] tracking-widest uppercase font-bold">
            <div className="flex items-center gap-8">
              <Link href="/project" className="pointer-events-auto hover:text-accent transition-colors flex items-center gap-2 group">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </Link>
              <Link href="/" className="pointer-events-auto hover:text-accent transition-colors hidden md:block">
                HATCH GROUP™
              </Link>
            </div>
          </div>
        </nav>
        {/* Do not render the menu drawer here since there is no toggle anymore */}
      </>
    );
  }

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
          (scrolled && !isAlwaysDarkPage)
            ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-screen-xl px-6 md:px-12 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a href="/" className="relative flex-shrink-0 w-40 md:w-55 h-12 md:h-14" data-cursor-interact>
            <Image
              src={
                useDarkText
                  ? "https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6023,x_988,y_1660/HATCH_DARK_LOGO-02_oi3nyq.png"
                  : "https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6125,x_908,y_1653/HATCH_LOGO_GOLD-02_1_arrhel.png"
              }
              alt="Hatch Group"
              fill
              className="object-contain object-left transition-all duration-500"
              priority
              unoptimized
            />
          </a>

          {/* Desktop links — centred */}
          <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map(({ label, href, children }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : href.startsWith("/") && !href.includes("#")
                  ? pathname === href
                  : false;

              if (!children) {
                return (
                  <li key={label}>
                    <Link
                      href={href}
                      data-cursor-interact
                      className={clsx(
                        "group relative text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300",
                        useDarkText ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white",
                        isActive && (useDarkText ? "text-foreground" : "text-white")
                      )}
                    >
                      {label}
                      <span
                        className={clsx(
                          "absolute -bottom-0.5 left-0 h-px transition-all duration-500 ease-in-out",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                          useDarkText ? "bg-accent" : "bg-white/60"
                        )}
                      />
                    </Link>
                  </li>
                );
              }

              return (
                <NavDropdown
                  key={label}
                  label={label}
                  href={href}
                  items={children}
                  isActive={isActive}
                  useDarkText={useDarkText}
                />
              );
            })}
          </ul>

          {/* Desktop CTA */}
          {pathname !== "/enquire" && (
            <Link
              href="/enquire"
              data-cursor-interact
              className={clsx(
                "hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-medium px-5 py-2.5 border transition-all duration-500",
                useDarkText
                  ? "border-foreground/25 text-foreground hover:bg-foreground hover:text-background"
                  : "border-white/30 text-white hover:bg-white hover:text-foreground"
              )}
            >
              Enquire
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            data-cursor-interact
            aria-label="Toggle menu"
            className={clsx(
              "md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 transition-colors duration-300",
              useDarkText ? "text-foreground" : "text-white"
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
            <div key={label} className="flex flex-col items-center">
              <Link
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
            </div>
          ))}
        </nav>

        {/* Gold divider */}
        <div className="my-10 flex items-center gap-4 w-28">
          <div className="flex-1 h-px bg-accent/20" />
          <div className="w-1 h-1 rounded-full bg-accent/40" />
          <div className="flex-1 h-px bg-accent/20" />
        </div>

        <Link
          href="/enquire"
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
