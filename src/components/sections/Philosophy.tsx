"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const MANIFESTO: { text: string; gold?: boolean; lineBreak?: boolean }[] = [
  { text: "True" }, { text: "luxury", gold: true }, { text: "is" }, { text: "not" },
  { text: "what" }, { text: "you" }, { text: "see", lineBreak: true },
  { text: "it" }, { text: "is" }, { text: "what" }, { text: "you" },
  { text: "feel", gold: true }, { text: "when", lineBreak: true },
  { text: "a" }, { text: "space" },
  { text: "understands", gold: true }, { text: "you." },
];

function Word({
  children,
  progress,
  range,
  gold,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  gold?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [14, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.28em] ${gold ? "luxe-gradient-text" : "text-foreground"}`}
    >
      {children}
    </motion.span>
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const ruleScale = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const eyebrowO  = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  return (
    <section ref={sectionRef} className="relative z-10 h-[120vh] md:h-[260vh]" style={{ "--foreground": "#1C2420", "--background": "#F3E8DE" } as React.CSSProperties}>

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Background image — full cover */}
        <Image
          src="https://res.cloudinary.com/de4pazo51/image/upload/v1781607496/Screenshot_2026-06-16_at_4.27.57_PM_ydrrwu.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Slight green tint + ivory gradient overlay — desktop only */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 90% -5%, rgba(0,87,67,0.25) 0%, transparent 60%)," +
              "radial-gradient(ellipse 55% 46% at 5% 108%, rgba(0,71,55,0.20) 0%, transparent 58%)," +
              "linear-gradient(165deg, rgba(232,242,236,0.97) 0%, rgba(218,235,224,0.96) 55%, rgba(200,225,210,0.97) 100%)",
          }}
        />

        {/* Ambient washes — desktop only */}
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            top: "-15%", right: "-10%", width: "48vw", height: "48vw",
            background: "radial-gradient(ellipse at center, rgba(214,189,148,0.3) 0%, transparent 62%)",
            animation: "luxe-float 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none hidden md:block"
          style={{
            bottom: "-20%", left: "-8%", width: "42vw", height: "42vw",
            background: "radial-gradient(ellipse at center, rgba(255,253,244,0.8) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 pointer-events-none luxe-grain hidden md:block" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div style={{ opacity: eyebrowO }} className="flex flex-col items-center mb-10 md:mb-14">
            <span className="text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-4">
              Our Philosophy
            </span>
            <div className="flex items-center gap-3 w-24">
              <div className="flex-1 h-px luxe-rule" />
              <div className="w-1.5 h-1.5 rotate-45 border border-accent/60" />
              <div className="flex-1 h-px luxe-rule" />
            </div>
          </motion.div>

          {/* Word-by-word manifesto — each word wakes as you scroll */}
          <p
            className="font-display font-light leading-[1.3]"
            style={{ fontSize: "clamp(1.6rem, 4vw, 3.6rem)", letterSpacing: "-0.01em" }}
          >
            {MANIFESTO.map((w, i) => {
              const start = 0.08 + (i / MANIFESTO.length) * 0.72;
              const end = start + 0.72 / MANIFESTO.length;
              return (
                <span key={i}>
                  <Word progress={scrollYProgress} range={[start, end]} gold={w.gold}>
                    {w.text}
                  </Word>
                  {w.lineBreak && <br />}
                </span>
              );
            })}
          </p>

          <motion.div
            style={{ scaleX: ruleScale }}
            className="mx-auto mt-12 md:mt-16 w-40 md:w-60 h-px luxe-rule origin-center"
          />
        </div>
      </div>
    </section>
  );
}
