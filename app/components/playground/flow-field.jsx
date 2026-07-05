"use client";

import { useEffect, useRef, useState } from "react";

// Compact value-noise (no deps): hashed lattice + smooth interpolation.
function makeNoise() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const fade = (t) => t * t * (3 - 2 * t);
  const grad = (h, x, y) => ((h & 1 ? -x : x) + (h & 2 ? -y : y));

  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);
    const aa = perm[X + perm[Y]];
    const ab = perm[X + perm[Y + 1]];
    const ba = perm[X + 1 + perm[Y]];
    const bb = perm[X + 1 + perm[Y + 1]];
    const x1 = grad(aa, xf, yf) + u * (grad(ba, xf - 1, yf) - grad(aa, xf, yf));
    const x2 =
      grad(ab, xf, yf - 1) + u * (grad(bb, xf - 1, yf - 1) - grad(ab, xf, yf - 1));
    return (x1 + v * (x2 - x1)) * 0.7;
  };
}

const MODES = ["drift", "attract", "repel"];

// A river of particles steered by noise; the cursor bends the current.
function FlowField() {
  const canvasRef = useRef(null);
  const modeRef = useRef("drift");
  const [mode, setMode] = useState("drift");

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noise = makeNoise();

    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    const COUNT = 1200;
    let parts = [];

    const spawn = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      accent: Math.random() < 0.12,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#0a0a0e";
      ctx.fillRect(0, 0, width, height);
      parts = Array.from({ length: COUNT }, spawn);
    };

    const frame = () => {
      t += reduced ? 0 : 0.0018;
      // fade previous frame → trails
      ctx.fillStyle = "rgba(10,10,14,0.075)";
      ctx.fillRect(0, 0, width, height);

      const m = modeRef.current;
      for (const p of parts) {
        const a = noise(p.x * 0.0021 + t, p.y * 0.0021 - t) * Math.PI * 3;
        let vx = Math.cos(a) * 1.5;
        let vy = Math.sin(a) * 1.5;

        if (m !== "drift") {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 220 * 220 && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = ((220 - d) / 220) * 2.4 * (m === "attract" ? 1 : -1);
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
        }

        const nx = p.x + vx;
        const ny = p.y + vy;
        ctx.strokeStyle = p.accent ? "rgba(205,255,87,0.7)" : "rgba(244,243,238,0.28)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
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
    // click = burst: fling nearby particles outward from the click point
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (let i = 0; i < 260; i++) {
        const p = parts[(Math.random() * parts.length) | 0];
        const ang = Math.random() * Math.PI * 2;
        const r = Math.random() * 30;
        p.x = cx + Math.cos(ang) * r;
        p.y = cy + Math.sin(ang) * r;
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0.05,
    });
    io.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onClick);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="w-full h-[340px] sm:h-[460px] block touch-none cursor-crosshair" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`font-mono text-[10px] uppercase tracking-[0.18em] rounded-full px-4 py-2 border transition-colors duration-300 backdrop-blur ${
              mode === m
                ? "bg-accent text-ink border-accent"
                : "bg-ink/70 text-muted border-line hover:text-paper"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FlowField;
