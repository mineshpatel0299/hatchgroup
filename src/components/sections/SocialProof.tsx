"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LuxuryBackground } from "@/components/ui/luxury-background";

const STATS = [
  { label: "Years of Excellence", value: 15, suffix: "+" },
  { label: "Completed Projects", value: 240, suffix: "" },
  { label: "Design Awards", value: 38, suffix: "" },
  { label: "Global Locations", value: 4, suffix: "" },
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
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          counter.innerText = Math.floor(obj.val).toString();
        },
      });
    });
  }, []);

  return (
    /* Warm cream — alternating section WITH chandelier */
    <section
      ref={sectionRef}
      className="relative py-40 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F5E8D9 0%, #EDD9C0 50%, #F0DFC8 100%)" }}
    >
      <LuxuryBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Mobile eyebrow */}
        <div className="flex flex-col items-center mb-12 md:hidden">
          <span className="text-[8px] tracking-[0.55em] uppercase text-accent/60 font-sans mb-3">Legacy of Excellence</span>
          <div className="flex items-center gap-3 w-16">
            <div className="flex-1 h-px bg-accent/30" />
            <div className="w-1 h-1 rounded-full bg-accent/50" />
            <div className="flex-1 h-px bg-accent/30" />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-8 text-center mb-16 md:mb-20">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              {/* Thin gold top rule */}
              <div className="w-6 h-px bg-accent/30 mb-4 md:mb-5" />
              <div className="font-display leading-none text-accent mb-3 flex items-baseline" style={{ fontSize: "clamp(3rem, 12vw, 6.25rem)" }}>
                <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <span className="font-sans text-[9px] md:text-xs tracking-[0.3em] md:tracking-widest text-foreground/50 uppercase leading-relaxed">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-accent mx-auto mb-14 md:mb-20 opacity-60" />

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto text-center px-2 md:px-0">
          <span className="block text-[8px] tracking-[0.5em] uppercase text-accent/50 font-sans mb-6 md:hidden">Featured Review</span>
          <p className="font-display text-xl sm:text-2xl md:text-4xl text-foreground/80 leading-[1.6] md:leading-relaxed mb-6 md:mb-8 italic">
            &ldquo;Hatch Group doesn&apos;t just design spaces; they orchestrate atmospheres that breathe life into the architecture. A truly visionary approach to modern luxury.&rdquo;
          </p>
          <span className="text-accent tracking-[0.3em] uppercase text-[10px] md:text-xs font-medium font-sans">
            — Architectural Digest
          </span>
        </div>
      </div>
    </section>
  );
}

