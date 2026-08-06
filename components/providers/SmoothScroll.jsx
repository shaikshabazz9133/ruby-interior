"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertia-based smooth scrolling. Anchor links are intercepted so they ease to
 * their target instead of jumping. Bails out entirely when the visitor has asked
 * their OS to reduce motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      // Without this, a *stopped* Lenis still calls preventDefault() on every
      // wheel/touch event, which freezes scrolling inside modals and any other
      // nested scroll container. Elements can also opt out via
      // `data-lenis-prevent`.
      allowNestedScroll: true,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (e) => {
      const anchor = e.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    };

    document.addEventListener("click", onAnchorClick);

    // Sections can lock scrolling (e.g. the mobile menu) via these events.
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
      lenis.destroy();
    };
  }, []);

  return null;
}
