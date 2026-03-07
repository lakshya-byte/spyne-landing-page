"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";
import FeaturePanels from "@/components/ui/FeaturePanels";

export default function AISalesAssistant() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 7 && progress < 8.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          AI <span className="text-primary">Sales Assistant</span>
        </h2>
        <p className="text-lg text-slate-400 font-light">
          Empower your sales team with automated feature extraction, vehicle
          history summaries, and dynamic pricing models natively embedded in the
          3D viewer.
        </p>
      </div>

      {/* Leverage existing FeaturePanels for the dashboard mockup */}
      <FeaturePanels />
    </div>
  );
}
