"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";

const BOOKINGS_URL =
  SITE.nav.find((n) => n.label === "Bookings")?.href ?? "#";

export function MobileBar() {
  const [open, setOpen] = useState(false);

  const taglineParts = SITE.tagline.split(",");
  const taglineA = taglineParts[0] ?? SITE.tagline;
  const taglineB = (taglineParts[1] ?? "").trim();

  return (
    <div className="md:hidden">
      {/* Logo — fixed top-left, white over hero. */}
      <Link
        href="/"
        aria-label="The Social Solitude — home"
        className="fixed left-5 top-5 z-30 block text-white"
        onClick={() => setOpen(false)}
      >
        <BrandLogo className="h-14 w-auto" />
      </Link>

      {/* Side-footer info — fixed bottom-left over the hero image. Fades
          out when the drawer opens. */}
      <motion.div
        aria-hidden={open}
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed bottom-24 left-5 right-5 z-30 text-[0.95rem] font-bold leading-[1.35] text-white"
      >
        <p>
          {taglineA}
          {taglineB ? "," : ""}
        </p>
        {taglineB && <p>{taglineB}</p>}
        <div className="mt-4">
          <p>{SITE.hours.days}</p>
          <p>{SITE.hours.time}</p>
        </div>
        <address className="mt-4 not-italic">
          {SITE.address.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>
      </motion.div>

      {/* Bottom bar — cream surface with "+" (open drawer) and "BOOK"
          (external). Fades out as the drawer slides up. */}
      <motion.div
        animate={{ opacity: open ? 0 : 1, y: open ? 8 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: open ? "none" : "auto" }}
        className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between bg-paper px-5 py-5"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center text-2xl font-bold leading-none text-ink"
        >
          +
        </button>
        <a
          href={BOOKINGS_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[0.95rem] font-bold uppercase tracking-[0.15em] text-ink transition-opacity active:opacity-60"
        >
          BOOK
        </a>
      </motion.div>

      {/* Drawer — slides up from below, covers the bottom ~75% of the
          viewport, leaving the hero/logo visible above. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 flex h-[78svh] flex-col bg-paper"
          >
            {/* Drag handle / close affordance */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex w-full items-center justify-center py-5"
            >
              <span className="block h-[3px] w-10 rounded-full bg-ink" />
            </button>

            <nav aria-label="Mobile" className="px-6 pt-4">
              <ul className="flex flex-col gap-2 text-[1.5rem] font-bold uppercase leading-[1.1] tracking-[0.02em] text-ink">
                {SITE.nav.map((item) => {
                  const isExternal =
                    "external" in item && item.external;
                  const labelUpper = item.label.toUpperCase();
                  const cls =
                    "inline-flex min-h-[44px] items-center transition-opacity active:opacity-60";
                  return (
                    <li key={item.label}>
                      {isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setOpen(false)}
                          className={cls}
                        >
                          {labelUpper}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cls}
                        >
                          {labelUpper}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Info inside drawer, ink color */}
            <div className="mt-auto px-6 pb-10 text-[0.9rem] font-bold leading-[1.4] text-ink">
              <p>
                {taglineA}
                {taglineB ? "," : ""}
              </p>
              {taglineB && <p>{taglineB}</p>}
              <div className="mt-3">
                <p>{SITE.hours.days}</p>
                <p>{SITE.hours.time}</p>
              </div>
              <address className="mt-3 not-italic">
                {SITE.address.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
