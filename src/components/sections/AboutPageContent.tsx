"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Footer from "@/components/sections/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const STATS = [
  { value: "10+", label: "Years of Practice" },
  { value: "120+", label: "Projects Delivered" },
  { value: "18", label: "Design Awards" },
  { value: "6", label: "Cities Across India" },
];

const VALUES = [
  {
    number: "01",
    title: "Authorship",
    body:
      "Every space we create carries a singular point of view. We don't decorate — we narrate, shaping rooms that tell the story of the people who inhabit them.",
  },
  {
    number: "02",
    title: "Restraint",
    body:
      "Luxury is expressed through what is withheld as much as what is shown. We edit ruthlessly, letting each chosen material and detail carry full weight.",
  },
  {
    number: "03",
    title: "Craft",
    body:
      "We work alongside India's finest artisans and ateliers. Every joint, texture, and finish is considered at the scale of the human hand.",
  },
  {
    number: "04",
    title: "Time",
    body:
      "We design for decades, not seasons. Hatch Group interiors are conceived to age with grace, acquiring depth and character over the years.",
  },
];

const TABS = [
  {
    id: "vision",
    label: "Vision",
    number: "01",
    headline: (
      <>
        To be the defining voice<br />
        of luxury design in{" "}
        <span
          style={{
            background: "linear-gradient(115deg, #8C6F3F 0%, #C2A878 40%, #8C6F3F 70%, #C2A878 100%)",
            backgroundSize: "220% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "luxe-shimmer 8s ease-in-out infinite",
          }}
        >
          contemporary India.
        </span>
      </>
    ),
    body: "We see a future where Indian interiors carry the same global cultural authority as their counterparts in Milan or Paris — rooted in craft, fluent in modernity, unmistakably Indian.",
  },
  {
    id: "mission",
    label: "Mission",
    number: "02",
    headline: (
      <>
        To design spaces that are{" "}
        <span
          style={{
            background: "linear-gradient(115deg, #8C6F3F 0%, #C2A878 40%, #8C6F3F 70%, #C2A878 100%)",
            backgroundSize: "220% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            animation: "luxe-shimmer 8s ease-in-out infinite",
          }}
        >
          deeply personal
        </span>
        <br />and timelessly made.
      </>
    ),
    body: "Every project is a collaboration — between client and studio, between tradition and innovation, between the visible and the felt. We exist to make that collaboration extraordinary.",
  },
];

function VisionMissionSection() {
  const [active, setActive] = useState<"vision" | "mission">("vision");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section className="relative py-24 md:py-36 bg-foreground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain opacity-40" />
      {/* Ambient gold glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw", height: "70vw",
          background: "radial-gradient(ellipse at center, rgba(169,140,95,0.09) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

        {/* Section eyebrow */}
        <motion.div
          {...fadeUp}
          className="flex items-center gap-4 mb-16"
        >
          <div
            className="h-px w-8"
            style={{ background: "linear-gradient(to right, transparent, rgba(214,189,148,0.5))" }}
          />
          <span className="text-[#D6BD94]/60 text-[9px] tracking-[0.55em] uppercase font-sans font-medium">
            Who We Are
          </span>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 mb-16 w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id as "vision" | "mission")}
              data-cursor-interact
              className="relative px-8 py-3 text-[10px] tracking-[0.38em] uppercase font-sans font-medium transition-colors duration-300 focus:outline-none"
              style={{ color: active === t.id ? "#D6BD94" : "rgba(255,253,244,0.3)" }}
            >
              {t.label}
              {active === t.id && (
                <motion.div
                  layoutId="vm-pill"
                  className="absolute inset-0 border pointer-events-none"
                  style={{ borderColor: "rgba(169,140,95,0.4)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              {active === t.id && (
                <motion.div
                  layoutId="vm-underline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-6"
                  style={{ background: "rgba(214,189,148,0.8)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content — crossfade on tab change */}
        <div className="relative min-h-80 md:min-h-70">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-20 items-start"
            >
              {/* Number folio */}
              <span
                className="font-display font-light select-none hidden md:block"
                style={{
                  fontSize: "clamp(5rem, 8vw, 8rem)",
                  color: "rgba(214,189,148,0.08)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {tab.number}
              </span>

              <div>
                <h3
                  className="font-display font-light text-[#FFFDF4] leading-[1.2] mb-8"
                  style={{ fontSize: "clamp(1.9rem, 3.2vw, 3rem)", letterSpacing: "-0.01em" }}
                >
                  {tab.headline}
                </h3>

                {/* Gold rule */}
                <div
                  className="w-10 h-px mb-8"
                  style={{ background: "rgba(169,140,95,0.45)" }}
                />

                <p className="text-[#FFFDF4]/40 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-xl">
                  {tab.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default function AboutPageContent() {
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  // Hero parallax — content drifts up and fades as user scrolls off
  const heroContentY       = useTransform(heroScroll, [0, 1], [0, 180]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  const yArch  = useTransform(storyScroll, [0, 1], [60, -60]);
  const ySmall = useTransform(storyScroll, [0, 1], [120, -120]);
  const yFrame = useTransform(storyScroll, [0, 1], [40, -80]);

  return (
    <>
      {/* ── 1. HERO — imageless, typographic luxury ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ height: "100svh", background: "#0E1511" }}
      >
        {/* ── Background: layered radial gold atmospheres ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(139,111,67,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%", left: "-10%", width: "55vw", height: "55vw",
            background: "radial-gradient(ellipse at center, rgba(169,140,95,0.06) 0%, transparent 65%)",
            animation: "luxe-float 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "5%", right: "-8%", width: "45vw", height: "45vw",
            background: "radial-gradient(ellipse at center, rgba(214,189,148,0.05) 0%, transparent 65%)",
            animation: "luxe-float 22s ease-in-out infinite reverse",
          }}
        />
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-50" />

        {/* ── Corner bracket marks ── */}
        {[
          "top-[88px] left-10 md:left-14",
          "top-[88px] right-10 md:right-14",
          "bottom-12 left-10 md:left-14",
          "bottom-12 right-10 md:right-14",
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 + i * 0.06 }}
            className={`absolute pointer-events-none hidden md:block ${pos}`}
            aria-hidden="true"
          >
            <div
              className="w-4 h-px"
              style={{
                background: "rgba(214,189,148,0.35)",
                marginLeft: i % 2 === 1 ? "auto" : undefined,
              }}
            />
            <div
              className="w-px h-4"
              style={{
                background: "rgba(214,189,148,0.35)",
                marginLeft: i % 2 === 1 ? "auto" : undefined,
              }}
            />
          </motion.div>
        ))}

        {/* ── Rotating SVG ornament — centred behind text ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          {/* Outer static ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg
              width="min(72vw, 560px)"
              height="min(72vw, 560px)"
              viewBox="0 0 560 560"
              fill="none"
            >
              {/* Outermost thin circle */}
              <circle cx="280" cy="280" r="274" stroke="rgba(169,140,95,0.12)" strokeWidth="0.8" />
              {/* Second circle */}
              <circle cx="280" cy="280" r="258" stroke="rgba(169,140,95,0.08)" strokeWidth="0.5" />

              {/* Slowly rotating dashed ring */}
              <motion.circle
                cx="280" cy="280" r="240"
                stroke="rgba(169,140,95,0.18)"
                strokeWidth="0.7"
                strokeDasharray="4 14"
                animate={{ rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                style={{ originX: "280px", originY: "280px" }}
              />

              {/* Counter-rotating inner ring */}
              <motion.circle
                cx="280" cy="280" r="218"
                stroke="rgba(214,189,148,0.1)"
                strokeWidth="0.5"
                strokeDasharray="1 8"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ originX: "280px", originY: "280px" }}
              />

              {/* Inner solid ring */}
              <circle cx="280" cy="280" r="196" stroke="rgba(169,140,95,0.1)" strokeWidth="0.6" />

              {/* Cardinal tick marks */}
              {[0, 90, 180, 270].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const x1 = 280 + 268 * Math.cos(rad);
                const y1 = 280 + 268 * Math.sin(rad);
                const x2 = 280 + 280 * Math.cos(rad);
                const y2 = 280 + 280 * Math.sin(rad);
                return (
                  <line
                    key={angle}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(214,189,148,0.4)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Centre diamond */}
              <rect
                x="276" y="276" width="8" height="8"
                transform="rotate(45 280 280)"
                fill="none"
                stroke="rgba(169,140,95,0.45)"
                strokeWidth="0.8"
              />
              <rect
                x="278.5" y="278.5" width="3" height="3"
                transform="rotate(45 280 280)"
                fill="rgba(169,140,95,0.3)"
              />
            </svg>
          </motion.div>
        </div>

        {/* ── Main text — centred, scroll parallax out ── */}
        <motion.div
          style={{ y: heroContentY, opacity: heroContentOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-medium text-[#D6BD94]/70 text-[8px] md:text-[9px] uppercase mb-10 block"
          >
            The Studio · Est. 2014
          </motion.span>

          {/* Headline — word stagger */}
          <h1
            className="font-display font-light text-[#FFFDF4] leading-[1.1] mb-8"
            style={{ fontSize: "clamp(2rem, 4.2vw, 4.5rem)", letterSpacing: "-0.015em" }}
          >
            {[
              { word: "Crafting", delay: 0.15 },
              { word: "spaces,", delay: 0.25 },
              { word: "writing", delay: 0.38 },
            ].map(({ word, delay }) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
              style={{
                background:
                  "linear-gradient(115deg, #C2A878 0%, #EFD99B 40%, #C2A878 70%, #EFD99B 100%)",
                backgroundSize: "220% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "luxe-shimmer 8s ease-in-out infinite",
              }}
            >
              stories.
            </motion.span>
          </h1>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="w-8 h-px mb-8 origin-center"
            style={{ background: "rgba(214,189,148,0.45)" }}
          />

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.82 }}
            className="font-sans font-light text-[#FFFDF4]/35 text-[0.75rem] tracking-[0.16em] uppercase"
          >
            India&apos;s premier luxury interior atelier
          </motion.p>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ opacity: heroContentOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
        >
          <span className="text-[#D6BD94]/50 font-sans text-[7px] tracking-[0.55em] uppercase">
            Scroll
          </span>
          <div
            className="w-px h-10"
            style={{
              background: "linear-gradient(to bottom, rgba(214,189,148,0.6), transparent)",
              animation: "grow 1.8s ease-in-out infinite",
            }}
          />
        </motion.div>
      </section>

      {/* ── 2. OUR STORY ── */}
      <section className="relative py-24 md:py-36 luxe-canvas-deep overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />

        {/* Ambient gold wash — bottom right */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-10%", right: "-6%",
            width: "50vw", height: "50vw",
            background: "radial-gradient(ellipse at center, rgba(214,189,148,0.12) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 lg:px-24">

          {/* Eyebrow row */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-12"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-10 origin-left luxe-rule"
            />
            <span className="text-accent text-[9px] tracking-[0.55em] uppercase font-medium">
              Our Story
            </span>
            <span className="ml-auto text-foreground/20 font-sans text-[9px] tracking-[0.4em] hidden sm:block">
              N°01
            </span>
          </motion.div>

          {/* Left rail + body copy */}
          <div className="flex gap-8 md:gap-14 items-start">

            {/* Animated vertical gold rail */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block shrink-0 w-px self-stretch origin-top"
              style={{
                background: "linear-gradient(to bottom, rgba(169,140,95,0.6), rgba(169,140,95,0.1))",
              }}
            />

            <div className="flex-1">
              {/* Drop cap + main paragraph */}
              <div className="overflow-hidden mb-1">
                <motion.p
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-light text-foreground/80 leading-[1.8] mb-2"
                  style={{ fontSize: "clamp(1.15rem, 2vw, 1.55rem)" }}
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-accent float-left leading-[0.82] mr-3 mt-1 select-none"
                    style={{ fontSize: "clamp(3.2rem, 5vw, 5rem)" }}
                  >
                    S
                  </motion.span>
                  ince 2014, Hatch Group has quietly redefined the language of luxury
                  interiors across India. Founded on the belief that a space should
                  speak before its occupant does, we have shaped residences,
                  hospitality suites, corporate sanctuaries, and cultural
                  institutions — each a singular act of authorship.
                </motion.p>
              </div>

              {/* Thin separator */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-px my-8 origin-left"
                style={{ background: "rgba(169,140,95,0.35)" }}
              />

              {/* Second paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-foreground/50 font-light leading-loose text-[0.95rem] md:text-[1.05rem] max-w-2xl"
              >
                Our practice draws from architecture, editorial art direction,
                and the quiet traditions of Indian craft. We collaborate with
                the country&apos;s finest artisans, fabric houses, and material
                ateliers — not to reference heritage, but to extend it into the
                present tense.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STATS BAR ── */}
      <section className="relative py-16 md:py-20 bg-foreground overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                {...fadeUp}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center md:border-r md:last:border-r-0 border-background/10 md:px-8"
              >
                <span
                  className="font-display font-light luxe-gradient-text leading-none mb-3"
                  style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
                >
                  {value}
                </span>
                <span className="text-background/50 text-[9px] tracking-[0.42em] uppercase font-sans">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LAYERED STORY IMAGE + COPY ── */}
      <section
        ref={storyRef}
        className="relative py-24 md:py-36 luxe-canvas overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none luxe-grain" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">

          {/* Images */}
          <div className="lg:col-span-6 order-1 relative h-[60vh] md:h-[72vh]">
            <motion.div
              style={{ y: yFrame }}
              className="absolute top-[4%] left-[2%] w-[68%] h-[76%] border border-accent/30 rounded-t-full pointer-events-none"
            />
            <motion.div
              style={{ y: yArch }}
              className="absolute top-[8%] left-[8%] w-[66%] h-[74%] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(28,36,32,0.35)]"
            >
              <Image
                src="/images/hospitality-thumb.png"
                alt="Hatch Group — hospitality interior"
                fill
                className="object-cover scale-[1.15]"
                sizes="(min-width: 1024px) 38vw, 70vw"
              />
            </motion.div>
            <motion.div
              style={{ y: ySmall }}
              className="absolute bottom-[2%] right-[2%] w-[44%] aspect-[4/5] bg-ivory p-2.5 md:p-3 shadow-[0_30px_60px_-25px_rgba(28,36,32,0.4)]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/residential-thumb.png"
                  alt="Hatch Group — bespoke residence"
                  fill
                  className="object-cover scale-[1.12]"
                  sizes="(min-width: 1024px) 22vw, 44vw"
                />
              </div>
              <span className="absolute -bottom-7 left-1 text-[8px] tracking-[0.4em] uppercase text-foreground/35">
                N°01 — The Craft
              </span>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 order-2">
            <motion.div
              {...fadeUp}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-accent text-[9px] md:text-[11px] tracking-[0.5em] uppercase font-medium mb-7">
                The Approach
              </span>
              <h2
                className="font-display font-light text-foreground leading-[1.12] mb-9"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Spaces that hold
                <br />
                the weight of{" "}
                <span className="luxe-gradient-text">living.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-foreground/55 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] mb-6">
                We begin every engagement with listening — not to brief
                documents, but to the client themselves. What are their
                unspoken rituals? How do they move through a room at 7 AM
                versus midnight? What textures have they loved and never
                articulated?
              </p>
              <p className="text-foreground/55 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem]">
                These invisible cues become the architecture of everything
                that follows — the spatial flow, the material palette, the
                calibration of light, the rhythm of detail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. VALUES GRID ── */}
      <section className="relative py-24 md:py-36 luxe-canvas-deep overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />

        {/* Ghost background text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          aria-hidden="true"
        >
          <span
            className="font-display font-light text-foreground/[0.035] leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 14vw, 14rem)" }}
          >
            VALUES
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-16 md:mb-24 text-center"
          >
            <span className="text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-5">
              What Guides Us
            </span>
            <div className="flex items-center gap-3 w-28">
              <div className="flex-1 h-px luxe-rule" />
              <div className="w-1.5 h-1.5 rotate-45 border border-accent/60" />
              <div className="flex-1 h-px luxe-rule" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
            {VALUES.map(({ number, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-background/60 backdrop-blur-sm p-10 md:p-14 group hover:bg-ivory transition-colors duration-500"
              >
                <span className="block text-accent/40 text-[9px] tracking-[0.5em] uppercase font-sans mb-6">
                  {number}
                </span>
                <h3
                  className="font-display font-light text-foreground leading-tight mb-6"
                  style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}
                >
                  {title}
                </h3>
                <p className="text-foreground/50 font-light leading-[1.9] text-[0.95rem]">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. VISION / MISSION ── */}
      <VisionMissionSection />

      {/* ── 7. CTA BANNER ── */}
      {/* <section className="relative py-24 md:py-32 bg-foreground overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-30" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(169,140,95,0.12) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="block text-accent text-[9px] tracking-[0.55em] uppercase font-medium mb-8">
              Begin a Conversation
            </span>
            <h2
              className="font-display font-light text-background leading-[1.1] mb-12"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.01em" }}
            >
              Have a project
              <br />
              in mind?
            </h2>
            <Link
              href="/#contact"
              data-cursor-interact
              className="inline-flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.42em] uppercase border border-background/30 text-background px-10 py-4 hover:bg-background hover:text-foreground transition-all duration-500 font-sans"
            >
              Enquire Now
              <span className="w-6 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </>
  );
}
