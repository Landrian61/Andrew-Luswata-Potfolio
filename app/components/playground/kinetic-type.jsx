"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const LINE = "DESIGN IS ALIVE";

function Letter({ char }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 160, damping: 11, mass: 0.4 });
  const y = useSpring(0, { stiffness: 160, damping: 11, mass: 0.4 });
  const rotate = useSpring(0, { stiffness: 120, damping: 9 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const d = Math.hypot(dx, dy);
      const R = 170;
      if (d < R && d > 0.1) {
        const f = ((R - d) / R) * 46;
        x.set((dx / d) * f);
        y.set((dy / d) * f);
        rotate.set((dx / d) * ((R - d) / R) * 14);
      } else {
        x.set(0);
        y.set(0);
        rotate.set(0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y, rotate]);

  if (char === " ") return <span className="w-[0.35em]" />;

  return (
    <motion.span
      ref={ref}
      style={{ x, y, rotate }}
      whileTap={{ scale: 0.8, color: "#cdff57" }}
      className="inline-block cursor-default select-none hover:text-accent transition-colors duration-300"
    >
      {char}
    </motion.span>
  );
}

// Every letter is a spring: the cursor pushes, physics answers.
function KineticType() {
  return (
    <div className="flex items-center justify-center h-[300px] sm:h-[380px] px-6 overflow-hidden">
      <p
        aria-label={LINE}
        className="font-display font-extrabold uppercase tracking-tight leading-none text-[clamp(2rem,6vw,5.5rem)] flex flex-wrap justify-center"
      >
        {LINE.split("").map((c, i) => (
          <Letter key={`${c}-${i}`} char={c} />
        ))}
      </p>
    </div>
  );
}

export default KineticType;
