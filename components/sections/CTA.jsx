"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { CTA_IMAGE } from "@/lib/data";

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
          src={CTA_IMAGE.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scrim */}
      <div className="absolute inset-0 z-0 bg-base/78" />
      <div className="absolute inset-0 z-0 bg-linear-to-t from-base/90 via-transparent to-base/60" />

      <div className="container-x relative z-10 flex min-h-[58svh] flex-col items-center justify-center py-20 text-center sm:py-24">
        <Reveal variant="fade">
          <span className="text-eyebrow text-brass-soft">Ready when you are</span>
        </Reveal>

        <AnimatedText
          as="h2"
          text="Let's build the room you keep imagining"
          className="text-h2 mt-5 max-w-[18ch] text-balance text-ivory"
          highlight={[3, 4]}
        />

        <Reveal variant="up" delay={0.12}>
          <p className="text-body mx-auto mt-5 max-w-[46ch] text-ivory/70">
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
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brass px-9 py-4 text-[11px] uppercase tracking-[0.18em] text-base"
            >
              <span className="relative z-10">
                Book a free consultation
              </span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
