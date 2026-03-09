"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import CarModel from "../models/CarModel";
import LightingRig from "./LightingRig";
import CameraRig from "./CameraRig";
import Environment from "./Environment";
import ReflectionSystem from "./ReflectionSystem";
import ParticleSystem from "./ParticleSystem";
import LightSweep from "./LightSweep";
import {
  initScrollController,
  scrollState,
} from "@/components/animation/ScrollController";

/**
 * CarChoreography
 *
 * Purpose:
 * Synchronizes the 3D car model's position and rotation with the global scroll state.
 *
 * Interactions:
 * - Reads `scrollState.car` on every frame.
 *
 * Performance Considerations:
 * - Mutates the THREE.Group properties directly inside `useFrame`.
 * - Allocates ZERO new objects per frame to prevent Garbage Collection (GC) stutters.
 */
function CarChoreography({
  carGroupRef,
}: {
  carGroupRef: React.RefObject<THREE.Group | null>;
}) {
  useFrame(() => {
    const g = carGroupRef.current;
    if (!g) return;
    const car = scrollState.car;
    // Direct mutation - highly performant, avoids React reconciliation
    g.position.set(car.x, car.y, car.z);
    g.rotation.set(car.rx, car.ry, car.rz);
  });
  return null;
}

/**
 * Experience - The core WebGL scene wrapper
 *
 * Purpose:
 * Initializes the React Three Fiber <Canvas> and orchestrates all 3D scene elements
 * (lighting, models, post-processing, and environment).
 *
 * Interactions:
 * - Unifies `CameraRig`, `LightingRig`, `Environment`, and `CarModel`.
 * - Initializes the `ScrollController` on mount to bind GSAP scroll timelines.
 *
 * Performance Considerations:
 * - Uses `powerPreference="high-performance"` to request discrete GPUs on dual-GPU systems.
 * - Caps Device Pixel Ratio (`dpr={[1, 1.5]}`) instead of `[1, 2]` to drastically reduce
 *   fill rate usage on 4K/high-DPI screens without significantly degrading perceived quality.
 * - Sets `antialias={false}` because post-processing (EffectComposer with multisampling)
 *   or temporal anti-aliasing handles it optimally.
 *
 * Responsibilities:
 * - Scene root context.
 * - Global post-processing pipeline setup (Bloom, ToneMapping, Vignette).
 */
export default function Experience() {
  const carGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const unsub = initScrollController();
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black z-0">
      <Canvas
        shadows
        // Opt: Limiting max dpr strictly to 1.0 to save massive fill-rate and improve performance
        dpr={[1, 1]}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true,
        }}
      >
        <color attach="background" args={["#000"]} />

        <Suspense fallback={null}>
          <CameraRig />
          <LightingRig />
          <Environment />
          <CarModel groupRef={carGroupRef} />
          <CarChoreography carGroupRef={carGroupRef} />
          <ReflectionSystem />
          <ParticleSystem />
          <LightSweep />

          <EffectComposer multisampling={4}>
            <Bloom luminanceThreshold={2.0} mipmapBlur intensity={0.4} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            <ToneMapping
              blendFunction={BlendFunction.NORMAL}
              adaptive={true}
              resolution={256}
              middleGrey={0.6}
              maxLuminance={16.0}
              averageLuminance={1.0}
              adaptationRate={1.0}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
