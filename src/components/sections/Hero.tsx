"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text
    const splitTitle = new SplitType(titleRef.current, { types: "words" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-eyebrow",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(
        splitTitle.words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08 },
        "-=0.6"
      )
      .fromTo(
        ".hero-subline",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      );

    // Scroll parallax
    gsap.to(mediaRef.current, {
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      splitTitle.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-background">
      {/* Media Background */}
      <div ref={mediaRef} className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <Image
          src="/images/hero.png"
          alt="Hatch Group Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pt-20"
      >
        <span className="hero-eyebrow block text-accent text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6">
          Architectural Digest India x Hatch
        </span>
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-8xl lg:text-9xl text-foreground font-medium leading-[1.1] mb-8 max-w-5xl"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          Believable Luxury.
        </h1>
        <p className="hero-subline text-foreground/80 text-lg md:text-xl font-light max-w-2xl mb-12">
          We architect experiences that transcend traditional interior design, blending cinematic aesthetics with uncompromising material quality.
        </p>
        <button
          className="hero-cta relative overflow-hidden group px-8 py-4 border border-foreground/20 bg-transparent text-foreground uppercase tracking-widest text-xs font-medium hover:border-accent transition-colors duration-500"
          data-cursor-interact
        >
          <span className="relative z-10">Discover Projects</span>
          <div className="absolute inset-0 bg-accent transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out" />
        </button>
      </div>
    </section>
  );
}
