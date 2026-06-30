"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCarouselProps {
  projectId: string;
  client: string;
  images: string[];
}

export default function ProjectCarousel({ projectId, client, images }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Project photo ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays on Top Image */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 text-white font-bold text-xl md:text-2xl drop-shadow-md z-10 pointer-events-none">
        {String(currentIndex + 1).padStart(2, "0")} <span className="text-white/50 font-normal text-lg md:text-xl">/ {String(images.length).padStart(2, "0")}</span>
      </div>

      <div className="absolute right-4 top-8 md:right-8 md:top-16 [writing-mode:vertical-rl] text-[8px] md:text-[10px] tracking-widest uppercase text-white/80 drop-shadow-md z-10 pointer-events-none">
        {client}
      </div>

      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center gap-2 md:gap-4 text-white drop-shadow-md z-10">
        <span className="hidden md:inline text-[10px] tracking-widest uppercase pointer-events-none">Next Project photo</span>
        <div className="flex gap-2">
          <button 
            onClick={prevSlide}
            className="hover:text-accent transition-colors w-8 h-8 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-full"
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextSlide}
            className="hover:text-accent transition-colors w-8 h-8 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-full"
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="absolute left-4 bottom-8 md:left-8 md:bottom-16 [writing-mode:vertical-rl] text-[8px] md:text-[10px] tracking-widest uppercase text-white/80 drop-shadow-md rotate-180 z-10 pointer-events-none">
        Designed in CPD
      </div>
    </div>
  );
}
