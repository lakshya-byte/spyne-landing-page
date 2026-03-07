"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function HeroOverlay() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    return scrollStore.subscribe((progress) => {
      // Fade out as we scroll past segment 1
      setOpacity(Math.max(0, 1 - progress * 1.5));
    });
  }, []);

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      style={{ opacity }}
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-glow text-center px-4">
        Turn Car Photos into <br />
        <span className="text-white/80">Studio-Quality Listings</span>
      </h1>
      <p className="mt-6 text-xl text-white/50 tracking-widest uppercase">
        Scroll to Explore
      </p>
    </div>
  );
}
