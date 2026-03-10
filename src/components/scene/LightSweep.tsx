"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/components/animation/ScrollController";

/**
 * LightSweep - Dynamic environmental lighting
 *
 * Purpose:
 * Renders a `RectAreaLight` that physically sweeps across the car model
 * during specific scroll segments (Stages 2..4) to highlight its metallic
 * paint and aggressive body lines.
 *
 * Interactions:
 * - Subscribes to `scrollState.lightSweepX` which is updated by the `ScrollController`.
 * - Direct mutation of light position via `useFrame` for performance.
 *
 * Performance:
 * - Employs a single `RectAreaLight` which is relatively expensive in WebGL,
 *   but avoids shadow casting to maintain frame rates.
 */
export default function LightSweep() {
  const lightRef = useRef<THREE.RectAreaLight>(null);

  useEffect(() => {
    // Ensure RectAreaLight shaders are available when used.
    // In modern three versions, this is handled internally when importing RectAreaLight.
    // We keep this effect minimal to avoid per-frame work.
  }, []);

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = scrollState.lightSweepX;
  });

  return (
    <rectAreaLight
      ref={lightRef}
      width={3.5}
      height={1.6}
      intensity={2.5}
      color={"#ffffff"}
      position={[-8, 1.2, 2.5]}
      rotation={[0, Math.PI, 0]}
    />
  );
}
