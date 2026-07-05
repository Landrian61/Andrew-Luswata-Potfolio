"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const ACCENT = new THREE.Color("#cdff57");
const PAPER = new THREE.Color("#8e8d96");

const vertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aScale;
  attribute vec3 aColor;
  varying vec3 vColor;

  void main() {
    vec3 p = position;
    // slow breathing along the normal so the sphere feels alive
    float pulse = sin(uTime * 0.5 + p.x * 1.8 + p.y * 2.3 + p.z * 1.2) * 0.055;
    p += normalize(p) * pulse;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aScale * (16.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.08, d);
    gl_FragColor = vec4(vColor, alpha * 0.85);
  }
`;

function ParticleSphere({ reducedMotion }) {
  const group = useRef();
  const material = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, scales, colors } = useMemo(() => {
    const count = 4200;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      // fibonacci sphere for even coverage, jittered so it reads organic
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = golden * i;
      const r = 2.15 + (Math.random() - 0.5) * 0.28;

      positions[i * 3] = r * Math.sin(inclination) * Math.cos(azimuth);
      positions[i * 3 + 1] = r * Math.sin(inclination) * Math.sin(azimuth);
      positions[i * 3 + 2] = r * Math.cos(inclination);

      scales[i] = 0.6 + Math.random() * 1.6;

      const c = Math.random() < 0.16 ? ACCENT : PAPER;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, scales, colors };
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (!reducedMotion) {
      if (material.current) material.current.uniforms.uTime.value += delta;
      group.current.rotation.y += delta * 0.05;

      // gentle parallax toward the cursor
      const { x, y } = state.pointer;
      pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, x, 0.04);
      pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, y, 0.04);
      group.current.rotation.x = pointer.current.y * -0.22;
      group.current.rotation.z = pointer.current.x * 0.1;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={scales.length} array={scales} itemSize={1} />
          <bufferAttribute attach="attributes-aColor" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      {/* faint inner wireframe — the geometric heart of the cloud */}
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#2c2c36" wireframe transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function HeroCanvas() {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ParticleSphere reducedMotion={reducedMotion} />
    </Canvas>
  );
}

export default HeroCanvas;
