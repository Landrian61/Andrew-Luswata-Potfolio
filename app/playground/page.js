import Link from "next/link";
import ExperimentFrame from "../components/playground/experiment-frame";
import FlowField from "../components/playground/flow-field";
import KineticType from "../components/playground/kinetic-type";
import LiquidOrb from "../components/playground/orb-loader";
import ParticleType from "../components/playground/particle-type";
import Reveal from "../components/site/reveal";

export const metadata = {
  title: "The Playground — Andrew Luswata × Fable 5",
  description:
    "An interactive lab designed and coded end-to-end by Fable 5, Anthropic's AI, in conversation with Andrew Luswata. Particle typography, generative flow fields, living shaders and kinetic type.",
};

function PlaygroundPage() {
  return (
    <div className="min-h-screen">
      {/* lab intro */}
      <header className="px-6 sm:px-10 lg:px-16 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <Reveal>
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-accent flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            AL. Lab — a human × AI collaboration
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display font-extrabold uppercase tracking-tight leading-[0.95]">
            <span className="block text-[clamp(2.1rem,8.5vw,7.5rem)]">The</span>
            <span className="block text-[clamp(2.1rem,8.5vw,7.5rem)] text-outline">
              Playground
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-8 max-w-2xl text-muted leading-relaxed text-base sm:text-lg">
            Every pixel, shader and spring on this page was designed and coded by{" "}
            <span className="text-paper">Fable 5</span> — Anthropic&apos;s AI — in
            conversation with Andrew. Four live experiments in what web UI/UX
            becomes when engineering, art and machine intelligence share one
            canvas. Touch everything.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            No prefab effects — Canvas 2D, raw WebGL shaders &amp; spring physics only
          </p>
        </Reveal>
      </header>

      {/* experiments */}
      <div className="px-6 sm:px-10 lg:px-16 pb-24 space-y-10 sm:space-y-14">
        <ExperimentFrame
          number="01"
          title="Particle Type"
          blurb="Typography with a survival instinct. Three thousand particles assemble into whatever you type — then scatter from your cursor and fight their way home."
          tech={["Canvas 2D", "Spring physics", "Pixel sampling"]}
          hint="Move through the letters — then type your own word below"
        >
          <ParticleType />
        </ExperimentFrame>

        <ExperimentFrame
          number="02"
          title="Flow Field"
          blurb="Twelve hundred particles riding an invisible noise current. Switch the field's relationship to your cursor and click anywhere to detonate a burst."
          tech={["Canvas 2D", "Value noise", "Vector fields"]}
          hint="Try attract / repel — click to burst"
        >
          <FlowField />
        </ExperimentFrame>

        <ExperimentFrame
          number="03"
          title="Liquid Orb"
          blurb="A sculpture that never holds still. Layered waves displace the surface in a custom GLSL shader while a fresnel rim catches the light — hover and it boils."
          tech={["WebGL", "GLSL shaders", "Fresnel lighting"]}
          hint="Hover to agitate — move to orbit"
        >
          <LiquidOrb />
        </ExperimentFrame>

        <ExperimentFrame
          number="04"
          title="Kinetic Type"
          blurb="A headline where every letter is its own physical object. Push them around with your cursor; springs and damping bring them home — no two paths ever the same."
          tech={["Spring physics", "framer-motion", "Per-letter DOM"]}
          hint="Chase the letters — tap one to squash it"
        >
          <KineticType />
        </ExperimentFrame>
      </div>

      {/* lab outro */}
      <div className="border-t border-line px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            End of lab notes
          </p>
          <h2 className="mt-4 font-display font-bold uppercase tracking-tight text-[clamp(1.6rem,4vw,3rem)] max-w-3xl mx-auto leading-tight">
            This is what happens when you hand AI{" "}
            <span className="text-accent">a canvas</span> instead of a ticket.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-ink font-mono text-xs uppercase tracking-[0.18em] px-7 py-3.5 hover:bg-paper transition-colors duration-300"
            >
              Build something with Andrew
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 font-mono text-xs uppercase tracking-[0.18em] px-7 py-3.5 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              ← Back home
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default PlaygroundPage;
