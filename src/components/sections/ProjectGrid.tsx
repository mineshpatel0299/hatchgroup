"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { PROJECTS } from "@/data/projects";

const PREVIEW_COUNT = 5;

function MobileEditorialRoll() {
  return (
    <div className="md:hidden px-5 pt-2 pb-16">
      <div className="flex flex-col gap-20">
        {PROJECTS.slice(0, PREVIEW_COUNT).map((p, i) => {
          const isRight = i % 2 === 1;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -top-6 font-display font-light text-foreground/[0.06] leading-none select-none pointer-events-none"
                style={{
                  fontSize: "clamp(6rem, 30vw, 9rem)",
                  right: isRight ? "auto" : "-0.1em",
                  left: isRight ? "-0.1em" : "auto",
                }}
              >
                {p.id}
              </span>

              <div
                className={`relative overflow-hidden rounded-t-[2rem] rounded-b-xl shadow-[0_28px_60px_-24px_rgba(140,111,63,0.42)] ${
                  isRight ? "ml-6" : "mr-6"
                }`}
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(248,239,217,0.7) 0%, transparent 100%)",
                  }}
                />
                <span className="absolute bottom-3 right-4 font-sans text-[8px] tracking-[0.4em] uppercase text-foreground/45">
                  {p.year}
                </span>
              </div>

              <div className={`mt-5 ${isRight ? "pr-6" : "pl-2"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-sans text-[8px] tracking-[0.5em] uppercase text-accent">
                    {p.category}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(169,140,95,0.45), transparent)",
                    }}
                  />
                </div>
                <h3
                  className="font-display font-light text-foreground leading-[1.1] mb-2"
                  style={{ fontSize: "clamp(1.55rem, 6.5vw, 2rem)" }}
                >
                  {p.title}
                </h3>
                <p className="text-foreground/45 font-light text-[0.8rem] leading-[1.85]">
                  {p.description}
                </p>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-3 mt-4 text-[8px] tracking-[0.45em] uppercase text-accent hover:text-foreground transition-colors"
                >
                  View Project
                  <span className="w-5 h-px bg-accent/50" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-14">
        <Link
          href="/project"
          className="inline-flex items-center gap-3 px-8 py-3.5 border border-accent/40 text-[9px] tracking-[0.45em] uppercase text-accent hover:bg-accent hover:text-ivory transition-all duration-300"
        >
          View All Projects
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const py = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative z-20 py-24 md:py-36 overflow-hidden luxe-ivory"
    >
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      <div
        className="absolute pointer-events-none"
        style={{
          top: "-12%", left: "50%", transform: "translateX(-50%)",
          width: "70vw", height: "40vh",
          background: "radial-gradient(ellipse at center, rgba(255,253,244,0.8) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[9px] md:text-[10px] tracking-[0.55em] uppercase text-accent font-medium mb-4">
              Selected Portfolio
            </p>
            <h2
              className="font-display font-light text-foreground leading-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
            >
              The <span className="luxe-gradient-text">Catalogue</span>
            </h2>
          </div>
          <span className="hidden md:block text-foreground/35 text-[9px] tracking-[0.35em] uppercase pb-2">
            Hover to preview
          </span>
        </div>

        {/* Desktop: the index list */}
        <div className="hidden md:block border-t border-foreground/10" onMouseLeave={() => setActive(null)}>
          {PROJECTS.slice(0, PREVIEW_COUNT).map((p, i) => {
            const isActive = active === i;
            return (
              <Link
                key={p.id}
                href={p.href}
                onMouseEnter={() => setActive(i)}
                data-cursor-interact
                className="group relative grid grid-cols-12 items-center gap-6 py-7 lg:py-8 border-b border-foreground/10 transition-colors duration-500 w-full text-left"
              >
                <div
                  className={`absolute inset-0 -mx-6 transition-opacity duration-500 pointer-events-none ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ background: "linear-gradient(to right, rgba(255,253,244,0.65), rgba(226,196,136,0.25))" }}
                />

                <span
                  className={`relative col-span-1 font-display text-sm tracking-[0.25em] transition-colors duration-400 ${
                    isActive ? "text-accent" : "text-foreground/35"
                  }`}
                >
                  {p.id}
                </span>

                <h3
                  className={`relative col-span-5 font-display font-light leading-none whitespace-nowrap transition-all duration-500 ${
                    isActive ? "translate-x-4 text-foreground" : "translate-x-0 text-foreground/75"
                  }`}
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)" }}
                >
                  {p.title}
                </h3>

                <span className="relative col-span-2 text-[9px] tracking-[0.4em] uppercase text-foreground/40">
                  {p.category}
                </span>

                <span className="relative col-span-1 text-[10px] tracking-[0.25em] text-foreground/35 font-light">
                  {p.year}
                </span>

                <span
                  className={`relative col-span-3 justify-self-end flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-500 ${
                    isActive ? "opacity-100 translate-x-0 text-accent" : "opacity-0 -translate-x-3 text-accent"
                  }`}
                >
                  View Project
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}

          {/* View All button */}
          <div className="flex justify-center mt-14">
            <Link
              href="/project"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-accent/40 text-[9px] tracking-[0.45em] uppercase text-accent hover:bg-accent hover:text-ivory transition-all duration-300"
            >
              View All Projects
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Cursor-following preview */}
          <motion.div
            style={{ x: px, y: py }}
            className="absolute top-0 left-0 z-20 pointer-events-none"
          >
            <div className="absolute -translate-x-1/2 translate-y-[-110%] w-[19vw] aspect-3/4">
              <AnimatePresence>
                {active !== null && (
                  <motion.div
                    key={PROJECTS[active].id}
                    initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-ivory p-2 rounded-t-full shadow-[0_50px_100px_-40px_rgba(140,111,63,0.65)]"
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-t-full">
                      <Image
                        src={PROJECTS[active].image}
                        alt={PROJECTS[active].title}
                        fill
                        className="object-cover"
                        sizes="20vw"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Mobile: staggered editorial roll */}
        <MobileEditorialRoll />
      </div>
    </section>
  );
}
