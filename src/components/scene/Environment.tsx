"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";

/**
 * Environment - Scene Lighting and Atmosphere
 *
 * Purpose:
 * Provides an HDRI-based "studio" preset for physically realistic reflections
 * on the car's metallic surfaces and windows.
 * Contains `fogExp2` to obscure the edges of the 3D space, creating depth
 * and focus on the primary subject.
 */
export default function Environment() {
  return (
    <>
      <fogExp2 attach="fog" args={["#050505", 0.02]} />
      <DreiEnvironment preset="studio" background={false} blur={0.8} />
    </>
  );
}
