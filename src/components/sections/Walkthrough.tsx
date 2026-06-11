"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

export default function Walkthrough() {
  const outerRef   = useRef<HTMLElement>(null);
  const video1Ref  = useRef<HTMLVideoElement>(null);
  const video2Ref  = useRef<HTMLVideoElement>(null);
  const v1WrapRef  = useRef<HTMLDivElement>(null);
  const v2WrapRef  = useRef<HTMLDivElement>(null);
  const divLineRef = useRef<HTMLDivElement>(null);
  const divGlowRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const label1Ref  = useRef<HTMLDivElement>(null);
  const label2Ref  = useRef<HTMLDivElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2 || !outerRef.current) return;

    // ── Shared mutable state (no React re-renders) ──────────
    const state = {
      progress: 0,   // raw scroll progress from ScrollTrigger
      v1T: 0, v1C: 0,
      v2T: 0, v2C: 0,
    };

    // ── ScrollTrigger: only write a number, never touch DOM ─
    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => { state.progress = self.progress; },
    });

    // ── RAF: all DOM mutations live here ─────────────────────
    let rafId: number;

    const tick = () => {
      const p = state.progress;

      // Video scrub targets
      if (p <= 0.5 && v1.duration) state.v1T = (p / 0.5) * v1.duration;
      if (p >= 0.5 && v2.duration) state.v2T = ((p - 0.5) / 0.5) * v2.duration;

      // Lerp currentTime
      state.v1C = lerp(state.v1C, state.v1T, 0.08);
      state.v2C = lerp(state.v2C, state.v2T, 0.08);
      if (v1.duration) v1.currentTime = clamp(state.v1C, 0, v1.duration - 0.001);
      if (v2.duration) v2.currentTime = clamp(state.v2C, 0, v2.duration - 0.001);

      // Split (clip-path — GPU layer, zero layout cost)
      const split = smoothstep(0.38, 0.62, p);
      const v1Clip = lerp(0, 50, split);   // right inset grows → clips v1 to left half
      const v2Clip = lerp(100, 50, split); // left inset shrinks → reveals v2 on right half

      if (v1WrapRef.current)
        v1WrapRef.current.style.clipPath = `inset(0 ${v1Clip}% 0 0)`;
      if (v2WrapRef.current)
        v2WrapRef.current.style.clipPath = `inset(0 0 0 ${v2Clip}%)`;

      // Video scale compensation (keeps frame feeling full inside the narrowing clip)
      if (video1Ref.current)
        video1Ref.current.style.transform = `scale(${lerp(1, 1.06, split)})`;
      if (video2Ref.current)
        video2Ref.current.style.transform = `scale(${lerp(1.06, 1, split)})`;

      // Gold divider
      const divA = smoothstep(0.42, 0.60, p);
      if (divLineRef.current) {
        divLineRef.current.style.transform = `scaleY(${divA})`;
        divLineRef.current.style.opacity   = String(divA * 0.55);
      }
      if (divGlowRef.current)
        divGlowRef.current.style.opacity = String(divA * 0.35);
      if (diamondRef.current) {
        diamondRef.current.style.opacity   = String(divA);
        diamondRef.current.style.transform = `rotate(45deg) scale(${divA})`;
      }

      // Eyebrow
      if (eyebrowRef.current)
        eyebrowRef.current.style.opacity = String(1 - smoothstep(0.32, 0.44, p));

      // Label 1
      const l1In  = smoothstep(0.55, 0.65, p);
      const l1Out = smoothstep(0.88, 0.96, p);
      if (label1Ref.current) {
        label1Ref.current.style.opacity   = String(clamp(l1In - l1Out, 0, 1));
        label1Ref.current.style.transform = `translateY(${lerp(18, 0, l1In) + lerp(0, -14, l1Out)}px)`;
      }

      // Label 2
      const l2In  = smoothstep(0.62, 0.72, p);
      const l2Out = smoothstep(0.88, 0.96, p);
      if (label2Ref.current) {
        label2Ref.current.style.opacity   = String(clamp(l2In - l2Out, 0, 1));
        label2Ref.current.style.transform = `translateY(${lerp(18, 0, l2In) + lerp(0, -14, l2Out)}px)`;
      }

      // Progress bar
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${p})`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      trigger.kill();
    };
  }, []);

  return (
    <section ref={outerRef} className="relative h-[580vh]" style={{ background: "#0A1210" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ── Video Panel 1 ─────────────────────────────────────── */}
        <div
          ref={v1WrapRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0% 0 0)", willChange: "clip-path" }}
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
          style={{ clipPath: "inset(0 0 0 100%)", willChange: "clip-path" }}
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
              "linear-gradient(to bottom, rgba(10,18,16,0.55) 0%, transparent 22%, transparent 68%, rgba(10,18,16,0.82) 100%)",
          }}
        />

        {/* ── Gold divider ──────────────────────────────────────── */}
        <div
          className="absolute inset-y-0 left-1/2 z-20 pointer-events-none"
          style={{ transform: "translateX(-50%)", width: 1 }}
        >
          <div
            ref={divGlowRef}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2"
            style={{
              width: 10,
              opacity: 0,
              background: "radial-gradient(ellipse at center, rgba(223,155,77,0.9) 0%, transparent 100%)",
              willChange: "opacity",
            }}
          />
          <div
            ref={divLineRef}
            className="absolute inset-0 origin-center"
            style={{
              background: "rgba(223,155,77,0.55)",
              transform: "scaleY(0)",
              opacity: 0,
              willChange: "transform, opacity",
            }}
          />
          <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%,-50%)" }}>
            <div
              ref={diamondRef}
              style={{
                width: 7, height: 7,
                background: "#DF9B4D",
                transform: "rotate(45deg) scale(0)",
                opacity: 0,
                boxShadow: "0 0 16px rgba(223,155,77,0.7), 0 0 4px rgba(223,155,77,0.9)",
                willChange: "transform, opacity",
              }}
            />
          </div>
        </div>

        {/* ── Eyebrow ───────────────────────────────────────────── */}
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

        {/* ── Chapter 1 label ──────────────────────────────────── */}
        <div
          ref={label1Ref}
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: "clamp(3.5rem, 6vh, 5rem)",
            left: "clamp(1.75rem, 4vw, 4rem)",
            opacity: 0,
            transform: "translateY(18px)",
            maxWidth: 240,
            willChange: "opacity, transform",
          }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <div style={{ width: 14, height: 1, background: "rgba(223,155,77,0.5)" }} />
            <span className="font-mono uppercase" style={{ fontSize: "9px", letterSpacing: "0.36em", color: "rgba(223,155,77,0.5)" }}>
              01 / Common Spaces
            </span>
          </div>
          <h3 className="font-display text-white leading-[1.08]" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)" }}>
            Curated<br />Atmosphere
          </h3>
        </div>

        {/* ── Chapter 2 label ──────────────────────────────────── */}
        <div
          ref={label2Ref}
          className="absolute z-30 pointer-events-none"
          style={{
            bottom: "clamp(3.5rem, 6vh, 5rem)",
            right: "clamp(1.75rem, 4vw, 4rem)",
            textAlign: "right",
            opacity: 0,
            transform: "translateY(18px)",
            maxWidth: 240,
            willChange: "opacity, transform",
          }}
        >
          <div className="flex items-center justify-end gap-2 mb-2.5">
            <span className="font-mono uppercase" style={{ fontSize: "9px", letterSpacing: "0.36em", color: "rgba(223,155,77,0.5)" }}>
              02 / Private Sanctuaries
            </span>
            <div style={{ width: 14, height: 1, background: "rgba(223,155,77,0.5)" }} />
          </div>
          <h3 className="font-display text-white leading-[1.08]" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)" }}>
            Intimate<br />Precision
          </h3>
        </div>

        {/* ── Progress bar ──────────────────────────────────────── */}
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
