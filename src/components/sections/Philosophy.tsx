"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { LuxuryBackground } from "@/components/ui/luxury-background";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef1.current || !textRef2.current || !sectionRef.current) return;

    const split1 = new SplitType(textRef1.current, { types: "lines" });
    const split2 = new SplitType(textRef2.current, { types: "lines" });

    gsap.set([split1.lines, split2.lines], { clipPath: "inset(0 0 100% 0)" });
    gsap.set(ruleRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      },
    });

    tl.to(split1.lines, { clipPath: "inset(0 0 0% 0)", stagger: 0.1, ease: "none" })
      .to(split2.lines, { clipPath: "inset(0 0 0% 0)", stagger: 0.1, ease: "none" })
      .to(ruleRef.current, { scaleX: 1, opacity: 1, ease: "none" }, 0.8);

    return () => { split1.revert(); split2.revert(); };
  }, []);

  return (
    /* Warm amber/gold tint — alternating section WITH chandelier */
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F5E8D9 0%, #EDD9C0 50%, #F0DFC8 100%)" }}
    >
      <LuxuryBackground />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl px-5 md:px-6 mx-auto text-center">
        <span className="block text-accent/60 text-[9px] md:text-xs tracking-[0.45em] uppercase font-medium mb-7 md:mb-10 font-sans">
          Our Philosophy
        </span>
        <h2
          ref={textRef1}
          className="text-[1.85rem] sm:text-4xl md:text-6xl lg:text-7xl font-display text-foreground/40 leading-[1.15] mb-3 md:mb-4"
        >
          We don&apos;t decorate spaces.
        </h2>
        <h2
          ref={textRef2}
          className="text-[1.85rem] sm:text-4xl md:text-6xl lg:text-7xl font-display text-foreground leading-[1.15] mb-10 md:mb-12"
        >
          We architect experiences.
        </h2>
        <div ref={ruleRef} className="w-16 md:w-20 h-px bg-accent" />
      </div>
    </section>
  );
}

