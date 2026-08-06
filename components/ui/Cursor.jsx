"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * Two-part cursor: a fast dot and a lagging ring that swells over interactive
 * elements. Only mounts on devices that genuinely have a fine pointer.
 */
export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = e.target.closest?.(
        "a, button, [role='button'], input, textarea, select, [data-cursor]"
      );
      setHovering(Boolean(target));
      setLabel(target?.dataset?.cursor ?? "");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-130 hidden lg:block">
      <motion.div
        className="absolute size-1.5 rounded-full bg-sage"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-sage/80 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 84 : hovering ? 52 : 30,
          height: label ? 84 : hovering ? 52 : 30,
          opacity: visible ? 1 : 0,
          backgroundColor: label
            ? "rgba(126,140,106,0.95)"
            : hovering
              ? "rgba(126,140,106,0.16)"
              : "rgba(126,140,106,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {label && (
          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-bone">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
