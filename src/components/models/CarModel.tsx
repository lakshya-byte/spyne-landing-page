"use client";

import React from "react";
import { useEffect, useRef, useState, memo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type CarModelProps = {
  groupRef?: React.RefObject<THREE.Group | null>;
};

function CarModel({ groupRef }: CarModelProps) {
  const internalGroupRef = useRef<THREE.Group>(null);
  const targetGroupRef = groupRef ?? internalGroupRef;
  const [model, setModel] = useState<THREE.Group | null>(null);

  const modelUrl = "/porsche_911_gt2_rs_with_angle_eyes.glb";

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        const scene = gltf.scene.clone(true);

        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            mesh.castShadow = true;
            mesh.receiveShadow = false;

            if (mesh.material instanceof THREE.MeshStandardMaterial) {
              mesh.material.envMapIntensity = 0.8;
              mesh.material.emissiveIntensity = 0.05;
              mesh.material.needsUpdate = true;
            }
          }
        });

        setModel(scene);
      },
      undefined,
      (error) => {
        console.error("GLTF loading error:", modelUrl, error);
      }
    );
  }, []);

  if (!model) return null;

  return (
    <group ref={targetGroupRef} position={[0, -1.2, 0]}>
      <primitive
        object={model}
        scale={0.6}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

export default memo(CarModel);