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
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 flex items-center justify-start pl-4 sm:pl-12 lg:pl-24 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="max-w-[calc(100vw-2rem)] sm:max-w-sm">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tighter text-white">
          Smarter <span className="text-primary">Visuals</span>
        </h2>
        <p className="text-xl font-bold text-white mb-4">Faster Listings.</p>
        <p className="text-lg text-slate-400 font-light mb-6">
          Studio AI automates car merchandising to create high-quality visuals
          that attract buyers and convert faster
        </p>
        <p className="text-base text-slate-400 font-light">
          Capture with any device and let AI handle editing. Clean, consistent,
          high-quality photos build buyer trust, reduce costs, and get your
          inventory online faster.
        </p>
      </div>
    </div>
  );
}
