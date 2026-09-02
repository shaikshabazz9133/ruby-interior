"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { HERO_SLIDES } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1];
const WIPE = [0.76, 0, 0.24, 1];
const DURATION = 6200; // ms each slide holds before the next wipe

// The incoming slide wipes across from the side you travelled; the outgoing
// one drifts the other way underneath it, so the two never look pasted.
const slideVariants = {
  enter: (dir) => ({
    clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
  }),
  center: { clipPath: "inset(0% 0% 0% 0%)" },
  exit: (dir) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    x: dir > 0 ? "-8%" : "8%",
    scale: 1.04,
  }),
};

// Counter-motion inside the wipe: the photo slides in behind its own mask.
const photoVariants = {
  enter: (dir) => ({ x: dir > 0 ? "16%" : "-16%", scale: 1.18 }),
  center: { x: "0%", scale: 1 },
  exit: { x: "0%", scale: 1 },
};

const maskUp = {
  hidden: { y: "115%", rotate: 2.5, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1 },
};

export default function Hero({ start = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const [[index, dir], setSlide] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const slide = HERO_SLIDES[index];
  const count = HERO_SLIDES.length;

  const go = useCallback(
    (next, direction) =>
      setSlide(([current]) => {
        const target = (next + count) % count;
        if (target === current) return [current, direction];
        return [target, direction];
      }),
    [count]
  );

  const next = useCallback(() => setSlide(([i]) => [(i + 1) % count, 1]), [count]);
  const prev = useCallback(() => setSlide(([i]) => [(i - 1 + count) % count, -1]), [count]);

  // 0 → 1 across the slide's dwell. A motion value rather than state: it feeds
  // the progress rail every frame without re-rendering the hero.
  const progress = useMotionValue(0);

  // Restart the dwell whenever the slide changes, however it changed.
  useEffect(() => {
    progress.set(0);
  }, [index, progress]);

  // Autoplay — held until the preloader lifts, and parked while the visitor is
  // hovering or dragging. One rAF loop drives both the rail and the advance, so
  // the bar can never finish out of step with the slide. rAF is also throttled
  // to a stop on a hidden tab, which parks the carousel for free.
  useEffect(() => {
    if (!start || paused) return;
    let frame;
    let last = null;
    const tick = (now) => {
      // Clamp the delta: a backgrounded tab returns with a huge gap that would
      // otherwise skip a slide the moment the visitor comes back.
      const delta = last === null ? 0 : Math.min(now - last, 120);
      last = now;
      const value = progress.get() + delta / DURATION;
      if (value >= 1) {
        progress.set(1);
        next();
        return;
      }
      progress.set(value);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, paused, index, next, progress]);

  // Arrow keys, but only while the hero still owns the screen.
  useEffect(() => {
    const onKey = (e) => {
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Scroll parallax — the frame stays, the photograph sinks.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const layerY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const layerScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer parallax for the floating credential card.
  const mx = useSpring(0, { stiffness: 90, damping: 20 });
  const my = useSpring(0, { stiffness: 90, damping: 20 });
  const cardX = useTransform(mx, [-1, 1], [16, -16]);
  const cardY = useTransform(my, [-1, 1], [12, -12]);

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  // Swipe / drag. These live on the whole section rather than on the photo
  // layer: on a phone the copy covers the entire stage, so handlers bound to
  // the image would never see the gesture.
  const dragStart = useRef(null);
  const onPointerDown = (e) => {
    // Let taps and drags that begin on a control do their own job.
    if (e.target.closest?.("a, button")) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
    setPaused(true);
  };
  const endDrag = (e) => {
    const from = dragStart.current;
    if (!from) return;
    dragStart.current = null;
    setPaused(false);
    const dx = e.clientX - from.x;
    const dy = e.clientY - from.y;
    // Horizontal intent only, so a vertical scroll never changes the slide.
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy)) return;
    dx < 0 ? next() : prev();
  };

  // Hover pauses autoplay, but only for a real mouse — on a touch screen
  // pointerenter fires on tap and no matching leave ever arrives, which would
  // park the carousel for good.
  const onPointerEnter = (e) => e.pointerType === "mouse" && setPaused(true);
  const onPointerLeave = (e) => e.pointerType === "mouse" && setPaused(false);

  // An empty target parks the element on its `initial` values until ready.
  const on = (target) => (start ? target : {});

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      className="relative isolate flex min-h-svh touch-pan-y flex-col overflow-hidden bg-base text-ivory"
    >
      {/* ---------- Carousel stage ---------- */}
      <div className="absolute inset-0 -z-10 select-none">
        {/* The slide after this one, fetched at full stage size but invisible,
            so the wipe never uncovers a half-loaded photograph on a phone. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
          <Image
            src={HERO_SLIDES[(index + 1) % count].image}
            alt=""
            fill
            sizes="100vw"
            quality={90}
            style={{ objectPosition: HERO_SLIDES[(index + 1) % count].focus }}
            className="object-cover"
          />
        </div>

        <motion.div style={{ y: layerY, scale: layerScale }} className="absolute inset-0">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              variants={reduced ? undefined : slideVariants}
              initial={reduced ? { opacity: 0 } : "enter"}
              animate={reduced ? { opacity: 1 } : "center"}
              exit={reduced ? { opacity: 0 } : "exit"}
              transition={{
                clipPath: { duration: 1.15, ease: WIPE },
                x: { duration: 1.4, ease: EASE },
                scale: { duration: 1.4, ease: EASE },
                opacity: { duration: 0.8 },
              }}
              className="absolute inset-0 will-change-[clip-path]"
            >
              <motion.div
                custom={dir}
                variants={reduced ? undefined : photoVariants}
                transition={{ duration: 1.35, ease: EASE }}
                className="absolute inset-0"
              >
                {/* Slow Ken Burns drift, restarted with every slide */}
                <div
                  key={`kb-${slide.id}`}
                  className={`absolute inset-0 ${reduced ? "" : "animate-ken-burns"}`}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.project} — interiors by RUYA`}
                    fill
                    preload={index === 0}
                    sizes="100vw"
                    quality={90}
                    style={{ objectPosition: slide.focus }}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Scrims: readable copy on the left, grounded controls at the base */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-base/95 via-base/65 via-45% to-base/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-base/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-base/70 to-transparent"
        />
      </div>

      {/* Curtain that lifts once the preloader is done */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={on({ scaleY: 0 })}
        transition={{ duration: 1.1, delay: 0.1, ease: WIPE }}
        className="pointer-events-none absolute inset-0 z-20 origin-top bg-base"
      />

      {/* ---------- Copy ---------- */}
      <motion.div
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        className="container-x relative flex flex-1 flex-col justify-center pb-6 pt-20 sm:pb-10 sm:pt-28 lg:pb-14 lg:pt-32"
      >
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={`eyebrow-${slide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={on({ opacity: 1, y: 0 })}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center gap-2.5 text-eyebrow text-brass-soft sm:gap-3"
            >
              <span className="h-px w-6 bg-brass-soft/70 sm:w-10" />
              {slide.eyebrow}
            </motion.p>
          </AnimatePresence>

          <h1 className="text-display mt-4 text-ivory sm:mt-5">
            <AnimatePresence mode="wait">
              <motion.span key={`title-${slide.id}`} className="block">
                {slide.title.map((word, i) => (
                  <span key={`${slide.id}-${word}-${i}`} className="line-mask inline-block align-bottom">
                    <motion.span
                      className={`inline-block pr-[0.2em] will-change-transform ${
                        word === slide.accent ? "italic text-brass-soft" : ""
                      }`}
                      variants={maskUp}
                      initial="hidden"
                      animate={start ? "show" : "hidden"}
                      exit={{ y: "-115%", opacity: 0, transition: { duration: 0.45, ease: WIPE } }}
                      transition={{ duration: 0.95, delay: 0.12 + i * 0.07, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
          </h1>

          <div className="mt-4 sm:mt-6 sm:min-h-18">
            <AnimatePresence mode="wait">
              <motion.p
                key={`blurb-${slide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={on({ opacity: 1, y: 0 })}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="text-body line-clamp-3 max-w-[46ch] text-ivory/75 sm:line-clamp-none"
              >
                {slide.blurb}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={on({ opacity: 1, y: 0 })}
            transition={{ duration: 0.85, delay: 0.75, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
          >
            <Magnetic strength={0.22}>
              <a
                href="#contact"
                data-cursor="Let's talk"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-brass px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-base sm:px-7 sm:py-3.5"
              >
                <span className="relative z-10">
                  Start your project
                </span>
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
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 ease-in-out-quart group-hover:scale-y-100" />
              </a>
            </Magnetic>

            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-ivory/30 px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors duration-400 hover:border-brass-soft hover:text-brass-soft sm:px-7 sm:py-3.5"
            >
              View our work
              <span className="transition-transform duration-400 group-hover:translate-x-1">↗</span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0, y: 22 }}
            animate={on({ opacity: 1, y: 0 })}
            transition={{ duration: 0.85, delay: 0.9, ease: EASE }}
            className="mt-10 hidden max-w-md grid-cols-3 gap-4 border-t border-ivory/15 pt-6 sm:grid"
          >
            {[
              ["420+", "Spaces delivered"],
              ["14 yrs", "Studio practice"],
              ["96%", "Client referrals"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-2xl text-ivory sm:text-3xl">{value}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-ivory/55">
                    {label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Floating credential card */}
        <motion.div
          style={{ x: cardX, y: cardY }}
          initial={{ opacity: 0, y: 26 }}
          animate={on({ opacity: 1, y: 0 })}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          className="pointer-events-none absolute right-6 top-1/2 hidden w-52.5 -translate-y-1/2 rounded-sm border border-ivory/12 bg-base/70 p-5 backdrop-blur-md xl:block"
        >
          <p className="font-display text-3xl leading-none text-ivory">32</p>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-ivory/60">
            Design awards since 2011
          </p>
          <div className="mt-3 flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="h-0.5 flex-1 rounded-full bg-brass-soft/50" />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- Controls ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={on({ opacity: 1, y: 0 })}
        transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className="container-x relative z-10 pb-6 sm:pb-8 lg:pb-10"
      >
        <div className="flex flex-col gap-3 border-t border-ivory/15 pt-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-5">
          {/* Now-showing caption */}
          <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
            <span className="shrink-0 font-display text-base text-ivory/70 tabular-nums sm:text-lg">
              {String(index + 1).padStart(2, "0")}
              <span className="mx-1 text-ivory/30">/</span>
              <span className="text-ivory/40">{String(count).padStart(2, "0")}</span>
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${slide.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="min-w-0"
              >
                <p data-slide-caption className="truncate text-[13px] text-ivory sm:text-sm">
                  {slide.project}
                </p>
                <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.18em] text-ivory/50">
                  {slide.meta}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress rails — the active one fills over the slide's dwell, and
              each is a tap target. On a phone they stretch the full width in
              place of the arrows; from sm up they settle into fixed segments. */}
          <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Show slide ${i + 1}: ${s.project}`}
                aria-current={i === index}
                className="group relative h-11 flex-1 sm:h-6 sm:w-12 sm:flex-none md:w-14"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ivory/25 transition-colors group-hover:bg-ivory/50" />
                {i === index && (
                  <motion.span
                    style={{ scaleX: progress, y: "-50%" }}
                    className="absolute inset-x-0 top-1/2 h-px origin-left bg-brass-soft"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <a
          href="#studio"
          aria-label="Scroll to next section"
          className="mt-6 hidden items-center gap-3 text-ivory/55 transition-colors hover:text-ivory lg:inline-flex"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
            <span className="absolute inset-x-0 top-0 h-3 animate-scroll-hint bg-brass-soft" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.24em]">Scroll to explore</span>
        </a>
      </motion.div>
    </section>
  );
}
