import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

const FACTS = [
  { label: "Based in", value: "Kampala, Uganda" },
  { label: "Studying", value: "B.Sc. Software Engineering, Makerere University" },
  { label: "Focus", value: "AI-powered products, full-stack web" },
  { label: "Status", value: "Open to opportunities" },
];

function AboutSection() {
  return (
    <section id="about" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20">
      <SectionHeading number="01" title="About" hint="The person behind the pixels" />

      <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* portrait with an offset accent frame */}
        <Reveal className="lg:col-span-5" delay={0.1}>
          <div className="relative max-w-sm mx-auto lg:mx-0 group">
            <div className="absolute inset-0 border border-accent/60 rounded-2xl translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <div className="relative rounded-2xl overflow-hidden border border-line bg-surface">
              <Image
                src={personalData.profile}
                width={640}
                height={640}
                alt="Portrait of Andrew Luswata"
                className="w-full h-auto"
                priority={false}
              />
              {/* the monochrome portrait takes the accent hue on hover */}
              <div className="absolute inset-0 bg-accent mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            <p className="absolute -bottom-8 left-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Fig. 01 — {personalData.name.toLowerCase()}
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-7 space-y-8">
          <Reveal delay={0.15}>
            <p className="text-xl sm:text-2xl leading-relaxed text-paper/90">
              {personalData.description}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base sm:text-lg leading-relaxed text-muted">
              {personalData.artStatement}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden mt-10">
              {FACTS.map((fact) => (
                <div key={fact.label} className="bg-ink p-5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm text-paper/85">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
