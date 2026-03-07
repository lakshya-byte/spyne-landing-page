"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function InventoryExpansion() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 6 && progress < 7.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/3 right-12 lg:right-24 max-w-sm text-right">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          Inventory <span className="text-primary">Expansion</span>
        </h2>
        <p className="text-lg text-slate-400 font-light">
          Scale your digital showroom endlessly. Manage thousands of listings
          with automated processing pipelines.
        </p>
      </div>
    </div>
  );
}
