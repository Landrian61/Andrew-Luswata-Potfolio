"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#cdff57";
const PAPER = "rgba(244,243,238,0.85)";

// Words dissolve into ~3k particles that the cursor can scatter.
function ParticleType() {
  const canvasRef = useRef(null);
  const wordRef = useRef("IMPOSSIBLE");
  const [word, setWord] = useState("IMPOSSIBLE");

  useEffect(() => {
    wordRef.current = word || "AL.";
  }, [word]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let lastWord = "";
    const mouse = { x: -9999, y: -9999 };

    const displayFont = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--font-syne").trim() ||
      "sans-serif";

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastWord = ""; // force resample
    };

    const sampleTargets = (text) => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.round(width));
      off.height = Math.max(1, Math.round(height));
      const octx = off.getContext("2d");

      let size = height * 0.62;
      octx.font = `800 ${size}px ${displayFont()}`;
      const w = octx.measureText(text).width;
      if (w > width * 0.88) size *= (width * 0.88) / w;
      octx.font = `800 ${size}px ${displayFont()}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(text, off.width / 2, off.height / 2);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(3, Math.round(off.width / 260));
      const targets = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      return targets;
    };

    const rebuild = (text) => {
      const targets = sampleTargets(text);
      const next = [];
      for (let i = 0; i < targets.length; i++) {
        const old = particles[i];
        next.push({
          x: old ? old.x : Math.random() * width,
          y: old ? old.y : Math.random() * height,
          vx: 0,
          vy: 0,
          tx: targets[i].x,
          ty: targets[i].y,
          accent: Math.random() < 0.14,
        });
      }
      particles = next;
    };

    const frame = () => {
      const text = (wordRef.current || "AL.").toUpperCase();
      if (text !== lastWord) {
        lastWord = text;
        rebuild(text);
      }

      ctx.clearRect(0, 0, width, height);
      const repelR = 95;

      for (const p of particles) {
        // spring home
        p.vx += (p.tx - p.x) * 0.055;
        p.vy += (p.ty - p.y) * 0.055;

        if (!reduced) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repelR * repelR && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((repelR - d) / repelR) * 7;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.accent ? ACCENT : PAPER;
        ctx.fillRect(p.x, p.y, 2, 2);
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0.05,
    });
    io.observe(canvas);

    // resample once the display font finishes loading
    document.fonts?.ready.then(() => {
      lastWord = "";
    });

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="w-full h-[340px] sm:h-[440px] block touch-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <label htmlFor="pt-word" className="sr-only">
          Word to render as particles
        </label>
        <input
          id="pt-word"
          value={word}
          maxLength={12}
          onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z0-9 .!?×✦-]/g, ""))}
          className="bg-ink/80 backdrop-blur border border-line focus:border-accent rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper text-center outline-none w-56 transition-colors"
          placeholder="TYPE A WORD"
        />
      </div>
    </div>
  );
}

export default ParticleType;
