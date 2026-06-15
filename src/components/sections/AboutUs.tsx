"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
};

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Multi-speed parallax: each layer drifts at its own pace
  const yArch    = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const ySmall   = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yFrame   = useTransform(scrollYProgress, [0, 1], [30, -80]);
  const yGhost   = useTransform(scrollYProgress, [0, 1], [40, -120]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden luxe-emerald">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      {/* Ghost vertical wordmark drifting on its own speed */}
      <motion.div
        style={{ y: yGhost }}
        className="absolute right-[-2%] top-[10%] pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        <span
          className="font-display font-light text-foreground/[0.045] leading-none"
          style={{ fontSize: "clamp(10rem, 18vw, 18rem)", writingMode: "vertical-rl" }}
        >
          ATELIER
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">

        {/* ── Left: editorial copy ── */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="block text-accent text-[9px] md:text-[11px] tracking-[0.5em] uppercase font-medium mb-7">
              The Studio · Est. 2014
            </span>
            <h2
              className="font-display font-light text-foreground leading-[1.12] mb-9"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.01em" }}
            >
              Crafting spaces,
              <br />
              writing <span className="luxe-gradient-text">stories.</span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-foreground/55 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-md mb-8">
              <span className="font-display text-accent text-5xl float-left leading-[0.8] mr-3 mt-1">S</span>
              ince 2014, Hatch Group has quietly redefined the language of luxury
              interiors across India. Every project is an act of authorship, not decoration.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.42em] uppercase text-accent hover:text-foreground transition-colors duration-500 group"
              data-cursor-interact
            >
              Our Story
              <span className="w-8 h-px bg-accent/50 group-hover:w-12 group-hover:bg-foreground/50 transition-all duration-500" />
            </a>
          </motion.div>
        </div>

        {/* ── Right: layered parallax image stack ── */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative h-[55vh] md:h-[68vh]">

          {/* Gold offset frame — slowest layer */}
          <motion.div
            style={{ y: yFrame }}
            className="absolute top-[4%] right-[2%] w-[68%] h-[78%] border border-accent/40 rounded-t-full pointer-events-none"
          />

          {/* Main arch image */}
          <motion.div
            style={{ y: yArch }}
            className="absolute top-[8%] right-[8%] w-[68%] h-[78%] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(28,36,32,0.35)]"
          >
            <Image
              src="/images/hospitality-thumb.png"
              alt="Hatch Group interior"
              fill
              className="object-cover scale-[1.15]"
              sizes="(min-width: 1024px) 40vw, 70vw"
            />
          </motion.div>

          {/* Smaller overlapping image — fastest layer, on ivory mat */}
          <motion.div
            style={{ y: ySmall }}
            className="absolute bottom-[2%] left-[2%] w-[44%] aspect-[4/5] bg-ivory p-2.5 md:p-3 shadow-[0_30px_60px_-25px_rgba(28,36,32,0.4)]"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/images/residential-thumb.png"
                alt="Detail — bespoke residence"
                fill
                className="object-cover scale-[1.12]"
                sizes="(min-width: 1024px) 25vw, 45vw"
              />
            </div>
            <span className="absolute -bottom-7 left-1 text-[8px] tracking-[0.4em] uppercase text-foreground/35">
              N°01 — The Craft
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
