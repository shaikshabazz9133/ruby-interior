"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { PROCESS } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";

export default function Process() {
  const trackRef = useRef(null);

  // The rail fills as the timeline crosses the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="section-y bg-bone">
      <div className="container-x">
        {/* ---------- Header ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal variant="fade">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-walnut" />
              <span className="text-eyebrow text-walnut">How it works</span>
              <span className="h-px w-8 bg-walnut" />
            </div>
          </Reveal>

          <AnimatedText
            as="h2"
            text="From first sketch to keys in hand"
            className="text-h2 mt-5 text-balance text-forest"
            highlight={[5, 6]}
          />

          <Reveal variant="up" delay={0.1}>
            <p className="text-body mx-auto mt-4 max-w-[48ch] text-muted">
              Fifteen weeks, five stages, zero mystery. Every milestone comes
              with a document you can hold us to.
            </p>
          </Reveal>
        </div>

        {/* ---------- Timeline ---------- */}
        <div ref={trackRef} className="relative mt-12 lg:mt-16">
          {/* Horizontal rail (desktop) */}
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-forest/12 lg:block">
            <motion.div
              style={{ scaleX: fill }}
              className="h-full origin-left bg-linear-to-r from-sage to-walnut"
            />
          </div>

          {/* Vertical rail (mobile / tablet) */}
          <div className="absolute bottom-2 left-5 top-2 w-px bg-forest/12 lg:hidden">
            <motion.div
              style={{ scaleY: fill }}
              className="h-full origin-top bg-linear-to-b from-sage to-walnut"
            />
          </div>

          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
            {PROCESS.map((item, i) => (
              <Reveal
                as="li"
                key={item.step}
                variant="up"
                delay={Math.min(i * 0.08, 0.4)}
                className="relative flex gap-5 lg:block"
              >
                {/* Node */}
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-sage/45 bg-bone font-sans text-[10px] tracking-[0.12em] text-sage">
                  {item.step}
                </span>

                <div className="min-w-0 pb-1 lg:mt-5">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-walnut">
                    {item.duration}
                  </span>
                  <h3 className="text-h3 mt-1.5 text-forest">{item.title}</h3>
                  <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
