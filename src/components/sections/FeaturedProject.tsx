"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !textBlockRef.current) return;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      // Desktop Parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Image moves up slightly
      tl.fromTo(
        imageContainerRef.current,
        { y: "10%" },
        { y: "-10%", ease: "none" },
        0
      );

      // Text block moves up faster to create depth overlap
      tl.fromTo(
        textBlockRef.current,
        { y: "30%" },
        { y: "-20%", ease: "none" },
        0
      );

      // Image internal parallax
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.15, y: "-5%" },
          { scale: 1, y: "5%", ease: "none" },
          0
        );
      }
    });

    matchMedia.add("(max-width: 1023px)", () => {
       // Mobile animations
       gsap.fromTo(
         textBlockRef.current,
         { opacity: 0, y: 30 },
         {
           opacity: 1, 
           y: 0, 
           duration: 1, 
           ease: "power3.out",
           scrollTrigger: {
             trigger: textBlockRef.current,
             start: "top 85%"
           }
         }
       );
    });

    // Split text reveal for title
    let split: SplitType | null = null;
    if (titleRef.current) {
      split = new SplitType(titleRef.current, { types: "lines, words" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );
    }

    return () => {
      matchMedia.revert();
      if (split) {
         split.revert();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-background pt-24 pb-32 lg:py-0 lg:min-h-[120vh] flex items-center overflow-hidden"
    >
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 relative lg:h-[80vh] flex flex-col lg:block">
        
        {/* Image Block */}
        <div 
          ref={imageContainerRef} 
          className="relative w-full lg:w-[65%] lg:absolute lg:right-0 lg:top-0 h-[60vh] lg:h-full z-0 overflow-hidden"
        >
          <Image
            ref={imageRef}
            src="/images/featured-project.png"
            alt="The Artisan House"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>

        {/* Text Block */}
        <div 
          ref={textBlockRef}
          className="relative z-10 w-[90%] sm:w-[80%] lg:w-[45%] mx-auto lg:mx-0 lg:absolute lg:left-0 lg:top-[15%] bg-background/90 backdrop-blur-xl p-8 sm:p-12 lg:p-16 border border-foreground/5 -mt-20 lg:mt-0 shadow-2xl"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-6 block">
            Featured Residence
          </span>
          <h2 
            ref={titleRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-8"
          >
            The Artisan House
          </h2>
          <p className="text-foreground/70 font-light text-base sm:text-lg mb-10 leading-relaxed">
            Curved walls in Venetian plaster finish in warm greige, a statement arched fireplace in aged travertine, bespoke curved seating in deep cognac leather. A moody, editorial exploration of form and light, redefining what it means to live in functional art.
          </p>
          <div>
            <a 
              href="#project-details" 
              className="inline-flex items-center gap-4 text-sm tracking-widest uppercase font-medium text-foreground hover:text-accent transition-colors group"
              data-cursor-interact
            >
              View Case Study
              <span className="w-12 h-[1px] bg-foreground group-hover:bg-accent transition-all group-hover:w-16 duration-300" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
