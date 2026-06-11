"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", // Luxury mansion
  },
  {
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop", // Modern interior
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", // Luxury modern house
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop", // Premium living room
  },
  {
    url: "https://images.unsplash.com/photo-1613490908676-e633d4da3d61?q=80&w=2070&auto=format&fit=crop", // Luxury dining room
  },
  {
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070&auto=format&fit=crop", // Modern bedroom
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Luxury architecture
  },
  {
    url: "https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?q=80&w=2070&auto=format&fit=crop", // Minimalist interior
  },
];

const VisionMissionParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImageInnerRef = useRef<HTMLImageElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 4 screens of scrolling
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Scroll parallax up for the floating images
      // We will select all images inside the floating container except the hero one
      tl.to(
        ".parallax-item",
        {
          y: (i) => -800 - i * 200, // Move up at different speeds
          opacity: 0,
          ease: "none",
        },
        0
      );

      // Phase 2: Expand the hero image
      tl.to(
        heroImageRef.current,
        {
          width: "100vw",
          height: "100vh",
          y: 0, // ensure it's centered
          borderRadius: "0px",
          ease: "power2.inOut",
        },
        "<=0.2"
      );

      // Darken the hero image slightly to make text readable
      tl.to(
        heroImageInnerRef.current,
        {
          filter: "brightness(0.4)",
          ease: "none",
        },
        "<"
      );

      // Phase 3: Show the slider and slide horizontally
      tl.to(
        sliderRef.current,
        {
          opacity: 1,
          ease: "none",
          duration: 0.1,
        },
        ">"
      );

      tl.to(
        ".slider-content",
        {
          xPercent: -100, // Slide to the second panel (Mission)
          ease: "none",
        },
        ">"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Floating Elements (Interactive with mouse) */}
      <div ref={parallaxContainerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Floating sensitivity={-1} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[10%] left-[10%] parallax-item">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={exampleImages[0].url}
              className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-xl"
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[20%] left-[80%] parallax-item">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={exampleImages[1].url}
              className="w-32 h-40 md:w-48 md:h-64 object-cover rounded-xl"
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[60%] left-[5%] parallax-item">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={exampleImages[3].url}
              className="w-40 h-32 md:w-56 md:h-48 object-cover rounded-xl"
            />
          </FloatingElement>
          <FloatingElement depth={1.5} className="top-[70%] left-[75%] parallax-item">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={exampleImages[4].url}
              className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-xl"
            />
          </FloatingElement>
          <FloatingElement depth={0.8} className="top-[5%] left-[50%] parallax-item">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={exampleImages[5].url}
              className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-xl"
            />
          </FloatingElement>
        </Floating>
      </div>

      {/* Center Hero Image that will expand */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          ref={heroImageRef}
          className="relative w-64 h-80 md:w-96 md:h-[30rem] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
        >
          <img
            ref={heroImageInnerRef}
            src={exampleImages[2].url}
            alt="Luxury architecture"
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
      </div>

      {/* Horizontal Slider for Vision & Mission */}
      <div
        ref={sliderRef}
        className="absolute inset-0 z-20 opacity-0 pointer-events-none flex"
      >
        <div className="flex w-[200vw] h-full slider-content will-change-transform">
          {/* Vision Panel */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center text-white px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl text-center space-y-6"
            >
              <h2 className="text-5xl md:text-8xl font-calendas italic font-light tracking-tight">
                Our Vision
              </h2>
              <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto">
                To redefine luxury living through exceptional design, creating spaces that inspire and elevate the human experience on a global scale.
              </p>
            </motion.div>
          </div>

          {/* Mission Panel */}
          <div className="w-[100vw] h-full flex flex-col items-center justify-center text-white px-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl text-center space-y-6"
            >
              <h2 className="text-5xl md:text-8xl font-calendas italic font-light tracking-tight">
                Our Mission
              </h2>
              <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto">
                Crafting unparalleled architectural masterpieces that seamlessly blend innovation, sustainability, and timeless elegance, delivering lasting value to our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionParallax;
