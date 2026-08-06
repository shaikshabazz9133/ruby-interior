"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedText from "@/components/ui/AnimatedText";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { STATS } from "@/lib/data";

const PRINCIPLES = [
  {
    title: "Light before finish",
    body: "We plan how a room behaves at 8am and at 8pm before choosing a single material.",
  },
  {
    title: "Storage you forget about",
    body: "Every metre of joinery is drawn around what you own today and in five years.",
  },
  {
    title: "One team, one number",
    body: "Design and execution live under the same roof, so nobody gets to blame anybody else.",
  },
];

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="studio" ref={ref} className="section-y bg-bone">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ---------- Image ---------- */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-sage-pale">
              <motion.div style={{ y: imgY }} className="absolute -inset-y-[6%] inset-x-0">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
                  alt="RUYA designers reviewing material samples on a studio table"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>

              <motion.span
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 origin-top bg-bone"
              />
            </div>

            {/* Rotating seal */}
            <div className="absolute -right-3 -top-5 hidden size-24 place-items-center rounded-full bg-forest text-bone sm:grid lg:-left-6 lg:right-auto">
              <span className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="size-full">
                  <defs>
                    <path
                      id="seal"
                      d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0"
                      fill="none"
                    />
                  </defs>
                  <text className="fill-sage-soft text-[10px] uppercase tracking-[0.22em]">
                    <textPath href="#seal">
                      RUYA · Est. 2011 · Design &amp; Build ·
                    </textPath>
                  </text>
                </svg>
              </span>
              <span className="font-display text-xl italic text-sage-soft">R</span>
            </div>
          </div>

          {/* ---------- Copy ---------- */}
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-walnut" />
                <span className="text-eyebrow text-walnut">The Studio</span>
              </div>
            </Reveal>

            <AnimatedText
              as="h2"
              text="We design for the way a room is actually lived in."
              className="text-h2 mt-5 max-w-[20ch] text-balance text-forest"
              highlight={[7, 8, 9]}
            />

            <Reveal variant="up" delay={0.1}>
              <p className="mt-6 max-w-[54ch] font-display text-xl leading-relaxed text-forest/85 sm:text-2xl">
                RUYA means <span className="accent-italic">vision</span> — the
                picture in your head of a place that finally feels like yours.
              </p>
            </Reveal>

            <Reveal variant="up" delay={0.15}>
              <p className="text-body mt-5 max-w-[56ch] text-muted">
                Fourteen years and four hundred-odd projects have taught us one
                thing: an interior is not a mood board. It is plumbing that
                works, drawers that close, and light that flatters you at the end
                of a long day. We draw it, cost it honestly, build it with our
                own crews and hand it over on the date we promised.
              </p>
            </Reveal>

            {/* Principles */}
            <ul className="mt-9">
              {PRINCIPLES.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  variant="up"
                  delay={i * 0.07}
                  className="group flex gap-4 border-t border-forest/10 py-4 last:border-b"
                >
                  <span className="mt-1 shrink-0 font-display text-sm text-walnut">0{i + 1}</span>
                  <div className="min-w-0">
                    <h3 className="text-h3 text-forest transition-colors duration-400 group-hover:text-sage">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- Stats ---------- */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-forest/10 pt-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} variant="up" delay={i * 0.07}>
              <p className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-none text-forest">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
