"use client";

import { motion } from "motion/react";

const ITEMS = [
  { label: "Residential\nDesign"       },
  { label: "Commercial\nSpaces"        },
  { label: "Hospitality\nInteriors"    },
  { label: "Turnkey\nExecution"        },
  { label: "Project\nManagement"       },
  { label: "Bespoke\nConsulting"       },
];

const GOLD = "rgba(169,140,95,0.55)";

export default function ServiceGrid() {
  return (
    <section className="luxe-emerald relative overflow-hidden">
      {/* Horizontal divider */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "50%", height: "1px", background: `linear-gradient(to right, transparent 2%, ${GOLD} 15%, ${GOLD} 85%, transparent 98%)` }}
      />
      {/* Vertical dividers */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "33.333%", width: "1px", background: `linear-gradient(to bottom, transparent 2%, ${GOLD} 12%, ${GOLD} 88%, transparent 98%)` }}
      />
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: "66.666%", width: "1px", background: `linear-gradient(to bottom, transparent 2%, ${GOLD} 12%, ${GOLD} 88%, transparent 98%)` }}
      />

      <div className="grid grid-cols-3">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center justify-center px-6 py-24 md:py-36 text-center group cursor-default"
          >
            <p
              className="font-sans font-medium text-[#D6BD94] uppercase tracking-[0.25em] leading-[1.6] transition-colors duration-300 group-hover:text-ivory"
              style={{ fontSize: "clamp(0.6rem, 1vw, 0.78rem)", whiteSpace: "pre-line" }}
            >
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
