"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { Center } from "@react-three/drei";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function CarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();

    // Path to Draco decoder files
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/uploads_files_5099621_mclaren_p1_gtr_2015-gltf/scene.gltf",
      (gltf) => {
        const scene = gltf.scene;

        // Improve mesh settings
        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.envMapIntensity = 2;
              mesh.material.needsUpdate = true;
            }
          }
        });

        setModel(scene);
      },
      undefined,
      (error) => {
        console.error("GLTF loading error:", error);
      },
    );

    return () => {
      dracoLoader.dispose();
    };
  }, []);

  if (!model) return null;

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} scale={0.012} />
      </Center>{" "}
    </group>
  );
}
