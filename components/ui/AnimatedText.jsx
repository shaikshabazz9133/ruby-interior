"use client";

import { motion, useReducedMotion } from "motion/react";

// Cached so a new component type isn't created on every render (which would
// remount the element and restart the animation).
const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  div: motion.div,
};

/**
 * Splits a string into words and slides each one up from behind a mask.
 * Words (not characters) keep long headlines wrapping naturally on phones.
 *
 * `highlight` takes word indexes to render in the sage accent italic.
 */
export default function AnimatedText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.045,
  once = true,
  highlight = [],
}) {
  const reduced = useReducedMotion();
  const MotionTag = TAGS[as] ?? motion.h2;
  const words = text.split(" ");

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="line-mask inline-block align-bottom">
            <motion.span
              className={`inline-block will-change-transform ${
                highlight.includes(i)
                  ? "accent-italic pr-[0.06em]"
                  : ""
              }`}
              variants={{
                hidden: { y: "112%", opacity: 0, rotate: 3 },
                visible: { y: "0%", opacity: 1, rotate: 0 },
              }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </MotionTag>
  );
}
