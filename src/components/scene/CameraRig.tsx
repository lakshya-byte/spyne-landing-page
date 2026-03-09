"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { scrollState } from "@/components/animation/ScrollController";

/**
 * CameraRig - Primary viewpoint controller
 *
 * Purpose:
 * Controls the active PerspectiveCamera within the React Three Fiber scene.
 *
 * Interactions:
 * - Subscribes to `scrollState.camera` to follow the user's scroll progression.
 * - Overrides the default R3F camera on mount.
 *
 * Performance Considerations:
 * - Directly mutates the camera position and lookAt vectors inside `useFrame`.
 * - Does not create new `THREE.Vector3` instances per frame (bypassing GC pauses).
 *
 * Responsibilities:
 * - Ensures smooth tracking shot interpolation matching the car's choreography.
 */
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
