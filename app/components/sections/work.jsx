import { personalData } from "@/utils/data/personal-data";
import { alsoBuilt, selectedWork } from "@/utils/data/projects-data";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { FiArrowUpRight, FiGithub, FiGlobe } from "react-icons/fi";
import Reveal from "../site/reveal";
import SectionHeading from "../site/section-heading";

// Abstract stand-in for a screenshot: hairline texture, an accent rule and an
// outlined monogram. The NDA entry carries its label here, quietly.
function ProjectMark({ monogram, label, nda }) {
  return (
    <div className="relative mt-8 rounded-xl border border-line bg-surface/50 overflow-hidden aspect-[16/7]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(244,243,238,0.04) 0, rgba(244,243,238,0.04) 1px, transparent 1px, transparent 16px)",
        }}
      />
      <div aria-hidden className="absolute left-6 top-6 h-px w-12 bg-accent/70" />
      <span
        aria-hidden
        className="absolute -bottom-2 right-4 font-display font-extrabold uppercase text-outline leading-none select-none text-[clamp(4rem,9vw,7rem)] opacity-60"
      >
        {monogram}
      </span>
      <p className="absolute left-6 bottom-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {nda ? "Under NDA · details on request" : label}
      </p>
    </div>
  );
}

// Resolved at build time in this server component: a declared preview only
// renders once the screenshot actually exists in /public, so a missing file
// falls back to the monogram panel instead of a broken image.
function resolvePreview(preview) {
  if (!preview) return null;
  try {
    fs.accessSync(path.join(process.cwd(), "public", preview));
    return preview;
  } catch {
    return null;
  }
}

function CaseStudy({ project, index }) {
  const preview = resolvePreview(project.preview);
  return (
    <Reveal delay={0.05}>
      <article className="border-t border-line py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-4xl tracking-tight">
              {project.name}
            </h3>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent/90">
            {project.role}
            {project.period ? ` · ${project.period}` : ""}
          </p>
          <p className="mt-2 font-mono text-xs text-muted">{project.org}</p>

          {preview ? (
            <a
              href={project.demo || project.code}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — open the live app`}
              className="group block mt-8 rounded-xl border border-line overflow-hidden hover:border-accent/50 transition-colors duration-500"
            >
              <Image
                src={preview}
                alt={project.previewAlt || `${project.name} landing page`}
                width={1440}
                height={900}
                className="w-full h-auto grayscale-[35%] group-hover:grayscale-0 transition-all duration-700"
              />
            </a>
          ) : (
            <ProjectMark
              monogram={project.monogram}
              label={project.org}
              nda={project.nda}
            />
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-5">
            {project.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-sm sm:text-base text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-2 list-none">
            {project.tools.map((tool) => (
              <li
                key={tool}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted border border-line rounded-full px-3 py-1"
              >
                {tool}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper/85 hover:text-accent transition-colors duration-300 link-lined"
              >
                <FiGlobe size={15} /> Visit the live app <FiArrowUpRight size={15} />
              </a>
            ) : null}
            {project.code ? (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper/85 hover:text-accent transition-colors duration-300 link-lined"
              >
                <FiGithub size={15} /> View the code <FiArrowUpRight size={15} />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CompactCard({ project, index }) {
  const Tag = project.code ? "a" : "div";
  const linkProps = project.code
    ? { href: project.code, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Reveal delay={0.08 * index} className="bg-ink h-full">
      <Tag
        {...linkProps}
        className={`group flex flex-col h-full p-7 sm:p-8 bg-ink hover:bg-surface transition-colors duration-500 ${
          project.code ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <h4 className="font-display font-bold text-xl sm:text-2xl tracking-tight group-hover:text-accent transition-colors duration-300">
            {project.name}
          </h4>
          {project.code ? (
            <FiArrowUpRight
              className="mt-1 shrink-0 text-muted/50 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
              size={18}
            />
          ) : null}
        </div>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {project.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2 list-none">
          {project.tools.map((tool) => (
            <li
              key={tool}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted border border-line rounded-full px-3 py-1"
            >
              {tool}
            </li>
          ))}
        </ul>
      </Tag>
    </Reveal>
  );
}

function WorkSection() {
  return (
    <section id="work" className="px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20">
      <SectionHeading number="03" title="Work" hint="Case studies & builds" />

      <Reveal delay={0.1}>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Selected work
        </p>
      </Reveal>

      <div className="mt-8 border-b border-line">
        {selectedWork.map((project, i) => (
          <CaseStudy key={project.id} project={project} index={i} />
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          Also built
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {alsoBuilt.map((project, i) => (
          <CompactCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <a
          href={personalData.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-accent transition-colors duration-300 link-lined"
        >
          <FiGithub size={16} /> More experiments on GitHub
        </a>
      </div>
    </section>
  );
}

export default WorkSection;
