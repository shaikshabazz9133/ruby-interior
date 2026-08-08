"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV_LINKS, CONTACT } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

const EASE = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Hide the bar while scrolling down, bring it back the moment you scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    if (open) return;
    setHidden(y > prev && y > 300);
  });

  // Highlight whichever section owns the middle of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile menu. Skipped on first mount so it does
  // not release the preloader's scroll lock.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    document.body.style.overflow = open ? "hidden" : "";
    window.dispatchEvent(new Event(open ? "lenis:stop" : "lenis:start"));
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-80 transition-colors duration-500 ${
          scrolled && !open
            ? "border-b border-ivory/10 bg-base/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
          {/* Wordmark */}
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="group relative z-10 shrink-0"
            aria-label="RUYA Interiors — home"
          >
            <span className="font-display text-[26px] tracking-tight text-ivory">RUYA</span>
            <span className="ml-1.5 hidden text-[9px] uppercase tracking-[0.28em] text-brass sm:inline">
              Interiors
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-brass transition-all duration-500 group-hover:w-full" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`group relative block px-3.5 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors duration-400 ${
                      isActive ? "text-ivory" : "text-muted hover:text-ivory"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-3.5 h-px bg-brass transition-all duration-400 ${
                        isActive
                          ? "w-[calc(100%-1.75rem)]"
                          : "w-0 group-hover:w-[calc(100%-1.75rem)]"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden xl:block">
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="group relative inline-block overflow-hidden rounded-full border border-brass/40 px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] text-brass transition-colors duration-400 hover:border-brass"
              >
                <span className="relative z-10 transition-colors duration-400 group-hover:text-base">
                  Book a consult
                </span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-brass transition-transform duration-500 ease-in-out-quart group-hover:scale-y-100" />
              </a>
            </Magnetic>

            {/* Burger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-10 flex size-10 items-center justify-center rounded-full border border-ivory/20 transition-colors duration-400 hover:border-brass lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 block h-px w-full bg-ivory"
                  animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 block h-px w-full bg-ivory"
                  animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile / tablet overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-75 flex flex-col justify-between overflow-hidden bg-base pt-16 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-1/4 size-[380px] rounded-full bg-brass/15 blur-[100px]"
            />

            <ul
              data-lenis-prevent
              className="container-x flex flex-1 flex-col justify-center gap-0.5 overflow-y-auto py-6"
            >
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="line-mask">
                  <motion.a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.1rem,9vw,3.25rem)] leading-[1.1] text-ivory transition-colors active:text-brass"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "110%", opacity: 0 }}
                    transition={{ duration: 0.65, ease: EASE, delay: 0.15 + i * 0.055 }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.2em] text-brass">
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="container-x border-t border-ivory/10 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
            >
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-base text-ivory underline decoration-brass/50 underline-offset-4"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="text-base text-ivory"
                >
                  {CONTACT.phone}
                </a>
                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                  {CONTACT.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] uppercase tracking-[0.2em] text-muted"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
