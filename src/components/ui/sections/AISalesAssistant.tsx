"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

/**
 * AISalesAssistant Section - Enhanced with Premium ChatBot UI
 *
 * This section now displays the god-level chatbot interface instead of the mockup.
 * The chatbot appears during scroll segments 7-8.5 and provides an interactive
 * AI sales assistant experience with modern glass-morphism design.
 */
export default function AISalesAssistant() {
  const [progress, setProgress] = useState(0);

  // Subscribe to scroll progress updates
  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  // Calculate visibility based on scroll progress
  const isVisible = progress > 7 && progress < 8.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Section Header */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center w-[calc(100vw-2rem)] max-w-2xl px-2 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tighter text-white">
          Vini AI -{" "}
          <span className="text-primary">Your Dealership's AI Workforce</span>
        </h2>
        <div className="grid grid-cols-2 gap-3 mt-8">
          <div className="text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-lg p-2">
            Sales Agent
          </div>
          <div className="text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-lg p-2">
            BDC Agent
          </div>
          <div className="text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-lg p-2">
            Service Agent
          </div>
          <div className="text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-lg p-2">
            Parts Agent
          </div>
          <div className="text-sm font-semibold text-white bg-white/5 border border-white/10 rounded-lg p-2 col-span-2">
            Recall Agent
          </div>
        </div>
      </div>
    </div>
  );
}
