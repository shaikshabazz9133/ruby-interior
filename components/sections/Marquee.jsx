"use client";

import { MARQUEE_WORDS } from "@/lib/data";

/**
 * Thin dark band that separates the hero from the studio section. The word
 * list is rendered twice and the track translates exactly -50%, so the loop
 * point is invisible at any screen width.
 */
export default function Marquee() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

  return (
    <section aria-hidden="true" className="bg-forest py-5 sm:py-6">
      <div className="edge-fade-x flex overflow-hidden">
        <div className="flex w-max shrink-0 animate-marquee items-center will-change-transform">
          {items.map((word, i) => (
            <span key={i} className="flex items-center">
              <span className="whitespace-nowrap px-5 font-display text-lg italic text-bone/90 sm:px-7 sm:text-2xl">
                {word}
              </span>
              <span className="size-1 shrink-0 rotate-45 bg-sage-soft" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
