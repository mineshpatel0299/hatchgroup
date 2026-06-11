"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu } from "lucide-react";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out px-6 py-4 md:px-12 md:py-6 flex items-center justify-between",
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="text-2xl font-display font-semibold tracking-wide text-foreground">
        Hatch Group
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
        <a href="#philosophy" className="hover:text-accent transition-colors" data-cursor-interact>Philosophy</a>
        <a href="#services" className="hover:text-accent transition-colors" data-cursor-interact>Services</a>
        <a href="#projects" className="hover:text-accent transition-colors" data-cursor-interact>Projects</a>
        <a href="#contact" className="hover:text-accent transition-colors" data-cursor-interact>Contact</a>
      </div>

      <button className="md:hidden text-foreground" data-cursor-interact>
        <Menu size={28} strokeWidth={1.5} />
      </button>
    </nav>
  );
}
