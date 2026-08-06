"use client";

import { motion, useReducedMotion } from "motion/react";

const VARIANTS = {
  up: { y: 42, opacity: 0 },
  down: { y: -42, opacity: 0 },
  left: { x: 48, opacity: 0 },
  right: { x: -48, opacity: 0 },
  fade: { opacity: 0 },
  scale: { scale: 0.92, opacity: 0 },
  blur: { opacity: 0, filter: "blur(14px)", y: 26 },
};

/** Generic scroll-into-view reveal used across every section. */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.85,
  once = true,
  className = "",
  as = "div",
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const hidden = VARIANTS[variant] ?? VARIANTS.up;

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
