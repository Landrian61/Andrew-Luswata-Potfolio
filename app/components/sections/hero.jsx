"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Magnetic from "../site/magnetic";

// Three.js only ever renders on the client
const HeroCanvas = dynamic(() => import("../three/hero-canvas"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

const TICKER = [
  "Software Developer",
  "Creative Technologist",
  "AI-Native Builder",
  "Prompt Engineer",
  "Problem Solver",
  "UI/UX Enthusiast",
  "Team Player",
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" id="home">
      {/* particle field, faded at the edges so the type stays legible */}
      <div
        className="absolute inset-0 -z-10 opacity-90"
        style={{
          maskImage: "radial-gradient(ellipse 75% 70% at 62% 45%, black 35%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 62% 45%, black 35%, transparent 78%)",
        }}
      >
        <HeroCanvas />
      </div>

      {/* soft accent glow anchoring the composition */}
      <div className="absolute -z-20 top-1/3 right-[-10%] w-[42rem] h-[42rem] rounded-full bg-accent/[0.05] blur-[140px]" />

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-16">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-muted flex items-center gap-3"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          Portfolio — {personalData.address}
        </motion.p>

        <h1 className="mt-6 font-display font-extrabold uppercase leading-[0.95] tracking-tight">
          <motion.span
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="block text-[clamp(2.2rem,9.5vw,9rem)]"
          >
            Andrew
          </motion.span>
          <motion.span
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="block text-[clamp(2.2rem,9.5vw,9rem)] text-outline hover:text-accent hover:[-webkit-text-stroke:1.5px_transparent] transition-all duration-500"
          >
            Luswata
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-8 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          {personalData.tagline}
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <Magnetic>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-ink font-mono text-xs uppercase tracking-[0.18em] px-7 py-3.5 hover:bg-paper transition-colors duration-300"
            >
              View work <span aria-hidden>↓</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 font-mono text-xs uppercase tracking-[0.18em] px-7 py-3.5 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Get in touch
            </Link>
          </Magnetic>

          <div className="flex items-center gap-4 sm:ml-2 text-muted">
            {personalData.github && (
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-accent transition-colors duration-300"
              >
                <FaGithub size={20} />
              </a>
            )}
            {personalData.twitter && (
              <a
                href={personalData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="hover:text-accent transition-colors duration-300"
              >
                <FaXTwitter size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* role ticker along the hero's bottom edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="border-y border-line py-4 select-none"
      >
        <Marquee speed={38} autoFill pauseOnHover gradient={false}>
          {TICKER.map((role) => (
            <span
              key={role}
              className="font-mono text-xs uppercase tracking-[0.24em] text-muted mx-6 flex items-center gap-6"
            >
              {role} <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}

export default HeroSection;
