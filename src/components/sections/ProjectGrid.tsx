"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

const PROJECTS = [
  { id: "01", title: "Minimalist Living",  category: "Residential", year: "2024", image: "/images/featured-project.png" },
  { id: "02", title: "Bespoke Kitchen",    category: "Residential", year: "2024", image: "/images/residential-thumb.png" },
  { id: "03", title: "Luxury Suite",       category: "Hospitality", year: "2023", image: "/images/hospitality-thumb.png" },
  { id: "04", title: "Corporate Lobby",    category: "Commercial",  year: "2023", image: "/images/commercial-thumb.png" },
  { id: "05", title: "Formal Dining",      category: "Residential", year: "2022", image: "/images/materials-bg.png" },
  { id: "06", title: "Penthouse Terrace",  category: "Residential", year: "2022", image: "/images/turnkey-thumb.png" },
];

export default function ProjectGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Cursor-following preview frame — sprung for a silky drift
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
      className="relative py-24 md:py-36 overflow-hidden luxe-canvas-deep"
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

        {/* ════ Desktop: the index list ════ */}
        <div className="hidden md:block border-t border-foreground/10" onMouseLeave={() => setActive(null)}>
          {PROJECTS.map((p, i) => {
            const isActive = active === i;
            return (
              <a
                key={p.id}
                href="#"
                onMouseEnter={() => setActive(i)}
                data-cursor-interact
                className="group relative grid grid-cols-12 items-center gap-6 py-7 lg:py-8 border-b border-foreground/10 transition-colors duration-500"
              >
                {/* Gold wash sweeps in behind the active row */}
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
                  className={`relative col-span-6 font-display font-light leading-none transition-all duration-500 ${
                    isActive ? "translate-x-4 text-foreground" : "translate-x-0 text-foreground/75"
                  }`}
                  style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
                >
                  {p.title}
                </h3>

                <span className="relative col-span-3 text-[9px] tracking-[0.4em] uppercase text-foreground/40">
                  {p.category}
                </span>

                <span className="relative col-span-1 text-[10px] tracking-[0.25em] text-foreground/35 font-light">
                  {p.year}
                </span>

                <span
                  className={`relative col-span-1 justify-self-end text-accent text-lg transition-all duration-500 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                  }`}
                >
                  →
                </span>
              </a>
            );
          })}

          {/* Cursor-following preview — ivory-matted arch frame */}
          <motion.div
            style={{ x: px, y: py }}
            className="absolute top-0 left-0 z-20 pointer-events-none"
          >
            <div className="absolute -translate-x-1/2 -translate-y-[110%] w-[19vw] aspect-[3/4]">
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

        {/* View all */}
        <div className="hidden md:flex justify-center mt-14">
          <button
            className="text-[10px] tracking-[0.4em] uppercase font-medium text-accent hover:text-foreground transition-colors duration-300 inline-flex items-center gap-4 group"
            data-cursor-interact
          >
            View All Works
            <span className="w-8 h-px bg-accent/50 group-hover:w-12 group-hover:bg-foreground/50 transition-all duration-500" />
          </button>
        </div>

        {/* ════ Mobile: arch-card collage ════ */}
        <div className="md:hidden flex flex-col gap-12">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.id}
              href="#"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? "ml-10" : "mr-10"}
            >
              <div className={`relative w-full aspect-[3/4] overflow-hidden bg-ivory p-2 shadow-[0_30px_60px_-30px_rgba(140,111,63,0.5)] ${i % 2 === 0 ? "rounded-t-full" : "rounded-sm"}`}>
                <div className={`relative w-full h-full overflow-hidden ${i % 2 === 0 ? "rounded-t-full" : ""}`}>
                  <Image src={p.image} alt={p.title} fill className="object-cover" sizes="90vw" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <h3 className="font-display font-light text-2xl text-foreground leading-tight">{p.title}</h3>
                  <span className="mt-1 block text-[8px] tracking-[0.4em] uppercase text-foreground/40">
                    {p.category} · {p.year}
                  </span>
                </div>
                <span className="text-accent font-display text-sm tracking-[0.25em]">{p.id}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
