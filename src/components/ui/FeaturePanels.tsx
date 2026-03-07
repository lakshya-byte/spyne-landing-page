"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function FeaturePanels() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe((p) => {
      setProgress(p);
      // Visible between segment 7 and 9
      setVisible(p > 6.5 && p < 9.5);
    });
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-between p-12 lg:p-24">
      {/* Left Panel */}
      <div
        className="glass-panel w-80 p-6 rounded-2xl transform transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(${(progress - 7) * 20}px)`,
          opacity: Math.min(1, (progress - 6.5) * 2),
        }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_10px_#0ea5e9]"></div>
          </div>
          <h3 className="text-xl font-bold">AI Assistant</h3>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">
          Automatically enhance lighting, generate reflections, and replace
          backgrounds with stunning studio environments in seconds.
        </p>
      </div>

      {/* Right Dashboard Mockup */}
      <div
        className="glass-panel w-96 p-6 rounded-2xl transform transition-transform duration-700 ease-out hidden md:block"
        style={{
          transform: `translateX(${-(progress - 7) * 20}px)`,
          opacity: Math.min(1, (progress - 6.5) * 2),
        }}
      >
        <h4 className="text-sm uppercase tracking-wider text-foreground/50 mb-4">
          Platform Overview
        </h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 bg-white/5 rounded-lg border border-white/5 flex items-center px-4"
            >
              <div className="w-8 h-8 rounded bg-white/10 mr-4"></div>
              <div className="flex-1">
                <div className="h-2 w-full bg-white/10 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-white/5 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
