"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function PlatformOverview() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  const isVisible = progress > 8 && progress < 9.5;

  return (
    <div
      className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute top-1/3 left-4 sm:left-12 lg:left-24 max-w-[calc(100vw-2rem)] sm:max-w-sm">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tighter text-white">
          Enterprise-grade <span className="text-primary">Everything</span>
        </h2>
        <p className="text-lg text-slate-400 font-light mb-8">
          More secure than using ChatGPT, Gemini, and others directly.
        </p>

        <div className="flex flex-col gap-4 pointer-events-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h3 className="text-white font-bold mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">
                security
              </span>{" "}
              99.99% Uptime
            </h3>
            <p className="text-sm text-slate-400">
              Reliable platform delivering consistent performance for your
              dealership.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h3 className="text-white font-bold mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">
                support_agent
              </span>{" "}
              24/7 Support
            </h3>
            <p className="text-sm text-slate-400">
              SOC 2 TYPE II, ISO 27001, and GDPR compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
