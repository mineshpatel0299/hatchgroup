"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: "Years of Excellence", value: 15, suffix: "+" },
  { label: "Completed Projects", value: 240, suffix: "" },
  { label: "Design Awards", value: 38, suffix: "" },
  { label: "Global Locations", value: 4, suffix: "" },
];

const PRESS = [
  "Architectural Digest", "Elle Decor", "AD India", "Vogue Living",
  "Design Pataki", "Condé Nast Traveller",
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    countersRef.current.forEach((counter, i) => {
      if (!counter) return;
      const targetValue = STATS[i].value;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetValue,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        onUpdate: () => {
          counter.innerText = Math.floor(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden luxe-emerald blend-to-ivory">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      <div
        className="absolute pointer-events-none"
        style={{
          top: "-18%", right: "-10%", width: "46vw", height: "46vw",
          background: "radial-gradient(ellipse at center, rgba(0,100,72,0.25) 0%, transparent 60%)",
          animation: "luxe-float 16s ease-in-out infinite",
        }}
      />

      <div className="relative z-10">

        {/* ── Press marquee ── */}
        <div className="relative mb-20 md:mb-28 py-6 border-y border-foreground/10 overflow-hidden">
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

          <div className="luxe-marquee-track">
            {[...PRESS, ...PRESS].map((name, i) => (
              <span key={i} className="flex items-center shrink-0">
                <span className="font-display font-light text-foreground/35 text-2xl md:text-4xl whitespace-nowrap px-8 md:px-14">
                  {name}
                </span>
                <span className="w-1.5 h-1.5 rotate-45 border border-accent/50 shrink-0" />
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-8 text-center mb-20 md:mb-28">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center group"
              >
                <div
                  className="font-display font-light leading-none mb-4 flex items-baseline luxe-gradient-text"
                  style={{ fontSize: "clamp(3rem, 11vw, 6rem)" }}
                >
                  <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="w-6 h-px bg-accent/40 mb-4 group-hover:w-12 transition-all duration-700" />
                <span className="font-sans text-[9px] md:text-xs tracking-[0.3em] md:tracking-widest text-foreground/45 uppercase leading-relaxed">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* ── Testimonial on ivory plate ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl mx-auto border border-foreground/10 bg-foreground/6 px-8 py-12 md:px-20 md:py-16 text-center"
          >
            {/* Gold corner ticks */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-accent/50" />
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent/50" />

            <span
              aria-hidden="true"
              className="absolute -top-10 left-1/2 -translate-x-1/2 font-display text-accent/20 select-none leading-none pointer-events-none"
              style={{ fontSize: "7rem" }}
            >
              &ldquo;
            </span>

            <p className="font-display font-light text-xl sm:text-2xl md:text-[2rem] text-foreground/80 leading-[1.6] mb-8">
              Hatch Group doesn&apos;t just design spaces; they orchestrate atmospheres
              that breathe life into the architecture. A truly visionary approach to
              modern luxury.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-accent/40" />
              <span className="text-accent tracking-[0.35em] uppercase text-[10px] md:text-xs font-medium font-sans">
                Architectural Digest
              </span>
              <div className="w-8 h-px bg-accent/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
