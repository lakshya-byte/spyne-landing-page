"use client";

import { useState, useEffect } from "react";
import { useSound } from "@/hooks/useSound";

/**
 * MusicToggle - Aesthetic music control button with glass-morphism design
 *
 * Features:
 * - Smooth play/pause equalizer animations
 * - Premium glass-morphism visual effects
 * - Tactile interaction feedback
 * - Proper z-index layering
 */
export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { playSound, pauseSound } = useSound();

  // Initialize music state
  useEffect(() => {
    const t = setTimeout(() => setIsInitialized(true), 0);
    return () => clearTimeout(t);
  }, []);

  /**
   * Toggle music playback with smooth transitions
   */
  const toggleMusic = () => {
    playSound("click"); // Tactile audio feedback
    if (isPlaying) {
      pauseSound("ambient");
      setIsPlaying(false);
    } else {
      playSound("ambient");
      setIsPlaying(true);
    }
  };

  if (!isInitialized) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <button
        onClick={toggleMusic}
        className="
          group relative flex items-center justify-center
          w-10 h-10 rounded-full 
          bg-white/5 backdrop-blur-md border border-white/10
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
          hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]
          active:scale-[0.98]
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          overflow-hidden
        "
        aria-label={isPlaying ? "Pause abstract audio" : "Play abstract audio"}
      >
        {/* Subtle internal glow on ambient play */}
        <div
          className={`
            absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent
            transition-all duration-[2s] ease-in-out
            ${isPlaying ? "translate-x-[200%] opacity-100 animate-[shimmer_3s_infinite_linear]" : "-translate-x-[200%] opacity-0"}
          `}
        />

        {/* Equalizer Bars */}
        <div className="relative z-10 flex items-end gap-[3px] h-4">
          <div
            className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isPlaying ? "opacity-100 h-[30%] animate-[eqBounce_0.5s_infinite_alternate_ease-in-out]" : "opacity-40 h-[3px]"}`}
          />
          <div
            className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isPlaying ? "opacity-100 h-[80%] animate-[eqBounce_0.6s_infinite_alternate_ease-in-out]" : "opacity-40 h-[3px]"}`}
          />
          <div
            className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isPlaying ? "opacity-100 h-[50%] animate-[eqBounce_0.7s_infinite_alternate_ease-in-out]" : "opacity-40 h-[3px]"}`}
          />
          <div
            className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isPlaying ? "opacity-100 h-full animate-[eqBounce_0.8s_infinite_alternate_ease-in-out]" : "opacity-40 h-[3px]"}`}
          />
        </div>
      </button>
    </div>
  );
}
