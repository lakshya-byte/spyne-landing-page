"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

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

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    const warnTimeout = window.setTimeout(() => {
      console.warn(
        "CarModel: model load is taking unusually long. If this persists, check Network tab for the .glb request and any decoder/wasm failures.",
        modelUrl
      );
    }, 8000);

    loader.load(
      modelUrl,
      (gltf) => {
        window.clearTimeout(warnTimeout);
        const scene = gltf.scene.clone(true);

        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            mesh.castShadow = false;
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
        window.clearTimeout(warnTimeout);
        console.error("GLTF loading error:", modelUrl, error);
      }
    );

    return () => {
      window.clearTimeout(warnTimeout);
      dracoLoader.dispose();
    };
  }, [modelUrl]);

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