"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query without setting state inside an effect.
 * Returns false during SSR and the first client render, then settles.
 */
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
