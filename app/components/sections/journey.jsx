import { educations } from "@/utils/data/educations";
import { experiences } from "@/utils/data/experience";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

function TimelineColumn({ label, items }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{label}</p>
      <ol className="mt-8 relative border-l border-line pl-8 space-y-10">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={0.08 * i}>
            <li className="relative">
              {/* node on the timeline */}
              <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border border-accent bg-ink" />
              <p className="font-mono text-xs text-muted">{item.duration}</p>
              <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.company || item.institution}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20">
      <SectionHeading number="04" title="Journey" hint="Where I've been" />

      <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <TimelineColumn label="Experience" items={experiences} />
        <TimelineColumn label="Education" items={educations} />
      </div>
    </section>
  );
}

export default JourneySection;
