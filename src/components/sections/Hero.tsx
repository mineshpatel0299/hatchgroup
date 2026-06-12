"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const FLOATERS = [
  { src: "/images/residential-thumb.png",  className: "top-[12%] left-[4%] w-[26vw] sm:w-[18vw] md:w-[15vw] aspect-[3/4]",            depth: 0.6, arch: true,  delay: 0.4 },
  { src: "/images/hospitality-thumb.png",  className: "top-[6%] right-[6%] w-[30vw] sm:w-[22vw] md:w-[17vw] aspect-[4/5]",            depth: 1,   arch: false, delay: 0.55 },
  { src: "/images/commercial-thumb.png",   className: "bottom-[14%] left-[8%] w-[28vw] sm:w-[20vw] md:w-[14vw] aspect-[4/5]",         depth: 1.4, arch: false, delay: 0.7 },
  { src: "/images/turnkey-thumb.png",      className: "bottom-[8%] right-[10%] w-[24vw] sm:w-[18vw] md:w-[13vw] aspect-[3/4]",        depth: 0.8, arch: true,  delay: 0.85 },
  { src: "/images/featured-project.png",   className: "top-[40%] right-[26%] hidden lg:block w-[9vw] aspect-square",                  depth: 2,   arch: false, delay: 1 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Content drifts up & fades, imagery sinks slower — layered parallax exit
  const contentY  = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentO  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const floatersY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const floatersO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden luxe-canvas">
      {/* Ambient champagne washes */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%", left: "30%", width: "55vw", height: "55vw",
          background: "radial-gradient(ellipse at center, rgba(214,189,148,0.35) 0%, transparent 62%)",
          animation: "luxe-float 16s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      {/* Mouse-parallax floating imagery */}
      <motion.div style={{ y: floatersY, opacity: floatersO }} className="absolute inset-0">
        <Floating sensitivity={-0.8} className="pointer-events-none">
          {FLOATERS.map((f, i) => (
            <FloatingElement key={i} depth={f.depth} className={f.className}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.4, delay: f.delay, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full h-full overflow-hidden shadow-[0_30px_60px_-20px_rgba(28,36,32,0.25)] ${
                  f.arch ? "rounded-t-full" : "rounded-sm"
                }`}
              >
                <Image src={f.src} alt="" fill className="object-cover" sizes="30vw" />
                {/* Soft ivory veil so imagery sits back behind type */}
                <div className="absolute inset-0 bg-ivory/15" />
              </motion.div>
            </FloatingElement>
          ))}
        </Floating>
      </motion.div>

      {/* Centre editorial content */}
      <motion.div
        style={{ y: contentY, opacity: contentO }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-5 md:px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 md:gap-6 mb-7 md:mb-9"
        >
          <div className="w-8 md:w-14 h-px luxe-rule" />
          <span className="block text-accent text-[9px] sm:text-[11px] md:text-xs font-medium tracking-[0.45em] uppercase">
            Interior Atelier · Est. 2014
          </span>
          <div className="w-8 md:w-14 h-px luxe-rule" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-foreground leading-[1.04] mb-7 md:mb-9 max-w-6xl"
          style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)", letterSpacing: "-0.02em" }}
        >
          The Art of
          <br />
          <span className="luxe-gradient-text">Believable Luxury</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-foreground/55 text-[0.92rem] sm:text-lg md:text-xl font-light max-w-xs sm:max-w-lg md:max-w-2xl mb-10 md:mb-12 leading-[1.8]"
        >
          We architect experiences that transcend traditional interior design —
          cinematic aesthetics, uncompromising material quality.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden group px-10 py-4 md:px-13 md:py-5 bg-foreground text-ivory uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-medium"
          data-cursor-interact
        >
          <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">
            Discover the Maison
          </span>
          <div
            className="absolute inset-0 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out"
            style={{ background: "linear-gradient(115deg, #D6BD94 0%, #C2A878 60%, #A98C5F 100%)" }}
          />
        </motion.button>
      </motion.div>

      {/* Bottom meta bar */}
      <div className="absolute bottom-9 md:bottom-11 inset-x-8 md:inset-x-14 z-10 hidden sm:flex items-end justify-between pointer-events-none">
        <span className="text-foreground/35 text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-sans">
          Mumbai · New Delhi · Dubai
        </span>
        <span className="text-foreground/35 text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-sans">
          Interiors · Architecture · Turnkey
        </span>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-accent/80 text-[8px] md:text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-accent/70 to-transparent origin-top animate-[grow_1.8s_ease-in-out_infinite]" />
      </div>
    </section>
  );
}
