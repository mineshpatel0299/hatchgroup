"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

const PROJECTS = [
  { id: "01", title: "Minimalist Living",  category: "Residential", year: "2024", image: "/images/featured-project.png",    description: "A study in restraint — where every surface breathes and light becomes the primary material." },
  { id: "02", title: "Bespoke Kitchen",    category: "Residential", year: "2024", image: "/images/residential-thumb.png",   description: "Crafted joinery, honed stone, and considered proportion define this culinary atelier." },
  { id: "03", title: "Luxury Suite",       category: "Hospitality", year: "2023", image: "/images/hospitality-thumb.png",   description: "Cinematic layering of texture and tone — a suite that transcends the expected." },
  { id: "04", title: "Corporate Lobby",    category: "Commercial",  year: "2023", image: "/images/commercial-thumb.png",    description: "Brand identity expressed through space — arrival as impression, architecture as identity." },
  { id: "05", title: "Formal Dining",      category: "Residential", year: "2022", image: "/images/materials-bg.png",        description: "Ritual elevated — a dining room conceived for ceremony, conversation, and candlelight." },
  { id: "06", title: "Penthouse Terrace",  category: "Residential", year: "2022", image: "/images/turnkey-thumb.png",       description: "Sky, stone, and copper — an outdoor living room thirty floors above the city." },
];

function MobileLookbook() {
  const [active, setActive] = useState(0);
  const containerRef  = useRef<HTMLDivElement>(null);
  const activeRef     = useRef(0);   // shadow ref so the interval always has the latest value
  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep shadow ref in sync
  useEffect(() => { activeRef.current = active; }, [active]);

  // IntersectionObserver — track which card is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = Array.from(container.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(cards.indexOf(e.target as HTMLElement));
        });
      },
      { root: container, threshold: 0.55 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 3.5 s; reset timer on manual scroll
  const scheduleNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;
      const cards = Array.from(container.children) as HTMLElement[];
      const next = (activeRef.current + 1) % cards.length;
      cards[next].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 3500);
  };

  useEffect(() => {
    scheduleNext();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="md:hidden relative">
      {/* Scroll-snap lookbook */}
      <div
        ref={containerRef}
        onScroll={scheduleNext}
        className="overflow-y-auto snap-y snap-mandatory"
        style={{ height: "82vh", scrollbarWidth: "none" }}
      >
        {PROJECTS.map((p, i) => (
          <div key={p.id} className="snap-start h-full p-3">
          <div className="relative w-full h-full overflow-hidden rounded-t-[2.5rem] rounded-b-2xl shadow-[0_24px_50px_-20px_rgba(140,111,63,0.45)]">
            <Image src={p.image} alt={p.title} fill className="object-cover" sizes="100vw" />

            {/* Scrims */}
            <div className="absolute inset-x-0 top-0 h-28 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(14,20,16,0.5) 0%, transparent 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(14,20,16,0.82) 0%, transparent 100%)" }} />

            {/* Counter */}
            <div className="absolute top-6 left-5 flex items-center gap-3">
              <span className="font-display text-[#D6BD94] text-xs tracking-[0.35em]">{p.id}</span>
              <div className="w-8 h-px bg-white/25" />
              <span className="font-sans text-white/40 text-[8px] tracking-[0.4em] uppercase">
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom text */}
            <div className="absolute bottom-0 inset-x-0 px-5 pb-8">
              <span className="block text-[#D6BD94] text-[8px] tracking-[0.5em] uppercase mb-2">
                {p.category} · {p.year}
              </span>
              <div className="h-px mb-4 w-10"
                style={{ background: "linear-gradient(to right, rgba(214,189,148,0.7), transparent)" }} />
              <h3
                className="font-display font-light text-white leading-[1.1] mb-3"
                style={{ fontSize: "clamp(1.7rem, 7vw, 2.4rem)" }}
              >
                {p.title}
              </h3>
              <p className="text-white/50 font-light text-[0.78rem] leading-[1.8] max-w-[28ch]">
                {p.description}
              </p>
              <a href="#" className="inline-flex items-center gap-3 mt-5 text-[8px] tracking-[0.45em] uppercase text-[#D6BD94]">
                View Project
                <span className="w-6 h-px bg-[#D6BD94]/50" />
              </a>
            </div>

            {/* Swipe hint on first card */}
            {i === 0 && (
              <div className="absolute bottom-8 right-5 flex flex-col items-center gap-1.5 opacity-50">
                <div className="w-px h-8 bg-linear-to-b from-white/60 to-transparent" />
                <span className="text-white text-[7px] tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl" }}>swipe</span>
              </div>
            )}
          </div>
          </div>
        ))}
      </div>

      {/* Side dot indicators */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {PROJECTS.map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: i === active ? 20 : 5, opacity: i === active ? 1 : 0.3 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-0.5 rounded-full bg-white"
          />
        ))}
      </div>

      {/* View all */}
      <div className="flex justify-center pt-8 pb-2">
        <button className="text-[9px] tracking-[0.45em] uppercase font-medium text-accent inline-flex items-center gap-4 group">
          View All Works
          <span className="w-7 h-px bg-accent/50 group-hover:w-11 transition-all duration-500" />
        </button>
      </div>
    </div>
  );
}

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

        {/* ════ Mobile: full-bleed scroll-snap lookbook ════ */}
        <MobileLookbook />
      </div>
    </section>
  );
}
