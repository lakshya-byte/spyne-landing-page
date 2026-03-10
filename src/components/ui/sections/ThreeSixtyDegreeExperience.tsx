"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function ThreeSixtyDegreeExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 4 && progress < 5.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[calc(100vw-2rem)] md:w-auto px-4">
        <div className="w-16 h-16 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center mx-auto mb-4 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>
        <h2 className="text-xl md:text-3xl font-bold mb-2 tracking-tighter text-white">
          Panoramic <span className="text-primary">Car Tour</span>
        </h2>
        <p className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold mb-2">
          Interactive Spin Experience
        </p>
        <p className="text-white/60 text-sm font-light">
          Show buyers every angle with smooth, interactive spins. Increase
          time-on-listing and build trust.
        </p>
      </div>
    </div>
  );
}
