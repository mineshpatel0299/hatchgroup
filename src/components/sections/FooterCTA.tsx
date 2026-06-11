"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current || !titleRef.current) return;

    // Parallax background
    gsap.to(mediaRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

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
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#0D0D0D]">
      {/* Parallax Background */}
      <div ref={mediaRef} className="absolute inset-0 w-full h-[120%] top-0">
        <Image
          src="/images/footer-cta-fallback.png"
          alt="Luxury Penthouse Terrace at Dusk"
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0D0D0D]/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h2
          ref={titleRef}
          className="font-display text-5xl md:text-8xl text-foreground leading-[1.1] mb-12 max-w-4xl"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          Ready to architect your experience?
        </h2>
        <button
          className="footer-cta-btn relative overflow-hidden group px-8 py-4 border border-white/20 bg-transparent text-foreground uppercase tracking-widest text-xs font-medium hover:border-accent transition-colors duration-500"
          data-cursor-interact
        >
          <span className="relative z-10">Start a Project</span>
          <div className="absolute inset-0 bg-accent transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out" />
        </button>
      </div>
    </section>
  );
}
