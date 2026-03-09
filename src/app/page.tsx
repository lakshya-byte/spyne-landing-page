"use client";

import { useEffect, useRef } from "react";
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

// UI Components
import MusicToggle from "@/components/ui/MusicToggle";
import ChatBot from "@/components/ui/ChatBot";
import Minimap from "@/components/ui/Minimap";

preloadModels();

export default function Home() {
  useScrollTimeline();
  const { playSound } = useSound();
  const startedRef = useRef(false);

  useEffect(() => {
    const unsub = scrollStore.subscribe((p) => {
      if (p > 0.1 && !startedRef.current) {
        startedRef.current = true;
        playSound("startup");
        playSound("ambient");
      }
    });
    return unsub;
  }, [playSound]);

  return (
    <main className="relative bg-black w-full text-foreground selection:bg-primary selection:text-white overflow-hidden">
      <div
        id="scroll-container"
        className="relative w-full hide-scrollbar"
        style={{ height: "1000vh" }}
      >
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-auto">
          <Experience />
        </div>

        <Navigation />
        <Minimap />

        <MusicToggle />
        <ChatBot />

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
