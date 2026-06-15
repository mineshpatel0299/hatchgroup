"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

// ─── Scroll-timed text overlay ──────────────────────────────────────────────
// Each overlay fades up in, holds, then drifts up out — all driven by scroll.
function Overlay({
  progress,
  inStart, inEnd, outStart, outEnd,
  children,
  className = "",
}: {
  progress: MotionValue<number>;
  inStart: number; inEnd: number;
  outStart: number; outEnd: number;
  children: React.ReactNode;
  className?: string;
}) {
  const opacity = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [28, 0, 0, -22]
  );
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Gold hairline rule ──────────────────────────────────────────────────────
function GoldRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px ${className}`}
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(169,140,95,0.7) 30%, rgba(214,189,148,0.9) 50%, rgba(169,140,95,0.7) 70%, transparent)",
      }}
    />
  );
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const rafRef      = useRef<number | null>(null);
  const targetRef   = useRef<number>(0);
  const unlockedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const videoWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // iOS Safari blocks currentTime until play() has been called once.
  // On loadedmetadata, silently play→pause to unlock seeking.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const unlock = () => {
      if (unlockedRef.current) return;
      video.play()
        .then(() => { video.pause(); video.currentTime = 0; unlockedRef.current = true; })
        .catch(() => {});
    };
    video.addEventListener("loadedmetadata", unlock, { once: true });
    // Fallback: unlock on first user touch as well
    const onTouch = () => { unlock(); document.removeEventListener("touchstart", onTouch); };
    document.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", unlock);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  // Scrub video — throttled to one seek per animation frame
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      targetRef.current = latest * video.duration;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const v = videoRef.current;
        if (!v) return;
        if (Math.abs(v.currentTime - targetRef.current) < 0.016) return;
        v.currentTime = targetRef.current;
      });
    });
    return () => {
      unsub();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  return (
    // Use svh so iOS address bar doesn't overflow the sticky viewport
    <section ref={sectionRef} className="relative" style={{ height: "400svh" }}>
      <div className="sticky top-0 overflow-hidden bg-black" style={{ height: "100svh" }}>

        {/* ── Video ── */}
        <video
          ref={videoRef}
          src="/vids/jj-scrub.mp4"
          className="w-full h-full object-cover"
          preload="auto"
          muted
          playsInline
          {...{ "webkit-playsinline": "true" }}
          style={{ filter: "contrast(1.08) saturate(1.12) brightness(1.04)" }}
        />

        {/* Bottom scrim — thin, just enough to ground the text */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(14,20,16,0.22) 0%, transparent 100%)",
          }}
        />
        {/* Top scrim — barely visible */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(14,20,16,0.12) 0%, transparent 100%)",
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            TEXT OVERLAYS — timed to scroll progress
        ══════════════════════════════════════════════════════════════════ */}

        {/* ── 1. Opening statement (scroll 0 → 0.22) ── */}
        <Overlay
          progress={scrollYProgress}
          inStart={0} inEnd={0.07} outStart={0.16} outEnd={0.22}
          className="inset-0 flex flex-col items-center justify-center px-6 text-center z-10"
        >
          {/* Small label with gold rules */}
          <div className="flex items-center gap-5 mb-8">
            <GoldRule className="w-12 md:w-20" />
            <span
              className="text-[#D6BD94] text-[9px] md:text-[11px] font-sans font-medium tracking-[0.55em] uppercase"
            >
              Interior Atelier · Est. 2014
            </span>
            <GoldRule className="w-12 md:w-20" />
          </div>

          {/* Hero headline */}
          <h1
            className="font-display font-light text-ivory leading-[1.05] mb-7"
            style={{
              fontSize: "clamp(2.8rem, 8.5vw, 8rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            The Art of
            <br />
            <span
              style={{
                background:
                  "linear-gradient(115deg, #C2A878 0%, #EFD99B 35%, #C2A878 65%, #EFD99B 100%)",
                backgroundSize: "220% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "luxe-shimmer 8s ease-in-out infinite",
              }}
            >
              Believable Luxury
            </span>
          </h1>

          <p
            className="text-ivory/55 font-sans font-light text-[0.9rem] md:text-lg max-w-md leading-[1.85]"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            Cinematic aesthetics. Uncompromising material quality.
          </p>

          {/* Scroll nudge */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[#D6BD94]/70 text-[8px] tracking-[0.45em] uppercase font-sans">
              Scroll
            </span>
            <div
              className="w-px h-10"
              style={{
                background: "linear-gradient(to bottom, rgba(214,189,148,0.7), transparent)",
                animation: "grow 1.8s ease-in-out infinite",
              }}
            />
          </div>
        </Overlay>

        {/* ── 2. Chapter I — Craft (scroll 0.26 → 0.52) ── */}
        <Overlay
          progress={scrollYProgress}
          inStart={0.26} inEnd={0.33} outStart={0.46} outEnd={0.52}
          className="left-8 md:left-16 bottom-16 md:bottom-20 z-10"
        >
          <GoldRule className="w-10 mb-5" />
          <p
            className="font-display font-light text-ivory leading-[1.2]"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              textShadow: "0 4px 30px rgba(0,0,0,0.6)",
              maxWidth: "14ch",
            }}
          >
            Spaces crafted
            <br />
            <span className="text-[#D6BD94]">to transcend.</span>
          </p>
        </Overlay>

        {/* ── 3. Chapter II — Material (scroll 0.54 → 0.80) ── */}
        <Overlay
          progress={scrollYProgress}
          inStart={0.54} inEnd={0.61} outStart={0.74} outEnd={0.80}
          className="right-8 md:right-16 top-1/2 -translate-y-1/2 text-right z-10"
        >
          <GoldRule className="w-10 ml-auto mb-5" />
          <p
            className="font-display font-light text-ivory leading-[1.2]"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              textShadow: "0 4px 30px rgba(0,0,0,0.6)",
              maxWidth: "13ch",
            }}
          >
            Uncompromising
            <br />
            <span className="text-[#D6BD94]">in every detail.</span>
          </p>
        </Overlay>

        {/* ── 4. Closing — brand statement (scroll 0.83 → 1.0) ── */}
        <Overlay
          progress={scrollYProgress}
          inStart={0.83} inEnd={0.90} outStart={0.97} outEnd={1.0}
          className="inset-0 flex flex-col items-center justify-center text-center z-10"
        >
          <GoldRule className="w-16 mx-auto mb-8" />
          <p
            className="font-sans text-[#D6BD94] text-[9px] md:text-[11px] tracking-[0.55em] uppercase mb-6"
          >
            Hatch Group
          </p>
          <h2
            className="font-display font-light text-ivory leading-[1.05] mb-8"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 5rem)",
              letterSpacing: "-0.015em",
              textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            }}
          >
            Every project,
            <br />
            <span
              style={{
                background:
                  "linear-gradient(115deg, #C2A878 0%, #EFD99B 35%, #C2A878 65%, #EFD99B 100%)",
                backgroundSize: "220% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "luxe-shimmer 8s ease-in-out infinite",
              }}
            >
              a masterwork.
            </span>
          </h2>
          <GoldRule className="w-16 mx-auto mb-8" />
          <span className="font-sans text-ivory/40 text-[8px] tracking-[0.45em] uppercase">
            Mumbai · New Delhi · Dubai
          </span>
        </Overlay>

        {/* ── Gold progress bar ── */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 z-20"
          style={{
            width: videoWidth,
            background: "linear-gradient(90deg, #A98C5F, #D6BD94, #A98C5F)",
          }}
        />

      </div>
    </section>
  );
}
