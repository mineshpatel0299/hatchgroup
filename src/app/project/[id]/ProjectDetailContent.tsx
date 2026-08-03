"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Footer from "@/components/sections/Footer";

interface ProjectDetailContentProps {
  id: string;
  project: {
    title: string;
    subtitle: string;
    category: string;
    year: string;
    client: string;
    description: string;
    details: string;
    location: string;
    siteArea: string;
    projectArea: string;
    projectType: string;
    projectLanguage: string;
    projectScope: string;
    images: string[];
    image2: string;
  };
  nextProjectId: string;
  nextProject: {
    category: string;
  };
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

// Alternating rows: one full-bleed image, then a row of two side by side —
// mirrors the /project listing page's masonry rhythm, images only.
function groupImages(images: string[]): string[][] {
  const groups: string[][] = [];
  let i = 0;
  let wide = true;
  while (i < images.length) {
    const size = wide ? 1 : 2;
    groups.push(images.slice(i, i + size));
    i += size;
    wide = !wide;
  }
  return groups;
}

function GalleryImage({
  src,
  alt,
  delay = 0,
  priority = false,
  className = "relative flex-1 h-full overflow-hidden bg-background",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  src: string;
  alt: string;
  delay?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  // Driven off useInView (rather than whileInView variant propagation) so
  // the hidden/visible transition durations below are respected both ways —
  // on the way in and on the way out.
  const tileRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(tileRef, { amount: 0.25, once: false });

  // Scales up from the center on enter and shrinks back on exit — matches
  // the reversible expand/contract animation used on the /project listing
  // page. The enter stagger delay lives on "visible" only, so an image that
  // scrolls out never waits before shrinking back.
  const variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 1.2, ease: [0.7, 0, 0.84, 0] as const },
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay },
    },
  };

  return (
    <div ref={tileRef} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        style={{ transformOrigin: "center" }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

export default function ProjectDetailContent({ id, project, nextProjectId, nextProject }: ProjectDetailContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSlideMode = searchParams.get("slide") === "true";
  const [isExiting, setIsExiting] = useState(false);

  React.useEffect(() => {
    // Reset exiting state when the route changes so the exit curtain snaps back down
    setIsExiting(false);
  }, [id]);

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    // Wait for exit animation to finish before routing
    setTimeout(() => {
      router.push(`/project/${nextProjectId}?slide=true`);
    }, 1000);
  };

  const heroImage = project.image2 || project.images[0];
  const galleryImages = project.images.filter((src) => src !== heroImage);
  const galleryRows = groupImages(galleryImages);

  const infoRows: Array<[string, string]> = [
    ["Location", project.location],
    ["Site Area", project.siteArea],
    ["Project Area", project.projectArea],
    ["Project Type", project.projectType],
    ["Project Language", project.projectLanguage],
    ["Project Scope", project.projectScope],
  ];

  return (
    <>
      <motion.main
        className="min-h-screen luxe-ivory font-sans"
        initial={{ opacity: isSlideMode ? 1 : 0 }}
        animate={{ opacity: isExiting ? 0.5 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* ── 1. HERO — complete, full-bleed image ── */}
        <GalleryImage
          src={heroImage}
          alt={project.title}
          priority
          sizes="100vw"
          className="relative w-full h-screen overflow-hidden bg-background"
        />

        {/* ── 2. PROJECT INFORMATION ── */}
        <section className="relative w-full py-24 md:py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-14 gap-x-16">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <span className="block text-accent text-[10px] tracking-[0.5em] uppercase font-medium mb-5">
                {project.category} · {project.year}
              </span>
              <h1
                className="font-display font-light text-accent leading-[1.05] mb-10 uppercase"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", letterSpacing: "-0.01em" }}
              >
                {project.title}
              </h1>
              <p className="text-foreground/70 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-xl mb-6">
                {project.description}
              </p>
              <p className="text-foreground/70 font-light leading-[1.95] text-[0.95rem] md:text-[1.05rem] max-w-xl">
                {project.details}
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="lg:col-span-5 lg:pt-2">
              <h2 className="text-[11px] tracking-[0.35em] uppercase font-medium text-foreground mb-8">
                Project Information
              </h2>
              <dl className="flex flex-col gap-5">
                {infoRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 gap-4 pb-5 border-b border-foreground/10">
                    <dt className="text-foreground/50 text-sm">{label}</dt>
                    <dd className="text-foreground text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* ── 3. GALLERY — image only, same alternating full/split rows as /project ── */}
        <div className="relative w-full flex flex-col gap-0.5">
          {galleryRows.map((row, ri) => (
            <div key={ri} className="flex flex-col sm:flex-row w-full gap-y-0.5 gap-x-2 h-[70vh] md:h-[88vh]">
              {row.map((src, ii) => (
                <GalleryImage
                  key={src}
                  src={src}
                  alt={`${project.title} — photo ${ri * 2 + ii + 1}`}
                  delay={ii * 0.15}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── Next project ── */}
        <div className="relative w-full overflow-hidden">
          <div className="w-full h-[40vh] md:h-[50vh] luxe-emerald p-8 md:p-14 flex flex-col justify-between text-foreground relative group overflow-hidden">
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <a
              href={`/project/${nextProjectId}`}
              onClick={handleNextClick}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label="Next Project"
            />
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight z-10 group-hover:scale-105 transition-transform duration-500 origin-left">
              Next <br /> project
            </h2>
            <div className="flex justify-between items-end mt-auto text-[10px] uppercase font-bold tracking-widest z-10">
              <div className="flex items-center gap-4">
                <span className="text-accent group-hover:text-white transition-colors duration-300">0{nextProjectId}</span>
                <div className="w-12 h-px bg-foreground/30 group-hover:w-16 transition-all duration-300 origin-left" />
              </div>
              <span className="text-foreground/70">{nextProject.category}</span>
            </div>
          </div>
        </div>

        <Footer />
      </motion.main>

      {/* --- CINEMATIC CURTAIN WIPE EFFECTS --- */}

      {/* Exit Curtain (Sweeps up from bottom when clicking Next) */}
      <motion.div
        className="fixed inset-0 z-[100] bg-foreground pointer-events-none flex items-center justify-center"
        initial={{ y: "100%" }}
        animate={{ y: isExiting ? "0%" : "100%" }}
        transition={{ duration: isExiting ? 1 : 0, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="text-background font-display text-2xl md:text-4xl uppercase tracking-[0.5em]">Hatch Group</span>
      </motion.div>

      {/* Enter Curtain (Sweeps up to top when page loads) */}
      <motion.div
        key={`enter-${id}`}
        className="fixed inset-0 z-[100] bg-foreground pointer-events-none flex items-center justify-center"
        initial={{ y: isSlideMode ? "0%" : "-100%" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <span className="text-background font-display text-2xl md:text-4xl uppercase tracking-[0.5em]">Hatch Group</span>
      </motion.div>
    </>
  );
}
