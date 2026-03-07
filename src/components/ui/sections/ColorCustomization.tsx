"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";
import ColorPicker from "@/components/ui/ColorPicker";

export default function ColorCustomization() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 5 && progress < 6.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/3 left-12 lg:left-24 max-w-sm">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          Endless <span className="text-primary">Customization</span>
        </h2>
        <p className="text-lg text-slate-400 font-light mb-8">
          Not the right color? Change it on the fly. Offer your customers every
          possible configuration without expanding inventory.
        </p>
      </div>

      {/* We reuse the actual interactive ColorPicker. We wrap it in pointer-events-auto so it can be clicked. */}
      {isVisible && (
        <div className="pointer-events-auto">
          <ColorPicker />
        </div>
      )}
    </div>
  );
}
