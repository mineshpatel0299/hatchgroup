"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

const projects = PROJECTS.map((p) => ({
  id: parseInt(p.id, 10),
  title: p.title,
  category: p.category,
  image: p.image,
}));

function cardRanges(index: number, n: number) {
  const enterAt   = index === 0 ? 0 : index / n;
  const enterDone = index === 0 ? 0 : Math.min(enterAt + 0.06, 1);
  const exitAt    = index === n - 1 ? 1 : (index + 1) / n;
  const exitDone  = index === n - 1 ? 1 : Math.min(exitAt + 0.06, 1);
  return { enterAt, enterDone, exitAt, exitDone };
}

function StackingCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const n = total;
  const { enterAt, enterDone, exitAt, exitDone } = cardRanges(index, n);
  const isFirst = index === 0;
  const isLast  = index === n - 1;

  // ── Iris reveal: clip-path splits open from center (top + bottom pull apart) ──
  // Use a 0→1 intermediate then map through easeOutExpo for a premium feel
  const irisRaw = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [enterAt, enterDone],
    [0, 1],
  );
  const clipPath = useTransform(irisRaw, (t) => {
    const eased = isFirst ? 1 : 1 - Math.pow(2, -10 * Math.min(t, 1));
    const pct = ((1 - eased) * 50).toFixed(3);
    return `inset(${pct}% 0% ${pct}% 0%)`;
  });

  // ── Exit: card recedes back as next one opens on top ─────────────────────
  const scaleInput = isFirst
    ? [0, exitAt, exitDone, 1]
    : isLast
      ? [0, 1]
      : [0, exitAt, exitDone, 1];
  const scaleOutput = isFirst
    ? [1, 1, 0.88, 0.88]
    : isLast
      ? [1, 1]
      : [1, 1, 0.88, 0.88];
  const scale = useTransform(scrollYProgress, scaleInput, scaleOutput);

  // ── Exit: card drifts upward slightly as it recedes ───────────────────────
  const yInput = isFirst
    ? [0, exitAt, exitDone, 1]
    : isLast
      ? [0, 1]
      : [0, exitAt, exitDone, 1];
  const yOutput = isFirst
    ? ["0%", "0%", "-3%", "-3%"]
    : isLast
      ? ["0%", "0%"]
      : ["0%", "0%", "-3%", "-3%"];
  const y = useTransform(scrollYProgress, yInput, yOutput);

  // ── Image zooms from 1.12 → 1 as iris opens ──────────────────────────────
  const imageScale = useTransform(irisRaw, (t) => {
    const eased = isFirst ? 1 : 1 - Math.pow(2, -10 * Math.min(t, 1));
    return 1.12 - eased * 0.12;
  });

  // ── Exit: dark overlay fades in as card recedes behind ───────────────────
  const dimInput = isFirst
    ? [0, exitAt, exitDone, 1]
    : isLast
      ? [0, 1]
      : [0, exitAt, exitDone, 1];
  const dimOutput = isFirst
    ? [0, 0, 0.52, 0.52]
    : isLast
      ? [0, 0]
      : [0, 0, 0.52, 0.52];
  const dimOpacity = useTransform(scrollYProgress, dimInput, dimOutput);

  const num = String(index + 1).padStart(2, "0");

  const isVisible = useTransform(irisRaw, (t) => (isFirst || t > 0.1) ? "auto" : "none");

  return (
    <motion.div className="absolute inset-0" style={{ scale, y, clipPath: clipPath as MotionValue<string>, zIndex: index + 1, pointerEvents: isVisible as MotionValue<string> }}>
      <Link href={`/project/${project.id}`} className="absolute inset-0 block">

      {/* ── Image ── */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image src={project.image} alt={project.title} fill className="object-cover" priority={index === 0} />
      </motion.div>

      {/* ── Gradient scrim — diagonal, dense at bottom ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to top, rgba(4,3,2,0.96) 0%, rgba(4,3,2,0.65) 30%, rgba(4,3,2,0.18) 54%, transparent 72%)",
            "linear-gradient(135deg, transparent 45%, rgba(4,3,2,0.28) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Ghost index number — design graphic ── */}
      <div
        className="absolute inset-0 flex items-start justify-end pointer-events-none select-none overflow-hidden"
        style={{ paddingTop: "4%", paddingRight: "5%" }}
      >
        <span
          className="font-display font-light leading-none"
          style={{
            fontSize: "clamp(8rem, 22vw, 18rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(243,232,222,0.07)",
            letterSpacing: "-0.06em",
          }}
        >
          {num}
        </span>
      </div>

      {/* ── Dim overlay — fades in as card recedes behind new one ── */}
      <motion.div
        className="absolute inset-0 bg-[#050402] pointer-events-none"
        style={{ opacity: dimOpacity }}
      />

      {/* ── Top strip: category left, counter right ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-6 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(169,140,95,0.65)" }} />
          <span className="text-[7px] md:text-[7.5px] tracking-[0.6em] uppercase font-sans font-medium" style={{ color: "rgba(169,140,95,0.7)" }}>
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7.5px] tracking-[0.4em] font-sans tabular-nums" style={{ color: "rgba(255,255,255,0.2)" }}>
            {num}
          </span>
          <span className="text-[7.5px] font-sans" style={{ color: "rgba(169,140,95,0.22)" }}>/</span>
          <span className="text-[7.5px] tracking-[0.4em] font-sans tabular-nums" style={{ color: "rgba(255,255,255,0.1)" }}>
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Bottom panel ── */}
      <div className="absolute bottom-0 left-0 right-0 px-5 md:px-6 pb-5 md:pb-6">

        {/* Gold rule — spans full width */}
        <div className="mb-4 md:mb-5">
          <div
            className="h-px w-full"
            style={{
              background: "linear-gradient(to right, rgba(169,140,95,0.55) 0%, rgba(169,140,95,0.15) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Project title — large, impactful */}
        <h3
          className="font-display font-light text-white/92 leading-[0.95] mb-4 md:mb-5"
          style={{
            fontSize: "clamp(1.7rem, 3.8vw, 3.2rem)",
            letterSpacing: "-0.025em",
          }}
        >
          {project.title}
        </h3>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[7px] md:text-[7.5px] tracking-[0.5em] uppercase font-sans" style={{ color: "rgba(255,255,255,0.25)" }}>
              View Project
            </span>
            <div className="h-px w-6 shrink-0" style={{ background: "rgba(169,140,95,0.4)" }} />
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(169,140,95,0.6)" strokeWidth="1.4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Category again — bottom-right, tiny */}
          <span className="text-[6.5px] tracking-[0.5em] uppercase font-sans hidden md:block" style={{ color: "rgba(255,255,255,0.1)" }}>
            {project.category}
          </span>
        </div>
      </div>

      {/* ── Inset gold border ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(169,140,95,0.1)" }}
      />

      {/* ── Bottom gold accent line ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(169,140,95,0.6) 0%, rgba(169,140,95,0.3) 50%, transparent 100%)",
        }}
      />
      </Link>
    </motion.div>
  );
}

export default function ProjectScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const n = projects.length;

  // Build piecewise yTransform so text centers on each card's active range
  // Card i is active during [i/n, (i+1)/n], midpoint at (i+0.5)/n
  const yScrollInputs = [0, ...projects.map((_, i) => (i + 0.5) / n), 1];
  const yScrollOutputs = [
    "0%",
    ...projects.map((_, i) => `${-((i / n) * 100)}%`),
    `${-(((n - 1) / n) * 100)}%`,
  ];
  const yTransform = useTransform(scrollYProgress, yScrollInputs, yScrollOutputs);

  const sectionHeight = `${n * 200}vh`;
  const innerHeight   = `${n * 100}%`;
  const itemHeight    = `${(100 / n).toFixed(3)}%`;

  return (
    <section ref={containerRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* ── Right: stacking cards ── */}
        <div
          className="absolute left-1/2 md:left-auto md:right-[4.5vw] top-[16%] md:top-1/2
                     -translate-x-1/2 md:translate-x-0 translate-y-0 md:-translate-y-1/2
                     w-[84vw] md:w-[45vw] h-[50vh] md:h-[68vh]
                     z-10 bg-[#050402]"
          style={{
            boxShadow: [
              "0 0 0 1px rgba(169,140,95,0.07)",
              "0 4px 24px rgba(0,0,0,0.45)",
              "0 28px 70px rgba(0,0,0,0.6)",
              "0 70px 140px -20px rgba(0,0,0,0.75)",
            ].join(", "),
          }}
        >
          {projects.map((project, i) => (
            <StackingCard
              key={project.id}
              project={project}
              index={i}
              total={n}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* ── Left: scrolling project names ── */}
        <div
          className="absolute left-[5vw] md:left-[7vw] top-[68%] md:top-1/2 translate-y-0 md:-translate-y-1/2
                     w-full h-[38vh] md:h-screen pointer-events-none z-20"
        >
          <motion.div style={{ y: yTransform, height: innerHeight }} className="flex flex-col w-full">
            {projects.map((project, i) => {
              const isFirstItem = i === 0;
              const isLastItem  = i === n - 1;
              const cardStart = i / n;
              const cardEnd   = (i + 1) / n;
              const cardMid   = (i + 0.5) / n;
              const margin    = 0.5 / n;

              let opInputs: number[];
              let opOutputs: number[];
              if (isFirstItem) {
                opInputs  = [0, cardEnd, cardEnd + margin];
                opOutputs = [1, 1, 0.05];
              } else if (isLastItem) {
                opInputs  = [cardStart - margin, cardStart, 1];
                opOutputs = [0.05, 1, 1];
              } else {
                opInputs  = [cardStart - margin, cardStart, cardEnd, cardEnd + margin];
                opOutputs = [0.05, 1, 1, 0.05];
              }
              const clampedOpInputs = opInputs.map(v => Math.max(0, Math.min(1, v)));
              const opacity = useTransform(scrollYProgress, clampedOpInputs, opOutputs);

              let flInputs: number[];
              let flOutputs: number[];
              if (isFirstItem) {
                flInputs  = [0, cardMid, cardEnd];
                flOutputs = [1, 1, 0];
              } else if (isLastItem) {
                flInputs  = [cardStart, cardMid, 1];
                flOutputs = [0, 1, 1];
              } else {
                flInputs  = [cardStart, cardMid, cardEnd];
                flOutputs = [0, 1, 0];
              }
              const clampedFlInputs = flInputs.map(v => Math.max(0, Math.min(1, v)));
              const isFilled = useTransform(scrollYProgress, clampedFlInputs, flOutputs);

              return (
                <div key={project.id} className="flex items-center" style={{ height: itemHeight }}>
                  <Link
                    href={`/project/${project.id}`}
                    className="group pointer-events-auto inline-block hover:scale-[1.015] transition-transform duration-500 origin-left"
                  >
                    <TextItem
                      title={project.title}
                      ordinal={String(i + 1).padStart(2, "0")}
                      progress={isFilled}
                      opacity={opacity}
                    />
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TextItem({
  title,
  ordinal,
  progress,
  opacity,
}: {
  title: string;
  ordinal: string;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div className="relative flex flex-col items-start" style={{ opacity }}>

      {/* Ordinal — tiny, above title */}
      <motion.div
        className="flex items-center gap-2 mb-1.5 md:mb-2 ml-0.5"
        style={{ opacity: progress }}
      >
        <div className="h-px w-3 shrink-0" style={{ background: "rgba(169,140,95,0.5)" }} />
        <span className="text-[7px] tracking-[0.45em] font-sans tabular-nums" style={{ color: "rgba(169,140,95,0.65)" }}>
          {ordinal}
        </span>
      </motion.div>

      {/* Title — ghost outline + filled accent layer */}
      <div className="relative text-[11.5vw] md:text-[5vw] leading-[0.84] tracking-[-0.03em] font-light uppercase whitespace-normal break-words max-w-[88vw] md:max-w-[36vw]">
        <span className="absolute inset-0 select-none" style={{ color: "transparent", WebkitTextStroke: "1px rgba(243,232,222,0.08)" }}>
          {title}
        </span>
        <motion.span className="relative inline-block" style={{ opacity: progress, color: "var(--accent)" }}>
          {title}
        </motion.span>
      </div>

      {/* Explore CTA — desktop only */}
      <motion.div className="hidden md:flex items-center gap-3 mt-2.5 ml-0.5" style={{ opacity: progress }}>
        <span className="text-[7.5px] tracking-[0.42em] uppercase font-light" style={{ color: "rgba(169,140,95,0.75)" }}>
          Explore
        </span>
        <div className="h-px w-6 shrink-0 group-hover:w-12 transition-all duration-500 origin-left" style={{ background: "rgba(169,140,95,0.42)" }} />
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="rgba(169,140,95,0.62)" strokeWidth="1.2"
          className="group-hover:translate-x-1 transition-transform duration-500"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>

    </motion.div>
  );
}
