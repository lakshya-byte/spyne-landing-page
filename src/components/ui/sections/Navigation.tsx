"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function Navigation() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    return scrollStore.subscribe(() => {
      // Hide nav during the middle segments for immersion if desired,
      // or just keep it always visible. Keeping it always visible for now.
      setOpacity(1);
    });
  }, []);

  if (opacity <= 0) return null;

  return (
    <nav
      className="fixed top-0 w-full z-50 glass-nav transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="text-lg md:text-xl font-black tracking-tighter uppercase text-white">
            Spyne
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a
            className="text-sm font-medium hover:text-primary transition-colors text-white"
            href="#"
          >
            Solutions
          </a>
          <a
            className="text-sm font-medium hover:text-primary transition-colors text-white"
            href="#"
          >
            Platform
          </a>
          <a
            className="text-sm font-medium hover:text-primary transition-colors text-white"
            href="#"
          >
            Pricing
          </a>
          <a
            className="text-sm font-medium hover:text-primary transition-colors text-white"
            href="#"
          >
            Resources
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-lg transition-all text-white">
            Sign In
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all tracking-tight cursor-pointer pointer-events-auto">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
