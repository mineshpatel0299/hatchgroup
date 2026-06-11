"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full bg-foreground text-background pt-20 pb-10 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 border-b border-background/10 pb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            {/* Logo */}
            <div className="relative w-44 h-14 mb-5">
              <Image
                src="https://res.cloudinary.com/de4pazo51/image/upload/v1781195359/HATCH_DARK_LOGO-01_1_1_osknv0.png"
                alt="Hatch Group"
                fill
                className="object-contain object-left brightness-0 invert opacity-90"
                unoptimized
              />
            </div>
            <div className="w-10 h-[1px] bg-accent mb-6" />
            <p className="text-background/50 max-w-sm font-light text-sm leading-relaxed">
              We architect experiences that transcend traditional interior design, blending cinematic aesthetics with uncompromising material quality.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="uppercase tracking-[0.3em] text-[10px] font-medium mb-6 text-accent/70">Explore</h4>
            <ul className="space-y-3 font-light text-sm text-background/60">
              <li><Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors duration-300">Projects</Link></li>
              <li><Link href="/studio" className="hover:text-accent transition-colors duration-300">Studio</Link></li>
              <li><Link href="/journal" className="hover:text-accent transition-colors duration-300">Journal</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="uppercase tracking-[0.3em] text-[10px] font-medium mb-6 text-accent/70">Connect</h4>
            <ul className="space-y-3 font-light text-sm text-background/60">
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">LinkedIn</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-300">Pinterest</a></li>
              <li><a href="mailto:contact@hatchgroup.com" className="hover:text-accent transition-colors duration-300">contact@hatchgroup.com</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-background/30 font-light tracking-wider">
          <p>&copy; {new Date().getFullYear()} Hatch Group. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="#" className="hover:text-accent transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

