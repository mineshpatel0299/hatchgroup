"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const SPECS = [
  { label: "Total Area", value: "4,200 sq ft" },
  { label: "Configuration", value: "4 BHK" },
  { label: "Levels", value: "G + 2" },
  { label: "Orientation", value: "North-East" },
];

function CrossHair({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className="relative w-5 h-5"
    >
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/60 -translate-x-1/2" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/60 -translate-y-1/2" />
      <div className="absolute inset-[6px] rounded-full border border-accent/40" />
    </motion.div>
  );
}

export default function FloorPlan3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const cardRotateY = useTransform(scrollYProgress, [0, 1], [-18, -5]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [4, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden luxe-emerald">
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      {/* Dot grid — warm cream dots on emerald, mimicking drafting paper */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(243,232,222,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Radial glow centred toward the viewer side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 68% 50%, rgba(0,90,65,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Edge hairlines */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-accent/35 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-accent/25 to-transparent" />

      {/* Ghost numeral watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute left-[-3vw] bottom-[2vh] font-display font-light leading-none hidden lg:block"
        style={{
          fontSize: "clamp(10rem, 26vw, 24rem)",
          color: "rgba(243,232,222,0.03)",
        }}
      >
        3D
      </span>

      {/* ═══════════════════════════════════════════════
          Main layout — left editorial / right viewer
      ═══════════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

        {/* ── LEFT: Editorial panel ── */}
        <div className="relative lg:w-[43%] flex flex-col justify-center px-8 sm:px-14 lg:px-16 xl:px-20 pt-24 pb-12 lg:py-0">

          {/* Vertical running text — far left edge */}
          <div
            className="absolute left-5 lg:left-7 top-1/2 pointer-events-none select-none hidden lg:block"
            style={{
              writingMode: "vertical-rl",
              transform: "translateY(-50%) rotate(180deg)",
            }}
          >
            <span className="text-foreground/15 text-[7px] tracking-[0.65em] uppercase font-medium">
              Hatch Group · Spatial Intelligence
            </span>
          </div>

          {/* Vertical divider — right edge of panel */}
          {isInView && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ transformOrigin: "top" }}
              className="absolute top-0 bottom-0 right-0 w-px bg-accent/20 hidden lg:block"
            />
          )}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tag */}
            <span className="block text-accent text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-medium mb-7">
              Spatial Intelligence
            </span>

            {/* Headline */}
            <h2
              className="font-display font-light text-foreground leading-[1.04] mb-8"
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Explore in
              <br />
              <span className="luxe-gradient-text">Three</span>
              <br />
              Dimensions
            </h2>

            {/* Gold rule */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-px bg-accent/50" />
              <span className="text-accent/50 text-[8px] tracking-[0.45em] uppercase">
                3D Floor Plan
              </span>
            </div>

            {/* Body copy */}
            <p className="text-foreground/45 font-light text-[0.83rem] md:text-[0.9rem] leading-[1.9] mb-12 max-w-md">
              Every proportion considered. Every material resolved. Navigate the
              architecture before a single wall is raised — from any angle,
              at any moment.
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-7">
              {SPECS.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.5 + i * 0.08,
                  }}
                >
                  <div className="text-[7px] md:text-[8px] tracking-[0.5em] uppercase text-accent/55 mb-1.5">
                    {spec.label}
                  </div>
                  <div
                    className="font-display font-light text-foreground/75"
                    style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)" }}
                  >
                    {spec.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-12 flex items-center gap-4 group cursor-pointer w-fit"
            >
              <div className="w-8 h-8 border border-accent/35 flex items-center justify-center group-hover:border-accent/80 transition-colors duration-500">
                <div className="w-2 h-2 bg-accent/55 group-hover:bg-accent transition-colors duration-500" />
              </div>
              <span className="text-[9px] tracking-[0.45em] uppercase text-accent/60 group-hover:text-accent transition-colors duration-500">
                View Full Screen
              </span>
              <span className="w-6 h-px bg-accent/35 group-hover:w-10 group-hover:bg-accent/70 transition-all duration-500" />
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Viewer — perspectival floating card ── */}
        <div
          className="relative lg:w-[57%] flex items-center justify-center px-6 sm:px-10 lg:px-14 pb-20 lg:py-16 xl:py-20"
          style={{ perspective: "1400px" }}
        >
          {/* Warm glow behind the card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 52% 50%, rgba(0,71,55,0.6) 0%, transparent 80%)",
            }}
          />

          {/* Perspectival card */}
          <motion.div
            style={{
              rotateY: cardRotateY,
              rotateX: cardRotateX,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="relative w-full max-w-175"
          >
            {/* ── Ruler ticks — top ── */}
            <div className="absolute -top-9 left-6 right-6 flex justify-between items-end pointer-events-none">
              {Array.from({ length: 21 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.22, delay: 0.55 + i * 0.018, ease: "easeOut" }}
                  style={{ transformOrigin: "bottom" }}
                  className={`w-px bg-accent/40 ${i % 5 === 0 ? "h-4" : "h-2"}`}
                />
              ))}
            </div>

            {/* ── Ruler ticks — bottom ── */}
            <div className="absolute -bottom-9 left-6 right-6 flex justify-between items-start pointer-events-none">
              {Array.from({ length: 21 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.22, delay: 0.6 + i * 0.018, ease: "easeOut" }}
                  style={{ transformOrigin: "top" }}
                  className={`w-px bg-accent/40 ${i % 5 === 0 ? "h-4" : "h-2"}`}
                />
              ))}
            </div>

            {/* ── Registration cross-hairs ── */}
            <div className="absolute -top-5 -left-5">
              {isInView && <CrossHair delay={0.65} />}
            </div>
            <div className="absolute -top-5 -right-5">
              {isInView && <CrossHair delay={0.72} />}
            </div>
            <div className="absolute -bottom-5 -left-5">
              {isInView && <CrossHair delay={0.78} />}
            </div>
            <div className="absolute -bottom-5 -right-5">
              {isInView && <CrossHair delay={0.84} />}
            </div>

            {/* ── Outer gold echo hairlines ── */}
            <div className="absolute -inset-px border border-accent/55 rounded-3xl pointer-events-none" />
            <div className="absolute -inset-2.5 border border-accent/15 rounded-[2rem] pointer-events-none" />

            {/* ── Ivory mat frame ── */}
            <div className="relative w-full rounded-3xl bg-[#F9F5EC] p-2.5 md:p-4 shadow-[0_80px_160px_-60px_rgba(140,111,63,0.55)]">

              {/* Mat corner ornaments */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent/50 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-accent/50 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-accent/50 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent/50 pointer-events-none" />

              {/* Inner label strip inside the ivory mat — top */}
              <div className="flex items-center justify-between px-1 pb-2 md:pb-3">
                <span className="text-[7px] tracking-[0.55em] uppercase text-[#1C2420]/35 font-medium">
                  Floor Plan · 3D
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-pulse" />
                  <span className="text-[7px] tracking-[0.4em] uppercase text-[#1C2420]/35">
                    Interactive
                  </span>
                </div>
              </div>

              {/* Viewer window */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#003D2E]">

                {/* Loading state */}
                {!loaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#003D2E]">
                    <div className="relative w-12 h-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-transparent"
                        style={{
                          borderTopColor: "rgba(169,140,95,0.9)",
                          borderRightColor: "rgba(169,140,95,0.2)",
                        }}
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-1 rounded-full border border-transparent"
                        style={{ borderTopColor: "rgba(169,140,95,0.4)" }}
                      />
                      <div className="absolute inset-2.25 rounded-full bg-accent/10" />
                    </div>
                    <span className="text-foreground/40 text-[8px] tracking-[0.55em] uppercase" style={{ color: "#F3E8DE" }}>
                      Rendering model…
                    </span>
                  </div>
                )}

                {/* The iframe */}
                <iframe
                  title="3D Floor Plan"
                  src="https://sketchfab.com/models/0568795816b2466c8909b8d48d7a8f0a/embed?ui_theme=dark&autostart=0&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=1&ui_inspector=0&ui_annotations=0&ui_stop=0&camera=0"
                  frameBorder="0"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  onLoad={() => setLoaded(true)}
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease" }}
                />

                {/* Subtle vignette — pulls viewer into emerald palette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: "inset 0 0 70px rgba(0,55,40,0.35)" }}
                />
              </div>

              {/* Inner label strip — bottom of mat */}
              <div className="flex items-center justify-between px-1 pt-2 md:pt-3">
                <span className="text-[7px] tracking-[0.45em] uppercase text-[#1C2420]/30">
                  Drag · Orbit
                </span>
                <div className="w-12 h-px bg-accent/25" />
                <span className="text-[7px] tracking-[0.45em] uppercase text-[#1C2420]/30">
                  Pinch · Zoom
                </span>
              </div>
            </div>

            {/* Plaque below the frame */}
            <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#F9F5EC] rounded-full px-8 py-3 shadow-[0_20px_40px_-20px_rgba(140,111,63,0.5)]">
              <span className="text-[8px] tracking-[0.45em] uppercase text-[#1C2420]/45">
                Interactive · 3D · Floor Plan
              </span>
            </div>
          </motion.div>

          {/* Dimension badge — right side (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
            className="absolute right-3 xl:right-5 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2"
          >
            <div className="w-px h-14 bg-accent/25" />
            <div className="border border-accent/30 bg-[#004737]/90 px-3 py-2.5">
              <div className="text-[7px] tracking-[0.5em] uppercase text-accent/55 mb-1">Width</div>
              <div className="font-display text-foreground/70 text-sm">18.6 m</div>
            </div>
            <div className="w-px h-14 bg-accent/25" />
          </motion.div>

          {/* Dimension badge — bottom (desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.25 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2"
          >
            <div className="h-px w-10 bg-accent/25" />
            <div className="border border-accent/30 bg-[#004737]/90 px-5 py-2.5 flex gap-5">
              <div>
                <div className="text-[7px] tracking-[0.5em] uppercase text-accent/55 mb-1">Depth</div>
                <div className="font-display text-foreground/70 text-sm">22.4 m</div>
              </div>
              <div className="w-px bg-accent/20" />
              <div>
                <div className="text-[7px] tracking-[0.5em] uppercase text-accent/55 mb-1">Height</div>
                <div className="font-display text-foreground/70 text-sm">11.2 m</div>
              </div>
            </div>
            <div className="h-px w-10 bg-accent/25" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
