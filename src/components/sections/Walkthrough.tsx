"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

const CHAPTERS = [
  {
    id: "01",
    title: "Curated Atmosphere",
    meta: "Common Spaces",
    blurb: "Living, dining and circulation — composed like cinema, experienced like home.",
  },
  {
    id: "02",
    title: "Luxury Precision",
    meta: "Private Sanctuaries",
    blurb: "Bedroom, bath and study — quiet rooms measured in texture and light.",
  },
];

/** Unlock video seeking on iOS Safari — must call play/pause before currentTime works */
async function unlockVideoScrub(video: HTMLVideoElement) {
  try {
    video.muted = true;
    await video.play();
    video.pause();
    video.currentTime = 0;
  } catch {
    /* autoplay blocked — seeking will silently fail */
  }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

export default function Walkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Frame breathes open slightly as the promenade begins
  const frameScale = useTransform(scrollYProgress, [0, 0.18], [0.92, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.2], [20, 0]);

  // Symmetric crossfade inside the window — chapter 1 fades fully OUT as
  // chapter 2 fades in, so the films never bleed into each other. Matches the
  // seek hand-off gap, so the fade happens over two still frames.
  const v1Opacity = useTransform(scrollYProgress, [0.48, 0.52], [1, 0]);
  const v2Opacity = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);

  // Progress rail under the frame
  const railScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(p < 0.5 ? 0 : 1);
  });

  // ── Scroll-scrubbed playback ─────────────────────────────
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const unlockOnReady = (video: HTMLVideoElement) => {
      if (video.readyState >= 1) {
        unlockVideoScrub(video);
      } else {
        video.addEventListener("loadedmetadata", () => unlockVideoScrub(video), { once: true });
      }
    };
    unlockOnReady(v1);
    unlockOnReady(v2);

    const state = { v1T: 0, v1C: 0, v2T: 0, v2C: 0 };
    let rafId: number;

    // One frame at 30fps — seeks smaller than this are invisible and just thrash the decoder
    const FRAME = 1 / 30;

    /** Seek only when the target moved a visible amount AND no seek is already in flight */
    const applySeek = (video: HTMLVideoElement, time: number) => {
      if (video.seeking) return;
      const t = clamp(time, 0, video.duration - 0.05);
      if (Math.abs(video.currentTime - t) > FRAME) video.currentTime = t;
    };

    const tick = () => {
      const p = scrollYProgress.get();

      // Chapter 1 owns 0 → 0.48, chapter 2 owns 0.52 → 0.88.
      // The 0.48–0.52 gap is the crossfade: both films hold still, so the
      // decoders are never seeking two streams at once.
      // Chapter 2 finishes at p=0.88 and holds a settled frame, so the unpin
      // never catches the film mid-seek or in its fade-out tail (-0.4s margin).
      if (v1.duration) state.v1T = clamp(p / 0.48, 0, 1) * (v1.duration - 0.05);
      if (v2.duration) state.v2T = clamp((p - 0.52) / 0.36, 0, 1) * Math.max(0, v2.duration - 0.4);

      // Smooth the targets so the walk glides
      state.v1C = lerp(state.v1C, state.v1T, 0.12);
      state.v2C = lerp(state.v2C, state.v2T, 0.12);

      // Only the active chapter is ever seeked — never both
      if (p < 0.5 && v1.duration) {
        applySeek(v1, state.v1C);
      } else if (v2.duration) {
        applySeek(v2, state.v2C);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [scrollYProgress]);

  const chapter = CHAPTERS[active];

  return (
    <section ref={sectionRef} className="relative h-[500vh] luxe-ivory blend-to-emerald">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "8%", left: "50%", transform: "translateX(-50%)",
            width: "75vw", height: "55vh",
            background: "radial-gradient(ellipse at center, rgba(255,253,244,0.8) 0%, transparent 60%)",
          }}
        />

        {/* Header */}
        <motion.div style={{ y: headY }} className="relative z-10 text-center mb-7 md:mb-9 px-6">
          <span className="block text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-3">
            The Walkthrough
          </span>
          <h2
            className="font-display font-light text-foreground leading-[1.06]"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.6rem)", letterSpacing: "-0.015em" }}
          >
            A guided <span className="luxe-gradient-text">promenade</span>
          </h2>
          <p className="mt-3 text-foreground/40 text-[10px] md:text-xs tracking-[0.25em] uppercase">
            Scroll to walk through
          </p>
        </motion.div>

        {/* ── The window — wide ivory-matted arch, films scrubbed by scroll ── */}
        <motion.div
          style={{ scale: frameScale }}
          className="relative w-[92vw] md:w-[78vw]"
        >
          {/* Gold echo frame */}
          <div className="absolute -inset-3 md:-inset-5 border border-accent/35 rounded-t-[80px] md:rounded-t-[140px] pointer-events-none" />

          <div className="relative w-full h-[48vh] md:h-[58vh] bg-ivory p-2.5 md:p-4 rounded-t-[80px] md:rounded-t-[140px] shadow-[0_60px_120px_-50px_rgba(140,111,63,0.6)]">
            <div className="relative w-full h-full overflow-hidden rounded-t-[72px] md:rounded-t-[128px]">
              {/* Ivory backing so the fade never reveals an empty layer */}
              <div className="absolute inset-0 bg-ivory" />
              {/* Chapter 1 film — fades fully out at the midpoint */}
              <motion.video
                ref={video1Ref}
                src="/vids/01.mp4"
                style={{ opacity: v1Opacity }}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
              />
              {/* Chapter 2 film — crossfades over at the midpoint */}
              <motion.video
                ref={video2Ref}
                src="/vids/03.mp4"
                style={{ opacity: v2Opacity }}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
              />
              {/* Warm wash so the films sit in the palette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#E7CF9E]/15 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Chapter plaque — anchored to the frame, swaps at midpoint.
              On mobile it spans the frame width and carries its own rail. */}
          <div className="absolute -bottom-14 md:-bottom-14 left-2 right-2 md:left-12 md:right-auto z-20 md:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="bg-ivory px-5 py-4 md:px-8 md:py-6 shadow-[0_30px_60px_-30px_rgba(140,111,63,0.5)]"
              >
                <div className="flex items-center gap-3 mb-2 min-w-0">
                  <span className="shrink-0 text-accent font-display text-sm tracking-[0.3em]">{chapter.id}</span>
                  <div className="shrink-0 w-6 md:w-10 h-px bg-accent/50" />
                  <span className="truncate text-[8px] md:text-[9px] tracking-[0.35em] md:tracking-[0.4em] uppercase text-foreground/45">
                    {chapter.meta}
                  </span>
                  {/* Mobile rail — lives inside the plaque so nothing overflows */}
                  <div className="md:hidden ml-auto flex items-center gap-2 shrink-0">
                    <div className="w-10 h-px bg-foreground/15 relative overflow-hidden">
                      <motion.div style={{ scaleX: railScale }} className="absolute inset-0 bg-accent origin-left" />
                    </div>
                    <span className="text-foreground/35 text-[9px] tracking-[0.2em]">02</span>
                  </div>
                </div>
                <h3
                  className="font-display font-light text-foreground leading-[1.1]"
                  style={{ fontSize: "clamp(1.15rem, 2.4vw, 2rem)" }}
                >
                  {chapter.title}
                </h3>
                <p className="mt-2 text-foreground/55 font-light text-[0.78rem] md:text-sm leading-[1.7] md:leading-[1.75]">
                  {chapter.blurb}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Chapter dial — right of the frame (desktop only) */}
          <div className="absolute -bottom-14 right-12 z-20 hidden md:flex items-center gap-3">
            <span className="font-display text-3xl luxe-gradient-text leading-none">
              {chapter.id}
            </span>
            <div className="w-16 h-px bg-foreground/15 relative overflow-hidden">
              <motion.div style={{ scaleX: railScale }} className="absolute inset-0 bg-accent origin-left" />
            </div>
            <span className="text-foreground/35 text-xs tracking-[0.2em]">02</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
