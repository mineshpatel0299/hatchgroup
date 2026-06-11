"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const IMGS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613490908676-e633d4da3d61?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?q=80&w=2070&auto=format&fit=crop",
];

export default function VisionMissionParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Hero image starts off-screen below
    gsap.set(heroRef.current, { y: "100vh" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=650%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0→3): Parallax image field scrolls upward
      tl.to(
        parallaxRef.current,
        {
          y: () => -window.innerHeight * 2,
          ease: "none",
          duration: 3,
        },
        0
      );

      // Fade "Our Work" text the moment the card starts rising
      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -20,
          ease: "power2.in",
          duration: 0.4,
        },
        2.0
      );

      // Phase 2 (2.0→2.8): Hero card rises from bottom — linear, no deceleration
      tl.to(
        heroRef.current,
        {
          y: 0,
          ease: "none",
          duration: 0.8,
        },
        2.0
      );

      // Phase 3 (2.4→4.4): Expansion starts while card is still rising — one fluid motion
      tl.to(
        heroRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "power2.inOut",
          duration: 2.0,
        },
        2.4
      );

      tl.to(
        heroImgRef.current,
        {
          filter: "brightness(0.45)",
          ease: "none",
          duration: 2.0,
        },
        2.4
      );

      // Phase 4 (4.5→4.7): Slider fades in over the expanded image
      tl.to(
        sliderRef.current,
        {
          opacity: 1,
          ease: "none",
          duration: 0.2,
        },
        4.5
      );

      // Phase 5 (4.5→6.0): Slider pans from Vision to Mission
      tl.to(
        ".vm-slider-content",
        {
          xPercent: -50,
          ease: "none",
          duration: 1.5,
        },
        4.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#F4EFE6" }}
    >
      {/* ── Parallax image field (300vh tall, scrolls up) ── */}
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 w-full h-[300vh] z-0 pointer-events-none"
      >
        <Floating sensitivity={-0.6} className="w-full h-full overflow-hidden">

          {/* ── First viewport images ── */}

          {/* Large left image — pulled in from edge */}
          <FloatingElement depth={0.4} className="top-[1%] left-[2%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.88 }}
              transition={{ duration: 1.2 }}
              src={IMGS[0]}
              className="w-40 h-[380px] md:w-[200px] md:h-[450px] object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Top-center-right tall image (slightly behind title area) */}
          <FloatingElement depth={0.55} className="top-[6%] left-[36%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.72 }}
              transition={{ duration: 1.2, delay: 0.1 }}
              src={IMGS[2]}
              className="w-44 h-[300px] md:w-[210px] md:h-[340px] object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Top-right image */}
          <FloatingElement depth={0.8} className="top-[4%] right-[4%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 1.2, delay: 0.08 }}
              src={IMGS[1]}
              className="w-48 h-56 md:w-[240px] md:h-[260px] object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Center-left small */}
          <FloatingElement depth={1.0} className="top-[30%] left-[6%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              src={IMGS[3]}
              className="w-28 h-36 md:w-36 md:h-44 object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Right-center ghost/faded — partially off right edge */}
          <FloatingElement depth={1.2} className="top-[40%] right-[-1%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.38 }}
              transition={{ duration: 1.2, delay: 0.25 }}
              src={IMGS[4]}
              className="w-28 h-40 md:w-36 md:h-52 object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Bottom-left — starts just below fold */}
          <FloatingElement depth={0.65} className="top-[58%] left-[3%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.82 }}
              transition={{ duration: 1 }}
              src={IMGS[6]}
              className="w-44 h-64 md:w-56 md:h-80 object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Bottom-center */}
          <FloatingElement depth={1.1} className="top-[63%] left-[38%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
              src={IMGS[5]}
              className="w-56 h-40 md:w-72 md:h-48 object-cover rounded-xl"
            />
          </FloatingElement>

          {/* Bottom-right */}
          <FloatingElement depth={0.75} className="top-[65%] right-[4%]">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              transition={{ duration: 1 }}
              src={IMGS[7]}
              className="w-40 h-28 md:w-56 md:h-36 object-cover rounded-xl"
            />
          </FloatingElement>

        </Floating>
      </div>

      {/* ── "Our Work" centered title ── */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <p
          className="text-[9px] tracking-[0.55em] uppercase font-medium mb-7"
          style={{ color: "#9A8570" }}
        >
          Selected Portfolio
        </p>

        <h2
          className="font-calendas italic text-center leading-none"
          style={{
            fontSize: "clamp(5.5rem, 11vw, 10rem)",
            color: "#1A1815",
          }}
        >
          Our
          <br />
          Work
        </h2>

        <div className="flex items-center gap-4 mt-9">
          <div className="h-px" style={{ width: 50, backgroundColor: "#C4A97D" }} />
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="2.5" fill="#C4A97D" />
          </svg>
          <div className="h-px" style={{ width: 50, backgroundColor: "#C4A97D" }} />
        </div>
      </div>

      {/* ── Hero image — rises from bottom, then expands fullscreen ── */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div
          ref={heroRef}
          className="relative overflow-hidden shadow-2xl will-change-transform"
          style={{
            width: "22rem",
            height: "28rem",
            borderRadius: "1rem",
          }}
        >
          <img
            ref={heroImgRef}
            src={IMGS[2]}
            alt="Our Work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Vision / Mission slider — appears over expanded image ── */}
      <div
        ref={sliderRef}
        className="absolute inset-0 z-30 opacity-0 overflow-hidden pointer-events-none"
      >
        {/* Track is 200vw wide; pans left by 50% (=100vw) to reveal Mission */}
        <div className="vm-slider-content flex w-[200vw] h-full will-change-transform">

          {/* Vision */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-6 md:px-20 text-white">
            <p className="text-[9px] tracking-[0.55em] uppercase font-medium mb-8 text-white/50">
              Our Vision
            </p>
            <h2
              className="font-calendas italic text-center leading-none"
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
            >
              Vision
            </h2>
            <div className="flex items-center gap-4 mt-8 mb-8">
              <div className="h-px" style={{ width: 50, backgroundColor: "#C4A97D" }} />
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="2.5" fill="#C4A97D" />
              </svg>
              <div className="h-px" style={{ width: 50, backgroundColor: "#C4A97D" }} />
            </div>
            <p className="text-base md:text-xl font-light text-white/70 leading-relaxed max-w-xl text-center">
              To redefine luxury living through exceptional design, creating spaces that inspire
              and elevate the human experience on a global scale.
            </p>
          </div>

          {/* Mission */}
          <div className="w-screen h-full flex flex-col items-center justify-center px-6 md:px-20 text-white">
            <p className="text-[9px] tracking-[0.55em] uppercase font-medium mb-8 text-white/50">
              Our Mission
            </p>
            <h2
              className="font-calendas italic text-center leading-none"
              style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
            >
              Mission
            </h2>
            <div className="flex items-center gap-4 mt-8 mb-8">
              <div className="h-px" style={{ width: 50, backgroundColor: "#C4A97D" }} />
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="2.5" fill="#C4A97D" />
              </svg>
              <div className="h-px" style={{ width: 50, backgroundColor: "#C4A97D" }} />
            </div>
            <p className="text-base md:text-xl font-light text-white/70 leading-relaxed max-w-xl text-center">
              Crafting unparalleled architectural masterpieces that seamlessly blend innovation,
              sustainability, and timeless elegance — delivering lasting value to our clients.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
