"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export default function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image travels further than the frame, so the frame acts as a window.
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    // NOTE: no background colour on the section itself. The photo sits at z-0
    // and the content at z-10 — a negative z-index here would paint the photo
    // behind the section's own background and make it invisible.
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scrim */}
      <div className="absolute inset-0 z-0 bg-forest/78" />
      <div className="absolute inset-0 z-0 bg-linear-to-t from-forest/90 via-transparent to-forest/60" />

      <div className="container-x relative z-10 flex min-h-[58svh] flex-col items-center justify-center py-20 text-center sm:py-24">
        <Reveal variant="fade">
          <span className="text-eyebrow text-sage-soft">Ready when you are</span>
        </Reveal>

        <AnimatedText
          as="h2"
          text="Let's build the room you keep imagining"
          className="text-h2 mt-5 max-w-[18ch] text-balance text-bone"
          highlight={[3, 4]}
        />

        <Reveal variant="up" delay={0.12}>
          <p className="text-body mx-auto mt-5 max-w-[46ch] text-bone/70">
            Send us your floor plan, a rough budget and one photo of a space you
            love. We will come back within two working days with a direction and
            a realistic number.
          </p>
        </Reveal>

        <Reveal variant="up" delay={0.2} className="mt-8">
          <Magnetic strength={0.28}>
            <a
              href="#contact"
              data-cursor="Enquire"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-9 py-4 text-[11px] uppercase tracking-[0.18em] text-forest"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-bone">
                Book a free consultation
              </span>
              <span className="relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-bone">
                →
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-sage transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
