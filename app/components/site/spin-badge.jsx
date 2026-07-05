"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "./magnetic";

// Sticker badge: the portrait cutout ringed by slowly rotating type.
function SpinBadge({ className = "" }) {
  return (
    <Magnetic className={className} strength={0.25}>
      <Link
        href="/#about"
        aria-label="About Andrew Luswata"
        className="group relative block w-36 h-36 lg:w-44 lg:h-44 text-muted hover:text-accent transition-colors duration-500"
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] group-hover:[animation-duration:7s]"
          aria-hidden="true"
        >
          <defs>
            <path
              id="badge-ring"
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              fill="none"
            />
          </defs>
          <text
            fill="currentColor"
            fontSize="7.2"
            letterSpacing="1.6"
            style={{ fontFamily: "var(--font-mono), monospace", textTransform: "uppercase" }}
          >
            <textPath href="#badge-ring">
              Andrew Luswata ✦ Open to work ✦
            </textPath>
          </text>
        </svg>

        <span className="absolute inset-0 m-auto w-[58%] h-[58%] rounded-full overflow-hidden border border-line group-hover:border-accent/60 transition-colors duration-500">
          <Image
            src={personalData.profile}
            alt="Andrew Luswata"
            fill
            sizes="120px"
            className="object-cover"
          />
        </span>
      </Link>
    </Magnetic>
  );
}

export default SpinBadge;
