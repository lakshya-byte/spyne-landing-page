"use client";

import { useEffect, useRef, useState } from "react";
import { scrollStore } from "@/hooks/useScrollTimeline";

/**
 * SECTIONS — Scroll Timeline Manifest
 *
 * Maps to the page's 10-segment scroll journey (progress 0→10).
 * Drives the minimap's labels and click-to-navigate behaviour.
 */
const SECTIONS = [
  { id: "01", title: "HERO REVEAL", subtitle: "Ignition Sequence" },
  { id: "02", title: "TRANSFORMATION", subtitle: "AI Mesh Formation" },
  { id: "03", title: "NEURAL ANALYSIS", subtitle: "Processing Data" },
  { id: "04", title: "STUDIO LIGHTING", subtitle: "Dynamic Illumination" },
  { id: "05", title: "ORBITAL VIEW", subtitle: "360° Exploration" },
  { id: "06", title: "CUSTOMIZATION", subtitle: "Color Configuration" },
  { id: "07", title: "FLEET SCALE", subtitle: "Inventory Expansion" },
  { id: "08", title: "AI CONCIERGE", subtitle: "Intelligent Assistant" },
  { id: "09", title: "DASHBOARD", subtitle: "Platform Overview" },
  { id: "10", title: "IGNITE", subtitle: "Final Destination" },
];

/**
 * GodTierMinimap — Premium right-side scroll timeline navigator
 *
 * Purpose:
 * A fixed, right-side minimap giving users a cinematic overview of the page
 * structure and their current position within the scroll journey.
 *
 * Interactions:
 * - Subscribes to `scrollStore` for real-time scroll progress (0→10).
 * - Imperatively mutates DOM refs for all per-frame visual updates, bypassing
 *   React re-renders entirely for smooth 60+ FPS performance.
 * - `scrollToSegment(idx)` calls `window.scrollTo`; Lenis intercepts and smooths it.
 *
 * Performance Considerations:
 * - Only `isHovered` (mouse enter/leave) triggers a React re-render.
 * - All progress updates are pure DOM mutations — zero reconciliation overhead.
 * - The glass backdrop uses CSS transitions (GPU-composited) for the hover anim.
 *
 * Responsibilities:
 * - Visual fill track + scrubber head indicating scroll depth.
 * - Per-section node dots with active/current state styling.
 * - Cinematic label overlay on hover.
 * - Click-to-jump navigation for each section.
 */
export default function GodTierMinimap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackFillRef = useRef<HTMLDivElement>(null);
  const scrubberGlowRef = useRef<HTMLDivElement>(null);
  const scrubberCoreRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);

  const nodesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollStore.subscribe((p) => {
      const rawPercent = (p / 10) * 100;
      const percent = Math.min(100, Math.max(0, rawPercent));

      if (trackFillRef.current)
        trackFillRef.current.style.height = `${percent}%`;
      if (scrubberGlowRef.current)
        scrubberGlowRef.current.style.top = `${percent}%`;
      if (scrubberCoreRef.current)
        scrubberCoreRef.current.style.top = `${percent}%`;
      if (percentageRef.current) {
        percentageRef.current.innerText = `${Math.min(100, Math.round(percent)).toString().padStart(3, "0")}%`;
      }

      const segmentSpacing = 10 / (SECTIONS.length - 1);

      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const targetP = i * segmentSpacing;
        const distance = Math.abs(p - targetP);
        const isActive = p >= targetP - 0.05;
        const isCurrent = distance < segmentSpacing * 0.5;

        if (isActive) {
          node.classList.add(
            "bg-white",
            "scale-100",
            "shadow-[0_0_15px_rgba(255,255,255,0.8)]",
          );
          node.classList.remove("bg-white/20", "scale-[0.3]");
        } else {
          node.classList.add("bg-white/20", "scale-[0.3]");
          node.classList.remove(
            "bg-white",
            "scale-100",
            "shadow-[0_0_15px_rgba(255,255,255,0.8)]",
          );
        }

        if (isCurrent) {
          node.classList.add(
            "ring-2",
            "ring-white/50",
            "ring-offset-2",
            "ring-offset-black",
          );
        } else {
          node.classList.remove(
            "ring-2",
            "ring-white/50",
            "ring-offset-2",
            "ring-offset-black",
          );
        }

        const label = labelsRef.current[i];
        if (label) {
          if (isCurrent || isHovered) {
            label.style.opacity = isCurrent ? "1" : "0.5";
            label.style.transform = "translateX(0px)";
            label.style.filter = "blur(0px)";
          } else {
            label.style.opacity = "0";
            label.style.transform = "translateX(20px)";
            label.style.filter = "blur(4px)";
          }
        }
      });
    });

    return () => unsubscribe();
  }, [isHovered]);

  const scrollToSegment = (idx: number) => {
    const segmentSpacing = 10 / (SECTIONS.length - 1);
    const targetP = idx * segmentSpacing;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (targetP / 10) * maxScroll;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-0 top-0 h-screen w-16 sm:w-32 md:w-80  pointer-events-none flex items-center justify-end pr-2 md:pr-8 transition-all duration-700 ease-out z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glassmorphic hover backdrop fades in behind labels for readability */}
      <div
        className={`absolute right-0 top-0 h-full w-full bg-linear-to-l from-black/80 via-black/40 to-transparent backdrop-blur-md transition-all duration-700 ease-out ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        style={{
          maskImage: "linear-gradient(to left, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 60%, transparent 100%)",
        }}
      />

      <div
        ref={containerRef}
        className="relative h-[70vh] w-full pointer-events-auto flex items-center justify-end"
      >
        {/* Vertical track rail with animated fill */}
        <div className="absolute right-0 top-0 w-[2px] h-full bg-white/10 rounded-full overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,1)]">
          <div
            ref={trackFillRef}
            className="absolute top-0 right-0 w-full bg-linear-to-b from-primary via-orange-400 to-white shadow-[0_0_20px_rgba(236,91,19,0.8)] transition-all duration-75 ease-linear rounded-full"
            style={{ height: "0%" }}
          />
        </div>

        {/* Scrubber glow halo */}
        <div
          ref={scrubberGlowRef}
          className="absolute right-[-5px] w-3 h-3 bg-primary/40 rounded-full blur-[4px] transition-all duration-75 ease-linear pointer-events-none"
          style={{ top: "0%", transform: "translateY(-50%)" }}
        />
        {/* Scrubber core dot */}
        <div
          ref={scrubberCoreRef}
          className="absolute right-[-2px] w-[6px] h-[6px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] transition-all duration-75 ease-linear pointer-events-none"
          style={{ top: "0%", transform: "translateY(-50%)" }}
        />

        {/* Section nodes */}
        {SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            className="absolute right-0 flex justify-end items-center w-full group cursor-pointer"
            style={{
              top: `${(idx / (SECTIONS.length - 1)) * 100}%`,
              transform: "translateY(-50%)",
            }}
            onClick={() => scrollToSegment(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && scrollToSegment(idx)}
          >
            {/* Expanded invisible tap/click target */}
            <div className="absolute right-[-16px] w-12 h-10 bg-transparent z-10" />

            {/* Animated node dot — tiny when inactive, full when active */}
            <div
              ref={(el) => {
                (nodesRef.current as any)[idx] = el;
              }}
              className="absolute right-[-4px] w-[10px] h-[10px] bg-white/20 rounded-full scale-[0.3] transition-all duration-500 ease-out z-[2]"
            />

            {/* Section label — hidden on mobile, shown on hover or when current */}
            <div
              ref={(el) => {
                (labelsRef.current as any)[idx] = el;
              }}
              className="hidden md:flex mr-8 flex-col justify-center items-end opacity-0 translate-x-5 blur-[4px] transition-all duration-500 ease-out pointer-events-none z-[1]"
            >
              <div className="flex items-end justify-end gap-3">
                <span className="text-[11px] font-bold text-white tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none text-right">
                  {section.title}
                </span>
                <span className="text-[10px] font-bold text-primary/80 tracking-[0.2em] font-mono leading-none">
                  {section.id}
                </span>
              </div>
              <span className="text-[10px] text-white/50 tracking-[0.1em] mt-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] uppercase text-right">
                {section.subtitle}
              </span>
            </div>
          </div>
        ))}

        {/* Percentage indicator below the track */}
        <div className="absolute -bottom-20 right-[-12px] flex flex-col items-center justify-center opacity-40">
          <div className="h-10 w-[1px] bg-linear-to-b from-white/30 to-transparent mb-3" />
          <div
            ref={percentageRef}
            className="text-[10px] font-mono tracking-[0.4em] font-bold text-white/60 -rotate-90 translate-y-3 translate-x-[-1px] transform-origin-center"
          >
            000%
          </div>
        </div>
      </div>
    </div>
  );
}
