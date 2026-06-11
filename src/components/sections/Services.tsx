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
              if(title) SplitType.revert(title);
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
      <div className="md:hidden flex flex-col w-full px-4 py-20 gap-12">
        {SERVICES.map((service, index) => (
          <div key={service.id} className="relative w-full h-[80vh] sticky top-10 overflow-hidden rounded-2xl group">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
              <span className="text-accent font-mono text-sm tracking-widest mb-4">
                {service.id}
              </span>
              <h3 className="font-display text-4xl text-foreground leading-none mb-4">
                {service.title}
              </h3>
              <p className="text-foreground/80 text-base font-light">
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
