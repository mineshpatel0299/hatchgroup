"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

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
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(SERVICES.length - 1, Math.max(0, Math.floor(p * SERVICES.length)));
    setActive(idx);
  });

  return (
    <section ref={sectionRef} className="relative md:h-[400vh] luxe-canvas-deep">

      {/* ════ Desktop: the atelier doors ════ */}
      <div className="hidden md:flex sticky top-0 h-screen overflow-hidden flex-col justify-center">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: "70vw", height: "50vh",
            background: "radial-gradient(ellipse at center, rgba(255,253,244,0.8) 0%, transparent 60%)",
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
                  animate={{ flexGrow: isActive ? 4.2 : 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative basis-0 min-w-0 overflow-hidden rounded-t-full cursor-pointer group"
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
                    style={{ background: "linear-gradient(to top, rgba(255,253,244,0.92) 0%, transparent 38%)" }}
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

      {/* ════ Mobile: vertical editorial list ════ */}
      <div className="md:hidden px-5 py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="block text-[9px] tracking-[0.5em] uppercase text-accent font-medium mb-4">What We Do</span>
          <h2 className="font-display font-light text-4xl text-foreground leading-tight">
            Four doors of the <span className="luxe-gradient-text">maison</span>
          </h2>
        </div>

        <div className="flex flex-col gap-14">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? "ml-8" : "mr-8"}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-full shadow-[0_30px_60px_-30px_rgba(140,111,63,0.5)]">
                <Image src={s.image} alt={s.title} fill className="object-cover" sizes="90vw" />
                <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-ivory/85 text-foreground/70 font-display text-xs tracking-[0.3em] px-3 py-1">
                  {s.id}
                </span>
              </div>
              <h3 className="font-display font-light text-3xl text-foreground mt-5 mb-2">{s.title}</h3>
              <p className="text-foreground/50 font-light text-sm leading-[1.8]">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
