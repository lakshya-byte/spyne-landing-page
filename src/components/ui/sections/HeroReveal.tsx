"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function HeroReveal() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    return scrollStore.subscribe((progress) => {
      // Visible 0-1, fades out 1-1.5
      setOpacity(Math.max(0, 1 - progress * 1.5));
    });
  }, []);

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-opacity duration-100 hero-gradient"
      style={{ opacity }}
    >
      <div className="relative z-20 text-center px-6 max-w-5xl pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-white">
          Turn Car Photos into <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">
            Studio-Quality Listings
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide max-w-2xl mx-auto mb-10">
          AI-powered automotive retail platform for world-class dealerships.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
          <button className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all text-sm uppercase tracking-widest">
            Book a Demo
          </button>
          <button className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all text-sm uppercase tracking-widest backdrop-blur-sm">
            View Gallery
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-4">
        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">
          Scroll to explore
        </p>
        <div className="w-px h-12 bg-linear-to-b from-primary/60 to-transparent"></div>
      </div>
    </div>
  );
}
