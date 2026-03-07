"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function ParticleSystem({ tier = 3 }: { tier?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = tier === 3 ? 2000 : tier === 2 ? 800 : 0;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Create a volume around the car
      // eslint-disable-next-line react-hooks/exhaustive-deps
      positions[i * 3] = (Math.random() - 0.5) * 15; // x
      // eslint-disable-next-line react-hooks/exhaustive-deps
      positions[i * 3 + 1] = Math.random() * 5; // y
      // eslint-disable-next-line react-hooks/exhaustive-deps
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return positions;
  }, [particleCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  if (particleCount === 0) return null;

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
