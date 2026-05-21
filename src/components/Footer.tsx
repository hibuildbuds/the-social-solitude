import Link from "next/link";
import { SITE } from "@/lib/site";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 pt-10 pb-12 text-[0.86rem] font-bold leading-[1.45] text-ink md:mt-24">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[auto_1fr_1fr_1fr] md:items-start md:gap-x-12">
        <Link
          href="/"
          aria-label="The Social Solitude — home"
          className="block text-ink"
        >
          <BrandLogo className="h-14 w-auto md:h-16" />
        </Link>

        <div>
          <p>{SITE.tagline.split(",")[0]},</p>
          <p>{SITE.tagline.split(",")[1].trim()}</p>
          <p>{SITE.hours.days}</p>
          <p>{SITE.hours.time}</p>
        </div>

        <div>
          <p className="mb-3">Location</p>
          {SITE.address.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="mb-3">Contact</p>
          <p>
            <a
              href={`tel:${SITE.contact.phone.replace(/\s/g, "")}`}
              className="transition-opacity hover:opacity-70"
            >
              {SITE.contact.phone}
            </a>
          </p>
          <p>
            <a
              href="mailto:info@thesocialsolitude.com"
              className="transition-opacity hover:opacity-70"
            >
              info@thesocialsolitude.com
            </a>
          </p>
          <p>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="transition-opacity hover:opacity-70"
            >
              {SITE.contact.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
