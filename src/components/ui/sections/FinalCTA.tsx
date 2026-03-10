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
      <div className="text-center px-4 w-[calc(100vw-2rem)] max-w-2xl transform translate-y-8 transition-transform duration-1000 ease-out">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">
          Ready to Transform{" "}
          <span className="text-primary">Your Dealership?</span>
        </h2>
        <p className="text-base sm:text-xl text-slate-400 font-light mb-6 sm:mb-8">
          Join 100+ thousand dealerships using Spyne to sell more cars faster
          with AI-powered merchandising and conversational AI agents.
        </p>
        <button className="px-12 py-5 bg-primary hover:bg-white text-white hover:text-black font-bold rounded-full transition-all text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(236,91,19,0.3)] pointer-events-auto">
          Book a Demo
        </button>
      </div>
    </div>
  );
}
