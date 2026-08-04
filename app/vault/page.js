import Link from "next/link";
import { resources } from "@/utils/data/resources";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../components/site/reveal";

export const metadata = {
  title: "The Vault · Andrew Luswata",
  description:
    "The links Andrew Luswata keeps coming back to: cheat sheets, legendary repos and everyday tools. Free, battle-tested, no fluff.",
};

// A field guide for fellow builders: learn, steal, ship.
function VaultPage() {
  return (
    <div className="min-h-screen">
      <header className="px-6 sm:px-10 lg:px-16 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <Reveal>
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-accent flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            Fuel for fellow builders
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display font-extrabold uppercase tracking-tight leading-[0.95]">
            <span className="block text-[clamp(2.1rem,8.5vw,7.5rem)]">The</span>
            <span className="block text-[clamp(2.1rem,8.5vw,7.5rem)] text-outline">
              Vault
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-8 max-w-2xl text-muted leading-relaxed text-base sm:text-lg">
            The links I keep coming back to: cheat sheets, legendary repos and
            everyday tools. Free, battle-tested, no fluff. Steal generously.
          </p>
        </Reveal>
      </header>

      <div className="px-6 sm:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {resources.map((group, gi) => (
            <Reveal key={group.category} delay={0.08 * gi} className="bg-ink">
              <div className="p-7 sm:p-8 h-full">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {String(gi + 1).padStart(2, "0")} — {group.category}
                </p>
                <ul className="mt-6 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 py-3 border-b border-line/60 last:border-0"
                      >
                        <span>
                          <span className="block font-display font-semibold text-base text-paper/90 group-hover:text-accent transition-colors duration-300">
                            {item.name}
                          </span>
                          <span className="block mt-1 text-xs text-muted leading-relaxed">
                            {item.blurb}
                          </span>
                        </span>
                        <FiArrowUpRight
                          className="mt-1 shrink-0 text-muted/50 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                          size={16}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/"
            className="link-lined font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors duration-300"
          >
            ← Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VaultPage;
