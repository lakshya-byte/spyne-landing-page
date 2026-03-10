"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ParticleSystem - Ambient generative dust and atmosphere
 *
 * Purpose:
 * Renders a highly optimized field of generic floating particles to give
 * depth, scale, and atmosphere to the 3D scene.
 *
 * Interactions:
 * - Slowly rotates and undulates on the Y-axis inside `useFrame`.
 * - Receives a `tier` prop (defaults to 3) which determines density.
 *
 * Performance Considerations:
 * - Uses `THREE.Points` combined with a `Float32Array` instead of
 *   individual meshes. This is critical for maintaining 60fps while rendering
 *   thousands of elements.
 * - Initialization is deferred via `setTimeout` to not block the main thread
 *   during mount.
 */
export default function ParticleSystem({ tier = 3 }: { tier?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = tier === 3 ? 2000 : tier === 2 ? 800 : 0;

  const [particlesPosition, setParticlesPosition] =
    useState<Float32Array | null>(null);

  useEffect(() => {
    if (particleCount === 0) return;
    const t = setTimeout(() => {
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 15; // x
        positions[i * 3 + 1] = Math.random() * 5; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
      }
      setParticlesPosition(positions);
    }, 0);
    return () => clearTimeout(t);
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  if (particleCount === 0 || !particlesPosition) return null;

  return (
    <Points ref={pointsRef} positions={particlesPosition} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
