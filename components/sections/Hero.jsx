"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";
import { HERO_IMAGES } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ start = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax inside the image frame — the frame stays put, the photo drifts.
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16]);

  // Pointer parallax for the floating stat card
  const mx = useSpring(0, { stiffness: 90, damping: 20 });
  const my = useSpring(0, { stiffness: 90, damping: 20 });
  const cardX = useTransform(mx, [-1, 1], [14, -14]);
  const cardY = useTransform(my, [-1, 1], [10, -10]);

  // An empty target leaves the element parked on its `initial` values.
  const on = (target) => (start ? target : {});

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative overflow-hidden bg-bone pt-24 sm:pt-28 lg:pt-32"
    >
      {/* Soft sage wash behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[460px] rounded-full bg-sage/15 blur-[120px]"
      />

      <div className="container-x relative pb-14 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Copy ---------- */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-sage" />
              <span className="text-eyebrow text-sage">Interior Design Studio</span>
            </motion.div>

            <h1 className="text-display mt-5 text-forest">
              {["Where", "your", "vision", "takes", "shape"].map((word, i) => (
                <span key={word} className="line-mask inline-block align-bottom">
                  <motion.span
                    className={`inline-block pr-[0.2em] will-change-transform ${
                      word === "vision" ? "accent-italic" : ""
                    }`}
                    initial={{ y: "115%", rotate: 3, opacity: 0 }}
                    animate={on({ y: "0%", rotate: 0, opacity: 1 })}
                    transition={{ duration: 1, delay: 0.25 + i * 0.075, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 0.85, delay: 0.7, ease: EASE }}
              className="text-body mt-6 max-w-[44ch] text-muted"
            >
              A design-and-build studio shaping homes, workplaces and hospitality
              spaces — drawn, costed and delivered by one accountable team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 0.85, delay: 0.82, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.22}>
                <a
                  href="#contact"
                  data-cursor="Let's talk"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-forest px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-bone"
                >
                  <span className="relative z-10">Start your project</span>
                  <svg
                    className="relative z-10 size-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                  >
                    <path d="M1 8h13M9 3l5 5-5 5" />
                  </svg>
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-sage transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                </a>
              </Magnetic>

              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-full border border-forest/20 px-7 py-3.5 text-[11px] uppercase tracking-[0.18em] text-forest transition-colors duration-400 hover:border-sage hover:text-sage"
              >
                View our work
                <span className="transition-transform duration-400 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
              className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-forest/12 pt-6"
            >
              {[
                ["420+", "Spaces delivered"],
                ["14 yrs", "Studio practice"],
                ["96%", "Client referrals"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-2xl text-forest sm:text-3xl">
                      {value}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-muted">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- Imagery ---------- */}
          <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={on({ opacity: 1, scale: 1 })}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
              className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-sage-pale sm:aspect-3/2 lg:aspect-4/5 xl:aspect-3/2"
            >
              <motion.div style={{ y: photoY, scale: photoScale }} className="absolute inset-0">
                <Image
                  src={HERO_IMAGES[0]}
                  alt="A softly lit contemporary living room designed by RUYA Interiors"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Curtain that lifts on load */}
              <motion.span
                initial={{ scaleY: 1 }}
                animate={on({ scaleY: 0 })}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 origin-top bg-bone"
              />
            </motion.div>

            {/* Floating credential card */}
            <motion.div
              style={{ x: cardX, y: cardY }}
              initial={{ opacity: 0, y: 24 }}
              animate={on({ opacity: 1, y: 0 })}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
              className="absolute -bottom-6 left-4 hidden w-[210px] rounded-sm border border-forest/8 bg-bone/95 p-5 shadow-xl shadow-forest/10 backdrop-blur-sm sm:block lg:-left-8"
            >
              <p className="font-display text-3xl leading-none text-forest">32</p>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                Design awards since 2011
              </p>
              <div className="mt-3 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="h-0.5 flex-1 rounded-full bg-sage/45" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.a
          href="#studio"
          initial={{ opacity: 0 }}
          animate={on({ opacity: 1 })}
          transition={{ duration: 0.8, delay: 1.25 }}
          aria-label="Scroll to next section"
          className="mt-12 hidden items-center gap-3 text-muted lg:inline-flex"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-forest/15">
            <span className="absolute inset-x-0 top-0 h-3 animate-scroll-hint bg-sage" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll to explore</span>
        </motion.a>
      </div>
    </section>
  );
}
