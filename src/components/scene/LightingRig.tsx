"use client";

import { useRef } from "react";
import * as THREE from "three";

export default function LightingRig() {
  const groupRef = useRef<THREE.Group>(null);

  // Key Light
  // position [5,6,5], intensity 3

  // Fill Light
  // position [-4,4,3], intensity 1.5

  // Rim Light
  // position [0,5,-6], intensity 4

  // Back Light
  // position [0,3,-8], intensity 2

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.15} />

      {/* Key Light */}
      <directionalLight
        position={[5, 6, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fill Light */}
      <directionalLight position={[-4, 4, 3]} intensity={0.5} color="#a5b4fc" />

      {/* Rim Light */}
      <spotLight
        position={[0, 5, -6]}
        intensity={1.5}
        angle={Math.PI / 4}
        penumbra={0.5}
        color="#e0e7ff"
        castShadow
      />

      {/* Back Light */}
      <pointLight
        position={[0, 3, -8]}
        intensity={0.8}
        color="#60a5fa"
        distance={20}
      />
    </group>
  );
}
