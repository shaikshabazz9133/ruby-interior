"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-95 h-[2px] origin-left bg-linear-to-r from-brass via-brass-soft to-clay"
    />
  );
}
