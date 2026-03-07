import { MeshReflectorMaterialProps } from "@react-three/drei";

/**
 * Default configuration for the cinematic ground reflection plane.
 * Provides deep, glossy reflections with distance blur falloff.
 */
export const CINEMATIC_REFLECTION_CONFIG: MeshReflectorMaterialProps = {
    // blur: [400, 100], // [x, y] blur for stretched reflections
    resolution: 1024,
    mixBlur: 2,
    mixStrength: 100,
    roughness: 0.15,
    depthScale: 1.5,
    minDepthThreshold: 0.5,
    maxDepthThreshold: 1.5,
    color: "#1a1a1a",
    metalness: 0.7,
    mirror: 0.9,
};
