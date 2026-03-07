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
      <div className="absolute top-1/3 left-12 lg:left-24 max-w-sm">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter text-white">
          The <span className="text-primary">Ultimate</span> Platform
        </h2>
        <p className="text-lg text-slate-400 font-light mb-8">
          Manage, process, and distribute cinematic 3D listings anywhere on the
          web, directly from your browser.
        </p>

        <div className="flex flex-col gap-4 pointer-events-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h3 className="text-white font-bold mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">
                cloud_done
              </span>{" "}
              API Access
            </h3>
            <p className="text-sm text-slate-400">
              Integrate our engine directly into your existing CRM or inventory
              tool.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h3 className="text-white font-bold mb-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">
                speed
              </span>{" "}
              Ultra Fast Delivery
            </h3>
            <p className="text-sm text-slate-400">
              Web-optimized GLTF streaming formats adapt instantly to the
              user&apos;s connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
