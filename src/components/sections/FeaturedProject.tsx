"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { LuxuryBackground } from "@/components/ui/luxury-background";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const initLabelRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const projectNumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      // ── Phase 1 → 2: frame expands to fill viewport ──────────────
      tl.fromTo(
        imageContainerRef.current,
        { clipPath: "inset(16% 21%)" },
        { clipPath: "inset(0% 0%)", ease: "none", duration: 0.46 }
      );

      // Cream background dissolves
      tl.to(bgRef.current, { opacity: 0, ease: "none", duration: 0.38 }, 0);

      // Corner brackets + init label fade out
      tl.to([bracketsRef.current, initLabelRef.current], { opacity: 0, ease: "none", duration: 0.28 }, 0);

      // Dark cinematic veil sweeps in
      tl.fromTo(veilRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.36 }, 0.22);

      // Ghost project number — bottom-right, ultra-faint
      tl.fromTo(projectNumRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.18 }, 0.44);

      // ── Phase 3: editorial content ───────────────────────────────
      tl.fromTo(eyebrowRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: "none", duration: 0.14 }, 0.50);

      if (titleRef.current) {
        const split = new SplitType(titleRef.current, { types: "lines" });
        gsap.set(split.lines, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          split.lines,
          { clipPath: "inset(0 0 0% 0)", stagger: 0.08, ease: "none", duration: 0.3 },
          0.54
        );
      }

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, ease: "none", duration: 0.12 },
        0.74
      );

      if (descRef.current) {
        const split = new SplitType(descRef.current, { types: "lines" });
        gsap.set(split.lines, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          split.lines,
          { clipPath: "inset(0 0 0% 0)", stagger: 0.04, ease: "none", duration: 0.2 },
          0.76
        );
      }

      tl.fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, ease: "none", duration: 0.12 }, 0.90);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh]"
      style={{ background: "linear-gradient(135deg, #F5E8D9 0%, #EDD9C0 50%, #F0DFC8 100%)" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Warm cream background with chandelier ── */}
        <div ref={bgRef} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #F5E8D9 0%, #EDD9C0 50%, #F0DFC8 100%)" }}
          />
          <LuxuryBackground />
        </div>

        {/* ── Project image — full viewport, initially clipped to gallery frame ── */}
        <div
          ref={imageContainerRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(16% 21%)", willChange: "clip-path" }}
        >
          <Image
            src="/images/featured-project.png"
            alt="The Artisan House"
            fill
            className="object-cover object-center"
            priority={false}
          />

          {/* Dark veil — fades in during expansion */}
          <div
            ref={veilRef}
            className="absolute inset-0"
            style={{
              opacity: 0,
              background:
                "linear-gradient(to top, rgba(8,7,5,0.94) 0%, rgba(8,7,5,0.58) 45%, rgba(8,7,5,0.22) 100%)",
            }}
          />
        </div>

        {/* ── Gold corner brackets (mark the initial frame) ── */}
        <div ref={bracketsRef} className="absolute inset-0 pointer-events-none">
          {/* ┌ top-left */}
          <div
            className="absolute"
            style={{
              top: "16%", left: "21%", width: 30, height: 30,
              borderTop: "1px solid rgba(201,169,110,0.6)",
              borderLeft: "1px solid rgba(201,169,110,0.6)",
            }}
          />
          {/* ┐ top-right */}
          <div
            className="absolute"
            style={{
              top: "16%", right: "21%", width: 30, height: 30,
              borderTop: "1px solid rgba(201,169,110,0.6)",
              borderRight: "1px solid rgba(201,169,110,0.6)",
            }}
          />
          {/* └ bottom-left */}
          <div
            className="absolute"
            style={{
              bottom: "16%", left: "21%", width: 30, height: 30,
              borderBottom: "1px solid rgba(201,169,110,0.6)",
              borderLeft: "1px solid rgba(201,169,110,0.6)",
            }}
          />
          {/* ┘ bottom-right */}
          <div
            className="absolute"
            style={{
              bottom: "16%", right: "21%", width: 30, height: 30,
              borderBottom: "1px solid rgba(201,169,110,0.6)",
              borderRight: "1px solid rgba(201,169,110,0.6)",
            }}
          />
        </div>

        {/* ── Initial label — above the frame, visible before scroll ── */}
        <div
          ref={initLabelRef}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-3"
          style={{ top: "calc(16% - 4rem)" }}
        >
          <span className="block text-foreground/35 text-[0.56rem] tracking-[0.55em] uppercase font-sans">
            Featured Residence &nbsp;·&nbsp; 01
          </span>
          <div className="flex items-center gap-3 w-28">
            <div className="flex-1 h-px bg-foreground/15" />
            <div className="w-[3px] h-[3px] rounded-full bg-foreground/20" />
            <div className="flex-1 h-px bg-foreground/15" />
          </div>
        </div>

        {/* ── Ghost project number ── */}
        <div
          ref={projectNumRef}
          className="absolute right-8 md:right-14 bottom-10 pointer-events-none opacity-0"
        >
          <span
            className="font-display font-light leading-none text-white/[0.04] select-none"
            style={{ fontSize: "clamp(7rem, 14vw, 13rem)", letterSpacing: "-0.04em" }}
          >
            01
          </span>
        </div>

        {/* ── Phase 3: editorial content — pinned to bottom ── */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-end pointer-events-none"
          style={{ paddingBottom: "clamp(2.5rem, 8vh, 6.5rem)" }}
        >
          <div className="flex flex-col items-center text-center px-5 md:px-6 max-w-3xl w-full">

            <span
              ref={eyebrowRef}
              className="block text-[#C9A96E] text-[0.52rem] md:text-[0.56rem] tracking-[0.45em] md:tracking-[0.55em] uppercase font-sans font-medium mb-5 md:mb-7"
              style={{ opacity: 0 }}
            >
              Featured Residence &nbsp;·&nbsp; 01
            </span>

            <h2
              ref={titleRef}
              className="font-display font-light text-white leading-[1.05] mb-5 md:mb-8"
              style={{ fontSize: "clamp(2.2rem, 6.5vw, 5.8rem)", letterSpacing: "-0.02em" }}
            >
              The Artisan House
            </h2>

            {/* Ornamental rule */}
            <div
              ref={lineRef}
              className="flex items-center gap-4 mb-5 md:mb-8 w-35 md:w-45"
              style={{ transformOrigin: "center" }}
            >
              <div className="flex-1 h-px bg-[#C9A96E]/30" />
              <div className="rounded-full bg-[#C9A96E]/55" style={{ width: 4, height: 4 }} />
              <div className="flex-1 h-px bg-[#C9A96E]/30" />
            </div>

            <p
              ref={descRef}
              className="text-white/50 font-light leading-[1.85] max-w-xs md:max-w-lg mb-7 md:mb-10"
              style={{ fontSize: "clamp(0.8rem, 1.25vw, 1.02rem)" }}
            >
              Curved walls in Venetian plaster, a statement arched fireplace in aged travertine, bespoke seating in deep cognac leather. An editorial exploration of form and light.
            </p>

            <div ref={ctaRef} className="pointer-events-auto" style={{ opacity: 0 }}>
              <a
                href="#"
                className="inline-flex items-center gap-4 text-[0.58rem] tracking-[0.44em] uppercase font-sans text-white/60 hover:text-[#C9A96E] transition-colors duration-500 group"
                data-cursor-interact
              >
                View Case Study
                <span className="w-8 md:w-10 h-px bg-white/25 group-hover:bg-[#C9A96E] group-hover:w-12 md:group-hover:w-14 transition-all duration-500" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
