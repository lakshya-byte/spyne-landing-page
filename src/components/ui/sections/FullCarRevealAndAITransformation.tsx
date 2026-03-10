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
      <div className="absolute top-1/3 left-4 sm:left-12 lg:left-24 max-w-[calc(100vw-2rem)] sm:max-w-sm">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tighter text-white">
          Testimonials
        </h2>
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-md">
            <p className="text-white font-medium mb-2 italic">
              "We saw 100% inbound lead coverage and a 26% booking rate, leading
              to a 2x increase in closures per month"
            </p>
            <p className="text-primary font-bold text-sm">
              Brian Benstock - Paragon Honda
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-md">
            <p className="text-white font-medium mb-2 italic">
              "We chose Spyne for their innovative solution and user-friendly
              platform"
            </p>
            <p className="text-primary font-bold text-sm">
              Andrés Parra - Flexicar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
