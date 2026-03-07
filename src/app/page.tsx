"use client";

import { useEffect, useState } from "react";
import Experience from "@/components/scene/Experience";
import { useScrollTimeline, scrollStore } from "@/hooks/useScrollTimeline";
import { useSound } from "@/hooks/useSound";
import { preloadModels } from "@/lib/modelLoader";

// Stitch MCP Sections
import Navigation from "@/components/ui/sections/Navigation";
import HeroReveal from "@/components/ui/sections/HeroReveal";
import FullCarRevealAndAITransformation from "@/components/ui/sections/FullCarRevealAndAITransformation";
import AIProcessingVisualization from "@/components/ui/sections/AIProcessingVisualization";
import StudioLightingDemo from "@/components/ui/sections/StudioLightingDemo";
import ThreeSixtyDegreeExperience from "@/components/ui/sections/ThreeSixtyDegreeExperience";
import ColorCustomization from "@/components/ui/sections/ColorCustomization";
import InventoryExpansion from "@/components/ui/sections/InventoryExpansion";
import AISalesAssistant from "@/components/ui/sections/AISalesAssistant";
import PlatformOverview from "@/components/ui/sections/PlatformOverview";
import FinalCTA from "@/components/ui/sections/FinalCTA";

// Preload assets before rendering
preloadModels();

export default function Home() {
  // Initialize scroll tracking
  useScrollTimeline();
  const { playSound } = useSound();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Play startup sound on first scroll interaction
    const unsub = scrollStore.subscribe((p) => {
      if (p > 0.1 && !started) {
        setStarted(true);
        playSound("startup");
        playSound("ambient");
      }
    });
    return unsub;
  }, [started, playSound]);

  return (
    <main className="relative bg-black w-full text-foreground selection:bg-primary selection:text-white overflow-hidden">
      {/* Scroll container (10 segments of 100vh) */}
      <div
        id="scroll-container"
        className="relative w-full"
        style={{ height: "1000vh" }}
      >
        {/* Fixed 3D Canvas */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
          <Experience />
        </div>

        {/* Global Navigation */}
        <Navigation />

        {/* Explicit UI Layout (based on Stitch MCP Design Hierarchy) */}
        <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
          <HeroReveal />
          <FullCarRevealAndAITransformation />
          <AIProcessingVisualization />
          <StudioLightingDemo />
          <ThreeSixtyDegreeExperience />
          <ColorCustomization />
          <InventoryExpansion />
          <AISalesAssistant />
          <PlatformOverview />
          <FinalCTA />
        </div>
      </div>
    </main>
  );
}
