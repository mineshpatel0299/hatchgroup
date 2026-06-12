"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const RESIDENCES = [
  {
    id: "01",
    title: "The Artisan House",
    location: "Mumbai · 2024",
    description:
      "Curved walls in Venetian plaster, a statement arched fireplace in aged travertine, bespoke seating in deep cognac leather.",
    image: "/images/featured-project.png",
  },
  {
    id: "02",
    title: "Villa Serena",
    location: "New Delhi · 2023",
    description:
      "A dialogue between Indian craft and modern restraint — hand-knotted silk, fluted oak, and light that moves like water.",
    image: "/images/residential-thumb.png",
  },
  {
    id: "03",
    title: "The Pavilion Suite",
    location: "Dubai · 2023",
    description:
      "A hospitality landmark composed in champagne tones — every sightline curated, every material whispering quality.",
    image: "/images/hospitality-thumb.png",
  },
];

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });

  // The elevator: the image column glides upward inside the fixed arch frame
  const stackY = useTransform(scrollYProgress, [0.12, 0.88], ["0%", `-${((RESIDENCES.length - 1) / RESIDENCES.length) * 100}%`]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const t = Math.min(0.999, Math.max(0, (p - 0.12) / 0.76));
    setActive(Math.min(RESIDENCES.length - 1, Math.floor(t * RESIDENCES.length + 0.5)));
  });

  const current = RESIDENCES[active];

  return (
    <section ref={sectionRef} className="relative h-[350vh] luxe-canvas">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "5%", left: "50%", transform: "translateX(-50%)",
            width: "60vw", height: "60vh",
            background: "radial-gradient(ellipse at center, rgba(255,253,244,0.85) 0%, transparent 60%)",
          }}
        />

        {/* Ghost numeral — swaps with the active residence */}
        <AnimatePresence mode="wait">
          <motion.span
            key={current.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[2vw] bottom-[4vh] font-display font-light text-accent/15 leading-none select-none pointer-events-none hidden sm:block"
            style={{ fontSize: "clamp(9rem, 22vw, 20rem)" }}
            aria-hidden="true"
          >
            {current.id}
          </motion.span>
        </AnimatePresence>

        {/* Header */}
        <div className="relative z-10 text-center mb-4 md:mb-10 px-6">
          <span className="block text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-2 md:mb-4">
            Signature Residences
          </span>
          <h2
            className="font-display font-light text-foreground leading-[1.06]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3.6rem)", letterSpacing: "-0.015em" }}
          >
            The <span className="luxe-gradient-text">Vernissage</span>
          </h2>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center">

          {/* ── Left: index rail ── */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-7">
            {RESIDENCES.map((r, i) => {
              const isActive = i === active;
              return (
                <div key={r.id} className="flex items-center gap-4">
                  <span
                    className={`font-display text-sm tracking-[0.25em] transition-colors duration-500 ${
                      isActive ? "text-accent" : "text-foreground/30"
                    }`}
                  >
                    {r.id}
                  </span>
                  <motion.div
                    animate={{ width: isActive ? 44 : 16, opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="h-px bg-accent"
                  />
                  <span
                    className={`font-display font-light text-lg whitespace-nowrap transition-all duration-500 ${
                      isActive ? "text-foreground" : "text-foreground/30"
                    }`}
                  >
                    {r.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* ── Centre: the fixed arch frame, images gliding inside ── */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[52vw] sm:w-[44vw] lg:w-[26vw]">
              {/* Gold echo frame */}
              <div className="absolute -inset-3 md:-inset-5 border border-accent/35 rounded-t-full pointer-events-none" />

              <div className="relative w-full aspect-[3/4.2] max-h-[34vh] md:max-h-[62vh] bg-ivory p-2 md:p-3.5 rounded-t-full shadow-[0_60px_120px_-50px_rgba(140,111,63,0.6)] overflow-hidden">
                <div className="relative w-full h-full overflow-hidden rounded-t-full">
                  {/* The elevator column */}
                  <motion.div
                    style={{ y: stackY, height: `${RESIDENCES.length * 100}%` }}
                    className="absolute inset-x-0 top-0"
                  >
                    {RESIDENCES.map((r) => (
                      <div key={r.id} className="relative w-full" style={{ height: `${100 / RESIDENCES.length}%` }}>
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 30vw, 80vw"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Plaque under the frame */}
              <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 bg-ivory px-5 py-2 shadow-[0_15px_30px_-15px_rgba(140,111,63,0.5)]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45 }}
                    className="block text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-foreground/55 whitespace-nowrap"
                  >
                    {current.location}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Right: editorial caption, swapping ── */}
          <div className="lg:col-span-4 text-center lg:text-left mt-12 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <span className="text-accent font-display text-base tracking-[0.3em]">{current.id}</span>
                  <div className="w-12 h-px bg-accent/50" />
                  <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-foreground/45">
                    {current.location}
                  </span>
                </div>
                <h3
                  className="font-display font-light text-foreground leading-[1.08] mb-3 md:mb-5"
                  style={{ fontSize: "clamp(1.4rem, 3.4vw, 3rem)" }}
                >
                  {current.title}
                </h3>
                <p className="text-foreground/55 font-light text-[0.8rem] md:text-[0.95rem] leading-[1.75] md:leading-[1.9] max-w-xs md:max-w-sm mx-auto lg:mx-0 mb-4 md:mb-7">
                  {current.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.42em] uppercase text-accent hover:text-foreground transition-colors duration-500 group"
                  data-cursor-interact
                >
                  View Case Study
                  <span className="w-8 h-px bg-accent/50 group-hover:w-12 group-hover:bg-foreground/50 transition-all duration-500" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
