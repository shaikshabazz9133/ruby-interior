"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Pulls its child toward the pointer on hover. Pointer-based so it simply never
 * engages on touch devices, where there is no hover to speak of.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
