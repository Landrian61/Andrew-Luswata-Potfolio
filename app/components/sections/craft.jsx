"use client";

import { capabilities } from "@/utils/data/capabilities";
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import { motion } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

function SkillChip({ skill }) {
  const icon = skillsImage(skill);
  return (
    <div className="flex items-center gap-3 border border-line rounded-full px-5 py-2.5 mx-2 bg-surface/60 hover:border-accent/60 transition-colors duration-300">
      {icon?.src ? (
        <Image src={icon.src} alt="" width={20} height={20} className="w-5 h-5" />
      ) : null}
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-paper/85 whitespace-nowrap">
        {skill}
      </span>
    </div>
  );
}

function CraftSection() {
  const half = Math.ceil(skillsData.length / 2);

  return (
    <section id="craft" className="py-24 sm:py-32 scroll-mt-20">
      <div className="px-6 sm:px-10 lg:px-16">
        <SectionHeading number="02" title="Craft" hint="What I bring to the table" />

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {capabilities.map((cap, i) => (
            <motion.article
              key={cap.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group bg-ink p-8 sm:p-10 hover:bg-surface transition-colors duration-500"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-accent">/{cap.id}</span>
                <span
                  aria-hidden
                  className="text-muted/40 group-hover:text-accent group-hover:rotate-45 transition-all duration-500 text-xl"
                >
                  ↗
                </span>
              </div>
              <h3 className="mt-6 font-display font-bold text-2xl sm:text-3xl tracking-tight">
                {cap.title}
              </h3>
              <p className="mt-4 text-muted leading-relaxed text-sm sm:text-base">{cap.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/70 border border-line rounded-full px-3 py-1.5 group-hover:border-accent/40 transition-colors duration-500"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>

      {/* the toolbox — two counter-scrolling rows */}
      <Reveal className="mt-16 sm:mt-20 space-y-4" delay={0.1}>
        <p className="px-6 sm:px-10 lg:px-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          The toolbox
        </p>
        <Marquee speed={34} autoFill pauseOnHover gradient={false}>
          {skillsData.slice(0, half).map((skill) => (
            <SkillChip key={skill} skill={skill} />
          ))}
        </Marquee>
        <Marquee speed={30} autoFill pauseOnHover gradient={false} direction="right">
          {skillsData.slice(half).map((skill) => (
            <SkillChip key={skill} skill={skill} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}

export default CraftSection;
