"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Entrance animation
    const splitTitle = new SplitType(titleRef.current, { types: "words" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

    tl.fromTo(
      splitTitle.words,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" }
    ).fromTo(
      ".footer-cta-btn",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    return () => {
      splitTitle.revert();
    };
  }, []);

  return (
    /* Dark foreground grand finale — no chandelier, pure luxury typography */
    <section ref={sectionRef} className="relative w-full h-[80vh] overflow-hidden bg-foreground">
      {/* Subtle gold gradient top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <span className="block text-accent/50 text-[10px] tracking-[0.5em] uppercase font-sans mb-8">
          Begin Your Journey
        </span>
        <h2
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-background leading-[1.05] mb-14 max-w-5xl"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          Design Your Legacy.
        </h2>
        <button
          className="footer-cta-btn relative overflow-hidden group px-12 py-5 border border-accent/30 bg-transparent text-background uppercase tracking-[0.25em] text-xs font-medium hover:border-accent transition-colors duration-500"
          data-cursor-interact
        >
          <span className="relative z-10">Start a Project</span>
          <div className="absolute inset-0 bg-accent transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out" />
        </button>
      </div>

      {/* Subtle gold gradient bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  );
}
