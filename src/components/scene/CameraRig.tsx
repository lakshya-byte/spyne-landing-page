"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/components/animation/ScrollController";

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
    const cam = scrollState.camera;
    state.camera.position.set(cam.x, cam.y, cam.z);
    state.camera.lookAt(cam.tx, cam.ty, cam.tz);
  });

  return <PerspectiveCamera ref={cameraRef} fov={45} near={0.1} far={100} />;
}
