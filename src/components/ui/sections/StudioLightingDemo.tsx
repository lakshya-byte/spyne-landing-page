"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function StudioLightingDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 3 && progress < 4.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 flex items-center justify-start pl-12 lg:pl-24 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="max-w-sm">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          Perfect <span className="text-primary">Studio Lighting</span>
        </h2>
        <p className="text-lg text-slate-400 font-light">
          Procedural HDRI setups guarantee millions of reflections, recreating
          professional automotive photography environments instantly.
        </p>
      </div>
    </div>
  );
}
