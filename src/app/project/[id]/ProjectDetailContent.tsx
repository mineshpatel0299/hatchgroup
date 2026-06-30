"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCarousel from "@/components/ui/ProjectCarousel";

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
    images: string[];
    image2: string;
  };
  nextProjectId: string;
  nextProject: {
    category: string;
  };
}

export default function ProjectDetailContent({ id, project, nextProjectId, nextProject }: ProjectDetailContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSlideMode = searchParams.get("slide") === "true";
  const [isExiting, setIsExiting] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", email: "", phone: "" });
  const [brochureStatus, setBrochureStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showBrochureModal) {
      setTimeout(() => nameInputRef.current?.focus(), 300);
    }
  }, [showBrochureModal]);

  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrochureStatus("sending");
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...brochureForm, project: project.title }),
      });
      if (!res.ok) throw new Error();
      setBrochureStatus("sent");
    } catch {
      setBrochureStatus("error");
    }
  };

  React.useEffect(() => {
    // Reset exiting state when the route changes so the exit curtain snaps back down
    setIsExiting(false);
  }, [id]);

  // Ultra-Premium Curtain & Scale variants
  const containerVariants = {
    hidden: { 
      opacity: isSlideMode ? 1 : 0,
      scale: isSlideMode ? 1 : 0.98
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: isSlideMode ? 0.8 : 0.2,
        duration: 0.8
      },
    },
    exit: {
      scale: 0.98,
      opacity: 0.5,
      transition: {
        duration: 1, ease: [0.76, 0, 0.24, 1] as const
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const slideLeftVariants = {
    hidden: { x: 50, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const scaleUpVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        delay: 0.4,
      },
    },
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExiting(true);
    // Wait for exit animation to finish before routing
    setTimeout(() => {
      router.push(`/project/${nextProjectId}?slide=true`);
    }, 1000);
  };

  return (
    <>
    <motion.main 
      className="min-h-screen flex flex-col md:flex-row luxe-ivory font-sans overflow-y-auto overflow-x-hidden md:overflow-hidden relative"
      variants={containerVariants}
      initial="hidden"
      animate={isExiting ? "exit" : "show"}
    >
      
      {/* LEFT PANE - 45% width on desktop */}
      <div className="relative w-full md:w-[45vw] min-h-[auto] md:min-h-screen p-8 md:p-16 flex flex-col pb-16 md:pb-16">
        
        {/* Global Nav will be rendered here by layout.tsx, so we just add top padding */}
        <div className="h-16 md:h-24"></div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center pr-12 md:pr-24 mt-12 md:mt-0">
          <motion.div variants={itemVariants} className="flex items-center gap-6 mb-6">
            <span className="text-xs font-bold">0{id}.</span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-foreground/60">{project.category}</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter leading-[1.05] mb-8">
            {project.title} <br/> {project.subtitle}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-sm md:text-base leading-relaxed text-foreground/80 max-w-sm">
            {project.description}
          </motion.p>
        </div>

        {/* Social Links - Vertical on right edge of left pane */}
        <motion.div variants={slideLeftVariants} className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 hidden md:flex">
          <span className="[writing-mode:vertical-rl] text-[10px] tracking-widest uppercase text-foreground/50 mb-4">Our social media sites</span>
          <a href="#" className="text-foreground hover:text-accent transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
        </motion.div>

        {/* Bottom Area */}
        <motion.div variants={itemVariants} className="flex items-center gap-6 text-[10px] uppercase font-bold text-foreground mt-8">
          <span>{project.year}</span>
          <div className="h-px bg-foreground flex-1 max-w-[120px] origin-left"></div>
          <span className="text-foreground/60">by {project.client}</span>
        </motion.div>
        
      </div>


      {/* RIGHT PANE - 55% width on desktop */}
      <div className="relative w-full md:w-[55vw] min-h-[auto] md:min-h-screen flex flex-col bg-background">
        
        {/* Top 2/3 Image Block - Interactive Carousel */}
        <motion.div variants={scaleUpVariants} className="relative w-full h-[50vh] md:h-[60%] flex-none md:flex-1 overflow-hidden origin-bottom">
          <ProjectCarousel 
            projectId={id}
            client={project.client}
            images={project.images}
          />
        </motion.div>

        {/* Bottom 1/3 Split Block */}
        <div className="relative w-full h-auto md:h-[40%] flex flex-col md:flex-row overflow-hidden">
          
          {/* Bottom Left - Next Project Block */}
          <motion.div variants={itemVariants} className="w-full md:w-[45%] h-[40vh] md:h-full luxe-emerald p-8 flex flex-col justify-between text-foreground relative group overflow-hidden">
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <a 
              href={`/project/${nextProjectId}`} 
              onClick={handleNextClick} 
              className="absolute inset-0 z-10 cursor-pointer" 
              aria-label="Next Project" 
            />
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight z-10 group-hover:scale-105 transition-transform duration-500 origin-left">
              Next <br/> project
            </h2>
            
            <div className="flex justify-between items-end mt-auto text-[10px] uppercase font-bold tracking-widest z-10">
              <div className="flex items-center gap-4">
                <span className="text-accent group-hover:text-white transition-colors duration-300">0{nextProjectId}</span>
                <div className="w-12 h-px bg-foreground/30 group-hover:w-16 transition-all duration-300 origin-left"></div>
              </div>
              <span className="text-foreground/70">{nextProject.category}</span>
            </div>
          </motion.div>

          {/* Bottom Right - Download Brochure */}
          <motion.div variants={itemVariants} className="w-full md:w-[55%] h-[40vh] md:h-full relative overflow-hidden luxe-ivory p-8 md:p-12 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-foreground/10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-full border border-foreground/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/70">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-display font-medium tracking-tight mb-2">
                Download Brochure
              </h3>
              <p className="text-xs md:text-sm text-foreground/50 mb-6 max-w-xs">
                Get the full project details, floor plans and pricing delivered to your inbox.
              </p>
              <button
                onClick={() => setShowBrochureModal(true)}
                className="group flex items-center gap-3 px-8 py-3.5 bg-foreground text-background text-[11px] md:text-xs uppercase tracking-[0.25em] font-bold hover:bg-accent transition-colors duration-300"
              >
                <span>Get Brochure</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-y-0.5 transition-transform">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          </motion.div>

        </div>

      </div>

    </motion.main>

      {/* --- BROCHURE MODAL --- */}
      <AnimatePresence>
        {showBrochureModal && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowBrochureModal(false); setBrochureStatus("idle"); }} />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md luxe-ivory p-8 md:p-10 shadow-2xl rounded-2xl"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close */}
              <button
                onClick={() => { setShowBrochureModal(false); setBrochureStatus("idle"); }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {brochureStatus === "sent" ? (
                <div className="flex flex-col items-center text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-medium tracking-tight mb-2 text-foreground">
                    Brochure Sent!
                  </h3>
                  <p className="text-sm text-foreground/60 max-w-xs">
                    The {project.title} brochure has been sent to <span className="font-medium text-foreground/80">{brochureForm.email}</span>. Please check your inbox.
                  </p>
                  <button
                    onClick={() => { setShowBrochureModal(false); setBrochureStatus("idle"); }}
                    className="mt-6 px-6 py-2.5 bg-foreground text-background text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-accent transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-display font-medium tracking-tight mb-1 text-foreground">
                      Get the Brochure
                    </h3>
                    <p className="text-xs text-foreground/50">
                      {project.title} — delivered straight to your inbox.
                    </p>
                  </div>

                  <form onSubmit={handleBrochureSubmit} className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="brochure-name" className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50 mb-1.5 block">
                        Full Name
                      </label>
                      <input
                        ref={nameInputRef}
                        id="brochure-name"
                        type="text"
                        required
                        value={brochureForm.name}
                        onChange={(e) => setBrochureForm({ ...brochureForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-transparent border-b border-foreground/15 focus:border-foreground py-2.5 text-sm outline-none placeholder-foreground/25 transition-colors text-foreground"
                      />
                    </div>
                    <div>
                      <label htmlFor="brochure-email" className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50 mb-1.5 block">
                        Email Address
                      </label>
                      <input
                        id="brochure-email"
                        type="email"
                        required
                        value={brochureForm.email}
                        onChange={(e) => setBrochureForm({ ...brochureForm, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-transparent border-b border-foreground/15 focus:border-foreground py-2.5 text-sm outline-none placeholder-foreground/25 transition-colors text-foreground"
                      />
                    </div>
                    <div>
                      <label htmlFor="brochure-phone" className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50 mb-1.5 block">
                        Phone Number
                      </label>
                      <input
                        id="brochure-phone"
                        type="tel"
                        required
                        value={brochureForm.phone}
                        onChange={(e) => setBrochureForm({ ...brochureForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-transparent border-b border-foreground/15 focus:border-foreground py-2.5 text-sm outline-none placeholder-foreground/25 transition-colors text-foreground"
                      />
                    </div>

                    {brochureStatus === "error" && (
                      <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={brochureStatus === "sending"}
                      className="mt-2 w-full py-3.5 bg-foreground text-background text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {brochureStatus === "sending" ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Brochure</span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
