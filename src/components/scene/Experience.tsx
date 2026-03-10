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
 * CarChoreography — 3D car motion bridge
 *
 * Purpose:
 * Internal R3F component that reads the `scrollState.car` singleton every frame
 * and applies it directly to the THREE.Group wrapping the loaded GLTF scene.
 *
 * Interactions:
 * - `scrollState` is mutated by `ScrollController` which subscribes to the global
 *   MasterTimeline (scroll progress 0→10).
 * - The `carGroupRef` is shared with `<Experience>` and points to the GLTF wrapper group.
 *
 * Performance Considerations:
 * - Direct mutation of `position.set` / `rotation.set` inside `useFrame`.
 * - Zero new THREE object allocations per frame → no GC pressure.
 * - Entirely bypasses React reconciliation (no state, no props change).
 *
 * Responsibilities:
 * - Translate scroll progress into smooth 3D car pose (position + rotation).
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
    g.position.set(car.x, car.y, car.z);
    g.rotation.set(car.rx, car.ry, car.rz);
  });
  return null;
}

/**
 * Experience — Core WebGL scene root
 *
 * Purpose:
 * Initializes the React Three Fiber `<Canvas>` and orchestrates every 3D element:
 * lighting, the Porsche model, post-processing, and the scroll animation controller.
 *
 * Interactions:
 * - `initScrollController()` subscribes to MasterTimeline (scroll 0→10) and writes
 *   the `scrollState` singleton; returns an unsubscribe fn for cleanup.
 * - Children: CameraRig, LightingRig, Environment, CarModel, CarChoreography,
 *   ReflectionSystem, ParticleSystem, LightSweep, EffectComposer.
 *
 * Performance Considerations:
 * - `frameloop="always"` — required for continuous scroll-driven + idle animation.
 *   Previously `"demand"` was breaking all per-frame car choreography.
 * - `dpr={[1, 1.5]}` — caps Pixel Ratio to reduce fill-rate cost on HiDPI screens.
 * - `antialias={false}` — MSAA delegated to EffectComposer (multisampling={2}).
 * - `stencil={false}` — eliminates the stencil buffer to save VRAM.
 * - `powerPreference="high-performance"` — requests discrete GPU on dual-GPU systems.
 *
 * Responsibilities:
 * - WebGL renderer configuration and canvas mounting.
 * - Post-processing pipeline: Bloom → Vignette → ToneMapping.
 * - ScrollController lifecycle management.
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
        frameloop="always"
        dpr={[1, 1.5]}
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

          <EffectComposer multisampling={2}>
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
