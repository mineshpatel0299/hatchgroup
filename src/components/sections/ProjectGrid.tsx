"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";


gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Minimalist Living",  category: "Residential",  image: "/images/featured-project.png"   },
  { id: 2, title: "Bespoke Kitchen",    category: "Residential",  image: "/images/residential-thumb.png"  },
  { id: 3, title: "Luxury Suite",       category: "Hospitality",  image: "/images/hospitality-thumb.png"  },
  { id: 4, title: "Corporate Lobby",    category: "Commercial",   image: "/images/commercial-thumb.png"   },
  { id: 5, title: "Formal Dining",      category: "Residential",  image: "/images/featured-project.png"   },
  { id: 6, title: "Penthouse Terrace",  category: "Residential",  image: "/images/turnkey-thumb.png"      },
];

export default function ProjectGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: image inside each card drifts on scroll
      gsap.utils.toArray<HTMLElement>(".pgrid-img").forEach((img) => {
        gsap.fromTo(
          img,
          { y: "-8%" },
          {
            y: "8%",
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".pgrid-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Pure cream — clean alternating section, no chandelier */
    <section className="relative py-28 md:py-36 px-6 md:px-12 bg-background overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 border-b border-foreground/10 pb-6">
          <div>
            <p className="text-[9px] tracking-[0.55em] uppercase text-foreground/40 font-medium mb-3">
              Selected Portfolio
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground">Selected Works</h2>
          </div>
          <button
            className="text-xs tracking-widest uppercase font-medium text-foreground/50 hover:text-accent transition-colors duration-300 pb-1 border-b border-transparent hover:border-accent/50"
            data-cursor-interact
          >
            View All
          </button>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-20">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.15 }}
              className="pgrid-card cursor-pointer group"
              data-cursor-interact
            >
              {/* Image container — overflow hidden so parallax image stays clipped */}
              <div className="relative aspect-[4/5] overflow-hidden border border-foreground/8">
                <div className="pgrid-img absolute inset-[-10%] w-[120%] h-[120%]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out"
                  />
                </div>
                {/* Subtle hover veil */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/8 transition-colors duration-700" />
              </div>

              {/* Caption */}
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-400 leading-tight">
                    {project.title}
                  </h3>
                  <span className="mt-1.5 block text-[10px] tracking-[0.35em] uppercase text-foreground/40">
                    {project.category}
                  </span>
                </div>
                {/* Arrow — appears on hover */}
                <span className="mt-1 opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 transition-all duration-400 text-accent text-sm">
                  →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
