"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { NAV_LINKS, SERVICES, CONTACT } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // The oversized wordmark rises and settles as the footer comes into view.
  const wordY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden bg-forest pt-14 sm:pt-20">
      <div className="container-x">
        {/* ---------- Columns ---------- */}
        <div className="grid gap-10 border-b border-bone/10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="up">
              <p className="font-display text-2xl leading-snug text-bone/90 sm:text-3xl">
                A studio that draws it, costs it and{" "}
                <span className="italic text-sage-soft">builds it</span> — so
                there is only ever one number to call.
              </p>
            </Reveal>

            <Reveal variant="up" delay={0.08}>
              <a
                href={`mailto:${CONTACT.email}`}
                className="group mt-6 inline-flex max-w-full flex-wrap items-center gap-3 break-words text-lg text-bone"
              >
                {CONTACT.email}
                <span className="grid size-8 place-items-center rounded-full border border-bone/20 transition-all duration-400 group-hover:border-sage-soft group-hover:bg-sage-soft group-hover:text-forest">
                  ↗
                </span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[9px] uppercase tracking-[0.2em] text-sage-soft">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-block text-sm text-bone/60 transition-colors hover:text-bone"
                  >
                    {link.label}
                    <span className="block h-px w-0 bg-sage-soft transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[9px] uppercase tracking-[0.2em] text-sage-soft">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="group inline-block text-sm text-bone/60 transition-colors hover:text-bone"
                  >
                    {s.title}
                    <span className="block h-px w-0 bg-sage-soft transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[9px] uppercase tracking-[0.2em] text-sage-soft">
              Follow
            </h4>
            <ul className="mt-4 space-y-2.5">
              {CONTACT.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-block text-sm text-bone/60 transition-colors hover:text-bone"
                  >
                    {s.label}
                    <span className="block h-px w-0 bg-sage-soft transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            <address className="mt-6 not-italic text-sm leading-relaxed text-bone/45">
              {CONTACT.address}
            </address>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="flex flex-col-reverse items-center justify-between gap-5 py-6 sm:flex-row">
          <p className="text-center text-xs text-muted-light sm:text-left">
            © {year} RUYA Interiors. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-muted-light transition-colors hover:text-bone">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-light transition-colors hover:text-bone">
              Terms
            </a>
            <Magnetic strength={0.28}>
              <a
                href="#home"
                aria-label="Back to top"
                className="group grid size-10 place-items-center rounded-full border border-bone/20 text-bone transition-all duration-400 hover:border-sage-soft hover:bg-sage-soft hover:text-forest"
              >
                <span className="transition-transform duration-400 group-hover:-translate-y-0.5">
                  ↑
                </span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* ---------- Oversized wordmark ---------- */}
      <div className="relative overflow-hidden">
        <motion.p
          style={{ y: wordY, opacity: wordOpacity }}
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-display text-[clamp(3.5rem,15vw,12rem)] leading-[0.85] tracking-[-0.03em] text-bone/8"
        >
          RUYA <span className="italic">Interiors</span>
        </motion.p>
      </div>
    </footer>
  );
}
