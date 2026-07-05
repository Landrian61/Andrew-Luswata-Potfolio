"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Magnetic from "../site/magnetic";

// Full-bleed interlude: the doorway into the AI-built lab.
function PlaygroundCta() {
  return (
    <section className="relative border-y border-line bg-surface/50 overflow-hidden group">
      {/* oversized ghost marquee behind the content */}
      <div className="absolute inset-0 flex items-center opacity-[0.06] pointer-events-none select-none">
        <Marquee speed={50} autoFill gradient={false}>
          <span className="font-display font-extrabold uppercase text-[9rem] leading-none whitespace-nowrap mx-8">
            Playground ✦ Playground ✦
          </span>
        </Marquee>
      </div>

      <div className="relative px-6 sm:px-10 lg:px-16 py-20 sm:py-28 flex flex-col lg:flex-row lg:items-end gap-10 justify-between">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            Human × AI experiment
          </p>
          <h2 className="mt-5 font-display font-bold uppercase tracking-tight leading-[1.02] text-[clamp(2rem,5vw,4rem)]">
            Enter the <span className="text-outline-accent">playground</span>
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            An interactive lab designed and coded end-to-end by Fable 5 —
            Anthropic&apos;s AI — in conversation with me. Particle typography,
            generative flow fields, living shaders and kinetic type. Touch
            everything; see how far AI has pushed web UI/UX.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Magnetic>
            <Link
              href="/playground"
              className="inline-flex items-center gap-3 rounded-full bg-accent text-ink font-mono text-xs uppercase tracking-[0.18em] px-9 py-5 hover:bg-paper transition-colors duration-300"
            >
              Step inside <span aria-hidden>✦</span>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

export default PlaygroundCta;
