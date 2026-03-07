"use client";

import { useEffect, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

export default function SectionOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollStore.subscribe(setProgress);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* 1->2 text */}
      <OverlayText
        show={progress > 1 && progress < 2}
        text="Escape the Dealership Lot."
        subtext="No more poor lighting, bad backgrounds, or distracting reflections."
        position="left"
      />

      {/* 2->3 text */}
      <OverlayText
        show={progress > 2 && progress < 3}
        text="AI Scanning Technology"
        subtext="Our neural engine reconstructs your vehicle in true 3D space."
        position="right"
      />

      {/* 3->4 text */}
      <OverlayText
        show={progress > 3 && progress < 4}
        text="Perfect Studio Lighting"
        subtext="Procedural HDRI setups guarantee millions of reflections."
        position="left"
      />

      {/* 4->5 Drag to rotate hint */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-700 ${progress > 4 && progress < 5 ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-16 h-16 rounded-full border border-white/20 flex flex-col items-center justify-center mx-auto mb-4 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            ></path>
          </svg>
        </div>
        <p className="text-white/60 uppercase tracking-[0.3em] text-sm">
          Drag to inspect
        </p>
      </div>
    </div>
  );
}

function OverlayText({
  show,
  text,
  subtext,
  position,
}: {
  show: boolean;
  text: string;
  subtext: string;
  position: "left" | "right";
}) {
  return (
    <div
      className={`absolute top-1/3 ${position === "left" ? "left-12 lg:left-24" : "right-12 lg:right-24"} max-w-sm transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{text}</h2>
      <p className="text-lg text-white/50">{subtext}</p>
    </div>
  );
}
