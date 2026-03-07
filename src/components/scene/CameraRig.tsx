"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraRig() {
  const { camera, set } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    if (camera) {
      camera.position.set(0, 2, 12);
      camera.lookAt(0, 0.5, 0);
    }
  }, [camera]);

  // Set this camera as default when mounted
  useEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set({ camera: cameraRef.current });
      return () => set({ camera: oldCam });
    }
  }, [set, camera]);

  useFrame((state) => {
    // For now, simple passive rotation or idle breathing
    // We will connect this to GSAP ScrollTrigger later
    const time = state.clock.getElapsedTime();

    // Idle breathing shake
    const shakeX = Math.sin(time * 0.5) * 0.01;
    const shakeY = Math.cos(time * 0.7) * 0.01;

    // Ensure camera always looks at the car center
    state.camera.lookAt(shakeX, 0.5 + shakeY, 0);
  });

  return <PerspectiveCamera ref={cameraRef} fov={45} near={0.1} far={100} />;
}
