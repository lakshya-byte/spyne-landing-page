"use client";

import { useState, useEffect } from "react";

export type ViewportSize = "mobile" | "tablet" | "desktop" | "wide";

interface ViewportInfo {
  width: number;
  height: number;
  size: ViewportSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  aspectRatio: number;
  isLandscape: boolean;
}

/**
 * useViewport Hook
 * 
 * Provides responsive viewport information for adapting UI and animations.
 * 
 * Breakpoints:
 * - mobile: width < 768px
 * - tablet: 768px ≤ width < 1024px
 * - desktop: 1024px ≤ width < 1440px
 * - wide: width ≥ 1440px
 */
export function useViewport(): ViewportInfo {
  const [viewport, setViewport] = useState<ViewportInfo>({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
    size: "desktop",
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isWide: false,
    aspectRatio: 16 / 9,
    isLandscape: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      const isLandscape = width > height;

      let size: ViewportSize;
      if (width < 768) size = "mobile";
      else if (width < 1024) size = "tablet";
      else if (width < 1440) size = "desktop";
      else size = "wide";

      setViewport({
        width,
        height,
        size,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isWide: width >= 1440,
        aspectRatio,
        isLandscape,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}
