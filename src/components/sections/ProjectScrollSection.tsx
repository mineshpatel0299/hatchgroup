"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { PROJECTS, type Project } from "@/data/projects";

// Scales up from the center so the tile appears to expand outward from all
// four sides at once; reverts (shrinks back to center) when scrolled out of
// view since the viewport trigger below isn't "once".
const expandVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: { duration: 1.6, ease: [0.7, 0, 0.84, 0] as const },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// Alternating rows: one full-bleed image, then a row of two side by side —
// repeating for the length of the portfolio.
function groupProjects(projects: Project[]): Project[][] {
  const groups: Project[][] = [];
  let i = 0;
  let wide = true;
  while (i < projects.length) {
    const size = wide ? 1 : 2;
    groups.push(projects.slice(i, i + size));
    i += size;
    wide = !wide;
  }
  return groups;
}

function ProjectTile({ project, index, total }: { project: Project; index: number; total: number }) {
  const num = String(index + 1).padStart(2, "0");

  // The image grows steadily as the tile travels through the viewport —
  // spring-smoothed so it eases rather than tracking the scroll 1:1.
  const tileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const imageScale = useSpring(rawScale, { stiffness: 60, damping: 25, mass: 0.6 });

  // Driven explicitly off useInView (rather than whileInView variant
  // propagation) so the hidden/visible transition durations below are
  // actually respected on the way out, not just on the way in.
  const isInView = useInView(tileRef, { amount: 0.25, once: false });

  return (
    <div ref={tileRef} className="relative flex-1 h-full">
      {/* This outer wrapper never transforms, so it keeps a stable layout
          box for the viewport observer. The inner element carries the
          actual scale/opacity animation so its own collapsing geometry
          never feeds back into the intersection check above. */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={expandVariants}
        style={{ transformOrigin: "center" }}
        className="h-full"
      >
        <Link
          href={`/project/${project.id}`}
          data-cursor-interact
          className="group relative flex w-full h-full overflow-hidden bg-background"
        >
          <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-[#000f0b]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Category + counter — hidden until hover */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <span className="text-[9px] tracking-[0.5em] uppercase font-medium text-accent">
              {project.category}
            </span>
            <span className="font-display text-accent text-sm tracking-[0.35em]">
              {num}/{String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute top-5 left-6 w-8 h-8 border-t border-l border-accent/50 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
          <div className="absolute bottom-5 right-6 w-8 h-8 border-b border-r border-accent/50 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

          {/* Hover state — title and CTA converge on dead-center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-0 scale-95 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
            <h3 className="font-display font-light text-2xl lg:text-4xl text-foreground mb-4">
              {project.title}
            </h3>
            <div
              className="h-px w-14 mb-4 mx-auto"
              style={{ background: "linear-gradient(to right, transparent, rgba(169,140,95,0.9), transparent)" }}
            />
            <div className="flex items-center justify-center gap-6">
              <span className="inline-flex items-center gap-2 text-accent text-xs tracking-[0.3em] uppercase">
                Explore
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
              </span>
              <span className="text-foreground/60 text-xs tracking-[0.2em]">
                {project.year}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ProjectScrollSection() {
  const total = PROJECTS.length;
  const rows = groupProjects(PROJECTS);
  let runningIndex = 0;

  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", left: "50%", transform: "translateX(-50%)",
          width: "70vw", height: "45vh",
          background: "radial-gradient(ellipse at center, rgba(0,90,65,0.35) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 text-center mb-14 md:mb-20">
        <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-4">
          Our Portfolio
        </span>
        <h2
          className="font-display font-light text-foreground leading-[1.05] mx-auto"
          style={{ fontSize: "clamp(2rem, 3.8vw, 3.6rem)", letterSpacing: "-0.015em" }}
        >
          Our <span className="luxe-gradient-text">Projects</span>
        </h2>
      </div>

      {/* Alternating full-bleed / split rows — each row uses the full
          viewport-scaled height, whether it holds one image or two. */}
      <div className="relative z-10 w-full flex flex-col gap-0.5">
        {rows.map((row, ri) => {
          const tiles = row.map((project) => {
            const tile = (
              <ProjectTile key={project.id} project={project} index={runningIndex} total={total} />
            );
            runningIndex += 1;
            return tile;
          });
          return (
            <div key={ri} className="flex flex-col sm:flex-row w-full gap-y-0.5 gap-x-2 h-[70vh] md:h-[88vh]">
              {tiles}
            </div>
          );
        })}
      </div>
    </section>
  );
}
