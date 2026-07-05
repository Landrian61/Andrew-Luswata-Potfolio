"use client";

import { personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHeading from "../site/section-heading";

function ProjectRow({ project, index, onHover, onLeave }) {
  const href = project.demo || project.code || null;
  const Tag = href ? "a" : "div";
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="border-t border-line last:border-b"
    >
      <Tag
        {...linkProps}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        className={`group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center py-8 sm:py-10 px-1 transition-colors duration-500 ${
          href ? "cursor-pointer" : ""
        }`}
      >
        <span className="md:col-span-1 font-mono text-sm text-muted group-hover:text-accent transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="md:col-span-6">
          <h3 className="font-display font-bold text-2xl sm:text-4xl tracking-tight text-paper/85 group-hover:text-paper group-hover:translate-x-2 transition-all duration-500">
            {project.name}
          </h3>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-lg md:pr-6">
            {project.description}
          </p>
          {/* mobile gets a static image since there's no cursor to follow */}
          <div className="mt-5 md:hidden rounded-lg overflow-hidden border border-line">
            <Image
              src={project.image}
              alt={project.name}
              className="w-full h-44 object-cover"
              placeholder="blur"
            />
          </div>
        </div>

        <div className="md:col-span-4 flex flex-wrap gap-2 content-start">
          <span className="w-full font-mono text-[11px] uppercase tracking-[0.18em] text-accent/90 mb-1">
            {project.role}
          </span>
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted border border-line rounded-full px-3 py-1"
            >
              {tool}
            </span>
          ))}
        </div>

        <span className="hidden md:flex md:col-span-1 justify-end text-muted group-hover:text-accent transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          {href ? <FiArrowUpRight size={26} /> : null}
        </span>
      </Tag>
    </motion.li>
  );
}

function WorkSection() {
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  // the floating preview trails the cursor on springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { stiffness: 140, damping: 20, mass: 0.5 });
  const previewY = useSpring(mouseY, { stiffness: 140, damping: 20, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left + 28);
    mouseY.set(e.clientY - rect.top - 110);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative px-6 sm:px-10 lg:px-16 py-24 sm:py-32 scroll-mt-20"
    >
      <SectionHeading number="03" title="Work" hint="Selected projects" />

      <ul className="mt-14 sm:mt-20 list-none">
        {projectsData.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
          />
        ))}
      </ul>

      {/* cursor-following preview (desktop only) */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 3 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ x: previewX, y: previewY }}
            className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block w-[22rem] rounded-xl overflow-hidden border border-line shadow-2xl shadow-black/60"
          >
            <Image
              src={projectsData[hovered].image}
              alt=""
              className="w-full h-56 object-cover"
              placeholder="blur"
            />
            <div className="bg-surface px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {projectsData[hovered].name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
