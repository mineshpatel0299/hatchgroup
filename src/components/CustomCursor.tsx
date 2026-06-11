"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Move dot immediately
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const updateRing = () => {
      ringX += (mouseX - ringX) * 0.15; // Lag effect
      ringY += (mouseY - ringY) * 0.15;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(updateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    const rafId = requestAnimationFrame(updateRing);

    // Hover effect
    const onMouseEnter = () => {
      gsap.to(dot, { scale: 0, duration: 0.3 });
      gsap.to(ring, { scale: 1.5, borderColor: "rgba(201, 168, 76, 0.5)", backgroundColor: "rgba(201, 168, 76, 0.1)", duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(ring, { scale: 1, borderColor: "rgba(201, 168, 76, 1)", backgroundColor: "transparent", duration: 0.3 });
    };

    const addListeners = () => {
      const interactables = document.querySelectorAll("a, button, input, textarea, [data-cursor-interact]");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
      return interactables;
    };

    let interactables = addListeners();

    // Re-bind listeners on DOM mutations
    const observer = new MutationObserver(() => {
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      interactables = addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-10 h-10 border border-accent rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
      />
      <div 
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 w-3 h-3 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
      />
    </>
  );
}
