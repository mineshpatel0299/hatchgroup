"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const LOGO_URL =
  "https://res.cloudinary.com/de4pazo51/image/upload/c_crop,g_north_west,h_1055,w_6125,x_908,y_1653/HATCH_LOGO_GOLD-02_1_arrhel.png";

const HOLD_MS = 1500;

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / HOLD_MS) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLoading(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!loading) document.body.style.overflow = "";
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-999">
          {/* Split panels — open like the "doors" from the Services section */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2"
            style={{ background: "#00251f" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 pointer-events-none luxe-grain" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2"
            style={{ background: "#00251f" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 pointer-events-none luxe-grain" />
          </motion.div>

          {/* Logo + reveal */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-44 h-14 md:w-64 md:h-20 overflow-hidden">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={LOGO_URL}
                  alt="Hatch Group"
                  fill
                  unoptimized
                  priority
                  className="object-contain"
                />
              </motion.div>

              {/* Shimmer sweep across the logo */}
              <motion.div
                className="absolute inset-y-0 w-1/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, transparent, rgba(226,196,136,0.85), transparent)",
                }}
                initial={{ left: "-40%" }}
                animate={{ left: "120%" }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>

            {/* Gold rule that grows in beneath the logo */}
            <motion.div
              className="h-px bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "9rem" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Progress counter */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-sans text-[9px] tracking-[0.5em] uppercase text-accent/70 tabular-nums"
            >
              {String(progress).padStart(2, "0")}%
            </motion.span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
