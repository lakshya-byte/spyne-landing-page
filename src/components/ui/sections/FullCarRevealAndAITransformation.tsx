"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function FullCarRevealAndAITransformation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 1 && progress < 2.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/3 left-12 lg:left-24 max-w-sm">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          Escape the <br />
          <span className="text-primary">Dealership Lot.</span>
        </h2>
        <p className="text-lg text-slate-400 font-light">
          No more poor lighting, bad backgrounds, or distracting reflections.
          Our AI perfectly extracts the vehicle from any setting.
        </p>
      </div>
    </div>
  );
}
