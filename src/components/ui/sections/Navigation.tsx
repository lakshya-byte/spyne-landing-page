"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
          <Image
            src="/image_copy-removebg-preview.png"
            alt="Spyne Logo"
            width={40}
            height={40}
            className="h-8 md:h-10 w-auto object-contain rounded-md"
            priority
          />
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
