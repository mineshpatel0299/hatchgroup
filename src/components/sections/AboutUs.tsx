"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "12+", label: "Years of Mastery" },
  { value: "200+", label: "Projects Completed" },
  { value: "18", label: "Design Awards" },
  { value: "3", label: "Countries" },
];

const TICKER_ITEMS = [
  "Architectural Digest India",
  "AD100 Studio",
  "Elle Decor Grand Prix",
  "Best Luxury Studio 2023",
  "Forbes Design Collective",
  "India Design Forum",
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);
  const tickerInnerRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ticker: infinite marquee
      if (tickerInnerRef.current) {
        const width = tickerInnerRef.current.scrollWidth / 2;
        gsap.to(tickerInnerRef.current, {
          x: -width,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
      }

      // Scrubbed scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      // Phase 1 → 2: big clipped text scales up and evaporates (0 → 0.38)
      tl.to(bigTextRef.current, {
        scale: 1.25,
        opacity: 0,
        ease: "none",
        duration: 0.38,
      });

      // Phase 2: image sweeps up from bottom (0.28 → 0.68)
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 0.4 },
        0.28
      );

      // Grain fades with the image
      tl.fromTo(grainRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.4 }, 0.28);

      // Phase 3: content rises (0.58 → 0.82)
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, ease: "none", duration: 0.3 },
        0.58
      );

      // Gold rule draws left→right (0.62 → 0.75)
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, ease: "none", duration: 0.13 },
        0.62
      );

      // Story text clip reveal (0.64 → 0.88)
      if (storyRef.current) {
        const split = new SplitType(storyRef.current, { types: "lines" });
        gsap.set(split.lines, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          split.lines,
          { clipPath: "inset(0 0 0% 0)", stagger: 0.04, ease: "none", duration: 0.26 },
          0.64
        );
      }

      // Stats cascade in (0.68 → 0.95)
      statRefs.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.set(stat, { opacity: 0, y: 36 });
        tl.to(stat, { opacity: 1, y: 0, ease: "none", duration: 0.14 }, 0.68 + i * 0.06);
      });

      // Ticker slides into view
      tl.fromTo(
        tickerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "none", duration: 0.14 },
        0.84
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#0a0905]">
      {/* CSS sticky panel */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* ── Phase 1: Giant clipped-image text ── */}
        <div ref={bigTextRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="font-display font-light leading-none select-none"
            style={{
              fontSize: "clamp(72px, 21vw, 320px)",
              letterSpacing: "-0.03em",
              backgroundImage: "url('/images/residential-thumb.png')",
              backgroundSize: "110% auto",
              backgroundPosition: "center 30%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "brightness(1.15) saturate(1.1)",
            }}
          >
            HATCH
          </span>
          {/* Subtle founding-year beneath */}
          <span
            className="absolute font-display font-light text-white/8 select-none"
            style={{ fontSize: "clamp(14px, 2vw, 22px)", letterSpacing: "0.6em", bottom: "calc(50% - clamp(50px,13vw,200px))" }}
          >
            EST. 2014
          </span>
        </div>

        {/* ── Phase 2: Full-bleed image (sweeps up) ── */}
        <div ref={imageRef} className="absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
          <Image
            src="/images/residential-thumb.png"
            alt="Hatch Group Studio"
            fill
            className="object-cover object-center"
            priority={false}
          />
          {/* Rich dark veil so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0905]/85 via-[#0a0905]/70 to-[#0a0905]/60" />
        </div>

        {/* Film-grain noise overlay */}
        <div
          ref={grainRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Thin gold vertical rule — decorative left edge */}
        <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#C9A96E]/50 to-transparent hidden md:block" />

        {/* ── Phase 3: Story + Stats content ── */}
        <div
          ref={contentRef}
          className="relative z-10 max-w-7xl w-full px-6 md:px-16 lg:px-24 opacity-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-28 items-start">

            {/* Left column — story */}
            <div>
              <span className="block text-[#C9A96E] text-[0.6rem] tracking-[0.45em] uppercase font-sans font-medium mb-8">
                About The Studio
              </span>
              <h3 className="font-display text-4xl md:text-5xl lg:text-[3.6rem] text-white leading-[1.1] mb-8 font-light">
                Born from a belief that interiors should stir the soul.
              </h3>

              {/* Animated rule */}
              <div ref={lineRef} className="w-full h-[1px] bg-[#C9A96E]/30 mb-8" style={{ transformOrigin: "left center" }} />

              <p
                ref={storyRef}
                className="text-white/55 text-lg font-light leading-relaxed max-w-md"
              >
                Founded in 2014, Hatch Group has quietly redefined the language of luxury interiors across India. We draw on the richness of Indian craft traditions while speaking the visual vocabulary of the world's finest hotels and residences. Every project is an act of authorship — not decoration.
              </p>
            </div>

            {/* Right column — stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:pt-16">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { statRefs.current[i] = el; }}
                  className="border-t border-white/10 pt-5"
                >
                  <div
                    className="font-display font-light leading-none mb-2 text-white"
                    style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#C9A96E]/70 text-[0.6rem] tracking-[0.25em] uppercase font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Ticker — editorial recognition strip ── */}
        <div
          ref={tickerRef}
          className="absolute bottom-0 left-0 right-0 border-t border-white/8 overflow-hidden opacity-0"
        >
          <div className="flex items-center h-11 bg-[#0a0905]/60 backdrop-blur-sm">
            <div ref={tickerInnerRef} className="flex items-center gap-0 whitespace-nowrap will-change-transform">
              {tickerContent.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="text-white/35 text-[0.6rem] font-sans tracking-[0.35em] uppercase px-8">
                    {item}
                  </span>
                  <span className="text-[#C9A96E]/40 text-[0.55rem]">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
