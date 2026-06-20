"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  { id: 1, title: "Over O",          category: "Commercial",  image: "/images/commercial-thumb.png" },
  { id: 2, title: "River View",      category: "Residential", image: "/images/residential-thumb.png" },
  { id: 3, title: "Skylin",          category: "Hospitality", image: "/images/hospitality-thumb.png" },
  { id: 4, title: "Apparta",         category: "Turnkey",     image: "/images/turnkey-thumb.png" },
  { id: 5, title: "The Moonway",     category: "Residential", image: "/images/featured-project.png" },
  { id: 6, title: "True",            category: "Luxury",      image: "/images/luxury-bg.png" },
  { id: 7, title: "Apparta II",      category: "Turnkey",     image: "/images/materials-bg.png" },
  { id: 8, title: "Pechersk School", category: "Commercial",  image: "/images/philosophy-bg.png" },
  { id: 9, title: "International",   category: "Hospitality", image: "/images/hero.png" },
];

function cardRanges(index: number, n: number) {
  const enterAt   = index === 0 ? 0 : index / n;
  const enterDone = index === 0 ? 0 : Math.min(enterAt + 0.055, 1);
  const exitAt    = index === n - 1 ? 1 : (index + 1) / n;
  const exitDone  = index === n - 1 ? 1 : Math.min(exitAt  + 0.055, 1);
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

  const opacity = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [enterAt, enterDone],
    isFirst ? [1, 1] : [0,       1],
  );

  const scaleInput  = isFirst
    ? [0, exitAt, exitDone, 1]
    : isLast
      ? [0, enterAt, enterDone, 1]
      : [0, enterAt, enterDone, exitAt, exitDone, 1];
  const scaleOutput = isFirst
    ? [1, 1, 0.94, 0.94]
    : isLast
      ? [1, 1, 1, 1]
      : [1, 1, 1, 1, 0.94, 0.94];

  const scale = useTransform(scrollYProgress, scaleInput, scaleOutput);

  const yInput  = isFirst
    ? [0, exitAt, exitDone, 1]
    : isLast
      ? [0, enterAt, enterDone, 1]
      : [0, enterAt, enterDone, exitAt, exitDone, 1];
  const yOutput = isFirst
    ? ["0%", "0%", "0%", "0%"]
    : isLast
      ? ["105%", "105%", "0%", "0%"]
      : ["105%", "105%", "0%", "0%", "0%", "0%"];

  const y = useTransform(scrollYProgress, yInput, yOutput);

  // Image zooms in slightly on entry then settles
  const imageScale = useTransform(
    scrollYProgress,
    isFirst ? [0, 1] : [enterAt, enterDone],
    isFirst ? [1, 1] : [1.08,    1],
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, scale, y }}
    >
      {/* Image */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ scale: imageScale }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority={index === 0}
        />
      </motion.div>

      {/* Rich gradient — heavier at bottom for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(3,3,3,0.88) 0%, rgba(3,3,3,0.32) 40%, rgba(3,3,3,0.06) 65%, transparent 82%)",
        }}
      />
      {/* Subtle left edge darken */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(3,3,3,0.22) 0%, transparent 40%)",
        }}
      />

      {/* Top-left: category */}
      <div className="absolute top-5 left-5 flex items-center gap-2.5">
        <div className="w-[3px] h-[3px] rounded-full" style={{ background: "rgba(169,140,95,0.7)" }} />
        <span className="text-[7.5px] tracking-[0.58em] uppercase font-sans font-medium" style={{ color: "rgba(169,140,95,0.72)" }}>
          {project.category}
        </span>
      </div>

      {/* Top-right: counter */}
      <div className="absolute top-5 right-5 flex items-center gap-2">
        <span className="text-white/18 text-[8px] tracking-[0.42em] font-sans tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="h-px w-4 flex-shrink-0" style={{ background: "rgba(169,140,95,0.2)" }} />
        <span className="text-white/12 text-[8px] tracking-[0.42em] font-sans tabular-nums">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-7 pb-6 md:pb-7">

        {/* Thin gold rule + category */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 flex-shrink-0" style={{ background: "rgba(169,140,95,0.55)" }} />
          <span className="text-[7.5px] tracking-[0.52em] uppercase font-sans" style={{ color: "rgba(169,140,95,0.6)" }}>
            {project.category}
          </span>
        </div>

        {/* Project title */}
        <h3
          className="font-display font-light text-white/92 leading-[1.05] mb-5"
          style={{ fontSize: "clamp(1.05rem, 2.4vw, 1.75rem)", letterSpacing: "-0.015em" }}
        >
          {project.title}
        </h3>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <span className="text-white/28 text-[7.5px] tracking-[0.48em] uppercase font-sans">
            View Project
          </span>
          <div className="h-px w-7 flex-shrink-0" style={{ background: "rgba(169,140,95,0.38)" }} />
          <svg
            width="11" height="11" viewBox="0 0 24 24"
            fill="none" stroke="rgba(169,140,95,0.58)" strokeWidth="1.3"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Inset border — gold tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(169,140,95,0.11)" }}
      />

      {/* Bottom gold hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(169,140,95,0.55) 20%, rgba(169,140,95,0.55) 80%, transparent)",
        }}
      />
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

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((n - 1) / n) * 100}%`]
  );

  const clipFunction = (inputs: number[], outputs: number[]) => {
    const getVal = (x: number) => {
      if (x <= inputs[0]) return outputs[0];
      if (x >= inputs[inputs.length - 1]) return outputs[outputs.length - 1];
      for (let j = 0; j < inputs.length - 1; j++) {
        if (x >= inputs[j] && x <= inputs[j + 1]) {
          const t = (x - inputs[j]) / (inputs[j + 1] - inputs[j]);
          return outputs[j] + t * (outputs[j + 1] - outputs[j]);
        }
      }
      return outputs[0];
    };
    const finalInputs  = [0, ...inputs.filter((v) => v > 0 && v < 1), 1];
    const finalOutputs = finalInputs.map(getVal);
    return { finalInputs, finalOutputs };
  };

  return (
    <section ref={containerRef} className="relative h-[900vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* ── Right: stacking cards ── */}
        <div
          className="absolute left-1/2 md:left-auto md:right-[5vw] top-[18%] md:top-1/2
                     -translate-x-1/2 md:translate-x-0 -translate-y-0 md:-translate-y-1/2
                     w-[86vw] md:w-[46vw] h-[48vh] md:h-[66vh]
                     overflow-hidden z-10"
          style={{
            boxShadow: [
              "0 40px 100px -10px rgba(0,0,0,0.72)",
              "0 8px 32px -4px rgba(0,0,0,0.55)",
              "0 0 0 1px rgba(169,140,95,0.07)",
            ].join(", "),
          }}
        >
          {projects.map((project, i) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="absolute inset-0 block"
              style={{ zIndex: i + 1 }}
            >
              <StackingCard
                project={project}
                index={i}
                total={n}
                scrollYProgress={scrollYProgress}
              />
            </Link>
          ))}
        </div>

        {/* ── Left: scrolling project names ── */}
        <div className="absolute left-[5vw] md:left-[7vw] top-[64%] md:top-1/2 -translate-y-0 md:-translate-y-1/2 w-full h-[40vh] md:h-[100vh] pointer-events-none z-20">
          <motion.div style={{ y: yTransform }} className="flex flex-col w-full h-[900%]">
            {projects.map((project, i) => {
              const start = (i - 0.5) / (n - 1);
              const end   = (i + 0.5) / (n - 1);

              const op = clipFunction(
                [start - 0.1, start, end, end + 0.1],
                [0.06, 1, 1, 0.06]
              );
              const opacity = useTransform(scrollYProgress, op.finalInputs, op.finalOutputs);

              const fl = clipFunction([start, i / (n - 1), end], [0, 1, 0]);
              const isFilled = useTransform(scrollYProgress, fl.finalInputs, fl.finalOutputs);

              return (
                <div key={project.id} className="h-[11.111%] flex items-center">
                  <Link
                    href={`/project/${project.id}`}
                    className="group pointer-events-auto inline-block hover:scale-[1.015] transition-transform duration-500 origin-left"
                  >
                    <TextItem title={project.title} progress={isFilled} opacity={opacity} />
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
  progress,
  opacity,
}: {
  title: string;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.div className="relative flex flex-col items-start gap-1 md:gap-2.5" style={{ opacity }}>
      <div className="relative text-[11.5vw] md:text-[5.2vw] leading-[0.83] tracking-[-0.03em] font-light uppercase whitespace-normal break-words max-w-[88vw] md:max-w-[36vw]">
        {/* Ghost outline */}
        <span
          className="absolute inset-0 select-none"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(243,232,222,0.09)" }}
        >
          {title}
        </span>
        {/* Filled — accent colour when active */}
        <motion.span
          className="relative inline-block"
          style={{
            opacity: progress,
            color: "var(--accent)",
          }}
        >
          {title}
        </motion.span>
      </div>

      {/* Explore row — desktop only */}
      <motion.div className="hidden md:flex items-center gap-4 ml-0.5" style={{ opacity: progress }}>
        <span className="text-[8px] tracking-[0.42em] uppercase font-light" style={{ color: "rgba(169,140,95,0.78)" }}>
          Explore
        </span>
        <div
          className="h-px transition-all duration-500 origin-left group-hover:w-14"
          style={{ width: "28px", background: "rgba(169,140,95,0.45)" }}
        />
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="rgba(169,140,95,0.65)" strokeWidth="1.2"
          className="group-hover:translate-x-1.5 transition-transform duration-500"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
