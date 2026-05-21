import Link from "next/link";

export function CTAStrip({
  eyebrow,
  label,
  href,
}: {
  eyebrow?: string;
  label: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center md:py-20">
      {eyebrow && (
        <p className="text-[0.78rem] uppercase tracking-[0.18em] text-mute">
          {eyebrow}
        </p>
      )}
      <Link
        href={href}
        className="group inline-flex items-baseline gap-3 font-display text-[1.6rem] leading-tight text-ink transition-opacity hover:opacity-70 md:text-[2.2rem]"
      >
        <span>{label}</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}
