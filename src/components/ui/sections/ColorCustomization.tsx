"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function ColorCustomization() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 5 && progress < 6.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/3 left-4 sm:left-12 lg:left-24 max-w-[calc(100vw-2rem)] sm:max-w-sm">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tighter text-white">
          Instant <span className="text-primary">Video Tours</span>
        </h2>
        <p className="text-lg text-slate-400 font-light mb-8">
          Transform vehicle photos into professional videos within minutes.
          Highlight key features and publish across digital and social channels,
          without added production costs.
        </p>
      </div>
    </div>
  );
}
