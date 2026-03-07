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
      <div className="absolute top-1/3 right-12 lg:right-24 max-w-sm text-right">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          Neural <span className="text-primary">Engine</span>
        </h2>
        <p className="text-lg text-slate-400 font-light">
          Advanced machine learning models reconstruct your vehicle in true 3D
          space, capturing every curve.
        </p>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
        <p className="text-sm tracking-[0.2em] uppercase font-medium text-slate-300">
          Processing Geometry
        </p>
      </div>
    </div>
  );
}
