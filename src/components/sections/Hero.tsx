"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !titleRef.current) return;

    // Split title for entrance animation
    const splitTitle = new SplitType(titleRef.current, { types: "words" });

    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    entranceTl
      .fromTo(".hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.3 })
      .fromTo(splitTitle.words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, "-=0.6")
      .fromTo(".hero-subline", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
      .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");

    // Scroll-scrubbed video walkthrough
    const scrubVideo = () => {
      if (!video.duration) return;

      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const target = self.progress * video.duration;
          // Smooth lerp towards target to keep it buttery
          video.currentTime = target;
        },
      });
    };

    // Wait for metadata so duration is known
    if (video.readyState >= 1) {
      scrubVideo();
    } else {
      video.addEventListener("loadedmetadata", scrubVideo, { once: true });
    }

    // Fade overlay text out as you scroll deeper
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "30% top",
        scrub: 1,
      },
    });

    return () => {
      splitTitle.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /* Outer section is tall — gives scroll room for the walkthrough */
    <section ref={outerRef} className="relative h-[400vh] bg-background">
      {/* Sticky viewport — stays pinned while outer scrolls */}
      <div ref={stickyRef} className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src="/vids/gg.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />


        {/* Hero text content */}
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pt-20"
        >
          <span className="hero-eyebrow block text-accent text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-6 relative z-10">
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

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-foreground/50 text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-foreground/30 origin-top animate-[grow_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
