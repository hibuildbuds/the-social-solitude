"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";

export function MobileBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between bg-paper/95 px-5 py-4 backdrop-blur md:hidden">
        <Link
          href="/"
          aria-label="The Social Solitude — home"
          className="block text-ink"
          onClick={() => setOpen(false)}
        >
          <BrandLogo className="h-11 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] text-ink"
        >
          <span
            className={`block h-px w-5 bg-current transition-transform ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-transform ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-paper px-8 pb-10 pt-20 md:hidden"
          >
            <nav aria-label="Primary mobile">
              <ul className="flex flex-col text-[1.4rem] font-bold leading-none text-ink">
                {SITE.nav.map((item) => {
                  const isExternal = "external" in item && item.external;
                  const cls =
                    "inline-flex min-h-[44px] items-center tracking-tight transition-opacity active:opacity-60";
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
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cls}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-5 text-sm text-mute">
              <div className="text-ink">{SITE.tagline}</div>
              <div>
                <p>{SITE.hours.days}</p>
                <p>{SITE.hours.time}</p>
              </div>
              <address className="not-italic">
                {SITE.address.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
