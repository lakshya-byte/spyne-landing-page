"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function Environment() {
  const { scene } = useThree();

  useEffect(() => {
    // Add cinematic dark fog
    scene.fog = new THREE.FogExp2("#050505", 0.02);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <>
      <DreiEnvironment preset="studio" background={false} blur={0.8} />
    </>
  );
}
