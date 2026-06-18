"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
  { id: 1, title: "OVER O", image: "/images/commercial-thumb.png" },
  { id: 2, title: "RIVER VIEW", image: "/images/residential-thumb.png" },
  { id: 3, title: "SKYLIN", image: "/images/hospitality-thumb.png" },
  { id: 4, title: "APPARTA", image: "/images/turnkey-thumb.png" },
  { id: 5, title: "THE MOONWAY APARTMENT", image: "/images/featured-project.png" },
  { id: 6, title: "TRUE", image: "/images/luxury-bg.png" },
  { id: 7, title: "APPARTA", image: "/images/materials-bg.png" },
  { id: 8, title: "PECHERSK SCHOOL", image: "/images/philosophy-bg.png" },
  { id: 9, title: "INTERNATIONAL", image: "/images/hero.png" },
];

export default function ProjectScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the movement for the text list
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * (100 / projects.length)}%`]);

  return (
    <section ref={containerRef} className="relative h-[900vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* Background elements (logo, navigation labels) */}

        {/* Right side / Top side on mobile: Image sequence */}
        <div className="absolute left-1/2 md:left-auto md:right-[5vw] top-[20%] md:top-1/2 -translate-x-1/2 md:-translate-x-0 -translate-y-0 md:-translate-y-1/2 w-[85vw] md:w-[48vw] h-[45vh] md:h-[60vh] overflow-hidden z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-foreground/5">
          <motion.div style={{ y: yTransform }} className="flex flex-col w-full h-[900%]">
            {projects.map((project, index) => (
              <div key={project.id} className="w-full h-[11.111%] shrink-0 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Left side / Bottom side on mobile: Scrolling Text */}
        <div className="absolute left-[5vw] md:left-[8vw] top-[60%] md:top-1/2 -translate-y-0 md:-translate-y-1/2 w-full h-[40vh] md:h-[100vh] pointer-events-none z-20">
          <motion.div style={{ y: yTransform }} className="flex flex-col w-full h-[900%]">
            {projects.map((project, i) => {
              // Calculate the active state for each item.
              // Item is active when scroll progress is around its index.
              const start = (i - 0.5) / (projects.length - 1);
              const end = (i + 0.5) / (projects.length - 1);
              // WAAPI requires offsets to be between 0 and 1 and monotonically non-decreasing.
              // We must clamp all input values to [0, 1].
              // We also need to be careful that clamping doesn't invert the order.
              // We must build input and output arrays carefully to avoid WAAPI monotonically non-decreasing error,
              // while ensuring the first and last items don't fade out prematurely due to duplicate clamped keys.
              const opInputs = [start - 0.1, start, end, end + 0.1];
              const opOutputs = [0.1, 1, 1, 0.1];

              const fillInputs = [start, i / (projects.length - 1), end];
              const fillOutputs = [0, 1, 0];

              // We clip the piecewise linear function to the [0, 1] domain.
              const clipFunction = (inputs: number[], outputs: number[]) => {
                const finalInputs: number[] = [];
                const finalOutputs: number[] = [];

                // Helper to linearly interpolate
                const getVal = (x: number) => {
                  if (x <= inputs[0]) return outputs[0];
                  if (x >= inputs[inputs.length - 1]) return outputs[outputs.length - 1];
                  for (let j = 0; j < inputs.length - 1; j++) {
                    if (x >= inputs[j] && x <= inputs[j + 1]) {
                      const t = (x - inputs[j]) / (inputs[j + 1] - inputs[j]);
                      return outputs[j] + t * (outputs[j + 1] - outputs[j]);
                    }
                  }
                  return outputs[0];
                };

                // Add 0 if it's within the range of our function or we need a start point
                finalInputs.push(0);
                finalOutputs.push(getVal(0));

                // Add all original keyframes that strictly fall inside (0, 1)
                for (let j = 0; j < inputs.length; j++) {
                  if (inputs[j] > 0 && inputs[j] < 1) {
                    finalInputs.push(inputs[j]);
                    finalOutputs.push(outputs[j]);
                  }
                }

                // Add 1
                finalInputs.push(1);
                finalOutputs.push(getVal(1));

                return { finalInputs, finalOutputs };
              };

              const op = clipFunction(opInputs, opOutputs);
              const opacity = useTransform(scrollYProgress, op.finalInputs, op.finalOutputs);

              const fl = clipFunction(fillInputs, fillOutputs);
              const isFilled = useTransform(scrollYProgress, fl.finalInputs, fl.finalOutputs);

              return (
                <div key={project.id} className="h-[11.111%] flex items-center">
                  <Link 
                    href={`/project/${project.id}`}
                    className="group pointer-events-auto inline-block hover:scale-[1.02] transition-transform duration-300 origin-left"
                  >
                    <TextItem title={project.title} progress={isFilled} opacity={opacity} />
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TextItem({ title, progress, opacity }: { title: string, progress: any, opacity: any }) {
  // We want to smoothly transition between stroke text and filled text.
  // One way is to have two identical text elements overlapping.
  // Bottom one is stroke, top one is filled and its opacity is controlled by progress.

  return (
    <motion.div
      className="relative flex flex-col items-start gap-1 md:gap-2"
      style={{ opacity }}
    >
      <div className="relative text-[12vw] md:text-[5.5vw] leading-[0.85] tracking-tighter font-black uppercase whitespace-normal break-words max-w-[90vw] md:max-w-[38vw]">
        {/* Stroke outline */}
        <span
          className="absolute inset-0"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(243, 232, 222, 0.15)"
          }}
        >
          {title}
        </span>
        {/* Filled text */}
        <motion.span
          className="relative text-[var(--accent)] inline-block"
          style={{ opacity: progress }}
        >
          {title}
        </motion.span>
      </div>

      {/* Clickable Indicator Arrow - fades in with the fill progress */}
      <motion.div 
        className="hidden md:flex items-center gap-4 ml-1"
        style={{ opacity: progress }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-accent">Explore</span>
        <div className="w-8 h-px bg-accent group-hover:w-16 transition-all duration-500 origin-left" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" className="group-hover:translate-x-2 transition-transform duration-500">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.div>

    </motion.div>
  );
}
