"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const leftRuleRef = useRef<HTMLDivElement>(null);
  const rightRuleRef = useRef<HTMLDivElement>(null);

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

      // Phase 1 → 2: big clipped text breathes upward and dissolves
      tl.to(bigTextRef.current, {
        scale: 1.18,
        opacity: 0,
        ease: "none",
        duration: 0.36,
      });

      // Phase 2: image wipes up from bottom
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 0.42 },
        0.26
      );

      tl.fromTo(grainRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.42 }, 0.26);
      tl.fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.5 }, 0.36);

      // Left + right vertical rules grow
      tl.fromTo(
        [leftRuleRef.current, rightRuleRef.current],
        { scaleY: 0 },
        { scaleY: 1, ease: "none", duration: 0.2 },
        0.58
      );

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "none", duration: 0.14 },
        0.58
      );

      // Headline — split by lines
      if (headlineRef.current) {
        const split = new SplitType(headlineRef.current, { types: "lines" });
        gsap.set(split.lines, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          split.lines,
          { clipPath: "inset(0 0 0% 0)", stagger: 0.06, ease: "none", duration: 0.3 },
          0.62
        );
      }

      // Gold rule draws across
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center center" },
        { scaleX: 1, ease: "none", duration: 0.14 },
        0.76
      );

      // Paragraph reveal
      if (storyRef.current) {
        const split = new SplitType(storyRef.current, { types: "lines" });
        gsap.set(split.lines, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          split.lines,
          { clipPath: "inset(0 0 0% 0)", stagger: 0.04, ease: "none", duration: 0.22 },
          0.78
        );
      }

      // Signature mark
      tl.fromTo(
        signatureRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "none", duration: 0.12 },
        0.92
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#07060400]" style={{ background: "#0a0906" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* ── Phase 1: Image-clipped HATCH letterforms ── */}
        <div
          ref={bigTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span
            className="font-display font-light leading-none select-none"
            style={{
              fontSize: "clamp(80px, 22vw, 340px)",
              letterSpacing: "-0.02em",
              backgroundImage: "url('/images/residential-thumb.png')",
              backgroundSize: "120% auto",
              backgroundPosition: "center 35%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "brightness(1.2) saturate(1.05)",
            }}
          >
            HATCH
          </span>
        </div>

        {/* ── Phase 2: Full-bleed image wipe ── */}
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <Image
            src="/images/residential-thumb.png"
            alt="Hatch Group Studio"
            fill
            className="object-cover object-center scale-[1.04]"
          />
          {/* Deep cinematic veil — darker at bottom, lighter at centre */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0906]/95 via-[#0a0906]/60 to-[#0a0906]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0906]/40 via-transparent to-[#0a0906]/40" />
        </div>

        {/* Warm gold bokeh glow — top-right ambience */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none opacity-0"
          style={{
            top: "-10%",
            right: "-5%",
            width: "55vw",
            height: "55vw",
            background: "radial-gradient(ellipse at center, rgba(201,169,110,0.10) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Film grain */}
        <div
          ref={grainRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Gold vertical rule — left */}
        <div
          ref={leftRuleRef}
          className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 w-px hidden md:block"
          style={{
            height: "38vh",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.35) 30%, rgba(201,169,110,0.35) 70%, transparent)",
            transformOrigin: "center top",
          }}
        />

        {/* Gold vertical rule — right */}
        <div
          ref={rightRuleRef}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-px hidden md:block"
          style={{
            height: "38vh",
            background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.35) 30%, rgba(201,169,110,0.35) 70%, transparent)",
            transformOrigin: "center top",
          }}
        />

        {/* ── Phase 3: Editorial content — centred ── */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-24 lg:px-40 max-w-5xl w-full">

          <span
            ref={eyebrowRef}
            className="opacity-0 block text-[#C9A96E] text-[0.58rem] tracking-[0.55em] uppercase font-sans font-medium mb-10"
          >
            The Studio &nbsp;·&nbsp; Est. 2014
          </span>

          <h2
            ref={headlineRef}
            className="font-display font-light text-white leading-[1.12] mb-10"
            style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)", letterSpacing: "-0.01em" }}
          >
            We don&apos;t decorate rooms.<br />
            We write the stories<br />
            they will hold.
          </h2>

          {/* Ornamental rule */}
          <div
            ref={lineRef}
            className="flex items-center gap-4 mb-10 w-full max-w-xs"
            style={{ transformOrigin: "center" }}
          >
            <div className="flex-1 h-px bg-[#C9A96E]/30" />
            <div className="w-1 h-1 rounded-full bg-[#C9A96E]/50" />
            <div className="flex-1 h-px bg-[#C9A96E]/30" />
          </div>

          <p
            ref={storyRef}
            className="text-white/50 font-light leading-[1.85] max-w-xl"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}
          >
            Founded in 2014, Hatch Group has quietly redefined the language of luxury interiors across India. We draw on the richness of Indian craft while speaking the visual vocabulary of the world's finest residences and hotels. Every project is an act of authorship — not decoration.
          </p>

          {/* Refined signature mark */}
          <div ref={signatureRef} className="opacity-0 mt-12 flex flex-col items-center gap-1">
            <div className="w-6 h-px bg-[#C9A96E]/40" />
            <span className="text-[#C9A96E]/40 text-[0.55rem] tracking-[0.5em] uppercase font-sans mt-1">
              Hatch Group
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
