"use client";

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import Magnetic from "./magnetic";

function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: personalData.github },
    { label: "Twitter", href: personalData.twitter },
    { label: "Email", href: `mailto:${personalData.email}` },
  ].filter((s) => s.href && !s.href.endsWith("mailto:"));

  return (
    <footer className="relative border-t border-line overflow-hidden">
      <div className="px-6 sm:px-10 lg:px-16 pt-16 pb-10">
        {/* oversized signature */}
        <p
          aria-hidden="true"
          className="font-display font-extrabold uppercase leading-none tracking-tight text-[clamp(2rem,7vw,7.5rem)] text-paper/[0.05] select-none whitespace-nowrap"
        >
          Andrew Luswata
        </p>

        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Software Developer &amp; Creative Technologist
            </p>
            <p className="font-mono text-xs text-muted mt-2">
              {personalData.address} — open to work worldwide
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em]">
            <Link
              href="/playground"
              className="link-lined text-accent/90 hover:text-accent transition-colors"
            >
              ✦ Playground
            </Link>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="link-lined text-muted hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
            <Magnetic>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="w-11 h-11 rounded-full border border-paper/25 flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-colors duration-300"
              >
                ↑
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px] text-muted/70">
          <span>© {year} Andrew Luswata. All rights reserved.</span>
          <span>
            Designed &amp; built with Next.js, Three.js &amp;{" "}
            <Link href="/#craft" className="text-accent/80 hover:text-accent">
              a love of art
            </Link>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
