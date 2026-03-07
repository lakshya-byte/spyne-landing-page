"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function CTASection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  // Show in the final segment (9 -> 10)
  const isVisible = progress > 8.5;

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-end pb-32 z-20 transition-all duration-1000 bg-linear-to-t from-black/80 to-transparent pointer-events-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <h2 className="text-4xl md:text-6xl font-bold text-glow mb-8 text-center px-4">
        Transform Your Dealership <br />
        <span className="text-accent-blue">With AI</span>
      </h2>

      <button className="pointer-events-auto group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
        <span className="relative z-10">Contact Sales</span>
        <div className="absolute inset-0 h-full w-full bg-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        <span className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-100 z-10 flex items-center justify-center text-white">
          Contact Sales
        </span>
      </button>
    </div>
  );
}
