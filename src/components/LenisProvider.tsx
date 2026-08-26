"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The admin CMS is a data-table/form heavy control panel — it wants normal
  // native scroll, not the marketing site's smooth-scroll feel.
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (isAdmin) return;

    // Touch/mobile devices get native scroll — Lenis smooth scroll is desktop-only.
    // Lenis intercepts the scroll loop even with syncTouch:false, which breaks
    // native momentum scroll and overscroll-bounce on iOS/Android.
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Save the exact reference so gsap.ticker.remove can find it on cleanup
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdmin]);

  // Lenis keeps its own scroll position independent of the native one, and
  // this instance persists across route changes (it's only recreated when
  // crossing the admin/marketing boundary) — so without this, navigating to
  // a new page leaves it rendered at whatever offset the previous page was
  // scrolled to instead of the top.
  useEffect(() => {
    if (isAdmin) return;
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname, isAdmin]);

  return <>{children}</>;
}
