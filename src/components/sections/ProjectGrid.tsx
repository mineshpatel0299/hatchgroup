"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Minimalist Living", category: "Residential", image: "/images/featured-project.png" },
  { id: 2, title: "Bespoke Kitchen", category: "Residential", image: "/images/residential-thumb.png" },
  { id: 3, title: "Luxury Suite", category: "Hospitality", image: "/images/hospitality-thumb.png" },
  { id: 4, title: "Corporate Lobby", category: "Commercial", image: "/images/commercial-thumb.png" },
  { id: 5, title: "Formal Dining", category: "Residential", image: "/images/featured-project.png" },
  { id: 6, title: "Penthouse Terrace", category: "Residential", image: "/images/turnkey-thumb.png" },
];

export default function ProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray(".project-card");

    ScrollTrigger.batch(cards, {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: "power3.out", overwrite: true }
        );
      },
      once: true,
      start: "top 85%",
    });
  }, []);

  return (
    <section className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Selected Works</h2>
          <button className="text-sm tracking-widest uppercase font-medium text-foreground hover:text-accent transition-colors" data-cursor-interact>
            View All
          </button>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {PROJECTS.map((project) => (
            <div key={project.id} className="project-card opacity-0 cursor-pointer group" data-cursor-interact>
              <div className="relative aspect-[4/5] overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-display text-2xl text-foreground">{project.title}</h3>
                <span className="text-xs text-foreground/50 tracking-widest uppercase">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
