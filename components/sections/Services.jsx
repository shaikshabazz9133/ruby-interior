"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SERVICES } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1];

export default function Services() {
  return (
    <section id="services" className="section-y bg-sage-pale">
      <div className="container-x">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal variant="fade">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-walnut" />
                <span className="text-eyebrow text-walnut">What we do</span>
              </div>
            </Reveal>

            <AnimatedText
              as="h2"
              text="Six ways we shape a space"
              className="text-h2 mt-5 text-balance text-forest"
              highlight={[0]}
            />
          </div>

          <Reveal variant="up" delay={0.1}>
            <p className="text-body max-w-[40ch] text-muted">
              Take one service or hand us the whole project — the drawings, the
              crew and the accountability stay identical either way.
            </p>
          </Reveal>
        </div>

        {/* ---------- Cards ---------- */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} variant="up" delay={Math.min(i * 0.07, 0.35)}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-forest/8 bg-bone transition-colors duration-500 hover:border-sage/45"
              >
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-sage-pale">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-2.5 py-1 font-sans text-[10px] tracking-[0.18em] text-forest backdrop-blur-sm">
                    {service.id}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-h3 min-w-0 text-forest transition-colors duration-400 group-hover:text-sage">
                      {service.title}
                    </h3>
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-forest/15 text-forest/50 transition-all duration-500 group-hover:rotate-45 group-hover:border-sage group-hover:bg-sage group-hover:text-bone">
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <path d="M8 1v14M1 8h14" />
                      </svg>
                    </span>
                  </div>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                    {service.blurb}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-forest/12 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-muted transition-colors duration-500 group-hover:border-sage/40 group-hover:text-sage"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="up" className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="group relative inline-block overflow-hidden rounded-full border border-forest/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.18em] text-forest"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-bone">
              Request a quote
            </span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
