"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.76, 0, 0.24, 1];

/**
 * Full-screen intro: a counter ticks to 100 while the wordmark settles, then
 * four panels wipe upward to hand over to the hero. Scrolling stays locked
 * until the wipe begins.
 */
export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // Reduced motion: no intro at all, hand straight over to the page.
  useEffect(() => {
    if (reduced) onDone?.();
  }, [reduced, onDone]);

  useEffect(() => {
    if (reduced) return;

    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lenis:stop"));

    let raf;
    let start;
    const DURATION = 1400;

    const tick = (now) => {
      if (start === undefined) start = now;
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 180);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduced, onDone]);

  // Hand over the moment the curtain starts lifting, so the hero's entrance
  // plays *through* the reveal instead of after it. The scroll lock is released
  // here rather than only on exit-complete — if the exit animation is ever
  // interrupted, the page must not be left permanently unscrollable.
  useEffect(() => {
    if (!done) return;
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("lenis:start"));
    onDone?.();
  }, [done, onDone]);

  const release = () => {
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("lenis:start"));
  };

  if (reduced) return null;

  return (
    <AnimatePresence onExitComplete={release}>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-120 flex items-end justify-center"
          exit={{ transition: { staggerChildren: 0.07 } }}
        >
          {/* Curtain panels — desktop splits into four, mobile stays whole */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-forest"
                initial={{ y: 0 }}
                exit={{ y: "-101%" }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.075 }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 w-full px-6 pb-[12vh] sm:pb-[14vh]"
            exit={{ opacity: 0, y: -32, transition: { duration: 0.5, ease: EASE } }}
          >
            <div className="container-x flex flex-col gap-8">
              <div className="overflow-hidden">
                <motion.h1
                  className="text-[clamp(2.5rem,10vw,7rem)] leading-[0.9] tracking-[-0.03em] text-bone"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                >
                  RUYA
                  <span className="italic text-sage-soft"> Interiors</span>
                </motion.h1>
              </div>

              <div className="flex items-end justify-between gap-6">
                <motion.p
                  className="max-w-xs text-xs uppercase tracking-[0.3em] text-sage-soft sm:text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Where your vision takes shape
                </motion.p>
                <span className="font-display text-[clamp(2rem,7vw,5rem)] leading-none text-sage-soft tabular-nums">
                  {String(progress).padStart(3, "0")}
                </span>
              </div>

              {/* Loading rule */}
              <div className="h-px w-full bg-bone/15">
                <motion.div
                  className="h-full bg-sage"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
