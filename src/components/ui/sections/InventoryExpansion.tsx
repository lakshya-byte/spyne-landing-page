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
      <div className="absolute top-1/3 right-4 sm:right-12 lg:right-24 max-w-[calc(100vw-2rem)] sm:max-w-sm text-right">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tighter text-white">
          Automate <span className="text-primary">Workflows</span>
        </h2>
        <p className="text-lg text-slate-400 font-light mb-6">
          Spyne integrates with your current CRM, DMS, website, ad tools, and
          marketplaces. You keep your stack. We make it smarter.
        </p>
        <p className="text-base text-slate-400 font-light">
          Traditional BDC is broken. With AI superpowers, never miss a lead
          again. Instant scheduling & follow-ups, automatic lead data updates.
        </p>
      </div>
    </div>
  );
}
