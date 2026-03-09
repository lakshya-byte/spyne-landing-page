"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/components/animation/ScrollController";

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
