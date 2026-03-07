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
import { initScrollController, scrollState } from "@/components/animation/ScrollController";

function CarChoreography({ carGroupRef }: { carGroupRef: React.RefObject<THREE.Group | null> }) {
  useFrame(() => {
    const g = carGroupRef.current;
    if (!g) return;
    const car = scrollState.car;
    g.position.set(car.x, car.y, car.z);
    g.rotation.set(car.rx, car.ry, car.rz);
  });
  return null;
}

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
        dpr={[1, 2]}
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
            <Bloom luminanceThreshold={1.5} mipmapBlur intensity={1.2} />
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
