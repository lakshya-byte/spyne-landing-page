"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function FinalCTA() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 9;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 bg-linear-to-t from-background via-black/80 to-transparent flex items-end justify-center pb-24 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="text-center px-4 max-w-2xl transform translate-y-8 transition-transform duration-1000 ease-out">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
          Ready to <span className="text-primary">Upgrade?</span>
        </h2>
        <p className="text-xl text-slate-400 font-light mb-8">
          Join the top 1% of dealerships creating cinematic AI photography.
        </p>
        <button className="px-12 py-5 bg-primary hover:bg-white text-white hover:text-black font-bold rounded-full transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(236,91,19,0.3)] pointer-events-auto">
          Contact Sales
        </button>
      </div>
    </div>
  );
}
