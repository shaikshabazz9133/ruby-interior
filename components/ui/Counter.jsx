"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Counts from 0 up to `value` the first time it scrolls into view. */
export default function Counter({ value, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  // With reduced motion the final value is simply rendered — no ticking.
  const display = reduced ? value : count;

  useEffect(() => {
    if (!inView || reduced) return;

    let raf;
    let start;
    const tick = (now) => {
      if (start === undefined) start = now;
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast off the line, gentle landing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
