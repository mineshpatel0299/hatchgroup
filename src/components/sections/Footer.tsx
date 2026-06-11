"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full bg-foreground text-background pt-16 md:pt-20 pb-10 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Mobile: centred brand hero block */}
        <div className="flex flex-col items-center text-center mb-12 md:hidden">
          <div className="relative w-36 h-11 mb-5">
            <Image
              src="https://res.cloudinary.com/de4pazo51/image/upload/v1781195359/HATCH_DARK_LOGO-01_1_1_osknv0.png"
              alt="Hatch Group"
              fill
              className="object-contain object-center brightness-0 invert opacity-90"
              unoptimized
            />
          </div>
          <div className="flex items-center gap-3 w-20 mb-5">
            <div className="flex-1 h-px bg-accent/30" />
            <div className="w-1 h-1 rounded-full bg-accent/50" />
            <div className="flex-1 h-px bg-accent/30" />
          </div>
          <p className="text-background/45 font-light text-[0.82rem] leading-[1.8] max-w-[280px]">
            We architect experiences that transcend traditional interior design — cinematic aesthetics, uncompromising quality.
          </p>
        </div>

        {/* Mobile: links in two columns */}
        <div className="grid grid-cols-2 gap-8 mb-12 md:hidden">
          <div>
            <h4 className="uppercase tracking-[0.4em] text-[8px] font-medium mb-5 text-accent/60">Explore</h4>
            <ul className="space-y-3 font-light text-[0.82rem] text-background/55">
              <li><Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors duration-300">Projects</Link></li>
              <li><Link href="/studio" className="hover:text-accent transition-colors duration-300">Studio</Link></li>
              <li><Link href="/journal" className="hover:text-accent transition-colors duration-300">Journal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-[0.4em] text-[8px] font-medium mb-5 text-accent/60">Connect</h4>
            <ul className="space-y-3 font-light text-[0.82rem] text-background/55">
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Pinterest</a></li>
              <li><a href="mailto:contact@hatchgroup.com" className="hover:text-accent transition-colors duration-300 break-all">Email Us</a></li>
            </ul>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-12 gap-12 mb-16 border-b border-background/10 pb-16">
          {/* Brand */}
          <div className="col-span-5">
            <div className="relative w-44 h-14 mb-5">
              <Image
                src="https://res.cloudinary.com/de4pazo51/image/upload/v1781195359/HATCH_DARK_LOGO-01_1_1_osknv0.png"
                alt="Hatch Group"
                fill
                className="object-contain object-left brightness-0 invert opacity-90"
                unoptimized
              />
            </div>
            <div className="w-10 h-px bg-accent mb-6" />
            <p className="text-background/50 max-w-sm font-light text-sm leading-relaxed">
              We architect experiences that transcend traditional interior design, blending cinematic aesthetics with uncompromising material quality.
            </p>
          </div>

          <div className="col-span-3 col-start-7">
            <h4 className="uppercase tracking-[0.3em] text-[10px] font-medium mb-6 text-accent/70">Explore</h4>
            <ul className="space-y-3 font-light text-sm text-background/60">
              <li><Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors duration-300">Projects</Link></li>
              <li><Link href="/studio" className="hover:text-accent transition-colors duration-300">Studio</Link></li>
              <li><Link href="/journal" className="hover:text-accent transition-colors duration-300">Journal</Link></li>
            </ul>
          </div>

          <div className="col-span-3 col-start-10">
            <h4 className="uppercase tracking-[0.3em] text-[10px] font-medium mb-6 text-accent/70">Connect</h4>
            <ul className="space-y-3 font-light text-sm text-background/60">
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Pinterest</a></li>
              <li><a href="mailto:contact@hatchgroup.com" className="hover:text-accent transition-colors duration-300">contact@hatchgroup.com</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile border */}
        <div className="md:hidden w-full h-px bg-background/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-[11px] text-background/30 font-light tracking-wider gap-3 md:gap-0">
          <p>&copy; {new Date().getFullYear()} Hatch Group. All rights reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <Link href="#" className="hover:text-accent transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

