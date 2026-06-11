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
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center mb-20">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="font-display text-[80px] md:text-[100px] leading-none text-accent mb-4 flex items-center">
                <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <span className="font-sans text-xs tracking-widest text-foreground/50 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-[1px] bg-accent mx-auto mb-20 opacity-60" />

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl md:text-4xl text-foreground/80 leading-relaxed mb-8 italic">
            &ldquo;Hatch Group doesn&apos;t just design spaces; they orchestrate atmospheres that breathe life into the architecture. A truly visionary approach to modern luxury.&rdquo;
          </p>
          <span className="text-accent tracking-[0.3em] uppercase text-xs font-medium font-sans">
            — Architectural Digest
          </span>
        </div>
      </div>
    </section>
  );
}

