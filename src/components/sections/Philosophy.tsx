"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef1.current || !textRef2.current || !sectionRef.current) return;

    const split1 = new SplitType(textRef1.current, { types: "lines" });
    const split2 = new SplitType(textRef2.current, { types: "lines" });

    // Set initial state
    gsap.set([split1.lines, split2.lines], { clipPath: "inset(0 0 100% 0)" });
    gsap.set(ruleRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // 100vh of scroll
        pin: true,
        scrub: 1,
      },
    });

    tl.to(split1.lines, {
      clipPath: "inset(0 0 0% 0)",
      stagger: 0.1,
      ease: "none",
    })
      .to(split2.lines, {
        clipPath: "inset(0 0 0% 0)",
        stagger: 0.1,
        ease: "none",
      })
      .to(
        ruleRef.current,
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
        },
        0.8 // Start near the end (80% progress)
      );

    return () => {
      split1.revert();
      split2.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-emerald flex items-center justify-center overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <Image
          src="/images/philosophy-bg.png"
          alt="Concrete Texture"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl px-6 mx-auto text-center">
        <h2
          ref={textRef1}
          className="text-4xl md:text-6xl lg:text-7xl font-display text-background/60 leading-[1.2] mb-4"
        >
          We don&apos;t decorate spaces.
        </h2>
        <h2
          ref={textRef2}
          className="text-4xl md:text-6xl lg:text-7xl font-display text-background leading-[1.2] mb-12"
        >
          We architect experiences.
        </h2>
        <div ref={ruleRef} className="w-24 h-[2px] bg-accent" />
      </div>
    </section>
  );
}
