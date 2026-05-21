"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type CarouselItem = { src: string; alt: string };

// On desktop shows `visibleDesktop` images at once; on mobile shows 1.
// Prev/next advance by one item in either mode.
export function Carousel({
  items,
  visibleDesktop = 4,
}: {
  items: CarouselItem[];
  visibleDesktop?: number;
}) {
  const [start, setStart] = useState(0);
  // Default to mobile to avoid hydration mismatch; flip to desktop on mount.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const visible = isDesktop ? visibleDesktop : 1;
  const max = Math.max(0, items.length - visible);

  // Clamp start when viewport changes shrink the navigable range.
  useEffect(() => {
    if (start > max) setStart(max);
  }, [start, max]);

  const prev = () => setStart((s) => Math.max(0, s - 1));
  const next = () => setStart((s) => Math.min(max, s + 1));

  return (
    <section className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-3"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {items.slice(start, start + visible).map((item) => (
              <motion.figure
                key={item.src}
                layout
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] overflow-hidden bg-cream"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={prev}
        disabled={start === 0}
        aria-label="Previous"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-opacity hover:bg-white disabled:opacity-30 disabled:hover:bg-white/80"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        disabled={start >= max}
        aria-label="Next"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-opacity hover:bg-white disabled:opacity-30 disabled:hover:bg-white/80"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
