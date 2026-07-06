"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_28_46_PM_ybvhq4.png",
    title: "Dynamic Business Hubs",
    description: "A premium residential development designed to elevate everyday living through thoughtful architecture and refined interiors.",
    href: "/project/1",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png",
    title: "Contemporary Commercials",
    description: "Meticulously designed spaces that balance sophistication with warmth — where every detail speaks of quality craftsmanship.",
    href: "/project/2",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png",
    title: "Signature Commercials",
    description: "Upcoming commercial and mixed-use developments designed to shape the city's evolving skyline with bold architecture.",
    href: "/project/3",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799749/ChatGPT_Image_Jun_30_2026_at_01_04_55_AM_xnwlvw.png",
    title: "Landmark Spaces",
    description: "A landmark residential development in the capital, merging contemporary elegance with the cultural richness of New Delhi.",
    href: "/project/4",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png",
    title: "Iconic Developments",
    description: "A defining statement in luxury residential architecture — a landmark address conceived for those who demand the finest.",
    href: "/project/5",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_17_12_PM_rget7w.png",
    title: "Dynamic Business Hubs",
    description: "Contemporary design principles meet timeless elegance — every unit crafted to maximise light, ventilation, and spatial flow.",
    href: "/project/1",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799849/ChatGPT_Image_Jun_30_2026_at_01_35_58_AM_u8onhf.png",
    title: "Iconic Developments",
    description: "Rising with quiet authority — bold architectural form and restrained interior elegance in perfect harmony.",
    href: "/project/5",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png",
    title: "Landmark Spaces",
    description: "Meticulously planned residences with premium finishes and thoughtful spatial design — redefining capital living.",
    href: "/project/4",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png",
    title: "Prime Living",
    description: "An exquisite new residential project offering unparalleled luxury and comfort for modern living.",
    href: "/project/6",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png",
    title: "Timeless Residences",
    description: "Redefining the standard of premium living, merging breathtaking architectural vision with serene interiors.",
    href: "/project/7",
  },
  {
    src: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png",
    title: "Bespoke Homes",
    description: "A brilliant synthesis of refined architecture and warm, inviting living spaces in the heart of the city.",
    href: "/project/8",
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
    <section className="relative z-20 luxe-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain" />

      <div className="relative w-full" style={{ height: "clamp(50vh, 75vw, 90vh)" }}>
        <Link
          href={SLIDES[current].href}
          aria-label={`View ${SLIDES[current].title} project details`}
          className="absolute inset-0 cursor-pointer"
        >
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
        </Link>

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
