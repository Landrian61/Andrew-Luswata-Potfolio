"use client";

import dynamic from "next/dynamic";

// WebGL never renders on the server
const LiquidOrb = dynamic(() => import("./liquid-orb"), {
  ssr: false,
  loading: () => <div className="w-full h-[380px] sm:h-[480px]" />,
});

export default LiquidOrb;
