"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const TESTIMONIALS = [
  {
    quote:
      "Hatch Group transformed our penthouse into something that transcends interior design. Every material, every proportion, every shaft of light feels intentional. It is the most extraordinary space we have ever inhabited.",
    name: "Priya & Rohan Mehta",
    title: "Private Residence · Mumbai",
    initials: "PM",
  },
  {
    quote:
      "Working with Hatch Group was an exercise in complete trust — and they rewarded it beyond measure. The hotel lobbies they delivered have become landmark destinations in their own right.",
    name: "Sebastian Langer",
    title: "Managing Director · Langer Hospitality Group",
    initials: "SL",
  },
  {
    quote:
      "Their command of scale is unrivalled. What they created for our headquarters communicates authority without coldness, warmth without informality. Precisely what we needed.",
    name: "Aisha Al-Rashid",
    title: "Chief Executive · Meridian Capital",
    initials: "AR",
  },
  {
    quote:
      "I have collaborated with the finest studios across Europe and Asia. Hatch Group stands apart — not merely for their craft, but for the depth of listening they bring to every brief.",
    name: "François Beaumont",
    title: "Collector & Art Patron · Paris",
    initials: "FB",
  },
];

const N = TESTIMONIALS.length;
const AUTOPLAY = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (d: 1 | -1) => {
      setDir(d);
      setActive((a) => (a + d + N) % N);
    },
    []
  );

  const jumpTo = useCallback(
    (i: number, currentActive: number) => {
      setDir(i > currentActive ? 1 : -1);
      setActive(i);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), AUTOPLAY);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  const slide = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 48 : -48, filter: "blur(6px)" }),
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -48 : 48, filter: "blur(6px)" }),
  };

  const t = TESTIMONIALS[active];

  return (
    <section
      className="relative overflow-hidden luxe-emerald"
      style={{ paddingTop: "clamp(5rem, 12vw, 9rem)", paddingBottom: "clamp(5rem, 12vw, 9rem)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      {/* Ambient glow top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", left: "-10%", width: "55vw", height: "55vw",
          background: "radial-gradient(ellipse at center, rgba(0,100,72,0.35) 0%, transparent 65%)",
        }}
      />
      {/* Ambient glow bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%", right: "-10%", width: "45vw", height: "45vw",
          background: "radial-gradient(ellipse at center, rgba(169,140,95,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Giant background index number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 1, ease }}
            className="font-display font-light leading-none"
            style={{
              fontSize: "clamp(14rem, 45vw, 32rem)",
              color: "rgba(255,255,255,0.025)",
              letterSpacing: "-0.05em",
            }}
          >
            {String(active + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Left vertical rule */}
      <div
        className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 w-px"
        style={{
          height: "40%",
          background: "linear-gradient(to bottom, transparent, rgba(169,140,95,0.3) 40%, rgba(169,140,95,0.3) 60%, transparent)",
        }}
      />
      {/* Right vertical rule */}
      <div
        className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-px"
        style={{
          height: "40%",
          background: "linear-gradient(to bottom, transparent, rgba(169,140,95,0.3) 40%, rgba(169,140,95,0.3) 60%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 text-center">

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.45em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="inline-block font-sans uppercase text-accent/60 mb-10 md:mb-14"
          style={{ fontSize: "0.6rem" }}
        >
          Client Voices
        </motion.span>

        {/* ── Slide content ── */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease }}
          >
            {/* Opening quote glyph */}
            <div
              aria-hidden
              className="font-display text-accent/20 leading-[0.8] mb-2 select-none"
              style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
            >
              &ldquo;
            </div>

            {/* Quote */}
            <p
              className="font-display font-light text-foreground/80 leading-[1.8] mx-auto mb-12"
              style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.6rem)", maxWidth: "52ch" }}
            >
              {t.quote}
            </p>

            {/* Ornament divider */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-accent/40" />
              <div
                className="w-2 h-2 rotate-45 border border-accent/60"
                style={{ boxShadow: "0 0 8px rgba(169,140,95,0.3)" }}
              />
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-accent/40" />
            </div>

            {/* Attribution */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full border border-accent/35"
                style={{
                  width: 52, height: 52,
                  background: "rgba(169,140,95,0.07)",
                  boxShadow: "0 0 20px rgba(169,140,95,0.12)",
                }}
              >
                <span className="font-display font-light text-[11px] tracking-[0.18em] luxe-gradient-text">
                  {t.initials}
                </span>
              </div>
              <div
                className="font-sans font-medium tracking-[0.2em] uppercase"
                style={{ fontSize: "0.7rem", color: "rgba(243,232,222,0.8)" }}
              >
                {t.name}
              </div>
              <div
                className="font-sans tracking-[0.28em] uppercase text-accent/55"
                style={{ fontSize: "0.6rem" }}
              >
                {t.title}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ── */}
        <div className="mt-14 md:mt-20 flex items-center justify-center gap-10">

          {/* Prev arrow */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="group flex items-center justify-center w-10 h-10 border border-foreground/15 hover:border-accent/50 transition-all duration-500"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.1"
                strokeLinecap="round" strokeLinejoin="round"
                className="text-foreground/40 group-hover:text-accent transition-colors duration-400"
              />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i, active)}
                aria-label={`Testimonial ${i + 1}`}
                className="relative h-px transition-all duration-500"
                style={{
                  width: i === active ? 36 : 16,
                  background: i === active ? "var(--accent)" : "rgba(243,232,222,0.18)",
                }}
              >
                {i === active && (
                  <motion.span
                    key={`${active}-fill`}
                    className="absolute inset-0"
                    style={{ background: "var(--accent)", transformOrigin: "left", scaleX: 0 }}
                    animate={{ scaleX: paused ? undefined : 1 }}
                    transition={{ duration: AUTOPLAY / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="group flex items-center justify-center w-10 h-10 border border-foreground/15 hover:border-accent/50 transition-all duration-500"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.1"
                strokeLinecap="round" strokeLinejoin="round"
                className="text-foreground/40 group-hover:text-accent transition-colors duration-400"
              />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <div
          className="mt-7 font-sans tracking-[0.4em] uppercase"
          style={{ fontSize: "0.6rem", color: "rgba(243,232,222,0.22)" }}
        >
          {String(active + 1).padStart(2, "0")}&nbsp;&nbsp;/&nbsp;&nbsp;{String(N).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
