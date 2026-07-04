"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { findProjectByCategory } from "@/data/projects";

const SERVICES = [
  {
    id: "01",
    title: "Residential",
    description: "Bespoke luxury homes designed for unparalleled living — every space curated to reflect personal elegance.",
    image: "/images/residential-thumb.png",
  },
  {
    id: "02",
    title: "Commercial",
    description: "Premium workspaces that inspire and elevate brand identity, fostering productivity and lasting impressions.",
    image: "/images/commercial-thumb.png",
  },
  {
    id: "03",
    title: "Hospitality",
    description: "Cinematic environments for 5-star hotels and resorts — immersive experiences that define the essence of luxury.",
    image: "/images/hospitality-thumb.png",
  },
  {
    id: "04",
    title: "Turnkey",
    description: "End-to-end execution with uncompromising material quality — from concept to completion, seamlessly.",
    image: "/images/turnkey-thumb.png",
  },
].map((s) => ({
  ...s,
  href: findProjectByCategory(s.title)?.href ?? "/project",
}));

function MobileCarousel() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track active card via IntersectionObserver on each slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(slides.indexOf(e.target as HTMLElement));
          }
        });
      },
      { root: track, threshold: 0.55 }
    );

    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="md:hidden pt-16 pb-14 luxe-emerald overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10 px-6"
      >
        <span className="block text-accent text-[9px] tracking-[0.5em] uppercase font-medium mb-3">
          What We Do
        </span>
        <h2 className="font-display font-light text-foreground leading-tight"
          style={{ fontSize: "clamp(1.9rem, 7vw, 2.6rem)" }}
        >
          Four doors of the{" "}
          <span className="luxe-gradient-text">maison</span>
        </h2>
      </motion.div>

      {/* Swipe track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto gap-4 px-[8vw] snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex-none w-[78vw] snap-center"
          >
            <Link href={s.href} className="block" data-cursor-interact>
              {/* Arch image */}
              <div className="relative w-full aspect-3/4 overflow-hidden rounded-t-full shadow-[0_28px_55px_-20px_rgba(140,111,63,0.45)]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="80vw"
                />
                {/* Ivory gradient at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-28"
                  style={{ background: "linear-gradient(to top, rgba(248,239,217,0.9) 0%, transparent 100%)" }}
                />
                {/* Number badge */}
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-accent text-sm tracking-[0.35em]">
                  {s.id}
                </span>
              </div>

              {/* Text */}
              <div className="pt-5 px-1">
                <h3
                  className="font-display font-light text-foreground mb-2"
                  style={{ fontSize: "clamp(1.5rem, 6vw, 2rem)" }}
                >
                  {s.title}
                </h3>
                <div
                  className="h-px mb-3"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(169,140,95,0.6), transparent)",
                  }}
                />
                <p className="text-foreground/50 font-light text-[0.85rem] leading-[1.85]">
                  {s.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-8">
        {SERVICES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width:   i === active ? 22 : 6,
              opacity: i === active ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-0.75 rounded-full bg-accent"
          />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  return (
    <section className="relative z-20 luxe-emerald">

      {/* ════ Desktop: the atelier doors ════ */}
      <div className="hidden md:flex h-screen overflow-hidden flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />

        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: "70vw", height: "50vh",
            background: "radial-gradient(ellipse at center, rgba(0,90,65,0.35) 0%, transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-12 mb-10 flex items-end justify-between">
          <div>
            <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-4">
              What We Do
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.015em" }}
            >
              Four doors of the <span className="luxe-gradient-text">maison</span>
            </h2>
          </div>
          {/* Dial */}
          <div className="flex items-center gap-3 pb-2">
            <span className="font-display text-3xl luxe-gradient-text leading-none w-12 text-right">
              {SERVICES[active].id}
            </span>
            <div className="w-14 h-px bg-foreground/15 relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                animate={{ width: `${((active + 1) / SERVICES.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-foreground/35 text-xs tracking-[0.2em]">04</span>
          </div>
        </div>

        {/* The doors */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-12">
          <div className="flex gap-4 h-[58vh]">
            {SERVICES.map((s, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={s.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => router.push(s.href)}
                  animate={{ flexGrow: isActive ? 4.2 : 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative basis-0 min-w-0 overflow-hidden rounded-t-full cursor-pointer group"
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(s.href);
                  }}
                  data-cursor-interact
                >
                  {/* Image */}
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className={`object-cover transition-all duration-[1.2s] ease-out ${
                      isActive ? "scale-105 saturate-100" : "scale-115 saturate-[0.55]"
                    }`}
                    sizes="60vw"
                  />
                  {/* Gold wash on closed doors so they read as gilded spines */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                    style={{ background: "linear-gradient(to top, rgba(140,111,63,0.55) 0%, rgba(231,207,158,0.35) 100%)" }}
                  />
                  {/* Soft legibility wash on the open door */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: "linear-gradient(to top, rgba(0,30,22,0.75) 0%, transparent 38%)" }}
                  />

                  {/* Closed door: vertical title */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-end pb-10 transition-opacity duration-500 ${
                      isActive ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span
                      className="font-display font-light text-ivory text-2xl tracking-[0.1em] whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {s.title}
                    </span>
                    <span className="mt-6 text-ivory/80 text-[10px] tracking-[0.3em]">{s.id}</span>
                  </div>

                  {/* Open door: editorial caption on ivory wash */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 inset-x-0 p-8 lg:p-10"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-accent font-display text-sm tracking-[0.3em]">{s.id}</span>
                          <div className="w-10 h-px bg-accent/50" />
                        </div>
                        <div className="flex items-end justify-between gap-8">
                          <div>
                            <h3 className="font-display font-light text-3xl lg:text-4xl text-foreground mb-2 whitespace-nowrap">
                              {s.title}
                            </h3>
                            <p className="text-foreground/55 font-light text-sm leading-[1.8] max-w-md">
                              {s.description}
                            </p>
                          </div>
                          <span className="shrink-0 mb-1 text-accent text-xl">→</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════ Mobile: horizontal snap carousel ════ */}
      <MobileCarousel />
    </section>
  );
}
