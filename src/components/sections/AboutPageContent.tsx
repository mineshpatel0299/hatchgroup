"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import Footer from "@/components/sections/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
};

const STATS = [
  { value: "10+", label: "Years of Practice" },
  { value: "120+", label: "Projects Delivered" },
  { value: "18", label: "Design Awards" },
  { value: "6", label: "Cities Across India" },
];

const TEAM = [
  {
    number: "01",
    name: "Kareena Gambhir",
    role: "Co-Founder & Partner",
    bio: "With over a decade of shaping India's most discerning interiors, she brings an architect's rigour and an artist's intuition to every project — finding beauty in precision and soul in restraint.",
    image: "/images/residential-thumb.png",
  },
  // {
  //   number: "02",
  //   name: "Sumit Verma",
  //   role: "Co-Founder & Creative Director",
  //   bio: "A master of material narratives, he curates palettes that feel both inevitable and surprising — championing Indian craft traditions while speaking fluently in global design language.",
  //   image: "/images/commercial-thumb.png",
  // },
];

const VALUES = [
  {
    number: "01",
    title: "Authorship",
    body:
      "Every space we create carries a singular point of view. We don't decorate — we narrate, shaping rooms that tell the story of the people who inhabit them.",
  },
  {
    number: "02",
    title: "Restraint",
    body:
      "Luxury is expressed through what is withheld as much as what is shown. We edit ruthlessly, letting each chosen material and detail carry full weight.",
  },
  {
    number: "03",
    title: "Craft",
    body:
      "We work alongside India's finest artisans and ateliers. Every joint, texture, and finish is considered at the scale of the human hand.",
  },
  {
    number: "04",
    title: "Time",
    body:
      "We design for decades, not seasons. Hatch Group interiors are conceived to age with grace, acquiring depth and character over the years.",
  },
];

function VisionMissionSection() {
  return (
    <section id="vision-mission" className="relative py-28 md:py-40 luxe-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain opacity-40" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw", height: "80vw",
          background: "radial-gradient(ellipse at center, rgba(169,140,95,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Section header — centered */}
        <motion.div
          {...fadeUp}
          className="flex flex-col items-center text-center mb-20 md:mb-28"
        >
          <span className="text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-5">
            Who We Are
          </span>
          <div className="flex items-center gap-3 w-28">
            <div className="flex-1 h-px luxe-rule" />
            <div className="w-1.5 h-1.5 rotate-45 border border-accent/60" />
            <div className="flex-1 h-px luxe-rule" />
          </div>
        </motion.div>

        {/* Side by side with center divider */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-0 items-start">

          {/* Vision */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:pr-14 lg:pr-20"
          >
            {/* Ghost number */}
            <span
              className="font-display font-light select-none block leading-none mb-4"
              style={{
                fontSize: "clamp(4rem, 7vw, 6.5rem)",
                color: "rgba(28,36,32,0.05)",
                letterSpacing: "-0.03em",
              }}
            >
              01
            </span>

            {/* Label */}
            <div className="flex items-center gap-4 -mt-6 mb-8">
              <div
                className="h-px w-8"
                style={{ background: "rgba(169,140,95,0.6)" }}
              />
              <span
                className="font-sans font-medium text-accent tracking-[0.4em] uppercase"
                style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
              >
                Vision
              </span>
            </div>

            <h3
              className="font-display font-light text-foreground leading-[1.22] mb-7"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)", letterSpacing: "-0.01em" }}
            >
              The defining voice of luxury design in{" "}
              <span className="luxe-gradient-text">contemporary India.</span>
            </h3>

            <p className="text-foreground/45 font-light leading-[1.95] text-[0.9rem] md:text-[0.95rem]">
              Indian interiors that carry global cultural authority — rooted in craft, fluent in modernity, unmistakably Indian.
            </p>
          </motion.div>

          {/* Center divider — vertical gold line with diamond */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex flex-col items-center self-stretch origin-top mx-6 lg:mx-10"
          >
            <div
              className="flex-1 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(169,140,95,0.4) 20%, rgba(169,140,95,0.4) 80%, transparent)" }}
            />
            <div className="w-2 h-2 rotate-45 border border-accent/50 my-3 shrink-0" />
            <div
              className="flex-1 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(169,140,95,0.4) 20%, rgba(169,140,95,0.4) 80%, transparent)" }}
            />
          </motion.div>

          {/* Mobile horizontal divider */}
          <div className="md:hidden flex items-center gap-3 justify-center">
            <div className="flex-1 h-px luxe-rule max-w-24" />
            <div className="w-1.5 h-1.5 rotate-45 border border-accent/50" />
            <div className="flex-1 h-px luxe-rule max-w-24" />
          </div>

          {/* Mission */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:pl-14 lg:pl-20"
          >
            {/* Ghost number */}
            <span
              className="font-display font-light select-none block leading-none mb-4"
              style={{
                fontSize: "clamp(4rem, 7vw, 6.5rem)",
                color: "rgba(28,36,32,0.05)",
                letterSpacing: "-0.03em",
              }}
            >
              02
            </span>

            {/* Label */}
            <div className="flex items-center gap-4 -mt-6 mb-8">
              <div
                className="h-px w-8"
                style={{ background: "rgba(169,140,95,0.6)" }}
              />
              <span
                className="font-sans font-medium text-accent tracking-[0.4em] uppercase"
                style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
              >
                Mission
              </span>
            </div>

            <h3
              className="font-display font-light text-foreground leading-[1.22] mb-7"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)", letterSpacing: "-0.01em" }}
            >
              Spaces that are{" "}
              <span className="luxe-gradient-text">deeply personal</span> and timelessly made.
            </h3>

            <p className="text-foreground/45 font-light leading-[1.95] text-[0.9rem] md:text-[0.95rem]">
              A collaboration between client and studio, tradition and innovation — making every project extraordinary.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


function AboutHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Floating image parallax (Mouse)
  const move1X = useTransform(smoothX, [-1, 1], [-30, 30]);
  const move1Y = useTransform(smoothY, [-1, 1], [-30, 30]);
  
  const move2X = useTransform(smoothX, [-1, 1], [20, -20]);
  const move2Y = useTransform(smoothY, [-1, 1], [20, -20]);

  const move3X = useTransform(smoothX, [-1, 1], [-50, 50]);
  const move3Y = useTransform(smoothY, [-1, 1], [-50, 50]);

  const move4X = useTransform(smoothX, [-1, 1], [40, -40]);
  const move4Y = useTransform(smoothY, [-1, 1], [40, -40]);

  // Floating image parallax (Scroll)
  const scroll1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scroll2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scroll3Y = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const scroll4Y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden flex items-center justify-center luxe-ivory"
      style={{ height: "100svh" }}
    >
      <div className="absolute inset-0 pointer-events-none luxe-grain opacity-60 z-30" />
      
      {/* Background radial highlight */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(circle at center, #FFFFFF 0%, transparent 70%)", opacity: 0.5 }} />

      {/* Floating Images Container */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Top Left - Residential */}
        <motion.div 
          className="absolute top-[8%] left-[5%] md:left-[12%] w-[40vw] md:w-[22vw] max-w-[280px] aspect-[4/5] shadow-[0_30px_60px_-15px_rgba(28,36,32,0.2)] bg-background/50 p-1 md:p-2"
          style={{ x: move1X, y: move1Y, translateY: scroll1Y }}
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full overflow-hidden"
          >
            <Image src="/images/residential-thumb.png" alt="" fill className="object-cover" sizes="(max-width: 768px) 40vw, 22vw" />
          </motion.div>
        </motion.div>
        
        {/* Bottom Right - Hospitality */}
        <motion.div 
          className="absolute bottom-[10%] right-[5%] md:right-[15%] w-[50vw] md:w-[28vw] max-w-[360px] aspect-[16/10] shadow-[0_30px_60px_-15px_rgba(28,36,32,0.25)] bg-background/50 p-1 md:p-2"
          style={{ x: move2X, y: move2Y, translateY: scroll2Y }}
        >
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full overflow-hidden"
          >
            <Image src="/images/hospitality-thumb.png" alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, 28vw" />
          </motion.div>
        </motion.div>

        {/* Top Right - Commercial */}
        <motion.div 
          className="absolute top-[15%] right-[2%] md:right-[8%] w-[25vw] md:w-[15vw] max-w-[200px] aspect-square shadow-[0_20px_40px_-10px_rgba(28,36,32,0.15)] bg-background/50 p-1 md:p-2"
          style={{ x: move3X, y: move3Y, translateY: scroll3Y }}
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full overflow-hidden"
          >
            <Image src="/images/commercial-thumb.png" alt="" fill className="object-cover" sizes="(max-width: 768px) 25vw, 15vw" />
          </motion.div>
        </motion.div>

        {/* Bottom Left - Luxury Bg */}
        <motion.div 
          className="absolute bottom-[5%] left-[2%] md:left-[8%] w-[35vw] md:w-[18vw] max-w-[240px] aspect-[3/4] shadow-[0_25px_50px_-12px_rgba(28,36,32,0.2)] bg-background/50 p-1 md:p-2"
          style={{ x: move4X, y: move4Y, translateY: scroll4Y }}
        >
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full overflow-hidden"
          >
            <Image src="/images/luxury-bg.png" alt="" fill className="object-cover" sizes="(max-width: 768px) 35vw, 18vw" />
          </motion.div>
        </motion.div>
      </div>

      {/* Central Typography */}
      <motion.div
        style={{ y: heroContentY, opacity: heroContentOpacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.8em" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-medium text-accent/80 text-[10px] md:text-[12px] uppercase mb-8 block"
        >
          The Studio · Est. 2014
        </motion.span>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-foreground leading-[0.9] m-0 p-0 flex flex-col items-center"
            style={{ fontSize: "clamp(2rem, 6vw, 6.5rem)", letterSpacing: "-0.02em" }}
          >
            <span className="block italic text-accent mr-[10%]" style={{ fontSize: "0.8em" }}>Authors of</span>
            <span className="block font-sans font-thin tracking-tighter uppercase ml-[5%]">Space</span>
          </motion.h1>
          
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-px mt-16 mb-8 origin-center"
          style={{ background: "rgba(169,140,95,0.4)" }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-sans font-light text-foreground/60 text-[0.85rem] md:text-[0.95rem] tracking-[0.25em] uppercase max-w-xs md:max-w-md mx-auto leading-relaxed"
        >
          Redefining the language of modern luxury
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        style={{ opacity: heroContentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-accent/60 font-sans text-[8px] tracking-[0.6em] uppercase">
          Explore
        </span>
        <div
          className="w-px h-12"
          style={{
            background: "linear-gradient(to bottom, rgba(169,140,95,0.5), transparent)",
            animation: "grow 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}

const textVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.09,
      delayChildren: 0.18,
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  }),
};

const itemVariants = {
  enter: { opacity: 0, y: 22 },
  center: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const imgVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 1.05 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const } },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 1.03, transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as const } }),
};

function TeamSlider() {
  const current = 0;
  const direction = 1;
  const member = TEAM[current];

  return (
    <section id="our-team" className="relative luxe-ivory overflow-hidden">
      <div className="absolute inset-0 pointer-events-none luxe-grain opacity-40" />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "50%", transform: "translateX(-50%)",
          width: "80vw", height: "60vw",
          background: "radial-gradient(ellipse at center, rgba(169,140,95,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Section header */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        <motion.div
          {...fadeUp}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 md:mb-24"
        >
          <span className="text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-5">
            The Principals
          </span>
          <div className="flex items-center gap-3 w-28 mb-10">
            <div className="flex-1 h-px luxe-rule" />
            <div className="w-1.5 h-1.5 rotate-45 border border-accent/60" />
            <div className="flex-1 h-px luxe-rule" />
          </div>
          <h2
            className="font-display font-light text-foreground leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", letterSpacing: "-0.01em" }}
          >
            The minds behind{" "}
            <span className="luxe-gradient-text">the maison</span>
          </h2>
        </motion.div>
      </div>

      {/* Slider grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: "65vh" }}>

        {/* LEFT: Text panel */}
        <div className="relative flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-24 overflow-hidden order-2 lg:order-1">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col"
            >
              {/* Ghost number */}
              <motion.span
                variants={itemVariants}
                className="font-display font-light select-none leading-none mb-4"
                style={{
                  fontSize: "clamp(6rem, 10vw, 10rem)",
                  color: "rgba(28,36,32,0.05)",
                  letterSpacing: "-0.03em",
                }}
              >
                {member.number}
              </motion.span>

              {/* Role eyebrow */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-5 -mt-8 lg:-mt-14">
                <div className="h-px w-8 luxe-rule shrink-0" />
                <span className="text-accent/70 text-[9px] tracking-[0.5em] uppercase font-sans font-medium">
                  {member.role}
                </span>
              </motion.div>

              {/* Name */}
              <motion.h3
                variants={itemVariants}
                className="font-display font-light text-foreground mb-5"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.01em" }}
              >
                {member.name}
              </motion.h3>

              {/* Gold rule */}
              <motion.div variants={itemVariants} className="w-12 h-px mb-7" style={{ background: "rgba(169,140,95,0.4)" }} />

              {/* Bio */}
              <motion.p variants={itemVariants} className="text-foreground/50 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-md">
                {member.bio}
              </motion.p>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* RIGHT: Image panel */}
        <div
          className="relative overflow-hidden order-1 lg:order-2"
          style={{ minHeight: "45vw", maxHeight: "70vh" }}
        >
          {/* Inset gold frame */}
          <div className="absolute inset-4 border border-accent/20 pointer-events-none z-10" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              {/* Bottom fade to ivory */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(243,232,222,0.55) 0%, transparent 100%)" }}
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

export default function AboutPageContent() {
  const storyRef = useRef<HTMLElement>(null);

  const { scrollYProgress: storyScroll } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });

  const yArch  = useTransform(storyScroll, [0, 1], [60, -60]);
  const ySmall = useTransform(storyScroll, [0, 1], [120, -120]);
  const yFrame = useTransform(storyScroll, [0, 1], [40, -80]);

  return (
    <>
      {/* ── 1. OUR STORY — Hero ── */}
      <section id="our-story" className="relative pt-44 md:pt-56 pb-28 md:pb-40 luxe-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-50" />

        {/* Ambient gold wash — top left */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-15%", left: "-8%",
            width: "55vw", height: "55vw",
            background: "radial-gradient(ellipse at center, rgba(169,140,95,0.10) 0%, transparent 60%)",
          }}
        />
        {/* Ambient gold wash — bottom right */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-10%", right: "-6%",
            width: "50vw", height: "50vw",
            background: "radial-gradient(ellipse at center, rgba(214,189,148,0.14) 0%, transparent 65%)",
          }}
        />

        {/* Ghost watermark */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-display italic font-light whitespace-nowrap"
            style={{
              fontSize: "clamp(6rem, 18vw, 16rem)",
              color: "rgba(169,140,95,0.04)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Hatch Group
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 lg:px-24">

          {/* Centered eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-14 md:mb-20"
          >
            <span className="text-accent text-[10px] md:text-[12px] tracking-[0.6em] uppercase font-medium mb-5">
              Our Story
            </span>
            <div className="flex items-center gap-3 w-28">
              <div className="flex-1 h-px luxe-rule" />
              <div className="w-1.5 h-1.5 rotate-45 border border-accent/60" />
              <div className="flex-1 h-px luxe-rule" />
            </div>
          </motion.div>

          {/* Main copy with drop cap */}
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-foreground/80 leading-[1.85] text-center md:text-left"
              style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.7rem)" }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-accent float-left leading-[0.82] mr-4 mt-1.5 select-none"
                style={{ fontSize: "clamp(3.8rem, 5.5vw, 5.5rem)" }}
              >
                S
              </motion.span>
              ince 2014, Hatch Group has quietly redefined the language of luxury
              interiors across India. Founded on the belief that a space should
              speak before its occupant does, we have shaped residences,
              hospitality suites, corporate sanctuaries, and cultural
              institutions — each a singular act of authorship.
            </motion.p>

            {/* Gold rule centered */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-20 h-px mt-12 mx-auto md:mx-0 origin-left"
              style={{ background: "linear-gradient(to right, rgba(169,140,95,0.6), rgba(169,140,95,0.15))" }}
            />
          </div>

        </div>
      </section>

      {/* ── Service grid ── */}
      {(() => {
        const GOLD = "rgba(169,140,95,0.55)";
        const ITEMS = [
          { label: "Residential\nDesign"    },
          { label: "Commercial\nSpaces"     },
          { label: "Hospitality\nInteriors" },
          { label: "Turnkey\nExecution"     },
          { label: "Project\nManagement"    },
          { label: "Bespoke\nConsulting"    },
        ];
        return (
          <div className="luxe-emerald relative overflow-hidden">
            <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "50%", height: "1px", background: `linear-gradient(to right, transparent 2%, ${GOLD} 15%, ${GOLD} 85%, transparent 98%)` }} />
            <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "33.333%", width: "1px", background: `linear-gradient(to bottom, transparent 2%, ${GOLD} 12%, ${GOLD} 88%, transparent 98%)` }} />
            <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: "66.666%", width: "1px", background: `linear-gradient(to bottom, transparent 2%, ${GOLD} 12%, ${GOLD} 88%, transparent 98%)` }} />
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
          </div>
        );
      })()}

      {/* ── STATS BAR ── */}
      <section className="relative py-16 md:py-20 luxe-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                {...fadeUp}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center md:border-r md:last:border-r-0 border-foreground/10 md:px-8"
              >
                <span
                  className="font-display font-light luxe-gradient-text leading-none mb-3"
                  style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
                >
                  {value}
                </span>
                <span className="text-foreground/50 text-[9px] tracking-[0.42em] uppercase font-sans">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LAYERED STORY IMAGE + COPY ── */}
      <section
        id="the-approach"
        ref={storyRef}
        className="relative py-24 md:py-36 luxe-ivory overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none luxe-grain" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">

          {/* Images */}
          <div className="lg:col-span-6 order-1 relative h-[60vh] md:h-[72vh]">
            <motion.div
              style={{ y: yFrame }}
              className="absolute top-[4%] left-[2%] w-[68%] h-[76%] border border-accent/30 rounded-t-full pointer-events-none"
            />
            <motion.div
              style={{ y: yArch }}
              className="absolute top-[8%] left-[8%] w-[66%] h-[74%] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(28,36,32,0.35)]"
            >
              <Image
                src="/images/hospitality-thumb.png"
                alt="Hatch Group — hospitality interior"
                fill
                className="object-cover scale-[1.15]"
                sizes="(min-width: 1024px) 38vw, 70vw"
              />
            </motion.div>
            <motion.div
              style={{ y: ySmall }}
              className="absolute bottom-[2%] right-[2%] w-[44%] aspect-[4/5] bg-ivory p-2.5 md:p-3 shadow-[0_30px_60px_-25px_rgba(28,36,32,0.4)]"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/residential-thumb.png"
                  alt="Hatch Group — bespoke residence"
                  fill
                  className="object-cover scale-[1.12]"
                  sizes="(min-width: 1024px) 22vw, 44vw"
                />
              </div>
              <span className="absolute -bottom-7 left-1 text-[8px] tracking-[0.4em] uppercase text-foreground/35">
                N°01 — The Craft
              </span>
            </motion.div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 order-2">
            <motion.div
              {...fadeUp}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-accent text-[9px] md:text-[11px] tracking-[0.5em] uppercase font-medium mb-7">
                The Approach
              </span>
              <h2
                className="font-display font-light text-foreground leading-[1.12] mb-9"
                style={{
                  fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Spaces that hold
                <br />
                the weight of{" "}
                <span className="luxe-gradient-text">living.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-foreground/55 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] mb-6">
                We begin every engagement with listening — not to brief
                documents, but to the client themselves. What are their
                unspoken rituals? How do they move through a room at 7 AM
                versus midnight? What textures have they loved and never
                articulated?
              </p>
              <p className="text-foreground/55 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem]">
                These invisible cues become the architecture of everything
                that follows — the spatial flow, the material palette, the
                calibration of light, the rhythm of detail.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. VALUES GRID ── */}
      <section id="values" className="relative py-24 md:py-36 luxe-emerald overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain" />

        {/* Ghost background text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
          aria-hidden="true"
        >
          <span
            className="font-display font-light text-foreground/[0.035] leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 14vw, 14rem)" }}
          >
            VALUES
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center mb-16 md:mb-24 text-center"
          >
            <span className="text-accent text-[9px] md:text-[11px] tracking-[0.55em] uppercase font-medium mb-5">
              What Guides Us
            </span>
            <div className="flex items-center gap-3 w-28">
              <div className="flex-1 h-px luxe-rule" />
              <div className="w-1.5 h-1.5 rotate-45 border border-accent/60" />
              <div className="flex-1 h-px luxe-rule" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
            {VALUES.map(({ number, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-background/40 backdrop-blur-sm p-10 md:p-14 group hover:bg-background/70 transition-colors duration-500"
              >
                <span className="block text-accent/40 text-[9px] tracking-[0.5em] uppercase font-sans mb-6">
                  {number}
                </span>
                <h3
                  className="font-display font-light text-foreground leading-tight mb-6"
                  style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}
                >
                  {title}
                </h3>
                <p className="text-foreground/50 font-light leading-[1.9] text-[0.95rem]">
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. VISION / MISSION ── */}
      <VisionMissionSection />

      {/* ── 7. OUR TEAM ── */}
      <TeamSlider />

      {/* ── 8. CTA BANNER ── */}
      {/* <section className="relative py-24 md:py-32 bg-foreground overflow-hidden">
        <div className="absolute inset-0 pointer-events-none luxe-grain opacity-30" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(169,140,95,0.12) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div {...fadeUp} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <span className="block text-accent text-[9px] tracking-[0.55em] uppercase font-medium mb-8">
              Begin a Conversation
            </span>
            <h2
              className="font-display font-light text-background leading-[1.1] mb-12"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.01em" }}
            >
              Have a project
              <br />
              in mind?
            </h2>
            <Link
              href="/#contact"
              data-cursor-interact
              className="inline-flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.42em] uppercase border border-background/30 text-background px-10 py-4 hover:bg-background hover:text-foreground transition-all duration-500 font-sans"
            >
              Enquire Now
              <span className="w-6 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </>
  );
}
