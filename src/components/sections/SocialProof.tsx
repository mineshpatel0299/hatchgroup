"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

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
    <section ref={sectionRef} className="relative py-40 bg-background overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply">
        <Image
          src="/images/materials-bg.png"
          alt="Premium Materials"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <div className="font-display text-[80px] leading-none text-accent mb-4 flex items-center">
                <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <span className="font-sans text-xs tracking-widest text-foreground/60 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
