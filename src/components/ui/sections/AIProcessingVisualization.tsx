"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function AIProcessingVisualization() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 2 && progress < 3.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/3 right-4 sm:right-12 lg:right-24 max-w-[calc(100vw-2rem)] sm:max-w-sm text-right">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tighter text-white">
          Vini AI Max
        </h2>
        <p className="text-xl font-bold text-white mb-2">
          Your Dealership's Always-On AI Workforce
        </p>
        <p className="text-lg text-slate-400 font-light">
          Vini AI manages inquiries in real time to boost conversions and drive
          more sales
        </p>
      </div>
    </div>
  );
}
