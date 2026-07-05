"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying float vDisp;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    vec3 p = position;
    // layered trig displacement reads as liquid without a noise texture
    float d =
      sin(p.x * 3.1 + uTime * 1.1) * 0.5 +
      sin(p.y * 4.3 + uTime * 0.9) * 0.3 +
      sin(p.z * 5.2 + uTime * 1.4) * 0.2;
    p += normal * d * uAmp;

    vDisp = d;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uAccent;
  uniform vec3 uBase;
  varying float vDisp;
  varying vec3 vNormal;
  varying vec3 vView;

  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vView)), 2.2);
    vec3 col = mix(uBase, uAccent, clamp(fresnel + vDisp * 0.25, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Orb({ reduced }) {
  const mesh = useRef();
  const hover = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.12 },
      uAccent: { value: new THREE.Color("#cdff57") },
      uBase: { value: new THREE.Color("#15151c") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const mat = mesh.current.material;
    if (!reduced) mat.uniforms.uTime.value += delta;

    // amplitude swells while the cursor is over the canvas
    const target = 0.12 + hover.current * 0.3;
    mat.uniforms.uAmp.value = THREE.MathUtils.lerp(mat.uniforms.uAmp.value, target, 0.06);

    const { x, y } = state.pointer;
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, x, 0.05);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, y, 0.05);
    mesh.current.rotation.y = pointer.current.x * 0.7 + (reduced ? 0 : state.clock.elapsedTime * 0.12);
    mesh.current.rotation.x = pointer.current.y * -0.5;
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => (hover.current = 1)}
      onPointerOut={() => (hover.current = 0)}
    >
      <icosahedronGeometry args={[1.35, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// A living shader sculpture — hover to agitate the surface.
function LiquidOrb() {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="w-full h-[380px] sm:h-[480px]">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Orb reduced={reduced} />
      </Canvas>
    </div>
  );
}

export default LiquidOrb;
