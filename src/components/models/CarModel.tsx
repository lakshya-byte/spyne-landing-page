"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

/**
 * CarModel - GLTF loader and wrapper for the 3D car asset
 *
 * Purpose:
 * Asynchronously loads, parses, and renders the specific vehicle model (Porsche 911 GT2 RS)
 * using DRACO compression for fast delivery.
 *
 * Interactions:
 * - Rendered by `<Experience>`.
 * - Animated dynamically by `<CarChoreography>` mapping via the injected `groupRef`.
 *
 * Performance Considerations:
 * - Uses `DRACOLoader` to decode highly compressed geometry.
 * - Clones the loaded scene (`gltf.scene.clone(true)`) so multiple instances can be used
 *   or components sharing the model do not mutate a single shared state.
 * - Disables shadows (`castShadow/receiveShadow = false`) on complex car meshes to save
 *   significant rendering time, relying instead on baked ambient occlusion and environment
 *   reflections for depth.
 *
 * Responsibilities:
 * - Load GLB asset from network.
 * - Traverse car meshes to tweak material parameters (e.g., envMapIntensity).
 */
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
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
    );
    loader.setDRACOLoader(dracoLoader);

    const warnTimeout = window.setTimeout(() => {
      console.warn(
        "CarModel: model load is taking unusually long. If this persists, check Network tab for the .glb request and any decoder/wasm failures.",
        modelUrl,
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
      },
    );

    return () => {
      window.clearTimeout(warnTimeout);
      dracoLoader.dispose();
    };
  }, [modelUrl]);

  if (!model) return null;

  return (
    <group ref={targetGroupRef} position={[0, -1.2, 0]}>
      <primitive object={model} scale={0.6} rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
}

export default memo(CarModel);
