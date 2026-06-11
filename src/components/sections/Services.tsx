"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import clsx from "clsx";


gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    title: "Residential",
    description: "Bespoke luxury homes designed for unparalleled living. Every space is curated to reflect personal elegance, blending timeless aesthetics with modern comfort.",
    image: "/images/residential-thumb.png",
  },
  {
    id: "02",
    title: "Commercial",
    description: "Premium workspaces that inspire and elevate brand identity. We craft environments that foster productivity, innovation, and leave a lasting impression.",
    image: "/images/commercial-thumb.png",
  },
  {
    id: "03",
    title: "Hospitality",
    description: "Cinematic environments for 5-star hotels and luxury resorts. Designing immersive experiences that captivate guests and define the essence of luxury.",
    image: "/images/hospitality-thumb.png",
  },
  {
    id: "04",
    title: "Turnkey",
    description: "End-to-end execution with uncompromising material quality. From concept to completion, we deliver seamless projects with meticulous attention to detail.",
    image: "/images/turnkey-thumb.png",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !leftSideRef.current || !rightSideRef.current) return;

    // Desktop only GSAP interactions
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // Pin the left side
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftSideRef.current,
        pinSpacing: false,
      });

      // Animate images based on scroll
      textRefs.current.forEach((textEl, index) => {
        if (!textEl) return;

        ScrollTrigger.create({
          trigger: textEl,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });

        // Split text animation for titles
        const title = textEl.querySelector("h3");
        if (title) {
          const split = new SplitType(title, { types: "chars" });
          gsap.fromTo(
            split.chars,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: textEl,
                start: "top 70%",
              },
            }
          );
        }
      });
      
      return () => {
        textRefs.current.forEach((textEl) => {
           if(textEl) {
              const title = textEl.querySelector("h3");
              if(title) new SplitType(title).revert();
           }
        });
      };
    });

    return () => matchMedia.revert();
  }, []);

  return (
    /* Pure cream — clean alternating section, no chandelier */
    <section ref={containerRef} className="relative bg-background w-full overflow-hidden">
      {/* Mobile Layout: Stacking Cards */}
      <div className="md:hidden flex flex-col w-full px-4 py-16 gap-6">
        {/* Mobile section heading */}
        <div className="flex flex-col items-center text-center mb-4 px-2">
          <span className="block text-[8px] tracking-[0.55em] uppercase text-accent/60 font-sans mb-3">Our Services</span>
          <h2 className="font-display text-3xl text-foreground leading-tight">What We Do</h2>
          <div className="mt-4 flex items-center gap-3 w-20">
            <div className="flex-1 h-px bg-accent/30" />
            <div className="w-1 h-1 rounded-full bg-accent/50" />
            <div className="flex-1 h-px bg-accent/30" />
          </div>
        </div>

        {SERVICES.map((service, index) => (
          <div key={service.id} className="w-full h-[78vw] max-h-105 sticky top-4 overflow-hidden group" style={{ borderRadius: 0 }}>
            {/* Thin gold accent line top */}
            <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent z-20" />

            <div className="absolute inset-0 w-full h-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transform group-active:scale-[1.02] transition-transform duration-[2s] ease-out"
              />
              {/* Richer cinematic veil */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0906]/95 via-[#0a0906]/45 to-[#0a0906]/15" />
              <div className="absolute inset-0 bg-linear-to-r from-[#0a0906]/30 via-transparent to-[#0a0906]/10" />
            </div>

            {/* Corner bracket — top left */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t border-l border-accent/35 z-20" />
            {/* Corner bracket — bottom right */}
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent/35 z-20" />

            <div className="absolute bottom-0 left-0 w-full px-6 pb-7 pt-10 flex flex-col justify-end z-10">
              {/* Number */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent font-mono text-[10px] tracking-[0.4em]">{service.id}</span>
                <div className="flex-1 h-px bg-accent/20" />
              </div>
              <h3 className="font-display text-[2.1rem] text-white leading-none mb-3">
                {service.title}
              </h3>
              <p className="text-white/55 text-[0.82rem] font-light leading-[1.7] max-w-xs">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout: Split Screen */}
      <div className="hidden md:flex relative w-full items-start">
        {/* Left Side: Pinned Images */}
        <div ref={leftSideRef} className="w-1/2 h-screen relative overflow-hidden">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className={clsx(
                "absolute inset-0 w-full h-full transition-all duration-1000 ease-[0.16,1,0.3,1]",
                activeIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none"
              )}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-background/20" />
            </div>
          ))}
        </div>

        {/* Right Side: Scrolling Content */}
        <div ref={rightSideRef} className="w-1/2 flex flex-col items-center">
          {/* Spacer to push first item down slightly */}
          <div className="h-[30vh] w-full" />
          
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                textRefs.current[index] = el;
              }}
              className="w-full min-h-screen flex flex-col justify-center px-16 lg:px-24"
            >
              <span className={clsx(
                "font-mono text-lg tracking-widest mb-6 transition-all duration-700",
                activeIndex === index ? "text-accent" : "text-foreground/30"
              )}>
                {service.id}
              </span>
              <h3 className={clsx(
                "font-display text-6xl lg:text-7xl xl:text-8xl leading-none mb-8 overflow-hidden transition-all duration-700",
                activeIndex === index ? "text-foreground" : "text-foreground/30"
              )}>
                {service.title}
              </h3>
              <p className={clsx(
                "max-w-md text-xl font-light leading-relaxed transition-all duration-700",
                activeIndex === index ? "text-foreground/80" : "text-foreground/30"
              )}>
                {service.description}
              </p>
            </div>
          ))}
          
          {/* Spacer to push last item up slightly */}
          <div className="h-[30vh] w-full" />
        </div>
      </div>
    </section>
  );
}
