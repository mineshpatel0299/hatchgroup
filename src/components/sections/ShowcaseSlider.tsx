"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  {
    src: "/images/residential-thumb.png",
    title: "Residential Interior",
    description:
      "Bespoke luxury homes designed for unparalleled living — every space curated to reflect personal elegance.",
  },
  {
    src: "/images/commercial-thumb.png",
    title: "Commercial Space",
    description:
      "Premium workspaces that inspire and elevate brand identity, fostering productivity and lasting impressions.",
  },
  {
    src: "/images/hospitality-thumb.png",
    title: "Hospitality Design",
    description:
      "Cinematic environments for 5-star hotels and resorts — immersive experiences that define the essence of luxury.",
  },
  {
    src: "/images/turnkey-thumb.png",
    title: "Turnkey Project",
    description:
      "End-to-end execution with uncompromising material quality — from concept to completion, seamlessly.",
  },
  {
    src: "/images/featured-project.png",
    title: "Featured Project",
    description:
      "A showcase of our finest work — where vision meets craftsmanship in every detail.",
  },
];

const INTERVAL = 4500;

export default function ShowcaseSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative luxe-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      <div className="relative w-full" style={{ height: "clamp(50vh, 75vw, 90vh)" }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[current].src}
              alt={SLIDES[current].title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient for text legibility */}
        <div
          className="absolute inset-x-0 bottom-0 z-1 pointer-events-none"
          style={{
            height: "55%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        {/* Text content */}
        <div className="absolute bottom-0 inset-x-0 z-10 px-6 md:px-12 pb-20 md:pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-white text-2xl md:text-4xl lg:text-5xl tracking-wide mb-3">
                {SLIDES[current].title}
              </h3>
              <p className="text-white/75 text-sm md:text-base font-light leading-relaxed max-w-xl">
                {SLIDES[current].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots — bottom center */}
        <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-start gap-3 px-6 md:px-12 pb-8 md:pb-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative rounded-full transition-all duration-500"
              style={{
                width: i === current ? 12 : 8,
                height: i === current ? 12 : 8,
                backgroundColor:
                  i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
                boxShadow: i === current ? "0 0 8px rgba(255,255,255,0.4)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
