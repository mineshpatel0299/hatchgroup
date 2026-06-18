"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function EnquirePage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    projectType: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto focus the input when step changes
    if (step === 1 || step === 3 || step === 4) {
      setTimeout(() => inputRef.current?.focus(), 500);
    } else if (step === 5) {
      setTimeout(() => textAreaRef.current?.focus(), 500);
    }
  }, [step]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 5) {
      // Simulate submit
      setStep(6);
    } else {
      setStep((s) => s + 1);
    }
  };

  const variants = {
    enter: { opacity: 0, y: 30, filter: "blur(10px)" },
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -30, filter: "blur(10px)" }
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white font-sans overflow-hidden flex items-center justify-center">
      
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero.png" 
          alt="Hatch Group Background"
          fill
          className="object-cover opacity-60 mix-blend-luminosity scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-8 md:px-16 text-center">
        <AnimatePresence mode="wait">
          
          {step === 0 && (
            <motion.div 
              key="step0"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-7xl font-display font-medium tracking-tight mb-12">
                Let's build something extraordinary.
              </h1>
              <button 
                onClick={() => setStep(1)}
                className="group flex items-center gap-4 text-sm md:text-base uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors"
              >
                <span>Begin</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-2 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.form 
              key="step1"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="flex flex-col items-center w-full"
            >
              <label htmlFor="name" className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-12 text-white/90">
                Who do we have the pleasure of speaking with?
              </label>
              <input 
                ref={inputRef}
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Type your full name"
                className="w-full max-w-lg bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-2xl md:text-4xl text-center outline-none placeholder-white/20 transition-colors"
              />
              <button type="submit" className="mt-12 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm uppercase tracking-widest">
                Press Enter <kbd className="font-sans px-2 py-1 bg-white/10 rounded ml-2">↵</kbd>
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="step2"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="flex flex-col items-center w-full"
            >
              <label htmlFor="projectType" className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-12 text-white/90 leading-tight">
                What type of project are you envisioning, <span className="text-accent">{formData.name.split(' ')[0]}</span>?
              </label>
              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                {["Residential", "Commercial", "Hospitality", "Other"].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setFormData({...formData, projectType: type});
                      setStep(3);
                    }}
                    className="px-8 py-5 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all text-xs md:text-sm uppercase tracking-[0.2em]"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.form 
              key="step3"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="flex flex-col items-center w-full"
            >
              <label htmlFor="phone" className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-12 text-white/90">
                What is the best number to reach you at?
              </label>
              <input 
                ref={inputRef}
                type="tel" 
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Phone Number"
                className="w-full max-w-lg bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-2xl md:text-4xl text-center outline-none placeholder-white/20 transition-colors"
              />
              <button type="submit" className="mt-12 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm uppercase tracking-widest">
                Press Enter <kbd className="font-sans px-2 py-1 bg-white/10 rounded ml-2">↵</kbd>
              </button>
            </motion.form>
          )}

          {step === 4 && (
            <motion.form 
              key="step4"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="flex flex-col items-center w-full"
            >
              <label htmlFor="email" className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-12 text-white/90">
                Where can we send the details?
              </label>
              <input 
                ref={inputRef}
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address"
                className="w-full max-w-lg bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-2xl md:text-4xl text-center outline-none placeholder-white/20 transition-colors"
              />
              <button type="submit" className="mt-12 opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 text-sm uppercase tracking-widest">
                Press Enter <kbd className="font-sans px-2 py-1 bg-white/10 rounded ml-2">↵</kbd>
              </button>
            </motion.form>
          )}

          {step === 5 && (
            <motion.form 
              key="step5"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="flex flex-col items-center w-full"
            >
              <label htmlFor="message" className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-12 text-white/90">
                Is there anything else you'd like to add?
              </label>
              <textarea 
                ref={textAreaRef}
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Your message (optional)"
                rows={3}
                className="w-full max-w-xl bg-transparent border-b-2 border-white/20 focus:border-white py-4 text-xl md:text-2xl text-center outline-none placeholder-white/20 transition-colors resize-none"
              />
              <button type="submit" className="mt-16 group flex items-center gap-4 text-sm uppercase tracking-[0.3em] font-medium hover:text-accent transition-colors">
                <span>Submit Request</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-2 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.form>
          )}

          {step === 6 && (
            <motion.div 
              key="step6"
              variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight mb-8">
                Thank you, <span className="text-accent">{formData.name.split(' ')[0]}</span>.
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
                We have received your enquiry for a {formData.projectType.toLowerCase()} project. Our team will be in touch shortly.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Step Indicator */}
      {step > 0 && step < 6 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          {[1, 2, 3, 4, 5].map(i => (
            <button 
              key={i} 
              onClick={() => {
                 // only allow going backwards
                 if (i < step) setStep(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${step === i ? 'bg-white scale-150' : 'bg-white/20 hover:bg-white/50 cursor-pointer'}`}
              aria-label={`Go to step ${i}`}
            />
          ))}
        </div>
      )}

    </main>
  );
}
