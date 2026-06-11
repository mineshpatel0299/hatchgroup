"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Unlock video seeking on iOS Safari — must call play/pause before currentTime works */
async function unlockVideoScrub(video: HTMLVideoElement) {
  try {
    video.muted = true;
    await video.play();
    video.pause();
    video.currentTime = 0;
  } catch (_) { /* autoplay blocked */ }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

export default function Walkthrough() {
  const outerRef        = useRef<HTMLElement>(null);
  const video1Ref       = useRef<HTMLVideoElement>(null);
  const video2Ref       = useRef<HTMLVideoElement>(null);
  const v1WrapRef       = useRef<HTMLDivElement>(null);
  const v2WrapRef       = useRef<HTMLDivElement>(null);
  const divLineRef      = useRef<HTMLDivElement>(null);
  const divGlowRef      = useRef<HTMLDivElement>(null);
  const diamondRef      = useRef<HTMLDivElement>(null);
  const eyebrowRef      = useRef<HTMLDivElement>(null);
  const label1Ref       = useRef<HTMLDivElement>(null);
  const label2Ref       = useRef<HTMLDivElement>(null);
  const barRef          = useRef<HTMLDivElement>(null);

  // Mobile-only refs
  const isMobileRef     = useRef(false);
  const mobileLabel1Ref = useRef<HTMLDivElement>(null);
  const mobileLabel2Ref = useRef<HTMLDivElement>(null);
  const mobileGhost1Ref = useRef<HTMLDivElement>(null);
  const mobileGhost2Ref = useRef<HTMLDivElement>(null);
  const mobileRuleRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2 || !outerRef.current) return;

    const checkMobile = () => { isMobileRef.current = window.innerWidth < 768; };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Unlock seeking on iOS Safari for both videos
    const unlockOnReady = (video: HTMLVideoElement) => {
      if (video.readyState >= 1) {
        unlockVideoScrub(video);
      } else {
        video.addEventListener("loadedmetadata", () => unlockVideoScrub(video), { once: true });
      }
    };
    unlockOnReady(v1);
    unlockOnReady(v2);

    const state = {
      progress: 0,
      v1T: 0, v1C: 0,
      v2T: 0, v2C: 0,
    };

    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { state.progress = self.progress; },
    });

    let rafId: number;

    const tick = () => {
      const p = state.progress;

      // ── Video scrub ────────────────────────────────────────
      if (p <= 0.5 && v1.duration) state.v1T = (p / 0.5) * v1.duration;
      if (p >= 0.5 && v2.duration) state.v2T = ((p - 0.5) / 0.5) * v2.duration;
      state.v1C = lerp(state.v1C, state.v1T, 0.08);
      state.v2C = lerp(state.v2C, state.v2T, 0.08);
      if (v1.duration) v1.currentTime = clamp(state.v1C, 0, v1.duration - 0.001);
      if (v2.duration) v2.currentTime = clamp(state.v2C, 0, v2.duration - 0.001);

      // ── Progress bar (shared) ──────────────────────────────
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;

      if (isMobileRef.current) {
        // ═══ MOBILE: full-screen crossfade experience ════════

        // Crossfade between v1 → v2
        const crossfade = smoothstep(0.38, 0.62, p);
        if (v1WrapRef.current) {
          v1WrapRef.current.style.clipPath = "none";
          v1WrapRef.current.style.opacity  = String(1 - crossfade);
        }
        if (v2WrapRef.current) {
          v2WrapRef.current.style.clipPath = "none";
          v2WrapRef.current.style.opacity  = String(crossfade);
        }
        if (video1Ref.current) video1Ref.current.style.transform = "";
        if (video2Ref.current) video2Ref.current.style.transform = "";

        // Hide desktop divider
        if (divLineRef.current) { divLineRef.current.style.opacity = "0"; divLineRef.current.style.transform = "scaleY(0)"; }
        if (divGlowRef.current) divGlowRef.current.style.opacity = "0";
        if (diamondRef.current) { diamondRef.current.style.opacity = "0"; diamondRef.current.style.transform = "rotate(45deg) scale(0)"; }

        // Force desktop labels invisible
        if (label1Ref.current) label1Ref.current.style.opacity = "0";
        if (label2Ref.current) label2Ref.current.style.opacity = "0";

        // Eyebrow fades early on mobile
        if (eyebrowRef.current)
          eyebrowRef.current.style.opacity = String(1 - smoothstep(0.04, 0.14, p));

        // ── Mobile: gold rule that grows in with ch1 ──────────
        const ruleIn = smoothstep(0.06, 0.18, p);
        const ruleOut = smoothstep(0.40, 0.52, p);
        if (mobileRuleRef.current) {
          mobileRuleRef.current.style.transform = `scaleX(${clamp(ruleIn - ruleOut, 0, 1)})`;
          mobileRuleRef.current.style.opacity   = String(clamp(ruleIn - ruleOut, 0, 1));
        }

        // ── Mobile: ghost watermark "01" ──────────────────────
        const g1In  = smoothstep(0.05, 0.20, p);
        const g1Out = smoothstep(0.40, 0.54, p);
        if (mobileGhost1Ref.current)
          mobileGhost1Ref.current.style.opacity = String(clamp(g1In - g1Out, 0, 1) * 0.07);

        // ── Mobile: ghost watermark "02" ──────────────────────
        const g2In  = smoothstep(0.60, 0.72, p);
        const g2Out = smoothstep(0.88, 0.96, p);
        if (mobileGhost2Ref.current)
          mobileGhost2Ref.current.style.opacity = String(clamp(g2In - g2Out, 0, 1) * 0.07);

        // ── Mobile: Chapter 1 label ───────────────────────────
        const ml1In  = smoothstep(0.08, 0.22, p);
        const ml1Out = smoothstep(0.40, 0.52, p);
        if (mobileLabel1Ref.current) {
          mobileLabel1Ref.current.style.opacity   = String(clamp(ml1In - ml1Out, 0, 1));
          mobileLabel1Ref.current.style.transform = `translateY(${lerp(28, 0, ml1In) + lerp(0, -20, ml1Out)}px)`;
        }

        // ── Mobile: Chapter 2 label ───────────────────────────
        const ml2In  = smoothstep(0.62, 0.76, p);
        const ml2Out = smoothstep(0.88, 0.96, p);
        if (mobileLabel2Ref.current) {
          mobileLabel2Ref.current.style.opacity   = String(clamp(ml2In - ml2Out, 0, 1));
          mobileLabel2Ref.current.style.transform = `translateY(${lerp(28, 0, ml2In) + lerp(0, -20, ml2Out)}px)`;
        }

      } else {
        // ═══ DESKTOP: original split-screen logic ════════════

        // Reset any mobile overrides
        if (v1WrapRef.current) v1WrapRef.current.style.opacity = "1";
        if (v2WrapRef.current) v2WrapRef.current.style.opacity = "1";

        const split = smoothstep(0.38, 0.62, p);
        const v1Clip = lerp(0, 50, split);
        const v2Clip = lerp(100, 50, split);
        if (v1WrapRef.current) v1WrapRef.current.style.clipPath = `inset(0 ${v1Clip}% 0 0)`;
        if (v2WrapRef.current) v2WrapRef.current.style.clipPath = `inset(0 0 0 ${v2Clip}%)`;
        if (video1Ref.current) video1Ref.current.style.transform = `scale(${lerp(1, 1.06, split)})`;
        if (video2Ref.current) video2Ref.current.style.transform = `scale(${lerp(1.06, 1, split)})`;

        const divA = smoothstep(0.42, 0.60, p);
        if (divLineRef.current) { divLineRef.current.style.transform = `scaleY(${divA})`; divLineRef.current.style.opacity = String(divA * 0.55); }
        if (divGlowRef.current) divGlowRef.current.style.opacity = String(divA * 0.35);
        if (diamondRef.current) { diamondRef.current.style.opacity = String(divA); diamondRef.current.style.transform = `rotate(45deg) scale(${divA})`; }

        if (eyebrowRef.current) eyebrowRef.current.style.opacity = String(1 - smoothstep(0.32, 0.44, p));

        const l1In  = smoothstep(0.55, 0.65, p);
        const l1Out = smoothstep(0.88, 0.96, p);
        if (label1Ref.current) { label1Ref.current.style.opacity = String(clamp(l1In - l1Out, 0, 1)); label1Ref.current.style.transform = `translateY(${lerp(18, 0, l1In) + lerp(0, -14, l1Out)}px)`; }

        const l2In  = smoothstep(0.62, 0.72, p);
        const l2Out = smoothstep(0.88, 0.96, p);
        if (label2Ref.current) { label2Ref.current.style.opacity = String(clamp(l2In - l2Out, 0, 1)); label2Ref.current.style.transform = `translateY(${lerp(18, 0, l2In) + lerp(0, -14, l2Out)}px)`; }

        // Hide mobile-only elements on desktop
        if (mobileLabel1Ref.current) mobileLabel1Ref.current.style.opacity = "0";
        if (mobileLabel2Ref.current) mobileLabel2Ref.current.style.opacity = "0";
        if (mobileGhost1Ref.current) mobileGhost1Ref.current.style.opacity = "0";
        if (mobileGhost2Ref.current) mobileGhost2Ref.current.style.opacity = "0";
        if (mobileRuleRef.current)   mobileRuleRef.current.style.opacity   = "0";
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      trigger.kill();
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section ref={outerRef} className="relative h-[580vh]" style={{ background: "#0A1210" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ── Video Panel 1 ─────────────────────────────────────── */}
        <div
          ref={v1WrapRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0% 0 0)", willChange: "clip-path, opacity" }}
        >
          <video
            ref={video1Ref}
            src="/vids/01.mp4"
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{ willChange: "transform" }}
            muted playsInline preload="auto" disablePictureInPicture
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.22) 0%, transparent 40%)" }}
          />
        </div>

        {/* ── Video Panel 2 ─────────────────────────────────────── */}
        <div
          ref={v2WrapRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 0 100%)", willChange: "clip-path, opacity" }}
        >
          <video
            ref={video2Ref}
            src="/vids/03.mp4"
            className="absolute inset-0 w-full h-full object-cover origin-center"
            style={{ willChange: "transform" }}
            muted playsInline preload="auto" disablePictureInPicture
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(0,0,0,0.22) 0%, transparent 40%)" }}
          />
        </div>

        {/* ── Top & bottom atmospheric fade ────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,18,16,0.55) 0%, transparent 22%, transparent 55%, rgba(10,18,16,0.92) 100%)",
          }}
        />

        {/* ── Gold divider (desktop only) ───────────────────────── */}
        <div
          className="absolute inset-y-0 left-1/2 z-20 pointer-events-none hidden md:block"
          style={{ transform: "translateX(-50%)", width: 1 }}
        >
          <div
            ref={divGlowRef}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{ width: 10, opacity: 0, background: "radial-gradient(ellipse at center, rgba(223,155,77,0.9) 0%, transparent 100%)", willChange: "opacity" }}
          />
          <div
            ref={divLineRef}
            className="absolute inset-0 origin-center"
            style={{ background: "rgba(223,155,77,0.55)", transform: "scaleY(0)", opacity: 0, willChange: "transform, opacity" }}
          />
          <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%,-50%)" }}>
            <div
              ref={diamondRef}
              style={{ width: 7, height: 7, background: "#DF9B4D", transform: "rotate(45deg) scale(0)", opacity: 0, boxShadow: "0 0 16px rgba(223,155,77,0.7), 0 0 4px rgba(223,155,77,0.9)", willChange: "transform, opacity" }}
            />
          </div>
        </div>

        {/* ── Eyebrow (shared) ─────────────────────────────────── */}
        <div
          ref={eyebrowRef}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          style={{ willChange: "opacity" }}
        >
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.46em", color: "rgba(255,255,255,0.38)" }}
          >
            The Walkthrough
          </span>
        </div>

        {/* ── Desktop Chapter 1 label (bottom-left) ────────────── */}
        <div
          ref={label1Ref}
          className="absolute z-30 pointer-events-none hidden md:block"
          style={{ bottom: "clamp(3rem, 6vh, 5rem)", left: "clamp(1.25rem, 4vw, 4rem)", opacity: 0, transform: "translateY(18px)", maxWidth: "min(200px, 42vw)", willChange: "opacity, transform" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div style={{ width: 12, height: 1, background: "rgba(223,155,77,0.5)", flexShrink: 0 }} />
            <span className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.3em", color: "rgba(223,155,77,0.5)" }}>01 / Common Spaces</span>
          </div>
          <h3 className="font-display text-white leading-[1.08]" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)" }}>Curated<br />Atmosphere</h3>
        </div>

        {/* ── Desktop Chapter 2 label (bottom-right) ───────────── */}
        <div
          ref={label2Ref}
          className="absolute z-30 pointer-events-none hidden md:block"
          style={{ bottom: "clamp(3rem, 6vh, 5rem)", right: "clamp(1.25rem, 4vw, 4rem)", textAlign: "right", opacity: 0, transform: "translateY(18px)", maxWidth: "min(200px, 42vw)", willChange: "opacity, transform" }}
        >
          <div className="flex items-center justify-end gap-2 mb-2">
            <span className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.3em", color: "rgba(223,155,77,0.5)" }}>02 / Private Sanctuaries</span>
            <div style={{ width: 12, height: 1, background: "rgba(223,155,77,0.5)", flexShrink: 0 }} />
          </div>
          <h3 className="font-display text-white leading-[1.08]" style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)" }}>Intimate<br />Precision</h3>
        </div>

        {/* ══════════════════════════════════════════════════════
            MOBILE-ONLY OVERLAYS
        ══════════════════════════════════════════════════════ */}

        {/* Ghost watermark "01" */}
        <div
          ref={mobileGhost1Ref}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none md:hidden"
          style={{ opacity: 0, willChange: "opacity" }}
        >
          <span
            className="font-display font-light text-white select-none"
            style={{ fontSize: "clamp(8rem, 40vw, 18rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            01
          </span>
        </div>

        {/* Ghost watermark "02" */}
        <div
          ref={mobileGhost2Ref}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none md:hidden"
          style={{ opacity: 0, willChange: "opacity" }}
        >
          <span
            className="font-display font-light text-white select-none"
            style={{ fontSize: "clamp(8rem, 40vw, 18rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            02
          </span>
        </div>

        {/* Gold centre rule (grows with chapter 1) */}
        <div
          className="absolute z-30 pointer-events-none md:hidden"
          style={{ bottom: "clamp(11rem, 22vh, 14rem)", left: "50%", transform: "translateX(-50%)", width: 48 }}
        >
          <div
            ref={mobileRuleRef}
            style={{ height: 1, background: "rgba(223,155,77,0.55)", transformOrigin: "center", transform: "scaleX(0)", opacity: 0, willChange: "transform, opacity" }}
          />
        </div>

        {/* Mobile Chapter 1 — centred editorial card */}
        <div
          ref={mobileLabel1Ref}
          className="absolute z-30 pointer-events-none md:hidden"
          style={{
            bottom: "clamp(3.5rem, 8vh, 6rem)",
            left: 0, right: 0,
            textAlign: "center",
            opacity: 0,
            transform: "translateY(28px)",
            padding: "0 1.5rem",
            willChange: "opacity, transform",
          }}
        >
          {/* Eyebrow row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: 20, height: 1, background: "rgba(223,155,77,0.45)" }} />
            <span className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.45em", color: "rgba(223,155,77,0.7)" }}>
              01 · Common Spaces
            </span>
            <div style={{ width: 20, height: 1, background: "rgba(223,155,77,0.45)" }} />
          </div>
          {/* Chapter heading */}
          <h3
            className="font-display text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 9vw, 3.2rem)", letterSpacing: "-0.01em" }}
          >
            Curated Atmosphere
          </h3>
          {/* Sub-descriptor */}
          <p className="font-mono text-white/35 mt-2" style={{ fontSize: "9px", letterSpacing: "0.25em" }}>
            Living · Dining · Circulation
          </p>
        </div>

        {/* Mobile Chapter 2 — centred editorial card */}
        <div
          ref={mobileLabel2Ref}
          className="absolute z-30 pointer-events-none md:hidden"
          style={{
            bottom: "clamp(3.5rem, 8vh, 6rem)",
            left: 0, right: 0,
            textAlign: "center",
            opacity: 0,
            transform: "translateY(28px)",
            padding: "0 1.5rem",
            willChange: "opacity, transform",
          }}
        >
          {/* Eyebrow row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div style={{ width: 20, height: 1, background: "rgba(223,155,77,0.45)" }} />
            <span className="font-mono uppercase" style={{ fontSize: "8px", letterSpacing: "0.45em", color: "rgba(223,155,77,0.7)" }}>
              02 · Private Sanctuaries
            </span>
            <div style={{ width: 20, height: 1, background: "rgba(223,155,77,0.45)" }} />
          </div>
          {/* Chapter heading */}
          <h3
            className="font-display text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 9vw, 3.2rem)", letterSpacing: "-0.01em" }}
          >
            Intimate Precision
          </h3>
          {/* Sub-descriptor */}
          <p className="font-mono text-white/35 mt-2" style={{ fontSize: "9px", letterSpacing: "0.25em" }}>
            Bedroom · Bath · Study
          </p>
        </div>

        {/* ── Progress bar (shared) ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-40" style={{ height: 1, background: "rgba(255,255,255,0.06)" }}>
          <div
            ref={barRef}
            className="h-full bg-accent origin-left"
            style={{ transform: "scaleX(0)", willChange: "transform" }}
          />
        </div>

      </div>
    </section>
  );
}
