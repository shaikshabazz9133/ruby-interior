"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1];

// Rows stretch to their tallest member, so the aspect ratios shape the mobile
// stack and the `wide` span sets the rhythm from sm up.
const SPAN = {
  tall: "aspect-4/5",
  wide: "sm:col-span-2 aspect-4/3 sm:aspect-16/9",
  normal: "aspect-4/5 sm:aspect-square",
};

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [openIdx, setOpenIdx] = useState(null); // index into `visible`
  const [[slide, dir], setSlide] = useState([0, 0]);

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const project = openIdx === null ? null : visible[openIdx];
  const shots = project?.gallery ?? [];
  const safeSlide = Math.min(slide, Math.max(shots.length - 1, 0));

  const openProject = (i) => {
    setOpenIdx(i);
    setSlide([0, 0]);
  };
  const close = useCallback(() => setOpenIdx(null), []);

  /** Move within the open project's gallery. */
  const step = useCallback(
    (delta) => {
      setSlide(([i]) => {
        const len = shots.length;
        if (!len) return [0, 0];
        return [(i + delta + len) % len, delta];
      });
    },
    [shots.length]
  );

  /** Jump to the next/previous project, starting at its first photo. */
  const stepProject = useCallback(
    (delta) => {
      setOpenIdx((i) => {
        if (i === null) return i;
        return (i + delta + visible.length) % visible.length;
      });
      setSlide([0, 1]);
    },
    [visible.length]
  );

  // Keyboard control + scroll lock while the viewer is open
  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("lenis:stop"));
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("lenis:start"));
    };
  }, [openIdx, step, close]);

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 1.02 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 1.02 }),
  };

  return (
    <section id="work" className="section-y bg-base">
      <div className="container-x">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal variant="fade">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-brass-soft" />
                <span className="text-eyebrow text-brass-soft">Selected work</span>
              </div>
            </Reveal>

            <AnimatedText
              as="h2"
              text="Projects we are quietly proud of"
              className="text-h2 mt-5 max-w-[16ch] text-balance text-ivory"
              highlight={[3, 4]}
            />

            <Reveal variant="up" delay={0.1}>
              <p className="text-body mt-4 max-w-[46ch] text-ivory/55">
                Tap any project to walk through the finished rooms.
              </p>
            </Reveal>
          </div>

          {/* Filters */}
          <Reveal variant="up" delay={0.1} className="shrink-0">
            <div className="flex flex-wrap gap-2">
              {PROJECT_FILTERS.map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => {
                      // `visible` is about to change, so any open index is stale.
                      setOpenIdx(null);
                      setFilter(f);
                    }}
                    aria-pressed={isActive}
                    className={`relative overflow-hidden rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.16em] transition-colors duration-400 ${
                      isActive ? "text-ivory" : "text-ivory/60 hover:text-ivory"
                    }`}
                  >
                    <span className="relative z-10">{f}</span>
                    <span
                      className={`absolute inset-0 rounded-full border transition-colors duration-400 ${
                        isActive ? "border-transparent" : "border-ivory/20"
                      }`}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-brass-soft"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* ---------- Grid ---------- */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 26 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -14 }}
                transition={{
                  duration: 0.55,
                  ease: EASE,
                  delay: Math.min(i * 0.05, 0.28),
                  layout: { duration: 0.5, ease: EASE },
                }}
                className={`group relative overflow-hidden rounded-sm bg-elevated ${
                  SPAN[p.size] ?? SPAN.normal
                }`}
              >
                <button
                  onClick={() => openProject(i)}
                  data-cursor="View"
                  aria-label={`View ${p.title} — ${p.gallery.length} photos`}
                  className="absolute inset-0 z-10 cursor-pointer text-left"
                >
                  <span className="sr-only">
                    View {p.title}, {p.gallery.length} photos
                  </span>
                </button>

                <Image
                  src={p.cover}
                  alt={`${p.title} — ${p.category} interior in ${p.location}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-base via-base/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Photo count */}
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-base/70 px-2.5 py-1 text-[10px] text-ivory backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-0">
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    aria-hidden="true"
                  >
                    <rect x="1.5" y="3.5" width="10" height="9" rx="1.5" />
                    <path d="M14.5 5.5v7a2 2 0 0 1-2 2H4" />
                  </svg>
                  {p.gallery.length}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="translate-y-1.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-brass-soft">
                      {p.category} · {p.year}
                    </p>
                    <h3 className="mt-1.5 text-xl leading-tight text-ivory sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 max-h-0 overflow-hidden text-xs text-ivory/65 opacity-0 transition-all duration-500 group-hover:max-h-8 group-hover:opacity-100">
                      {p.location} · {p.area}
                    </p>
                  </div>
                </div>

                <span className="absolute right-4 top-4 grid size-9 -translate-y-2 place-items-center rounded-full bg-brass text-base opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ================= Project viewer ================= */}
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-110 overflow-y-auto overscroll-contain bg-base/95 backdrop-blur-sm"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="fixed right-3 top-3 z-20 grid size-10 place-items-center rounded-full border border-ivory/25 bg-base/60 text-ivory backdrop-blur-sm transition-colors hover:border-brass-soft hover:text-brass-soft sm:right-6 sm:top-6 sm:size-11"
            >
              ✕
            </button>

            <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 26, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.99 }}
                transition={{ duration: 0.45, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className="grid w-full max-w-6xl overflow-hidden rounded-sm bg-surface lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
              >
                {/* ---------- Gallery ---------- */}
                <div className="flex h-[52svh] min-w-0 flex-col bg-elevated sm:h-[58svh] lg:h-[38rem] xl:h-[42rem]">
                  {/* Main shot */}
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    <AnimatePresence initial={false} mode="popLayout" custom={dir}>
                      <motion.div
                        key={`${project.slug}-${safeSlide}`}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: EASE }}
                        drag="x"
                        dragDirectionLock
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.12}
                        onDragEnd={(_, info) => {
                          if (info.offset.x < -60) step(1);
                          else if (info.offset.x > 60) step(-1);
                        }}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                      >
                        <Image
                          src={shots[safeSlide].src}
                          alt={`${project.title} — ${shots[safeSlide].room}`}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Caption */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-base/85 to-transparent p-4 pt-12">
                      <p className="flex items-center gap-2.5 text-ivory">
                        <span className="font-display text-lg tabular-nums text-brass-soft">
                          {String(safeSlide + 1).padStart(2, "0")}
                          <span className="text-ivory/40"> / {String(shots.length).padStart(2, "0")}</span>
                        </span>
                        <span className="h-3 w-px bg-ivory/25" />
                        <span className="text-[11px] uppercase tracking-[0.16em]">
                          {shots[safeSlide].room}
                        </span>
                      </p>
                    </div>

                    {/* Arrows */}
                    {shots.length > 1 && (
                      <>
                        <button
                          onClick={() => step(-1)}
                          aria-label="Previous photo"
                          className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-base/55 text-ivory backdrop-blur-sm transition-colors hover:bg-brass sm:left-3 sm:size-11"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => step(1)}
                          aria-label="Next photo"
                          className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-base/55 text-ivory backdrop-blur-sm transition-colors hover:bg-brass sm:right-3 sm:size-11"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div
                    data-lenis-prevent
                    className="flex w-full shrink-0 gap-2 overflow-x-auto overscroll-x-contain p-2.5 [scrollbar-width:thin] sm:p-3"
                  >
                    {shots.map((shot, i) => (
                      <button
                        key={shot.src}
                        onClick={() => setSlide([i, i > safeSlide ? 1 : -1])}
                        aria-label={`Show ${shot.room}`}
                        aria-current={i === safeSlide}
                        className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-xs transition-all duration-400 sm:h-16 sm:w-24 ${
                          i === safeSlide
                            ? "opacity-100 ring-2 ring-brass-soft"
                            : "opacity-50 hover:opacity-85"
                        }`}
                      >
                        <Image
                          src={shot.src}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* ---------- Details ---------- */}
                <div data-lenis-prevent
                  className="flex min-w-0 flex-col overflow-y-auto p-5 sm:p-7 lg:h-[38rem] xl:h-[42rem]">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-clay">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-ivory sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{project.location}</p>

                  <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-ivory/12 py-4 sm:grid-cols-3">
                    {[
                      ["Area", project.area],
                      ["Layout", project.config],
                      ["Built in", project.duration],
                    ].map(([k, v]) => (
                      <div key={k} className="min-w-0">
                        <dt className="text-[9px] uppercase tracking-[0.16em] text-muted">
                          {k}
                        </dt>
                        <dd className="mt-1 text-sm text-ivory">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="text-body mt-5 text-muted">{project.summary}</p>

                  <div className="mt-5">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-muted">
                      Scope
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {project.scope.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-ivory/15 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-muted"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                    <a
                      href="#contact"
                      onClick={close}
                      className="group relative inline-block overflow-hidden rounded-full bg-brass px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-base"
                    >
                      <span className="relative z-10">Start a project like this</span>
                      <span className="absolute inset-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
                    </a>

                    {visible.length > 1 && (
                      <button
                        onClick={() => stepProject(1)}
                        className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ivory"
                      >
                        Next project
                        <span className="transition-transform duration-400 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
