"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";
import ChatBot from "@/components/ui/ChatBot";

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
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          AI <span className="text-primary">Sales Assistant</span>
        </h2>
        <p className="text-lg text-slate-400 font-light">
          Experience interactive AI assistance with our premium chatbot
          interface. Get instant answers about vehicles, pricing, and features.
        </p>
      </div>

      {/* Premium ChatBot Component */}
      <ChatBot />
    </div>
  );
}
