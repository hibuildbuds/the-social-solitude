"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  animate as motionAnimate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SITE } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";

type Tone = "light" | "dark";
type Kind = "logo" | "text";
type Mode = "cascade" | "auto";

const WHITE = "#ffffff";
const INK = "#1f2a37";
const BRAND = INK; // Logo + text use the same ink on light sections (B/W only).
const TRANSITION_PX = 60;

const lightFor = (kind: Kind) => (kind === "logo" ? BRAND : INK);

// CASCADE mode: per-block scroll-driven color. Used on pages with a single
// dark hero at the top — each block crosses the hero/content boundary at a
// different scroll position, producing the "satu per satu" sweep.
// Non-logo blocks also fade their opacity to 0 as they reach a section marked
// `[data-fade-trigger]` (e.g., the bottom carousel), so nav/info never sit on
// top of the photos. Fade is per-block: bottom blocks fade earlier than the
// nav above, matching the cascade feel.
function useCascadeColor(tone: Tone, animate: boolean, kind: Kind) {
  const ref = useRef<HTMLDivElement>(null);
  const [crossover, setCrossover] = useState<number>(10000);
  // Default to a finite sentinel beyond any realistic scrollY so the
  // useTransform range stays valid on pages without a [data-fade-trigger].
  const [fadeEnd, setFadeEnd] = useState<number>(1_000_000);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (!animate) return;
    const update = () => {
      if (!ref.current) return;
      const viewportY = ref.current.getBoundingClientRect().top;
      const heroEnd = window.innerHeight;
      setCrossover(Math.max(0, heroEnd - viewportY));

      // Scroll position at which this block's sticky viewport-Y would touch
      // the top of the fade-trigger section (the 4-photo carousel).
      const trigger = document.querySelector<HTMLElement>("[data-fade-trigger]");
      if (trigger) {
        const triggerDocY =
          trigger.getBoundingClientRect().top + window.scrollY;
        setFadeEnd(Math.max(0, triggerDocY - viewportY));
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [animate]);

  const start = tone === "dark" ? WHITE : lightFor(kind);
  const end = animate ? lightFor(kind) : start;

  const color = useTransform(
    scrollY,
    [Math.max(0, crossover - TRANSITION_PX), crossover],
    [start, end],
  );

  // Logo never fades. Other blocks fade across 250px before hitting the
  // carousel; stay 1 if no trigger section is present on the page.
  const opacity = useTransform(
    scrollY,
    [Math.max(0, fadeEnd - 250), fadeEnd],
    kind === "logo" ? [1, 1] : [1, 0],
  );

  return { ref, color, opacity };
}

// AUTO mode: a single sidebar that flips tone based on which [data-tone]
// section currently sits behind it. Avoids double-sidebar artifacts on pages
// with multiple tonal zones (e.g. About: light → dark photo → light).
function useAutoColor(kind: Kind) {
  const ref = useRef<HTMLDivElement>(null);
  const color = useMotionValue(lightFor(kind));
  const opacity = useMotionValue(1);

  useEffect(() => {
    const computeTone = (): Tone => {
      const sections =
        document.querySelectorAll<HTMLElement>("[data-tone]");
      // Probe at the sidebar block's actual viewport y so each block (logo
      // near top, address near bottom) reads the section currently behind it.
      const probeY = ref.current?.getBoundingClientRect().top ?? 60;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          return (s.dataset.tone as Tone) || "light";
        }
      }
      return "light";
    };

    const update = () => {
      const tone = computeTone();
      const target = tone === "dark" ? WHITE : lightFor(kind);
      motionAnimate(color, target, {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [color, kind]);

  return { ref, color, opacity };
}

function useBlockColor(
  tone: Tone,
  animate: boolean,
  kind: Kind,
  mode: Mode,
) {
  // Hooks must be called unconditionally in the same order.
  const cascade = useCascadeColor(tone, animate, kind);
  const auto = useAutoColor(kind);
  return mode === "auto" ? auto : cascade;
}

function Block({
  motionRef,
  color,
  opacity,
  children,
  className,
}: {
  motionRef: React.RefObject<HTMLDivElement | null>;
  color: MotionValue<string>;
  opacity: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      ref={motionRef}
      style={{ color, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Sidebar({
  tone = "light",
  animate = true,
  mode = "cascade",
}: {
  tone?: Tone;
  /** Cascade-mode only: animate per-block color as user scrolls past the hero. */
  animate?: boolean;
  /** "cascade" = per-block scroll-driven (single hero pages).
   *  "auto" = reads [data-tone] sections, single sidebar for multi-zone pages. */
  mode?: Mode;
}) {
  const pathname = usePathname();

  const logo = useBlockColor(tone, animate, "logo", mode);
  const nav = useBlockColor(tone, animate, "text", mode);
  const tagline = useBlockColor(tone, animate, "text", mode);
  const hours = useBlockColor(tone, animate, "text", mode);
  const address = useBlockColor(tone, animate, "text", mode);

  const taglineParts = SITE.tagline.split(",");
  const taglineA = taglineParts[0] ?? SITE.tagline;
  const taglineB = (taglineParts[1] ?? "").trim();

  return (
    <aside className="pointer-events-none sticky top-0 z-30 -mb-[100vh] hidden h-screen w-[17rem] flex-col justify-between p-8 md:flex">
      <div className="pointer-events-auto flex flex-col gap-10">
        <Block
          motionRef={logo.ref}
          color={logo.color}
          opacity={logo.opacity}
          className="inline-block"
        >
          <Link
            href="/"
            aria-label="The Social Solitude — home"
            className="block transition-opacity hover:opacity-80"
          >
            <BrandLogo className="h-[4.2rem] w-auto" />
          </Link>
        </Block>

        <Block
          motionRef={nav.ref}
          color={nav.color}
          opacity={nav.opacity}
        >
          <nav aria-label="Primary">
            <ul className="flex flex-col gap-[0.4rem] text-[1.15rem] font-bold leading-[1.25] tracking-[0.005em]">
              {SITE.nav.map((item) => {
                const isExternal = "external" in item && item.external;
                const active =
                  !isExternal &&
                  (pathname === item.href ||
                    pathname?.startsWith(`${item.href}/`));
                const linkClass = `inline-block transition-opacity hover:opacity-60 ${
                  active ? "opacity-100" : "opacity-95"
                }`;
                return (
                  <li key={item.label}>
                    {isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={linkClass}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </Block>
      </div>

      <div className="pointer-events-auto flex flex-col gap-6 text-[1.1rem] font-bold leading-[1.35]">
        <Block
          motionRef={tagline.ref}
          color={tagline.color}
          opacity={tagline.opacity}
        >
          <p>
            {taglineA}
            {taglineB ? "," : ""}
          </p>
          {taglineB && <p>{taglineB}</p>}
        </Block>
        <Block
          motionRef={hours.ref}
          color={hours.color}
          opacity={hours.opacity}
        >
          <p>{SITE.hours.days}</p>
          <p>{SITE.hours.time}</p>
        </Block>
        <Block
          motionRef={address.ref}
          color={address.color}
          opacity={address.opacity}
        >
          <address className="not-italic">
            {SITE.address.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </Block>
      </div>
    </aside>
  );
}
