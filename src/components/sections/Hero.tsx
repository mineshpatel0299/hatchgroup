"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const GOLD = "rgba(169,140,95,0.55)";

const ITEMS = [
  { label: "Residential\nDesign"    },
  { label: "Commercial\nSpaces"     },
  { label: "Hospitality\nInteriors" },
  { label: "Turnkey\nExecution"     },
  { label: "Project\nManagement"    },
  { label: "Bespoke\nConsulting"    },
];

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

  // ── Phase 1 (0 → 0.35): text fades, video expands ──────────────────────────
  const textOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.06], [0, -36]);

  // Video stays still while text fades, then expands from 0.08 → 0.42
  const vTop    = useTransform(scrollYProgress, [0.08, 0.42], ["28%", "0%"]);
  const vLeft   = useTransform(scrollYProgress, [0.08, 0.42], ["6%",  "0%"]);
  const vRight  = useTransform(scrollYProgress, [0.08, 0.42], ["6%",  "0%"]);
  const vBottom = useTransform(scrollYProgress, [0.08, 0.42], ["1%",  "0%"]);
  const vRadius = useTransform(scrollYProgress, [0.08, 0.40], ["14px", "0px"]);

  // ── Phase 2 (0.35 → 1.0): scrub video ──────────────────────────────────────
  // iOS Safari needs one play→pause before seeking is allowed
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
    const onTouch = () => { unlock(); document.removeEventListener("touchstart", onTouch); };
    document.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", unlock);
      document.removeEventListener("touchstart", onTouch);
    };
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      // Map scroll 0.42–1.0 to video 0–duration
      const t = Math.max(0, (latest - 0.42) / 0.58) * video.duration;
      targetRef.current = t;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const v = videoRef.current;
        if (!v) return;
        if (Math.abs(v.currentTime - targetRef.current) > 0.016) {
          v.currentTime = targetRef.current;
        }
      });
    });
    return () => {
      unsub();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  return (
    <>
    <section ref={sectionRef} className="relative" style={{ height: "500svh" }}>
      <div className="sticky top-0 bg-emerald" style={{ height: "100svh", overflow: "hidden" }}>

        {/* ── Text block (label + headline + sub + scroll hint) ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 top-0 z-5 flex flex-col items-center px-6 text-center pointer-events-none"
        >
          <div style={{ paddingTop: "clamp(6rem, 10svh, 7.5rem)" }} className="flex flex-col items-center">
            {/* Label */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="h-px w-10 md:w-16"
                style={{ background: "linear-gradient(to right, transparent, rgba(169,140,95,0.7))" }}
              />
              <span className="text-[#D6BD94] text-[8px] md:text-[10px] font-sans font-medium tracking-[0.55em] uppercase">
                Interior Atelier · Est. 2014
              </span>
              <div
                className="h-px w-10 md:w-16"
                style={{ background: "linear-gradient(to left, transparent, rgba(169,140,95,0.7))" }}
              />
            </div>

            {/* Headline */}
            <h1
              className="font-display font-light text-ivory leading-[1.06] mb-4 whitespace-nowrap"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 4.5rem)",
                letterSpacing: "-0.02em",
                textShadow: "0 4px 40px rgba(0,0,0,0.45)",
              }}
            >
              The Art of{" "}
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

          </div>
        </motion.div>

        {/* ── Video (expands from inset → full cover) ── */}
        <motion.div
          className="absolute overflow-hidden z-10"
          style={{
            top: vTop,
            left: vLeft,
            right: vRight,
            bottom: vBottom,
            borderRadius: vRadius,
          }}
        >
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

          {/* Subtle dark scrim so text reads on top of video */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.22) 100%)" }}
          />
        </motion.div>


        {/* ── Gold progress bar ── */}
        <motion.div
         
        />

      </div>
    </section>

    {/* ── Service grid — renders after the 500svh video scroll ends ── */}
    <div className="luxe-emerald relative overflow-hidden">
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "50%", height: "1px", background: `linear-gradient(to right, transparent 2%, ${GOLD} 15%, ${GOLD} 85%, transparent 98%)` }}
      />
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "33.333%", width: "1px", background: `linear-gradient(to bottom, transparent 2%, ${GOLD} 12%, ${GOLD} 88%, transparent 98%)` }}
      />
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "66.666%", width: "1px", background: `linear-gradient(to bottom, transparent 2%, ${GOLD} 12%, ${GOLD} 88%, transparent 98%)` }}
      />
      <div className="grid grid-cols-3">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center px-6 py-24 md:py-36 text-center group cursor-default"
          >
            <p
              className="font-sans font-medium text-[#D6BD94] uppercase tracking-[0.25em] leading-[1.6] transition-colors duration-300 group-hover:text-ivory"
              style={{ fontSize: "clamp(0.6rem, 1vw, 0.78rem)", whiteSpace: "pre-line" }}
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
