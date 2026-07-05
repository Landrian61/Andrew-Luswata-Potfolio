import { resources } from "@/utils/data/resources";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

// A field guide for fellow builders: learn, steal, ship.
function ResourcesSection() {
  return (
    <section id="resources" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20">
      <SectionHeading number="05" title="Vault" hint="Fuel for fellow builders" />

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl text-muted leading-relaxed">
          The links I keep coming back to — cheat sheets, legendary repos and
          everyday tools. Free, battle-tested, no fluff. Steal generously.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
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
    </section>
  );
}

export default ResourcesSection;
