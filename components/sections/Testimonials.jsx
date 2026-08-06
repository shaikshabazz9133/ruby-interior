"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TESTIMONIALS } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((dir) => {
    setState(([i]) => [(i + dir + TESTIMONIALS.length) % TESTIMONIALS.length, dir]);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go, index, reduced]);

  const active = TESTIMONIALS[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      className="section-y relative overflow-hidden bg-sage-pale"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Oversized quote glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[20rem] leading-none text-forest/5 sm:text-[28rem]"
      >
        &rdquo;
      </span>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal variant="fade">
            <span className="text-eyebrow text-walnut">Client words</span>
          </Reveal>

          <AnimatedText
            as="h2"
            text="The part we cannot design ourselves"
            className="text-h2 mt-4 text-balance text-forest"
            highlight={[1, 2]}
          />

          {/* ---------- Slider ---------- */}
          <div className="relative mt-10 min-h-[290px] sm:min-h-[250px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
                drag={reduced ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <p className="font-display text-[clamp(1.35rem,2.7vw,2.1rem)] leading-[1.35] text-balance text-forest">
                  &ldquo;{active.quote}&rdquo;
                </p>

                <footer className="mt-7 flex items-center justify-center gap-4">
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-forest/15">
                    <Image
                      src={active.image}
                      alt={active.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <div className="text-left">
                    <cite className="block font-sans text-sm not-italic text-forest">
                      {active.name}
                    </cite>
                    <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-muted">
                      {active.role}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* ---------- Controls ---------- */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-10 place-items-center rounded-full border border-forest/20 text-forest transition-all duration-400 hover:border-forest hover:bg-forest hover:text-bone"
            >
              ←
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="relative h-[3px] overflow-hidden rounded-full bg-forest/20 transition-all duration-500"
                  style={{ width: i === index ? 40 : 14 }}
                >
                  {/* CSS animation so hovering freezes the fill in place
                      rather than restarting it */}
                  {i === index && !reduced && (
                    <span
                      key={index}
                      className="absolute inset-y-0 left-0 bg-walnut"
                      style={{
                        animation: `progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                  {i === index && reduced && (
                    <span className="absolute inset-0 bg-walnut" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-10 place-items-center rounded-full border border-forest/20 text-forest transition-all duration-400 hover:border-forest hover:bg-forest hover:text-bone"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
