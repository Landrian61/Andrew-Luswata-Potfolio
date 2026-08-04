import { educations } from "@/utils/data/educations";
import { experiences } from "@/utils/data/experience";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

// Companies are the timeline nodes; roles nest inside so progression within
// one company reads as a single story instead of disconnected entries.
function ExperienceColumn({ items }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Experience</p>
      <ol className="mt-8 relative border-l border-line pl-8 space-y-12">
        {items.map((company, i) => (
          <Reveal key={company.id} delay={0.08 * i}>
            <li className="relative">
              {/* node on the timeline */}
              <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border border-accent bg-ink" />
              <p className="font-mono text-xs text-muted">{company.duration}</p>
              <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl tracking-tight">
                {company.company}
              </h3>
              {company.location ? (
                <p className="mt-1 text-sm text-muted">{company.location}</p>
              ) : null}

              {company.roles.length === 1 ? (
                <div className="mt-3">
                  {company.roles[0].title ? (
                    <p className="text-sm text-paper/85">{company.roles[0].title}</p>
                  ) : null}
                  {company.roles[0].summary ? (
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {company.roles[0].summary}
                    </p>
                  ) : null}
                </div>
              ) : (
                <ul className="mt-5 space-y-5 border-l border-line/60 pl-5 list-none">
                  {company.roles.map((role) => (
                    <li key={role.title}>
                      <p className="font-semibold text-sm sm:text-base text-paper/90">
                        {role.title}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted">{role.duration}</p>
                      {role.summary ? (
                        <p className="mt-2 text-sm text-muted leading-relaxed">{role.summary}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function EducationColumn({ items }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Education</p>
      <ol className="mt-8 relative border-l border-line pl-8 space-y-10">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={0.08 * i}>
            <li className="relative">
              <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full border border-accent bg-ink" />
              <p className="font-mono text-xs text-muted">{item.duration}</p>
              <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.institution}</p>
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
        <ExperienceColumn items={experiences} />
        <EducationColumn items={educations} />
      </div>
    </section>
  );
}

export default JourneySection;
